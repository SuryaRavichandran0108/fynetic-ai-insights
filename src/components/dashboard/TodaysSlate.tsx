import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Target, ChevronDown } from "lucide-react";
import { TermTooltip } from "@/components/ui/term-tooltip";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Game {
  id: string;
  homeTeam: string;
  awayTeam: string;
  startTime: string;
  impliedTotal: number;
  status: "SCHEDULED" | "LIVE" | "FINAL";
}

interface TodaysSlateProps {
  games: Game[];
  isAdvanced: boolean;
}

export function TodaysSlate({ games, isAdvanced }: TodaysSlateProps) {
  const [expandedGames, setExpandedGames] = useState<Set<string>>(new Set());
  const mockGames: Game[] = [
    {
      id: "1",
      homeTeam: "Chiefs",
      awayTeam: "Bills",
      startTime: "8:20 PM EST",
      impliedTotal: 47.5,
      status: "SCHEDULED"
    },
    {
      id: "2", 
      homeTeam: "Cowboys",
      awayTeam: "Eagles",
      startTime: "4:25 PM EST",
      impliedTotal: 45.0,
      status: "SCHEDULED"
    },
    {
      id: "3",
      homeTeam: "49ers",
      awayTeam: "Rams",
      startTime: "1:00 PM EST", 
      impliedTotal: 51.5,
      status: "LIVE"
    }
  ];

  const getGameInsight = (game: Game) => {
    if (game.impliedTotal > 50) return "High-scoring matchup expected";
    if (game.impliedTotal < 45) return "Defensive battle likely";
    return "Competitive game trending close";
  };

  const toggleExpanded = (gameId: string) => {
    const newExpanded = new Set(expandedGames);
    if (newExpanded.has(gameId)) {
      newExpanded.delete(gameId);
    } else {
      newExpanded.add(gameId);
    }
    setExpandedGames(newExpanded);
  };

  const displayGames = games.length > 0 ? games : mockGames;

  return (
    <div className="animate-slide-up space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-heading font-semibold text-foreground tracking-tight">Today's Slate</h2>
        <Badge variant="outline" className="rounded-full bg-muted/50 text-foreground border-border">
          {displayGames.length} games
        </Badge>
      </div>
      
      <div className="space-y-4">
        {displayGames.map((game) => {
          const isExpanded = expandedGames.has(game.id);
          
          return (
            <Card 
              key={game.id}
              className="cursor-pointer hover:shadow-xl hover:shadow-accent/10 transition-all duration-300 hover:-translate-y-0.5 bg-gradient-card border border-border hover:border-accent/30 shadow-lg rounded-2xl overflow-hidden group"
              onClick={() => toggleExpanded(game.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-accent rounded-full flex items-center justify-center text-accent-foreground font-bold text-sm shadow-lg">
                        {game.awayTeam.slice(0, 2)}
                      </div>
                      <span className="text-muted-foreground">@</span>
                      <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm shadow-lg">
                        {game.homeTeam.slice(0, 2)}
                      </div>
                    </div>
                    
                    <div>
                      <div className="font-heading font-semibold text-lg text-foreground tracking-tight">
                        {game.awayTeam} @ {game.homeTeam}
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        {game.status === "LIVE" ? (
                          <Badge className="bg-live text-live-foreground rounded-full px-3 py-1 text-xs font-medium shadow-sm">
                            🔴 LIVE
                          </Badge>
                        ) : (
                          <span className="text-sm text-muted-foreground font-medium font-body">
                            {game.startTime}
                          </span>
                        )}
                        <Badge variant="secondary" className="rounded-full bg-secondary/20 text-secondary border-secondary/30 font-medium">
                          {getGameInsight(game)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <ChevronDown className={cn(
                    "h-5 w-5 transition-transform text-muted-foreground group-hover:text-accent",
                    isExpanded && "rotate-180"
                  )} />
                </div>
                
                {isExpanded && (
                  <div className="mt-6 pt-6 border-t border-border/50 space-y-4 animate-fade-in">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="bg-muted/50 rounded-xl p-4 border border-border/30">
                        <TermTooltip 
                          term="Over/Under" 
                          definition="The total combined points expected by sportsbooks"
                        >
                          <div className="text-sm text-muted-foreground font-body">O/U Total</div>
                          <div className="font-heading font-bold text-xl text-accent">{game.impliedTotal}</div>
                        </TermTooltip>
                      </div>
                      <div className="bg-muted/50 rounded-xl p-4 border border-border/30">
                        <div className="text-sm text-muted-foreground font-body">Status</div>
                        <div className="font-heading font-bold text-xl text-secondary capitalize">{game.status.toLowerCase()}</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button size="sm" className="rounded-full bg-accent text-accent-foreground hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/25 transition-all duration-300">
                        <Target className="h-3 w-3 mr-1" />
                        Build Props
                      </Button>
                      <Button size="sm" variant="outline" className="rounded-full border-border hover:border-accent/50 hover:bg-accent/10">
                        <Users className="h-3 w-3 mr-1" />
                        Research
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}