import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Target, 
  TrendingUp, 
  Shield, 
  MessageSquare,
  Bookmark,
  Plus,
  BarChart3
} from "lucide-react";

interface PropStep {
  id: string;
  label: string;
  completed: boolean;
}

interface GameOption {
  id: string;
  matchup: string;
  time: string;
}

interface PlayerOption {
  id: string;
  name: string;
  team: string;
  position: string;
}

interface MarketOption {
  id: string;
  label: string;
  line: number;
  overPrice: number;
  underPrice: number;
}

export default function PropBuilder() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedGame, setSelectedGame] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [selectedMarket, setSelectedMarket] = useState("");

  const steps: PropStep[] = [
    { id: "game", label: "Select Game", completed: false },
    { id: "player", label: "Choose Player", completed: false },
    { id: "market", label: "Pick Market", completed: false },
    { id: "analysis", label: "Review Analysis", completed: false },
  ];

  const mockGames: GameOption[] = [
    { id: "1", matchup: "Bills @ Chiefs", time: "8:20 PM EST" },
    { id: "2", matchup: "Cowboys @ Eagles", time: "4:25 PM EST" },
    { id: "3", matchup: "49ers @ Rams", time: "1:00 PM EST" },
  ];

  const mockPlayers: PlayerOption[] = [
    { id: "1", name: "Josh Allen", team: "BUF", position: "QB" },
    { id: "2", name: "Patrick Mahomes", team: "KC", position: "QB" },
    { id: "3", name: "Travis Kelce", team: "KC", position: "TE" },
    { id: "4", name: "Stefon Diggs", team: "BUF", position: "WR" },
  ];

  const mockMarkets: MarketOption[] = [
    { id: "1", label: "Passing Yards", line: 259.5, overPrice: -115, underPrice: -105 },
    { id: "2", label: "Passing TDs", line: 1.5, overPrice: -140, underPrice: +120 },
    { id: "3", label: "Rushing Yards", line: 34.5, overPrice: -110, underPrice: -110 },
  ];

  const mockAnalysis = {
    lastNAverage: 267.3,
    opponentRank: 18,
    pace: "High (67.2 plays/game)",
    projection: 272.1,
    confidence: 78
  };

  const renderGameSelection = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-accent" />
          Select Game
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockGames.map((game) => (
          <div 
            key={game.id}
            onClick={() => setSelectedGame(game.id)}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedGame === game.id 
                ? "border-accent bg-accent/5" 
                : "border-border hover:border-accent/50"
            }`}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{game.matchup}</h3>
              <span className="text-sm text-muted-foreground">{game.time}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  const renderPlayerSelection = () => (
    <Card>
      <CardHeader>
        <CardTitle>Choose Player</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockPlayers.map((player) => (
          <div 
            key={player.id}
            onClick={() => setSelectedPlayer(player.id)}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedPlayer === player.id 
                ? "border-accent bg-accent/5" 
                : "border-border hover:border-accent/50"
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{player.name}</h3>
                <p className="text-sm text-muted-foreground">{player.team} • {player.position}</p>
              </div>
              <Badge variant="outline">{player.position}</Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  const renderMarketSelection = () => (
    <Card>
      <CardHeader>
        <CardTitle>Pick Market & Line</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockMarkets.map((market) => (
          <div 
            key={market.id}
            onClick={() => setSelectedMarket(market.id)}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedMarket === market.id 
                ? "border-accent bg-accent/5" 
                : "border-border hover:border-accent/50"
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{market.label}</h3>
                <p className="text-sm text-muted-foreground">Line: {market.line}</p>
              </div>
              <div className="text-right">
                <div className="text-sm">
                  <span className="text-success">O {market.overPrice}</span>
                  <span className="mx-2">•</span>
                  <span className="text-destructive">U {market.underPrice}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  const renderAnalysis = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Context Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-accent" />
            Context Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Last 10 Average</p>
              <p className="text-2xl font-bold">{mockAnalysis.lastNAverage}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Opponent Rank</p>
              <p className="text-2xl font-bold">#{mockAnalysis.opponentRank}</p>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <p className="text-sm text-muted-foreground">Game Pace</p>
            <p className="font-semibold">{mockAnalysis.pace}</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">FYNETIC Projection</p>
            <p className="text-2xl font-bold text-accent">{mockAnalysis.projection}</p>
          </div>
        </CardContent>
      </Card>

      {/* FYNETIC Rationale */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-accent" />
            FYNETIC Rationale
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg bg-muted/50">
            <p className="text-sm leading-relaxed">
              Josh Allen has averaged <strong>267.3 passing yards</strong> over his last 10 games, 
              significantly above the suggested line of <strong>259.5</strong>. The Chiefs rank 
              <strong>18th in pass defense</strong>, allowing 248.2 yards per game. With projected 
              high pace (67.2 plays) and favorable weather conditions, Allen is positioned well 
              to exceed this line.
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Confidence Level</span>
              <Badge variant="default" className="gap-1">
                <Shield className="h-3 w-3" />
                {mockAnalysis.confidence}%
              </Badge>
            </div>
            <Progress value={mockAnalysis.confidence} className="h-2" />
          </div>

          <div className="flex gap-2 pt-4">
            <Button className="flex-1 gap-2">
              <Bookmark className="h-4 w-4" />
              Save Prop
            </Button>
            <Button variant="outline" className="flex-1 gap-2">
              <Plus className="h-4 w-4" />
              Add to Slip
            </Button>
          </div>
          
          <Button variant="outline" className="w-full gap-2">
            <MessageSquare className="h-4 w-4" />
            Discuss in Chat
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0: return renderGameSelection();
      case 1: return renderPlayerSelection();
      case 2: return renderMarketSelection();
      case 3: return renderAnalysis();
      default: return renderGameSelection();
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return selectedGame !== "";
      case 1: return selectedPlayer !== "";
      case 2: return selectedMarket !== "";
      default: return false;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Target className="h-8 w-8 text-accent" />
            Prop Builder
          </h1>
          <p className="text-muted-foreground mt-1">
            Build data-driven betting propositions with AI insights
          </p>
        </div>
      </div>

      {/* Progress Steps */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index <= currentStep 
                      ? "bg-accent text-accent-foreground" 
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {index + 1}
                </div>
                <span className={`ml-2 text-sm ${
                  index <= currentStep ? "text-foreground" : "text-muted-foreground"
                }`}>
                  {step.label}
                </span>
                {index < steps.length - 1 && (
                  <div className="w-12 h-px bg-border mx-4" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Step Content */}
      {renderCurrentStep()}

      {/* Navigation */}
      {currentStep < 3 && (
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            disabled={currentStep === 0}
            onClick={() => setCurrentStep(currentStep - 1)}
          >
            Previous
          </Button>
          <Button 
            disabled={!canProceed()}
            onClick={() => setCurrentStep(currentStep + 1)}
          >
            {currentStep === 2 ? "Analyze Prop" : "Next"}
          </Button>
        </div>
      )}
    </div>
  );
}