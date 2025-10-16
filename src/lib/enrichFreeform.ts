import { quickParseIntent } from "./nlp";
import { getMockStats } from "@/lib/explore/mockStats";
import { VegasLinesService } from "@/lib/vegas/VegasLinesService";
import { PLAYER_ALIASES } from "@/lib/explore/dictionaries";
import type { Market } from "@/types/props";

function resolvePlayerAlias(text: string): string | undefined {
  const lower = text.toLowerCase();
  for (const [alias, canonical] of Object.entries(PLAYER_ALIASES)) {
    if (lower.includes(alias)) return canonical;
  }
  
  // Fallback: extract first Capitalized First Last
  const m = text.match(/\b([A-Z][a-z]+)\s([A-Z][a-z]+)\b/);
  if (m) return `${m[1]} ${m[2]}`;
  
  return undefined;
}

export async function buildPropContextFromFreeform(message: string) {
  const intent = quickParseIntent(message);
  const market = (intent.market ?? "PTS") as Market;

  const player = resolvePlayerAlias(message);
  if (!player) return null;

  // Get mock stats (deterministic)
  const mockQuery = { player, opponent: undefined, venue: undefined, window: undefined, season: undefined };
  const stats = getMockStats(mockQuery);
  
  // Extract recent average from summary
  const marketLabel = market === "PTS" ? "PPG" : market === "REB" ? "RPG" : market === "AST" ? "APG" : undefined;
  const recentStat = stats.summary.find(s => s.label === marketLabel);
  const recent_avg = recentStat ? Number(recentStat.value) : undefined;

  // Get mock vegas line
  let vegas_line: number | undefined;
  try {
    const vegas = await VegasLinesService.fetchBaseline({ player, market, league: "NBA" });
    vegas_line = vegas?.line;
  } catch {
    vegas_line = undefined;
  }

  return {
    player,
    market,
    vegas_line,
    recent_avg,
    source: "auto-freeform",
  };
}
