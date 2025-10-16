// Edge Function: Fetch odds from external provider, normalize, and cache in Supabase
// TODO: Replace mock data with real provider call using ODDS_API_BASE and ODDS_API_KEY

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";

type MarketCode = "PTS"|"REB"|"AST"|"3PM"|"PRA"|"PR"|"RA"|"PA";

interface NormalizedOdd {
  player: string;
  team?: string;
  market: MarketCode;
  line: number;
  oddsAmerican?: number;
  book?: string;
  gameDate?: string;
  opponent?: string;
  updatedAt: string;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { players, markets, date } = await req.json().catch(() => ({}));
    
    console.log("fetch-odds invoked:", { players, markets, date });
    
    // TODO: Replace with real provider call
    // const ODDS_API_BASE = Deno.env.get("ODDS_API_BASE");
    // const ODDS_API_KEY = Deno.env.get("ODDS_API_KEY");
    // const response = await fetch(`${ODDS_API_BASE}/props?apiKey=${ODDS_API_KEY}&date=${date}`);
    // const rawData = await response.json();
    // const normalized = normalizeProviderData(rawData);
    
    const now = new Date().toISOString();
    const targetDate = date ?? now.slice(0, 10);
    
    // Mock normalized odds (simulating what a real provider would return)
    const mocked: NormalizedOdd[] = [
      { player: "LaMelo Ball", market: "PTS", line: 23.5, oddsAmerican: -110, book: "MOCK", gameDate: targetDate, updatedAt: now },
      { player: "LaMelo Ball", market: "REB", line: 6.2, oddsAmerican: -105, book: "MOCK", gameDate: targetDate, updatedAt: now },
      { player: "LaMelo Ball", market: "AST", line: 7.9, oddsAmerican: -112, book: "MOCK", gameDate: targetDate, updatedAt: now },
      { player: "Jayson Tatum", market: "REB", line: 6.5, oddsAmerican: -110, book: "MOCK", gameDate: targetDate, updatedAt: now },
      { player: "Jayson Tatum", market: "PTS", line: 25.5, oddsAmerican: -108, book: "MOCK", gameDate: targetDate, updatedAt: now },
      { player: "Luka Dončić", market: "3PM", line: 2.5, oddsAmerican: -115, book: "MOCK", gameDate: targetDate, updatedAt: now },
      { player: "Nikola Jokić", market: "PTS", line: 27.5, oddsAmerican: -108, book: "MOCK", gameDate: targetDate, updatedAt: now },
      { player: "Joel Embiid", market: "PRA", line: 46.5, oddsAmerican: -102, book: "MOCK", gameDate: targetDate, updatedAt: now },
    ].filter(x =>
      (!players || players.some((p: string) => p.toLowerCase() === x.player.toLowerCase())) &&
      (!markets || markets.includes(x.market))
    );

    // Upsert to odds_props cache
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    let upserted = 0;
    const errors: string[] = [];
    
    for (const odd of mocked) {
      const { error } = await supabase.from("odds_props").upsert({
        player: odd.player,
        team: odd.team ?? null,
        market: odd.market,
        line: odd.line,
        odds_american: odd.oddsAmerican ?? null,
        book: odd.book ?? null,
        game_date: odd.gameDate ?? null,
        opponent: odd.opponent ?? null,
        updated_at: odd.updatedAt,
      }, {
        onConflict: "player,market,game_date,book"
      });
      
      if (error) {
        console.error("Upsert error:", error);
        errors.push(`${odd.player} ${odd.market}: ${error.message}`);
      } else {
        upserted++;
      }
    }

    console.log(`fetch-odds completed: ${upserted}/${mocked.length} upserted`);

    return new Response(JSON.stringify({
      count: mocked.length,
      upserted,
      errors: errors.length > 0 ? errors : undefined
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200
    });
    
  } catch (e) {
    console.error("fetch-odds error:", e);
    return new Response(JSON.stringify({
      error: String(e)
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500
    });
  }
});
