import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Search, 
  TrendingUp, 
  Users, 
  Filter,
  BarChart3
} from "lucide-react";

interface PlayerTrend {
  id: string;
  player: string;
  team: string;
  market: string;
  average: number;
  typicalLine: number;
  percentile: number;
  trend: number[];
}

export default function Research() {
  const [selectedTeam, setSelectedTeam] = useState("all");
  const [selectedMarket, setSelectedMarket] = useState("all");
  const [lookback, setLookback] = useState("10");

  const mockPlayerTrends: PlayerTrend[] = [
    {
      id: "1",
      player: "Josh Allen",
      team: "BUF",
      market: "Passing Yards",
      average: 267.3,
      typicalLine: 259.5,
      percentile: 73,
      trend: [245, 289, 312, 203, 267, 298, 276, 231, 289, 312]
    },
    {
      id: "2", 
      player: "Patrick Mahomes",
      team: "KC",
      market: "Passing TDs",
      average: 2.1,
      typicalLine: 1.5,
      percentile: 82,
      trend: [2, 3, 1, 2, 3, 2, 1, 2, 3, 2]
    },
    {
      id: "3",
      player: "Tyreek Hill",
      team: "MIA", 
      market: "Receiving Yards",
      average: 89.2,
      typicalLine: 84.5,
      percentile: 67,
      trend: [112, 67, 143, 45, 89, 134, 76, 98, 102, 87]
    }
  ];

  const Sparkline = ({ data, className = "" }: { data: number[], className?: string }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;
    
    return (
      <div className={`flex items-end gap-1 h-8 ${className}`}>
        {data.map((value, index) => {
          const height = range > 0 ? ((value - min) / range) * 100 : 50;
          return (
            <div
              key={index}
              className="bg-accent rounded-sm flex-1 min-w-[2px] transition-all hover:bg-accent-hover"
              style={{ height: `${Math.max(height, 10)}%` }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Search className="h-8 w-8 text-accent" />
            Research Center
          </h1>
          <p className="text-muted-foreground mt-1">
            Analyze player trends and team matchups
          </p>
        </div>
        
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Advanced Filters
        </Button>
      </div>

      <Tabs defaultValue="player-trends" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="player-trends" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            Player Trends
          </TabsTrigger>
          <TabsTrigger value="team-matchups" className="gap-2">
            <Users className="h-4 w-4" />
            Team Matchups
          </TabsTrigger>
        </TabsList>

        <TabsContent value="player-trends" className="space-y-4 mt-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Team</label>
                  <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                    <SelectTrigger>
                      <SelectValue placeholder="All teams" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Teams</SelectItem>
                      <SelectItem value="buf">Buffalo Bills</SelectItem>
                      <SelectItem value="kc">Kansas City Chiefs</SelectItem>
                      <SelectItem value="mia">Miami Dolphins</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Market</label>
                  <Select value={selectedMarket} onValueChange={setSelectedMarket}>
                    <SelectTrigger>
                      <SelectValue placeholder="All markets" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Markets</SelectItem>
                      <SelectItem value="pass_yds">Passing Yards</SelectItem>
                      <SelectItem value="pass_tds">Passing TDs</SelectItem>
                      <SelectItem value="rec_yds">Receiving Yards</SelectItem>
                      <SelectItem value="rush_yds">Rushing Yards</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Lookback</label>
                  <Select value={lookback} onValueChange={setLookback}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">Last 5 games</SelectItem>
                      <SelectItem value="10">Last 10 games</SelectItem>
                      <SelectItem value="season">Season</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button className="w-full gap-2">
                    <Search className="h-4 w-4" />
                    Apply Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Player Trends Results */}
          <div className="grid gap-4">
            {mockPlayerTrends.map((trend) => (
              <Card key={trend.id} className="hover:bg-card-hover transition-colors cursor-pointer">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                    {/* Player Info */}
                    <div>
                      <h3 className="font-semibold">{trend.player}</h3>
                      <p className="text-sm text-muted-foreground">{trend.team}</p>
                      <p className="text-sm text-accent">{trend.market}</p>
                    </div>

                    {/* Sparkline */}
                    <div className="md:col-span-2">
                      <p className="text-xs text-muted-foreground mb-2">Last {lookback} games</p>
                      <Sparkline data={trend.trend} />
                    </div>

                    {/* Stats */}
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-muted-foreground">Average vs Line</p>
                        <p className="font-semibold">
                          {trend.average} vs {trend.typicalLine}
                          <span className={`ml-2 text-xs ${
                            trend.average > trend.typicalLine ? 'text-success' : 'text-destructive'
                          }`}>
                            ({trend.average > trend.typicalLine ? '+' : ''}{(trend.average - trend.typicalLine).toFixed(1)})
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Percentile */}
                    <div className="flex items-center justify-between">
                      <Badge 
                        variant={trend.percentile >= 70 ? "default" : trend.percentile >= 50 ? "secondary" : "outline"}
                        className="w-fit"
                      >
                        {trend.percentile}th %ile
                      </Badge>
                      <Button size="sm" variant="outline" className="gap-1">
                        <BarChart3 className="h-3 w-3" />
                        Analyze
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="team-matchups" className="mt-6">
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Team Matchups</h3>
              <p className="text-muted-foreground">
                Compare team performance and identify favorable matchups
              </p>
              <Button className="mt-4">Coming Soon</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}