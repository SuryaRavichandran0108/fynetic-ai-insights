import { cn } from "@/lib/utils";

interface TrendingCardProps {
  question: string;
  playerName: string;
  propLine: string;
  onClick: () => void;
}

export function TrendingCard({ question, playerName, propLine, onClick }: TrendingCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full rounded-2xl bg-[var(--surface)] border border-[#1b2433] p-4",
        "hover:border-white/15 transition-all duration-200",
        "text-left group"
      )}
    >
      <div className="flex gap-3">
        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm text-text-primary font-medium line-clamp-2 mb-2 group-hover:text-accent-teal transition-colors">
            {question}
          </p>
          <p className="text-xs text-accent-teal font-medium">{propLine}</p>
        </div>
        
        {/* Player clip art placeholder */}
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[var(--bg)]/60 border border-[#1b2433] flex items-center justify-center">
          <svg
            className="w-6 h-6 text-accent-teal/60"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
      </div>
    </button>
  );
}
