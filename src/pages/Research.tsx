import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  BarChart3,
  Target,
  Star
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
    <div className="container mx-auto p-6 space-y-8 animate-fade-in">
      {/* Hero Header */}
      <Card className="bg-gradient-primary border-0 text-foreground shadow-2xl rounded-2xl overflow-hidden">
        <CardContent className="p-8 relative">
          <div className="flex items-center justify-between relative z-10">
            <div className="space-y-4">
              <h1 className="text-3xl font-heading font-bold flex items-center gap-3 text-foreground tracking-tight">
                <div className="p-3 rounded-2xl bg-accent/20 backdrop-blur-sm shadow-lg">
                  <Search className="h-6 w-6 text-accent" />
                </div>
                Explore Players & Teams
              </h1>
              <p className="text-foreground/90 text-lg max-w-2xl font-body">
                Discover player trends, analyze performance patterns, and find your next winning edge with data-driven insights.
              </p>
            </div>
            <div className="hidden md:block text-6xl opacity-20 text-accent/30">
              📊
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-secondary/10 pointer-events-none" />
        </CardContent>
      </Card>

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

        <TabsContent value="player-trends" className="space-y-6 mt-6">
          {/* Filter Panel */}
          <Card className="border-accent/30 bg-gradient-card rounded-2xl shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg font-heading font-semibold flex items-center gap-2 text-foreground tracking-tight">
                <Filter className="h-5 w-5 text-accent" />
                Filter & Search
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-heading font-medium text-foreground">Team</label>
                  <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                    <SelectTrigger className="bg-background border-accent/30 hover:border-accent/50 transition-colors rounded-xl">
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

                <div className="space-y-2">
                  <label className="text-sm font-heading font-medium text-foreground">Market</label>
                  <Select value={selectedMarket} onValueChange={setSelectedMarket}>
                    <SelectTrigger className="bg-background border-accent/30 hover:border-accent/50 transition-colors rounded-xl">
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

                <div className="space-y-2">
                  <label className="text-sm font-heading font-medium text-foreground">Lookback</label>
                  <Select value={lookback} onValueChange={setLookback}>
                    <SelectTrigger className="bg-background border-accent/30 hover:border-accent/50 transition-colors rounded-xl">
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
                  <Button size="lg" className="w-full gap-2 bg-accent text-accent-foreground hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/25 rounded-xl font-heading font-medium transition-all duration-300">
                    <Search className="h-4 w-4" />
                    Apply Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Player Trend Cards */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-heading font-semibold text-foreground tracking-tight">Player Analysis</h2>
                <Badge className="gap-1 bg-accent/20 text-accent border-accent/30 rounded-full">
                  <Star className="h-3 w-3" />
                  {mockPlayerTrends.length} Top Performers
                </Badge>
              </div>
            
            <div className="grid gap-4">
              {mockPlayerTrends.map((trend) => (
                <Card key={trend.id} className="hover:bg-card-hover transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:shadow-accent/10 hover:border-accent/30 group cursor-pointer bg-gradient-card rounded-2xl border border-border">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                      {/* Player Info */}
                      <div className="lg:col-span-3 flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={`/api/placeholder/48/48`} alt={trend.player} />
                          <AvatarFallback className="bg-gradient-accent text-white font-semibold">
                            {trend.player.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-heading font-bold text-lg text-foreground">{trend.player}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs border-accent/30 text-accent">{trend.team}</Badge>
                            <span className="text-sm text-accent font-medium font-body">{trend.market}</span>
                          </div>
                        </div>
                      </div>

                      {/* Performance Trend */}
                      <div className="lg:col-span-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground">Last {lookback} games trend</p>
                          <Badge 
                            variant={trend.average > trend.typicalLine ? "default" : "secondary"} 
                            className="text-xs"
                          >
                            {trend.average > trend.typicalLine ? "Above Line" : "Below Line"}
                          </Badge>
                        </div>
                        <Sparkline data={trend.trend} className="bg-muted rounded-md p-2" />
                      </div>

                      {/* Key Stats */}
                      <div className="lg:col-span-3 space-y-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Average vs Typical Line</p>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold">{trend.average}</span>
                            <span className="text-muted-foreground">vs</span>
                            <span className="text-lg font-semibold">{trend.typicalLine}</span>
                          </div>
                          <p className={`text-sm font-medium ${
                            trend.average > trend.typicalLine ? 'text-success' : 'text-warning'
                          }`}>
                            {trend.average > trend.typicalLine ? '+' : ''}{(trend.average - trend.typicalLine).toFixed(1)} difference
                          </p>
                        </div>
                      </div>

                      {/* Action & Confidence */}
                      <div className="lg:col-span-2 flex flex-col items-end gap-3">
                        <Badge 
                          variant={trend.percentile >= 70 ? "default" : trend.percentile >= 50 ? "secondary" : "outline"}
                          className="gap-1 text-sm"
                        >
                          <TrendingUp className="h-3 w-3" />
                          {trend.percentile}th %ile
                        </Badge>
                        <Button size="sm" className="gap-2 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                          <Target className="h-3 w-3" />
                          Analyze
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="team-matchups" className="mt-6">
          <Card className="bg-gradient-surface border-accent/20">
            <CardContent className="p-12 text-center space-y-6">
              <div className="space-y-4">
                <div className="p-4 rounded-full bg-gradient-accent w-20 h-20 mx-auto flex items-center justify-center">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Team Matchup Analysis</h3>
                  <p className="text-muted-foreground text-lg max-w-md mx-auto">
                    Deep dive into team performance metrics, head-to-head records, and identify the most favorable matchups for your props.
                  </p>
                </div>
              </div>
              <Badge variant="secondary" className="text-sm py-2 px-4">
                🚀 Coming Soon - Advanced team analytics
              </Badge>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}