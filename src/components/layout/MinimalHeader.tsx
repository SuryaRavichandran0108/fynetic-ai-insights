import { MessageSquare, Search, Target } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export function MinimalHeader() {
  const location = useLocation();
  const navigationItems = [
    { path: "/ask", label: "Ask FYNETIC", icon: MessageSquare },
    { path: "/players", label: "Explore Players", icon: Search },
    { path: "/props", label: "Prop Builder", icon: Target },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1b2433] bg-[var(--surface)] h-[58px]">
      <div className="max-w-[1100px] mx-auto px-4 h-full flex items-center justify-center">
        <nav className="flex items-center gap-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center gap-2",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
                  isActive 
                    ? "bg-[var(--surface)] text-white ring-1 ring-white/20 shadow-[0_0_0_2px_rgba(255,255,255,0.04),0_0_18px_rgba(255,255,255,0.10)]" 
                    : "text-white/70 hover:text-white hover:ring-1 hover:ring-white/12 hover:shadow-[0_0_12px_rgba(255,255,255,0.06)]"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}