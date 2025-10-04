export type Venue = "home" | "away" | null;
export type Window = "last_5" | "last_10" | "season" | { since?: string } | null;

export interface ExploreParsedQuery {
  player: string | null;     // canonical full name, e.g., "Luka Dončić"
  opponent: string | null;   // NBA tri-code, e.g., "ORL"
  venue: Venue;              // "home" | "away" | null
  season: string | null;     // e.g., "2024-25"
  window: Window;            // e.g., "last_5" | "season"
}

export interface ExploreStatsPreview {
  summary: Array<{ label: string; value: string }>;
  gameLog: Array<{ opp: string; line: string }>;
  splits: Array<{ label: string; value: string }>;
}

export interface ExploreContextPayload {
  type: "player_query";
  parsedQuery: ExploreParsedQuery;
  statsPreview: ExploreStatsPreview;
}
