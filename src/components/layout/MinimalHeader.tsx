import { MessageSquare, Search, Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface MinimalHeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function MinimalHeader({ currentPage, onPageChange }: MinimalHeaderProps) {
  const navigationItems = [
    { id: "ask", label: "Ask FYNETIC", icon: MessageSquare },
    { id: "players", label: "Explore Players", icon: Search },
    { id: "props", label: "Prop Builder", icon: Target },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1b2433] bg-[var(--surface)] h-[58px]">
      <div className="max-w-[1100px] mx-auto px-4 h-full flex items-center justify-center">
        <nav className="flex items-center gap-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center gap-2",
                  isActive 
                    ? "bg-[var(--surface)] ring-1 ring-white/30 shadow-[0_0_12px_rgba(255,255,255,0.35)] text-text-primary" 
                    : "text-text-muted hover:text-text-primary hover:ring-1 hover:ring-white/20 hover:shadow-[0_0_8px_rgba(255,255,255,0.2)]"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}