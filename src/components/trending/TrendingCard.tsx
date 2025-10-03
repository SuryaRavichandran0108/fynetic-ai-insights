import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

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
        "group w-full text-left rounded-2xl bg-[var(--surface)] border border-white/5 p-4 cursor-pointer",
        "hover:bg-white/[0.03] hover:border-white/10 transition",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-[15px] text-text-primary font-medium line-clamp-2 mb-2 group-hover:text-accent-teal transition-colors">
            {question}
          </p>
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-[13px] text-accent-teal font-medium">
            {propLine}
          </div>
        </div>
        
        {/* Avatar circle */}
        <div className="relative shrink-0">
          <div className="size-12 rounded-full bg-gradient-to-br from-white/8 to-white/2 ring-1 ring-white/10" />
        </div>

        {/* Chevron */}
        <ChevronRight className="size-4 text-white/40 translate-x-0 group-hover:translate-x-0.5 transition" />
      </div>
    </button>
  );
}
