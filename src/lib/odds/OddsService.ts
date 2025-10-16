// Mock odds adapter - will be replaced with real provider later
// TODO: Swap MockOddsProvider with real provider adapter (e.g., TheOddsAPI)

import { NormalizedOdd, OddsProvider, MarketCode } from "@/types/odds";

class MockOddsProvider implements OddsProvider {
  async getPlayerProps({ players, markets }: { players?: string[]; markets?: MarketCode[]; }): Promise<NormalizedOdd[]> {
    const now = new Date().toISOString();
    const today = now.slice(0, 10);
    
    const pool: NormalizedOdd[] = [
      { player: "LaMelo Ball", market: "PTS", line: 23.5, oddsAmerican: -110, book: "MOCK", gameDate: today, updatedAt: now },
      { player: "LaMelo Ball", market: "REB", line: 6.2, oddsAmerican: -105, book: "MOCK", gameDate: today, updatedAt: now },
      { player: "LaMelo Ball", market: "AST", line: 7.9, oddsAmerican: -112, book: "MOCK", gameDate: today, updatedAt: now },
      { player: "Jayson Tatum", market: "REB", line: 6.5, oddsAmerican: -110, book: "MOCK", gameDate: today, updatedAt: now },
      { player: "Jayson Tatum", market: "PTS", line: 25.5, oddsAmerican: -108, book: "MOCK", gameDate: today, updatedAt: now },
      { player: "Luka Dončić", market: "3PM", line: 2.5, oddsAmerican: -115, book: "MOCK", gameDate: today, updatedAt: now },
      { player: "Luka Dončić", market: "PTS", line: 29.5, oddsAmerican: -110, book: "MOCK", gameDate: today, updatedAt: now },
      { player: "Nikola Jokić", market: "PTS", line: 27.5, oddsAmerican: -108, book: "MOCK", gameDate: today, updatedAt: now },
      { player: "Joel Embiid", market: "PRA", line: 46.5, oddsAmerican: -102, book: "MOCK", gameDate: today, updatedAt: now },
    ];
    
    return pool.filter(x =>
      (!players || players.some(p => p.toLowerCase() === x.player.toLowerCase())) &&
      (!markets || markets.includes(x.market))
    );
  }
}

// Export as a singleton provider for easy swapping later
export const OddsService: OddsProvider = new MockOddsProvider();
