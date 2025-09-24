import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { TrendlineChart, BarChart, DonutChart } from "@/components/ChartPlaceholders";
import { StatusBadge, LeagueBadge, ConfidenceBadge } from "@/components/Badges";
import { 
  TrendingUp, 
  Plus,
  DollarSign,
  Target,
  BarChart3,
  Trophy,
  Clock,
  Filter,
  Search,
  Calendar,
  Eye,
  EyeOff,
  FileText,
  Settings
} from "lucide-react";

interface BetCard {
  id: string;
  title: string;
  player: string;
  market: string;
  line: string;
  stake: number;
  odds: number;
  book: string;
  league: 'NFL' | 'NBA' | 'MLB';
  status: 'won' | 'lost' | 'pending' | 'push';
  result?: string;
  payout?: number;
  date: string;
  confidence?: number;
  sparkline: number[];
}

export default function BetTracker() {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [showEmpty, setShowEmpty] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState("30D");
  const [selectedLeague, setSelectedLeague] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Mock KPI Data
  const kpiData = {
    roi: 12.4,
    hitRate: 58,
    openSlips: 2,
    totalBets: 34,
    totalWagered: 850,
    totalWon: 955.40,
    netProfit: 105.40,
    bestWin: 87.50,
    avgOdds: -118,
    winStreak: 3
  };

  // Mock Bet Data
  const demoBets: BetCard[] = [
    {
      id: "1",
      title: "Josh Allen Over 1.5 Pass TDs",
      player: "Josh Allen",
      market: "Passing TDs",
      line: "Over 1.5",
      stake: 25,
      odds: -115,
      book: "DraftKings",
      league: "NFL",
      status: "won",
      result: "3 TDs",
      payout: 46.74,
      date: "2 days ago",
      confidence: 72,
      sparkline: [1, 3, 2, 1, 2, 3, 1, 2, 2, 3]
    },
    {
      id: "2", 
      title: "Tyreek Hill Over 89.5 Receiving Yards",
      player: "Tyreek Hill",
      market: "Receiving Yards",
      line: "Over 89.5",
      stake: 30,
      odds: -110,
      book: "FanDuel",
      league: "NFL", 
      status: "lost",
      result: "73 yards",
      date: "3 days ago",
      confidence: 68,
      sparkline: [112, 67, 143, 45, 89, 134, 76, 98, 102, 87]
    },
    {
      id: "3",
      title: "Patrick Mahomes Over 2.5 Pass TDs",
      player: "Patrick Mahomes", 
      market: "Passing TDs",
      line: "Over 2.5", 
      stake: 20,
      odds: 140,
      book: "BetMGM",
      league: "NFL",
      status: "pending",
      date: "Tonight 8:20 PM",
      confidence: 65,
      sparkline: [2, 3, 1, 2, 3, 2, 1, 2, 3, 2]
    },
    {
      id: "4",
      title: "CMC Over 89.5 Rushing Yards",
      player: "Christian McCaffrey",
      market: "Rushing Yards", 
      line: "Over 89.5",
      stake: 35,
      odds: -105,
      book: "Caesars",
      league: "NFL",
      status: "won", 
      result: "127 yards",
      payout: 68.33,
      date: "1 week ago",
      confidence: 75,
      sparkline: [89, 134, 76, 98, 127, 87, 112, 143, 95, 108]
    },
    {
      id: "5",
      title: "Steph Curry Over 4.5 Threes",
      player: "Stephen Curry",
      market: "3-Point FGM",
      line: "Over 4.5", 
      stake: 40,
      odds: 115,
      book: "DraftKings",
      league: "NBA",
      status: "push",
      result: "Exactly 4",
      date: "5 days ago",
      sparkline: [6, 3, 7, 2, 4, 8, 1, 5, 4, 6]
    },
    {
      id: "6",
      title: "Jayson Tatum Over 27.5 Points", 
      player: "Jayson Tatum",
      market: "Points",
      line: "Over 27.5",
      stake: 50,
      odds: -120,
      book: "FanDuel", 
      league: "NBA",
      status: "won",
      result: "34 points",
      payout: 91.67,
      date: "1 week ago",
      confidence: 70,
      sparkline: [28, 22, 34, 31, 19, 29, 33, 24, 27, 30]
    }
  ];

  const formatOdds = (odds: number) => odds > 0 ? `+${odds}` : odds.toString();

  const calculatePotentialPayout = (stake: number, odds: number) => {
    if (odds > 0) {
      return stake + (stake * odds / 100);
    } else {
      return stake + (stake / Math.abs(odds) * 100);
    }
  };

  const filteredBets = demoBets.filter(bet => {
    if (selectedLeague !== "all" && bet.league !== selectedLeague) return false;
    if (selectedStatus !== "all" && bet.status !== selectedStatus) return false;
    return true;
  });

  const BetDetailSheet = ({ bet }: { bet: BetCard }) => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="text-accent hover:text-accent-hover">
          View Details
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] bg-card border-accent/30">
        <SheetHeader>
          <SheetTitle className="font-heading text-foreground">{bet.title}</SheetTitle>
        </SheetHeader>
        <div className="space-y-6 mt-6">
          {/* Bet Info */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Market</span>
              <span className="font-semibold">{bet.market} {bet.line}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Stake</span>
              <span className="font-semibold">${bet.stake}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Odds</span>
              <span className="font-semibold">{formatOdds(bet.odds)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Book</span>
              <span className="font-semibold">{bet.book}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Status</span>
              <StatusBadge status={bet.status} />
            </div>
          </div>

          {bet.result && (
            <div className="p-4 rounded-xl bg-gradient-surface border border-accent/20">
              <h3 className="font-heading font-semibold text-sm mb-2">Result</h3>
              <p className="text-accent font-medium">{bet.result}</p>
              {bet.payout && (
                <p className={`text-sm mt-1 ${bet.status === 'won' ? 'text-success' : 'text-destructive'}`}>
                  {bet.status === 'won' ? `Won: +$${bet.payout}` : `Lost: -$${bet.stake}`}
                </p>
              )}
            </div>
          )}

          {/* FYNETIC Analysis */}
          <div className="space-y-3">
            <h3 className="font-heading font-semibold text-foreground">What FYNETIC Saw</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-accent rounded-full mt-2" />
                <p className="text-sm text-muted-foreground">
                  Player averaging above line in recent games
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-accent rounded-full mt-2" />
                <p className="text-sm text-muted-foreground">
                  Favorable matchup conditions identified
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-accent rounded-full mt-2" />
                <p className="text-sm text-muted-foreground">
                  Weather and game script aligned with projection
                </p>
              </div>
            </div>
          </div>

          {/* Performance Chart */}
          <div className="space-y-2">
            <h3 className="font-heading font-semibold text-sm text-foreground">Recent Performance</h3>
            <div className="p-3 rounded-lg bg-muted/30">
              <TrendlineChart data={bet.sparkline} />
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <Button disabled className="w-full" variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Export PDF (Demo)
            </Button>
            {bet.status === "pending" && (
              <Button disabled className="w-full">
                <Settings className="h-4 w-4 mr-2" />
                Settle Bet (Demo)
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  const AddBetModal = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-accent text-accent-foreground hover:bg-accent-hover rounded-xl shadow-lg hover:shadow-accent/25">
          <Plus className="h-4 w-4" />
          Add Demo Bet
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card border-accent/30 max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading text-foreground">Add New Bet</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="player" className="text-sm font-heading font-medium">Player</Label>
            <Input id="player" placeholder="e.g. Josh Allen" className="bg-background border-accent/30" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="market" className="text-sm font-heading font-medium">Market</Label>
            <Select>
              <SelectTrigger className="bg-background border-accent/30">
                <SelectValue placeholder="Select market" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="passing-yards">Passing Yards</SelectItem>
                <SelectItem value="passing-tds">Passing TDs</SelectItem>
                <SelectItem value="rushing-yards">Rushing Yards</SelectItem>
                <SelectItem value="receiving-yards">Receiving Yards</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="line" className="text-sm font-heading font-medium">Line</Label>
              <Input id="line" placeholder="259.5" className="bg-background border-accent/30" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stake" className="text-sm font-heading font-medium">Stake</Label>
              <Input id="stake" placeholder="25" className="bg-background border-accent/30" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="odds" className="text-sm font-heading font-medium">Odds</Label>
              <Input id="odds" placeholder="-115" className="bg-background border-accent/30" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="book" className="text-sm font-heading font-medium">Sportsbook</Label>
              <Select>
                <SelectTrigger className="bg-background border-accent/30">
                  <SelectValue placeholder="Book" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draftkings">DraftKings</SelectItem>
                  <SelectItem value="fanduel">FanDuel</SelectItem>
                  <SelectItem value="betmgm">BetMGM</SelectItem>
                  <SelectItem value="caesars">Caesars</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2 pt-4">
            <Button disabled className="flex-1">
              Add Bet (Demo)
            </Button>
            <Button variant="outline" className="flex-1">Cancel</Button>
          </div>
          <p className="text-xs text-warning text-center">
            🚀 Demo preview - Full bet tracking available in full version
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );

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
                <p className="text-2xl font-heading font-bold text-success">+{kpiData.roi}%</p>
              </div>
              <div className="text-6xl opacity-20 text-accent/30">📊</div>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-secondary/10 pointer-events-none" />
        </CardContent>
      </Card>

      {/* Portfolio Header */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center bg-gradient-card border-accent/30 rounded-2xl shadow-lg">
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <TrendingUp className="h-4 w-4 text-success" />
              <p className="text-sm font-body text-muted-foreground">ROI</p>
            </div>
            <p className="text-2xl font-heading font-bold text-success">+{kpiData.roi}%</p>
          </div>
        </Card>
        <Card className="p-4 text-center bg-gradient-card border-accent/30 rounded-2xl shadow-lg">
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Target className="h-4 w-4 text-accent" />
              <p className="text-sm font-body text-muted-foreground">Hit Rate</p>
            </div>
            <p className="text-2xl font-heading font-bold text-accent">{kpiData.hitRate}%</p>
          </div>
        </Card>
        <Card className="p-4 text-center bg-gradient-card border-accent/30 rounded-2xl shadow-lg">
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Clock className="h-4 w-4 text-warning" />
              <p className="text-sm font-body text-muted-foreground">Open Slips</p>
            </div>
            <p className="text-2xl font-heading font-bold text-warning">{kpiData.openSlips}</p>
          </div>
        </Card>
        <Card className="p-4 text-center bg-gradient-card border-accent/30 rounded-2xl shadow-lg">
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <BarChart3 className="h-4 w-4 text-secondary" />
              <p className="text-sm font-body text-muted-foreground">Total Bets</p>
            </div>
            <p className="text-2xl font-heading font-bold text-secondary">{kpiData.totalBets}</p>
          </div>
        </Card>
      </div>

      {/* Date Range Selector */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 rounded-xl bg-muted p-1 border border-accent/30">
            {["7D", "30D", "YTD"].map((range) => (
              <Button
                key={range}
                variant={selectedDateRange === range ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedDateRange(range)}
                className={`h-8 px-4 text-xs font-heading font-medium ${
                  selectedDateRange === range ? "bg-accent text-accent-foreground" : ""
                }`}
              >
                {range}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowEmpty(!showEmpty)}
            className="gap-2 border-accent/30 hover:bg-accent/10"
          >
            {showEmpty ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            {showEmpty ? "Show Bets" : "View Empty State"}
          </Button>
        </div>
        <AddBetModal />
      </div>

      {/* Mini Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-card border-accent/30 rounded-2xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-sm font-heading font-semibold text-foreground tracking-tight">
              ROI Trend (30D)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TrendlineChart data={[8, 12, 10, 15, 18, 14, 12.4]} />
          </CardContent>
        </Card>
        <Card className="bg-gradient-card border-accent/30 rounded-2xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-sm font-heading font-semibold text-foreground tracking-tight">
              Weekly W/L
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart />
          </CardContent>
        </Card>
        <Card className="bg-gradient-card border-accent/30 rounded-2xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-sm font-heading font-semibold text-foreground tracking-tight">
              Market Mix
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DonutChart />
          </CardContent>
        </Card>
      </div>

      {showEmpty ? (
        /* Empty State */
        <Card className="bg-gradient-surface border-accent/20 rounded-2xl shadow-xl">
          <CardContent className="p-12 text-center space-y-6">
            <div className="space-y-4">
              <div className="p-4 rounded-full bg-accent/20 w-20 h-20 mx-auto flex items-center justify-center">
                <Trophy className="h-10 w-10 text-accent" />
              </div>
              <div>
                <h3 className="text-2xl font-heading font-bold mb-2 text-foreground">Start Your Journey</h3>
                <p className="text-muted-foreground text-lg max-w-md mx-auto font-body">
                  Track your bets here and watch your analytics grow. Add your first slip from the Prop Builder or manually enter your positions.
                </p>
              </div>
            </div>
            <div className="flex gap-4 justify-center">
              <AddBetModal />
              <Button variant="outline" className="border-accent/30 hover:bg-accent/10">
                <Target className="h-4 w-4 mr-2" />
                Build a Prop
              </Button>
            </div>
            <Badge variant="secondary" className="text-sm py-2 px-4">
              🚀 Demo mode - Your real bets will appear here
            </Badge>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Filters Bar */}
          <Card className="bg-gradient-card border-accent/30 rounded-2xl shadow-lg">
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-accent" />
                  <span className="text-sm font-heading font-medium text-foreground">Filters:</span>
                </div>
                <Select value={selectedLeague} onValueChange={setSelectedLeague}>
                  <SelectTrigger className="w-[120px] bg-background border-accent/30">
                    <SelectValue placeholder="League" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Leagues</SelectItem>
                    <SelectItem value="NFL">NFL</SelectItem>
                    <SelectItem value="NBA">NBA</SelectItem>
                    <SelectItem value="MLB">MLB</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[120px] bg-background border-accent/30">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="won">Won</SelectItem>
                    <SelectItem value="lost">Lost</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="push">Push</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex-1 max-w-xs">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search bets..." 
                      className="pl-10 bg-background border-accent/30"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bet Cards Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-heading font-semibold text-foreground tracking-tight">
                Your Bets ({filteredBets.length})
              </h2>
            </div>
            
            <div className="space-y-4">
              {filteredBets.map((bet) => (
                <Card key={bet.id} className="hover:bg-card-hover transition-all duration-200 hover:shadow-xl hover:shadow-accent/10 hover:border-accent/30 bg-gradient-card border-accent/20 rounded-2xl">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                      {/* Bet Info */}
                      <div className="lg:col-span-4 space-y-2">
                        <div className="flex items-center gap-2">
                          <LeagueBadge league={bet.league} />
                          <StatusBadge status={bet.status} />
                        </div>
                        <h3 className="font-heading font-bold text-lg text-foreground">{bet.title}</h3>
                        <p className="text-sm text-muted-foreground font-body">{bet.book} • {bet.date}</p>
                      </div>

                      {/* Performance */}
                      <div className="lg:col-span-3">
                        <p className="text-xs text-muted-foreground mb-2 font-body">Recent performance</p>
                        <div className="h-12">
                          <TrendlineChart data={bet.sparkline.slice(-7)} className="h-12" />
                        </div>
                      </div>

                      {/* Stakes & Odds */}
                      <div className="lg:col-span-2 space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Stake:</span>
                          <span className="font-semibold font-body">${bet.stake}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Odds:</span>
                          <span className="font-semibold font-body">{formatOdds(bet.odds)}</span>
                        </div>
                        {bet.confidence && (
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">AI:</span>
                            <ConfidenceBadge confidence={bet.confidence} className="text-xs" />
                          </div>
                        )}
                      </div>

                      {/* Result & Actions */}
                      <div className="lg:col-span-3 text-right space-y-2">
                        {bet.result && (
                          <p className="text-sm text-muted-foreground font-body">
                            Result: <span className="text-foreground font-medium">{bet.result}</span>
                          </p>
                        )}
                        {bet.payout && (
                          <p className={`font-bold ${
                            bet.status === "won" ? "text-success" : "text-destructive"
                          }`}>
                            {bet.status === "won" ? `+$${bet.payout}` : `-$${bet.stake}`}
                          </p>
                        )}
                        {bet.status === "pending" && (
                          <p className="text-sm text-muted-foreground font-body">
                            To win: ${calculatePotentialPayout(bet.stake, bet.odds).toFixed(2)}
                          </p>
                        )}
                        <BetDetailSheet bet={bet} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}