export type ParsedIntent = {
  player?: string;
  market?: "PTS" | "REB" | "AST" | "3PM" | "PRA" | "PR" | "RA" | "PA";
};

const MARKET_ALIASES: Record<string, ParsedIntent["market"]> = {
  points: "PTS",
  pts: "PTS",
  scoring: "PTS",
  rebounds: "REB",
  boards: "REB",
  reb: "REB",
  assists: "AST",
  ast: "AST",
  threes: "3PM",
  "3pm": "3PM",
  "3-pointers": "3PM",
  pra: "PRA",
  "points+rebounds+assists": "PRA",
  pr: "PR",
  ra: "RA",
  pa: "PA",
};

export function quickParseIntent(text: string): ParsedIntent {
  const lower = text.toLowerCase();

  // Light market detection
  for (const k of Object.keys(MARKET_ALIASES)) {
    if (lower.includes(k)) return { market: MARKET_ALIASES[k] };
  }

  return {};
}
