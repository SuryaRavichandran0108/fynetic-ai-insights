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
  
  // 1) tolerant pattern: First Last with internal caps/hyphens/apostrophes (LaMelo, LeBron, Karl-Anthony)
  const tolerant = text.match(/\b([A-Z][A-Za-z'-]+)\s([A-Z][A-Za-z'-]+)\b/);
  if (tolerant) return `${tolerant[1]} ${tolerant[2]}`;
  
  // 2) fallback from lowercase text: title-case two adjacent words (handles "lamelo ball")
  const words = text
    .toLowerCase()
    .replace(/[^a-z'\-\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

  const common = new Set(["an", "the", "a", "and", "or", "vs", "tonight", "today", "points", "rebounds", "assists", "threes", "pts", "reb", "ast", "matchup", "pace", "recent", "form"]);
  for (let i = 0; i < words.length - 1; i++) {
    const first = words[i], last = words[i + 1];
    if (first.length >= 3 && last.length >= 3 && !common.has(first) && !common.has(last)) {
      const title = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
      return `${title(first)} ${title(last)}`;
    }
  }

  // 3) last-chance explicit aliases for common mixed-case stars
  if (lower.includes("lamelo ball")) return "LaMelo Ball";
  if (lower.includes("lebron james")) return "LeBron James";
  
  return undefined;
}

export async function buildPropContextFromFreeform(message: string) {
  const intent = quickParseIntent(message);
  const market = (intent.market ?? "PTS") as Market;

  const player = resolvePlayerAlias(message);
  if (!player) {
    console.log("[enrich] no player parsed");
    return null;
  }

  // --- recent_avg from mock stats (tolerant to shapes) ---
  let recent_avg: number | undefined;
  try {
    const mockQuery = { player, opponent: undefined, venue: undefined, window: undefined, season: undefined };
    const stats = getMockStats(mockQuery);
    
    // Extract recent average from summary
    const marketLabel = market === "PTS" ? "PPG" : market === "REB" ? "RPG" : market === "AST" ? "APG" : undefined;
    const recentStat = stats.summary.find(s => s.label === marketLabel);
    recent_avg = recentStat ? Number(recentStat.value) : undefined;
  } catch (e) {
    console.log("[enrich] getMockStats failed", e);
  }

  // --- vegas_line from mock provider ---
  let vegas_line: number | undefined;
  try {
    const vegas = await VegasLinesService.fetchBaseline({ player, market, league: "NBA" });
    vegas_line = vegas?.line;
  } catch (e) {
    console.log("[enrich] VegasLinesService failed", e);
  }

  const payload = {
    player,
    market,
    vegas_line,
    recent_avg,
    source: "auto-freeform",
  };
  console.log("[enrich] built propContext", payload);
  return payload;
}
