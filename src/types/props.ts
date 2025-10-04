export type Sport = "NBA"; // extend later
export type League = "NBA"; // extend later
export type Market =
  | "PTS" | "REB" | "AST" | "3PM"
  | "PRA" | "PR" | "RA" | "PA"; // can extend

export type Side = "over" | "under";

export interface PropTicket {
  id: string;              // uuid
  createdAt: string;       // ISO
  sport: Sport;
  league: League;
  player: string;          // canonical full name (no id for now)
  team?: string;           // optional tri-code, if available
  market: Market;
  line: number;            // e.g., 8.5
  side: Side;              // "over" | "under"
  odds?: number | null;    // American, optional (e.g., -110)
  notes?: string | null;
  mockOnly?: boolean;      // true if user marked "Mock prop"
}

export interface VegasBaseline {
  player: string;
  market: Market;
  line: number;            // consensus line
  odds?: number | null;    // consensus odds if available
  asOf: string;            // ISO timestamp
  source: string;          // e.g., "MockBooks" | "OddsAPI"
}

export type PropContextPayload = {
  type: "prop_ticket";
  ticket: PropTicket;
  vegasBaseline: VegasBaseline | null; // might be null if not found
};
