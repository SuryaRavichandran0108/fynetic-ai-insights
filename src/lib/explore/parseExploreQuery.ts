import { ExploreParsedQuery, Venue, Window } from "@/types/explore";
import { PLAYER_ALIASES, TEAM_ALIASES, SEASON_ALIASES } from "./dictionaries";

const word = (s: string) => s.trim().toLowerCase();

export function parseExploreQuery(input: string): ExploreParsedQuery {
  const q = word(input);

  let player: string | null = null;
  let opponent: string | null = null;
  let venue: Venue = null;
  let season: string | null = null;
  let window: Window = null;

  // player (simple alias map match on substrings)
  for (const [alias, full] of Object.entries(PLAYER_ALIASES)) {
    if (q.includes(word(alias))) { player = full; break; }
  }

  // opponent "vs|against <team>"
  const vsMatch = q.match(/\b(vs|versus|against)\s+([a-z\s]+)\b/);
  if (vsMatch) {
    const raw = word(vsMatch[2]);
    for (const [alias, tri] of Object.entries(TEAM_ALIASES)) {
      if (raw.includes(word(alias))) { opponent = tri; break; }
    }
  }

  // venue: "at home", "at away", "on road", "away"
  if (/\b(home|at home)\b/.test(q)) venue = "home";
  if (/\b(away|on the road|on road)\b/.test(q)) venue = "away";

  // window: last N games
  const lastN = q.match(/\blast\s+(\d{1,2})\s+games?\b/);
  if (lastN) {
    const n = parseInt(lastN[1], 10);
    window = n === 5 ? "last_5" : n === 10 ? "last_10" : { since: `last_${n}` };
  }

  // season
  for (const [alias, code] of Object.entries(SEASON_ALIASES)) {
    if (q.includes(word(alias))) { season = code; break; }
  }
  if (!season && /this season/.test(q)) season = "2024-25";

  // default sensible window if none provided
  if (!window) window = "season";

  return { player, opponent, venue, season, window };
}
