import type { Market, VegasBaseline } from "@/types/props";

export interface VegasQuery {
  player: string;
  market: Market;
  league: "NBA";
  date?: string; // optional hook for future
}

export interface VegasLinesProvider {
  fetchBaseline(q: VegasQuery): Promise<VegasBaseline | null>;
}

// --- Mock provider: deterministic, looks stable across sessions ---
const MOCK_LINES: Array<{ player: string; market: Market; line: number; odds?: number }> = [
  { player: "Jayson Tatum",   market: "REB", line: 6.5, odds: -110 },
  { player: "Luka Dončić",    market: "3PM", line: 2.5, odds: -115 },
  { player: "Nikola Jokić",   market: "PTS", line: 27.5, odds: -108 },
  { player: "Joel Embiid",    market: "PRA", line: 46.5, odds: -102 },
  { player: "LaMelo Ball",    market: "PTS", line: 23.5, odds: -110 },
];

class MockVegasProvider implements VegasLinesProvider {
  async fetchBaseline(q: VegasQuery): Promise<VegasBaseline | null> {
    const hit = MOCK_LINES.find(
      r => r.player.toLowerCase() === q.player.toLowerCase() && r.market === q.market
    );
    if (!hit) return null;
    return {
      player: hit.player,
      market: hit.market,
      line: hit.line,
      odds: hit.odds ?? null,
      asOf: new Date().toISOString(),
      source: "MockBooks",
    };
  }
}

// Swap here later when wiring real data (Odds API / Supabase table / scraper)
const provider: VegasLinesProvider = new MockVegasProvider();

export const VegasLinesService = {
  fetchBaseline: (q: VegasQuery) => provider.fetchBaseline(q),
};
