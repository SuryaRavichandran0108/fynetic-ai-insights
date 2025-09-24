import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Plus,
  DollarSign,
  Target,
  BarChart3,
  Trophy,
  Clock,
  CheckCircle,
  XCircle,
  Minus
} from "lucide-react";

interface Bet {
  id: string;
  player: string;
  market: string;
  line: string;
  stake: number;
  odds: number;
  book: string;
  status: "scheduled" | "live" | "won" | "lost" | "push";
  result?: string;
  payout?: number;
  gameTime: string;
}

export default function BetTracker() {
  const [selectedTab, setSelectedTab] = useState("overview");

  const mockBets: Bet[] = [
    {
      id: "1",
      player: "Josh Allen",
      market: "Passing Yards Over",
      line: "259.5",
      stake: 25,
      odds: -115,
      book: "DraftKings",
      status: "won",
      result: "287 yards",
      payout: 46.74,
      gameTime: "2 days ago"
    },
    {
      id: "2", 
      player: "Travis Kelce",
      market: "Receiving Yards Over",
      line: "67.5",
      stake: 50,
      odds: -110,
      book: "FanDuel",
      status: "lost",
      result: "52 yards",
      gameTime: "2 days ago"
    },
    {
      id: "3",
      player: "Patrick Mahomes",
      market: "Passing TDs Over",
      line: "1.5",
      stake: 30,
      odds: -140,
      book: "BetMGM",
      status: "scheduled",
      gameTime: "Tonight 8:20 PM"
    }
  ];

  const mockStats = {
    totalBets: 12,
    wonBets: 7,
    lostBets: 4,
    pushBets: 1,
    totalWagered: 420,
    totalWon: 487.32,
    roi: 16.0,
    hitRate: 58.3,
    avgOdds: -118,
    bestWin: 84.50
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "won": return <CheckCircle className="h-4 w-4 text-success" />;
      case "lost": return <XCircle className="h-4 w-4 text-destructive" />;
      case "push": return <Minus className="h-4 w-4 text-warning" />;
      case "live": return <Clock className="h-4 w-4 text-accent animate-pulse" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "won": return "bg-success/10 text-success border-success/20";
      case "lost": return "bg-destructive/10 text-destructive border-destructive/20";
      case "push": return "bg-warning/10 text-warning border-warning/20";
      case "live": return "bg-accent/10 text-accent border-accent/20";
      default: return "bg-muted/50 text-muted-foreground border-muted/20";
    }
  };

  const formatOdds = (odds: number) => {
    return odds > 0 ? `+${odds}` : odds.toString();
  };

  const calculatePotentialPayout = (stake: number, odds: number) => {
    if (odds > 0) {
      return stake + (stake * odds / 100);
    } else {
      return stake + (stake / Math.abs(odds) * 100);
    }
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
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
                Bet Tracker
              </h1>
              <p className="text-foreground/90 text-lg max-w-2xl font-body">
                Track your betting performance, analyze your results, and stay on top of your wagering with detailed insights and ROI tracking.
              </p>
            </div>
            <div className="hidden md:flex items-center gap-6 relative z-10">
              <div className="text-right">
                <p className="text-sm text-foreground/70 font-body">Demo ROI</p>
                <p className="text-2xl font-heading font-bold text-success">+{mockStats.roi}%</p>
              </div>
              <div className="text-6xl opacity-20 text-accent/30">📊</div>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-secondary/10 pointer-events-none" />
        </CardContent>
      </Card>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="bets" className="gap-2">
            <Target className="h-4 w-4" />
            My Bets
          </TabsTrigger>
          <TabsTrigger value="analytics" className="gap-2">
            <Trophy className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4 text-center">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Total Bets</p>
                <p className="text-2xl font-bold">{mockStats.totalBets}</p>
              </div>
            </Card>
            <Card className="p-4 text-center">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Hit Rate</p>
                <p className="text-2xl font-bold text-accent">{mockStats.hitRate}%</p>
              </div>
            </Card>
            <Card className="p-4 text-center">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Total Wagered</p>
                <p className="text-2xl font-bold">${mockStats.totalWagered}</p>
              </div>
            </Card>
            <Card className="p-4 text-center">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">ROI</p>
                <p className="text-2xl font-bold text-success">+{mockStats.roi}%</p>
              </div>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-accent" />
                Recent Bets
              </CardTitle>
              <Button variant="outline" size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Add New Bet
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockBets.slice(0, 3).map((bet) => (
                <div key={bet.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    {getStatusIcon(bet.status)}
                    <div>
                      <p className="font-semibold">{bet.player} • {bet.market}</p>
                      <p className="text-sm text-muted-foreground">{bet.line} • ${bet.stake} @ {formatOdds(bet.odds)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className={getStatusColor(bet.status)}>
                      {bet.status.charAt(0).toUpperCase() + bet.status.slice(1)}
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-1">{bet.gameTime}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bets" className="space-y-6 mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">All Bets</h2>
            <Button className="gap-2 bg-gradient-accent hover:bg-accent-hover">
              <Plus className="h-4 w-4" />
              Add New Bet
            </Button>
          </div>

          <div className="space-y-4">
            {mockBets.map((bet) => (
              <Card key={bet.id} className="hover:bg-card-hover transition-colors">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(bet.status)}
                        <div>
                          <p className="font-bold">{bet.player}</p>
                          <p className="text-sm text-muted-foreground">{bet.market} {bet.line}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Stake</p>
                      <p className="font-semibold">${bet.stake}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Odds</p>
                      <p className="font-semibold">{formatOdds(bet.odds)}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Book</p>
                      <p className="font-semibold">{bet.book}</p>
                    </div>
                    
                    <div className="text-right">
                      <Badge variant="outline" className={getStatusColor(bet.status)}>
                        {bet.status.charAt(0).toUpperCase() + bet.status.slice(1)}
                      </Badge>
                      {bet.payout && (
                        <p className={`text-sm mt-1 font-medium ${
                          bet.status === "won" ? "text-success" : "text-destructive"
                        }`}>
                          {bet.status === "won" ? `+$${bet.payout}` : `-$${bet.stake}`}
                        </p>
                      )}
                      {bet.status === "scheduled" && (
                        <p className="text-sm mt-1 text-muted-foreground">
                          To win: ${calculatePotentialPayout(bet.stake, bet.odds).toFixed(2)}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-accent" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Win Rate</span>
                    <span className="font-semibold">{mockStats.hitRate}%</span>
                  </div>
                  <Progress value={mockStats.hitRate} className="h-2" />
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 rounded-lg bg-success/10">
                    <p className="text-2xl font-bold text-success">{mockStats.wonBets}</p>
                    <p className="text-xs text-success">Won</p>
                  </div>
                  <div className="p-3 rounded-lg bg-destructive/10">
                    <p className="text-2xl font-bold text-destructive">{mockStats.lostBets}</p>
                    <p className="text-xs text-destructive">Lost</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-accent" />
                  Financial Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Wagered</span>
                    <span className="font-semibold">${mockStats.totalWagered}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Won</span>
                    <span className="font-semibold text-success">${mockStats.totalWon}</span>
                  </div>
                  <div className="flex justify-between border-t pt-3">
                    <span className="font-medium">Net Profit</span>
                    <span className="font-bold text-success">+${(mockStats.totalWon - mockStats.totalWagered).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">ROI</span>
                    <span className="font-bold text-success">+{mockStats.roi}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Analytics Placeholder */}
          <Card className="bg-gradient-surface border-accent/20">
            <CardContent className="p-8 text-center space-y-4">
              <div className="p-4 rounded-full bg-gradient-accent w-16 h-16 mx-auto flex items-center justify-center">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Advanced Analytics</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Detailed market analysis, prop type performance, and predictive insights coming soon.
                </p>
              </div>
              <Badge variant="secondary" className="text-sm py-2 px-4">
                🚀 Enhanced features in development
              </Badge>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}