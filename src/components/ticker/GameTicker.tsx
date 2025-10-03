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
    <div className="relative h-10 border-y border-[#1b2433] bg-[var(--surface)] overflow-hidden">
      {/* Gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[var(--surface)] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[var(--surface)] to-transparent z-10 pointer-events-none" />
      
      {/* Scrolling content */}
      <div className="ticker-wrapper h-full flex items-center">
        <div className="ticker-content flex items-center gap-4 animate-ticker hover:pause-ticker">
          {/* Duplicate the items for infinite scroll */}
          {[...mockGames, ...mockGames].map((game, index) => (
            <div
              key={`${game.id}-${index}`}
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg)]/60 border border-[#1b2433] whitespace-nowrap"
            >
              <Activity className="h-3 w-3 text-accent-teal" />
              <span className="text-xs text-text-primary">
                {game.away} @ {game.home} • {game.time}
              </span>
              <span className="text-xs text-text-muted">—</span>
              <span className="text-xs text-accent-teal font-medium">{game.prop}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .animate-ticker {
          animation: ticker 60s linear infinite;
        }
        
        .hover\\:pause-ticker:hover {
          animation-play-state: paused;
        }
        
        .ticker-content {
          display: flex;
          width: max-content;
        }
      `}</style>
    </div>
  );
}
