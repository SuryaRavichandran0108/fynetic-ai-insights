import { Activity } from "lucide-react";

const mockGames = [
  { id: 1, away: "SF 49ers", home: "LA Rams", time: "7:00 PM", prop: "Puka Nacua o/u 4.5 rec" },
  { id: 2, away: "BOS Celtics", home: "PHI 76ers", time: "7:30 PM", prop: "Jayson Tatum o/u 6.5 reb" },
  { id: 3, away: "DEN Nuggets", home: "PHX Suns", time: "9:00 PM", prop: "Nikola Jokić o/u 27.5 pts" },
  { id: 4, away: "MIA Heat", home: "MIL Bucks", time: "8:00 PM", prop: "Giannis o/u 31.5 pts" },
  { id: 5, away: "LAL Lakers", home: "GSW Warriors", time: "10:00 PM", prop: "LeBron o/u 25.5 pts" },
];

export function GameTicker() {
  return (
    <div className="h-10 border-y border-white/10 bg-[var(--surface)] overflow-hidden ticker-viewport">
      <div className="flex gap-4 animate-[ticker_28s_linear_infinite] hover:[animation-play-state:paused] whitespace-nowrap">
        {/* Duplicate the items for infinite scroll */}
        {[...mockGames, ...mockGames].map((game, index) => (
          <div
            key={`${game.id}-${index}`}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg)]/60 border border-white/10 whitespace-nowrap"
          >
            <Activity className="h-3 w-3 text-primary-500" />
            <span className="text-xs text-text-primary">
              {game.away} @ {game.home}
            </span>
            <span className="text-xs text-text-muted">—</span>
            <span className="text-xs text-primary-400 font-medium">{game.prop}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
