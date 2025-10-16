import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

type AskReq = {
  message: string;
  source?: "explore" | "prop" | "freeform";
  exploreContext?: unknown;
  propContext?: unknown;
};

type AskRes = {
  answer_markdown: string;
};

function safePreview(obj: unknown, max = 2000): string {
  try {
    const s = JSON.stringify(obj);
    return s.length > max ? s.slice(0, max) + "…[truncated]" : s;
  } catch {
    return String(obj ?? "");
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Use POST" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
    if (!OPENAI_API_KEY) {
      console.error("Missing OPENAI_API_KEY");
      return new Response(JSON.stringify({ error: "Missing OPENAI_API_KEY" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = (await req.json()) as AskReq;
    const { message, source = "freeform", exploreContext, propContext } = body || {};
    
    if (!message || typeof message !== "string") {
      return new Response(JSON.stringify({ error: "Missing 'message' string" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Processing request:", { source, messageLength: message.length });

    const systemPrompt = [
      "You are FYNETIC, a sports analytics assistant for NBA **player props**.",
      "",
      "OUTPUT SHAPE (markdown):",
      "- **Projected Range**: X–Y pts/reb/ast (state market).",
      "- **Lean**: over | under | neutral, with one short reason.",
      "- **Rationale**: 3–4 bullets (recent form, matchup/pace, role/usage, volatility).",
      "- **Data Gaps**: 1 bullet on the most important stat missing.",
      "",
      "RULES:",
      "- Use any numeric context you're given (e.g., vegas_line, recent_avg).",
      "- If you have a **vegas_line**, anchor your projection to it (e.g., line ± variance).",
      "- If you have **recent_avg**, use it to widen/narrow the range.",
      "- If you lack numbers, avoid making them up: say 'range depends on missing data' and list the gap.",
      "- Keep it concise. No paragraphs of fluff.",
      "- End with: **FYNETIC uses analytics for information only — not betting advice.**"
    ].join("\n");

    const context = {
      source,
      explorePreview: exploreContext ? safePreview(exploreContext) : undefined,
      propPreview: propContext ? safePreview(propContext) : undefined,
    };

    const numericHint = {
      vegas_line: (propContext as any)?.vegas_line ?? null,
      recent_avg: (propContext as any)?.recent_avg ?? null,
    };
    
    console.log("ask-fynetic input", {
      source,
      hasProp: !!propContext,
      sample: {
        player: (propContext as any)?.player ?? null,
        market: (propContext as any)?.market ?? null,
        vegas_line: numericHint.vegas_line,
        recent_avg: numericHint.recent_avg
      }
    });

    const messages = [
      { role: "system", content: systemPrompt },
      { role: "system", content: `Numeric context: ${JSON.stringify(numericHint)}` },
      { role: "system", content: `Context:\n${JSON.stringify(context)}` },
      { role: "user", content: message },
    ];

    const model = Deno.env.get("FYNETIC_LLM_MODEL") ?? "gpt-4o-mini";
    const temperature = Number(Deno.env.get("FYNETIC_LLM_TEMPERATURE") ?? "0.1");

    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature,
        max_tokens: 600,
      }),
    });

    if (!resp.ok) {
      const detail = await resp.text();
      console.error("OpenAI error:", detail);
      return new Response(JSON.stringify({ error: "OpenAI error", detail }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await resp.json();
    const content: string =
      data?.choices?.[0]?.message?.content?.trim() ??
      "I couldn't generate a response.";

    console.log("Response generated successfully");

    const out: AskRes = { answer_markdown: content };
    return new Response(JSON.stringify(out), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err) {
    console.error("Error in ask-fynetic function:", err);
    return new Response(JSON.stringify({ error: (err as Error).message || "Server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
