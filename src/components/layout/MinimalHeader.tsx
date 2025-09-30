import { Button } from "@/components/ui/button";
import { Search, MessageSquare, Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface MinimalHeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function MinimalHeader({ currentPage, onPageChange }: MinimalHeaderProps) {
  const navigationItems = [
    { id: "players", label: "Explore Players", icon: Search, position: "left" },
    { id: "ask", label: "Ask FYNETIC", icon: MessageSquare, position: "center" },
    { id: "props", label: "Prop Builder", icon: Target, position: "right" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/30 bg-surface/80 backdrop-blur supports-[backdrop-filter]:bg-surface/60">
      <div className="container flex h-14 items-center justify-between px-4">
        {/* Logo on non-Ask pages only */}
        <div className="flex-1">
          {currentPage !== "ask" && (
            <img src="/brand/fynetic-logo-primary.png" alt="FYNETIC" className="h-7 w-auto" />
          )}
        </div>

        {/* Centered Navigation */}
        <nav className="flex items-center gap-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => onPageChange(item.id)}
                className={cn(
                  "gap-2 font-medium transition-all duration-200",
                  isActive 
                    ? "bg-accent-teal text-bg hover:bg-accent-teal-700" 
                    : "text-text-muted hover:text-text-primary hover:bg-surface"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Button>
            );
          })}
        </nav>

        {/* Right spacer */}
        <div className="flex-1" />
      </div>
    </header>
  );
}