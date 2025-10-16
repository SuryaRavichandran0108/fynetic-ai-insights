import { supabase } from "@/integrations/supabase/client";

export type AskReq = {
  message: string;
  source?: "explore" | "prop" | "freeform";
  exploreContext?: unknown;
  propContext?: unknown;
};

export type AskRes = { 
  answer_markdown: string;
};

export async function askLLM(payload: AskReq): Promise<AskRes> {
  const { data, error } = await supabase.functions.invoke("ask-fynetic", {
    body: payload,
  });
  
  if (error) {
    throw new Error(error.message || "LLM function call failed");
  }
  
  return data as AskRes;
}
