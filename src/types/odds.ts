// Provider-agnostic odds types for external sportsbook data

export type MarketCode = "PTS" | "REB" | "AST" | "3PM" | "PRA" | "PR" | "RA" | "PA";

export interface NormalizedOdd {
  player: string;
  team?: string;
  market: MarketCode;
  line: number;
  side?: "over" | "under";
  oddsAmerican?: number;  // e.g., -110
  book?: string;          // e.g., "DK", "FD", "MOCK"
  gameDate?: string;      // ISO YYYY-MM-DD
  opponent?: string;
  updatedAt: string;      // ISO timestamp
}

export interface OddsProvider {
  getPlayerProps(params: {
    date?: string;        // default today in provider local
    players?: string[];
    markets?: MarketCode[];
  }): Promise<NormalizedOdd[]>;
}
