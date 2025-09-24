import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Target, ChevronDown, ChevronUp } from "lucide-react";
import { TermTooltip } from "@/components/ui/term-tooltip";
import { useState } from "react";

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
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5 text-accent" />
        <h2 className="text-xl font-semibold">Today's Games</h2>
      </div>
      
      <div className="space-y-3">
        {displayGames.map((game) => {
          const isExpanded = expandedGames.has(game.id);
          
          return (
            <Card key={game.id} className="hover:bg-card-hover transition-colors">
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Main Game Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="font-semibold text-lg">{game.awayTeam}</div>
                        <div className="text-xs text-muted-foreground">@</div>
                        <div className="font-semibold text-lg">{game.homeTeam}</div>
                      </div>
                      
                      <div className="space-y-2">
                        <Badge 
                          variant={game.status === "LIVE" ? "destructive" : "secondary"}
                          className="w-fit"
                        >
                          {game.status === "LIVE" ? "🔴 LIVE" : game.startTime}
                        </Badge>
                        <div className="text-sm text-muted-foreground font-medium">
                          {getGameInsight(game)}
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpanded(game.id)}
                      className="gap-1"
                    >
                      Details
                      {isExpanded ? (
                        <ChevronUp className="h-3 w-3" />
                      ) : (
                        <ChevronDown className="h-3 w-3" />
                      )}
                    </Button>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="pt-3 border-t space-y-3 animate-fade-in">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <TermTooltip 
                            term="Over/Under" 
                            definition="Total combined points expected by sportsbooks"
                          >
                            <span className="text-muted-foreground">O/U:</span>
                          </TermTooltip>
                          <span className="ml-2 font-medium">{game.impliedTotal}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Status:</span>
                          <span className="ml-2 font-medium capitalize">{game.status.toLowerCase()}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="gap-1">
                          <Target className="h-3 w-3" />
                          Build Props
                        </Button>
                        <Button size="sm" variant="outline" className="gap-1">
                          <Users className="h-3 w-3" />
                          Research
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}