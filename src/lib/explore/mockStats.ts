import { ExploreParsedQuery, ExploreStatsPreview } from "@/types/explore";

export function getMockStats(parsed: ExploreParsedQuery): ExploreStatsPreview {
  const { player, opponent, venue, window } = parsed;

  // Fake numbers for now; deterministic by string length to feel stable.
  const seed = (player ?? "").length + (opponent ?? "").length + (venue ? 10 : 0);
  const ppg = (24 + (seed % 9) + 0.4).toFixed(1);
  const rpg = (7 + (seed % 5) + 0.2).toFixed(1);
  const apg = (6 + (seed % 4) + 0.1).toFixed(1);

  const summary = [
    { label: "PPG", value: ppg },
    { label: "RPG", value: rpg },
    { label: "APG", value: apg },
  ];

  const gameLog = Array.from({ length: 5 }).map((_, i) => ({
    opp: opponent ?? "—",
    line: `${28 - i} PTS • ${8} REB • ${7} AST`,
  }));

  const splits = [
    { label: "Home", value: (Number(ppg) + 1.2).toFixed(1) + " PPG" },
    { label: "Away", value: (Number(ppg) - 0.8).toFixed(1) + " PPG" },
  ];

  return { summary, gameLog, splits };
}
