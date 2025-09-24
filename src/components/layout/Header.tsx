import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  BarChart3, 
  Search, 
  MessageSquare, 
  Target, 
  TrendingUp, 
  Settings,
  Calendar,
  Filter
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAdvancedMode } from "@/hooks/useAdvancedMode";

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Header({ currentPage, onPageChange }: HeaderProps) {
  const [selectedLeague, setSelectedLeague] = useState("NFL");
  const [selectedDateScope, setSelectedDateScope] = useState("Today");
  const { isAdvanced, toggleMode } = useAdvancedMode();

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "research", label: "Research", icon: Search },
    { id: "prop-builder", label: "Prop Builder", icon: Target },
    { id: "ask-fynetic", label: "Ask FYNETIC", icon: MessageSquare },
    { id: "bet-tracker", label: "Bet Tracker", icon: TrendingUp },
    { id: "admin", label: "Admin", icon: Settings },
  ];

  const leagues = ["NFL", "NBA", "MLB"];
  const dateScopes = ["Today", "Next 3 Days", "This Week"];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Compliance Banner */}
      <div className="bg-warning/20 border-b border-warning/30 px-4 py-2 text-center">
        <p className="text-sm text-foreground font-body">
          <strong className="font-heading">FYNETIC</strong> provides informational insights, not betting advice. All analysis is for educational purposes only.
        </p>
      </div>

      <div className="container flex h-16 items-center justify-between">
        {/* Logo and League Selector */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <img src="/brand/fynetic-logo-dark.svg" alt="FYNETIC" className="h-8 w-auto" />
          </div>

          {/* League Selector */}
          <div className="flex items-center gap-1 rounded-lg bg-muted p-1 border border-border">
            {leagues.map((league) => (
              <Button
                key={league}
                variant={selectedLeague === league ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedLeague(league)}
                className="h-8 px-3 text-xs font-medium font-heading tracking-tight"
              >
                {league}
              </Button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={currentPage === item.id ? "default" : "ghost"}
                size="sm"
                onClick={() => onPageChange(item.id)}
                className="gap-2 font-body hover:bg-accent/10"
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Button>
            );
          })}
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-4">
          {/* Advanced Mode Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground font-body">
              {isAdvanced ? "Advanced" : "Simple"}
            </span>
            <Switch
              checked={isAdvanced}
              onCheckedChange={toggleMode}
            />
          </div>

          {/* Date Scope Selector */}
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div className="flex items-center gap-1 rounded-lg bg-muted p-1 border border-border">
              {dateScopes.map((scope) => (
                <Button
                  key={scope}
                  variant={selectedDateScope === scope ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedDateScope(scope)}
                  className="h-8 px-3 text-xs font-body"
                >
                  {scope}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}