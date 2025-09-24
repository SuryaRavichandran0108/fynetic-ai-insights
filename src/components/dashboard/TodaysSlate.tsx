import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Target } from "lucide-react";

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
}

export function TodaysSlate({ games }: TodaysSlateProps) {
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

  const displayGames = games.length > 0 ? games : mockGames;

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-accent" />
          Today's Slate
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayGames.map((game) => (
            <div 
              key={game.id}
              className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-card-hover transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="font-medium">{game.awayTeam}</div>
                  <div className="text-xs text-muted-foreground">@</div>
                  <div className="font-medium">{game.homeTeam}</div>
                </div>
                
                <div className="flex flex-col gap-1">
                  <Badge 
                    variant={game.status === "LIVE" ? "destructive" : "secondary"}
                    className="w-fit"
                  >
                    {game.status === "LIVE" ? "LIVE" : game.startTime}
                  </Badge>
                  <div className="text-sm text-muted-foreground">
                    O/U {game.impliedTotal}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
          ))}
        </div>
      </CardContent>
    </Card>
  );
}