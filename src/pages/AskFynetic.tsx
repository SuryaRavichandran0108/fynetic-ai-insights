import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TrendlineChart } from "@/components/ChartPlaceholders";
import { StatusBadge, LeagueBadge } from "@/components/Badges";
import { 
  MessageSquare, 
  Send, 
  Bookmark,
  Plus,
  TrendingUp,
  Clock,
  Target,
  Brain,
  Info,
  Lightbulb,
  Zap,
  BookOpen,
  ChevronRight
} from "lucide-react";

interface ChatMessage {
  id: string;
  role: "system" | "user" | "assistant";
  content: string;
  timestamp?: Date;
  actions?: Array<{
    label: string;
    action: string;
  }>;
}

export default function AskFynetic() {
  const [isBeginnerMode, setIsBeginnerMode] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedModal, setSelectedModal] = useState<string | null>(null);

  // Mock data
  const demoMessages: ChatMessage[] = [
    {
      id: "1",
      role: "system",
      content: "💡 FYNETIC provides informational insights, not betting advice. All analysis is for educational purposes only."
    },
    {
      id: "2", 
      role: "user",
      content: "What stands out in Bills @ Chiefs tonight?"
    },
    {
      id: "3",
      role: "assistant",
      content: isBeginnerMode 
        ? "I see two interesting patterns for tonight:\n\n🏈 **High-scoring game expected** - Both teams like to throw the ball a lot\n📊 **Josh Allen looks good** - He's been throwing for more yards than usual lately\n\nThe betting line for Allen's passing yards is 259.5. He's averaged 271 yards in his last 5 games. Would you like me to explain what this means?"
        : "Two angles pop for tonight's slate:\n\n• **High tempo, pass-heavy scripts** → QB passing yards in play\n• **Close spread (-2.5)** → WR receptions could hit\n\nContext: Allen averaging **271 yds** L5 vs typical line **259.5**; KC pass D ranks middle tier. Weather stable, dome conditions.",
      actions: [
        { label: "Suggest a prop", action: "suggest-prop" },
        { label: "Open team matchups", action: "team-matchups" },
        { label: "Explain volatility", action: "explain-volatility" }
      ]
    },
    {
      id: "4",
      role: "user", 
      content: "Suggest a safe option"
    },
    {
      id: "5",
      role: "assistant",
      content: isBeginnerMode
        ? "**Josh Allen Over 1.5 Passing Touchdowns** 📈\n\n🎯 **Simple explanation**: Allen needs to throw at least 2 touchdown passes\n📊 **Recent form**: He's done this in 7 of his last 10 games\n🏈 **Why it makes sense**: Chiefs defense allows touchdowns\n\n**Confidence**: 72 out of 100 (pretty good!)"
        : "**Josh Allen Over 1.5 Pass TDs (-115)**\n\n📊 **Context**: L10 games median **2 TDs**; red zone efficiency trending up; weather stable\n🎯 **Edge**: KC allows 1.8 pass TDs/game (18th ranked)\n⚡ **Model confidence**: **72/100** (heuristic)\n\n*Line movement stable across books*",
      actions: [
        { label: "Add to Slip", action: "add-to-slip" },
        { label: "View player trend", action: "player-trend" },
        { label: "Compare alt lines", action: "alt-lines" }
      ]
    }
  ];

  const todaysSlate = [
    { 
      id: "1", 
      matchup: "Bills @ Chiefs", 
      time: "8:20 PM EST", 
      insight: "High total, pass-heavy",
      status: "upcoming" as const
    },
    { 
      id: "2", 
      matchup: "Cowboys @ Eagles", 
      time: "4:25 PM EST", 
      insight: "Defensive battle expected",
      status: "upcoming" as const
    },
    { 
      id: "3", 
      matchup: "49ers @ Rams", 
      time: "Live", 
      insight: "Close game, OT potential",
      status: "live" as const
    }
  ];

  const betSlipPreview = [
    { 
      id: "1", 
      player: "Josh Allen", 
      market: "Passing Yards O259.5", 
      odds: "-115",
      stake: "$25"
    },
    { 
      id: "2", 
      player: "Travis Kelce", 
      market: "Receiving Yards O67.5", 
      odds: "-110",
      stake: "$30"
    }
  ];

  const shortcuts = [
    { label: "Top Overs", icon: TrendingUp, color: "bg-success/10 text-success" },
    { label: "QB Passing", icon: Target, color: "bg-accent/10 text-accent" },
    { label: "Beginner Tips", icon: Lightbulb, color: "bg-warning/10 text-warning" },
    { label: "Live Games", icon: Zap, color: "bg-destructive/10 text-destructive" }
  ];

  const handleSendMessage = () => {
    // Static preview - show tooltip instead
  };

  const Modal = ({ trigger, title, children }: { trigger: React.ReactNode; title: string; children: React.ReactNode }) => (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="bg-card border-accent/30">
        <DialogHeader>
          <DialogTitle className="font-heading text-foreground">{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="container mx-auto p-6 space-y-6 animate-fade-in">
      {/* Hero Header */}
      <Card className="bg-gradient-primary border-0 text-foreground shadow-2xl rounded-2xl overflow-hidden">
        <CardContent className="p-8 relative">
          <div className="flex items-center justify-between relative z-10">
            <div className="space-y-4">
              <h1 className="text-3xl font-heading font-bold flex items-center gap-3 text-foreground tracking-tight">
                <div className="p-3 rounded-2xl bg-accent/20 backdrop-blur-sm shadow-lg">
                  <Brain className="h-6 w-6 text-accent" />
                </div>
                Ask FYNETIC
              </h1>
              <p className="text-foreground/90 text-lg max-w-2xl font-body">
                Your AI-powered sports analytics assistant. Ask questions about players, matchups, and get data-driven insights for smarter decisions.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-foreground/70 font-body">
                  {isBeginnerMode ? "Beginner" : "Advanced"}
                </span>
                <Switch
                  checked={isBeginnerMode}
                  onCheckedChange={setIsBeginnerMode}
                />
              </div>
              <div className="hidden md:block text-6xl opacity-20 text-accent/30">
                🤖
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-secondary/10 pointer-events-none" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Context Dock */}
        <div className="lg:col-span-1 space-y-4">
          {/* Today's Slate */}
          <Card className="bg-gradient-card border-accent/30 rounded-2xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-sm font-heading font-semibold flex items-center gap-2 text-foreground tracking-tight">
                <Clock className="h-4 w-4 text-accent" />
                Today's Slate
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {todaysSlate.map((game) => (
                <div key={game.id} className="p-3 rounded-xl bg-background/50 border border-border/30 space-y-2 hover:bg-background/70 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <p className="font-heading font-semibold text-sm text-foreground">{game.matchup}</p>
                    {game.status === "live" && (
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
                        <span className="text-xs text-destructive font-medium">LIVE</span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{game.time}</p>
                  <p className="text-xs text-accent font-medium">{game.insight}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Bet Slip Preview */}
          <Card className="bg-gradient-card border-accent/30 rounded-2xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-sm font-heading font-semibold flex items-center gap-2 text-foreground tracking-tight">
                <Target className="h-4 w-4 text-accent" />
                Your Bet Slip
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {betSlipPreview.map((bet) => (
                <div key={bet.id} className="p-3 rounded-xl bg-background/50 border border-border/30 space-y-1">
                  <p className="font-heading font-medium text-sm text-foreground">{bet.player}</p>
                  <p className="text-xs text-muted-foreground">{bet.market}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-accent font-medium">{bet.odds}</span>
                    <span className="text-xs font-semibold">{bet.stake}</span>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full gap-1 border-accent/30 hover:bg-accent/10">
                <Plus className="h-3 w-3" />
                Add More
              </Button>
            </CardContent>
          </Card>

          {/* Shortcuts */}
          <Card className="bg-gradient-card border-accent/30 rounded-2xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-sm font-heading font-semibold flex items-center gap-2 text-foreground tracking-tight">
                <Zap className="h-4 w-4 text-accent" />
                Quick Shortcuts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {shortcuts.map((shortcut, index) => {
                const Icon = shortcut.icon;
                return (
                  <Button 
                    key={index}
                    variant="ghost" 
                    size="sm" 
                    className={`w-full justify-start gap-2 ${shortcut.color} hover:bg-opacity-20 rounded-xl`}
                  >
                    <Icon className="h-3 w-3" />
                    {shortcut.label}
                  </Button>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="h-[600px] flex flex-col bg-gradient-card border-accent/30 rounded-2xl shadow-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 font-heading font-semibold text-foreground tracking-tight">
                  <MessageSquare className="h-5 w-5 text-accent" />
                  Chat with FYNETIC
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge className="bg-accent/20 text-accent border-accent/30">AI Assistant</Badge>
                  <Badge variant="outline" className="text-xs border-warning/30 text-warning">
                    Informational Only
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            {/* Messages Area */}
            <CardContent className="flex-1 overflow-y-auto space-y-4 p-6">
              {demoMessages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] space-y-3 ${
                    message.role === "user" 
                      ? "bg-accent/90 text-accent-foreground rounded-2xl rounded-br-md p-4" 
                      : message.role === "system"
                      ? "bg-warning/10 border border-warning/30 text-warning rounded-xl p-3 text-center w-full max-w-none"
                      : "bg-gradient-surface rounded-2xl rounded-bl-md p-4 border border-accent/20"
                  }`}>
                    <div className="space-y-2">
                      {message.role === "assistant" && (
                        <div className="flex items-center gap-2 text-xs text-accent">
                          <Brain className="h-3 w-3" />
                          <span className="font-heading font-medium">FYNETIC AI</span>
                        </div>
                      )}
                      {message.role === "system" && (
                        <div className="flex items-center justify-center gap-2 text-xs">
                          <Info className="h-3 w-3" />
                          <span className="font-heading font-medium">System Notice</span>
                        </div>
                      )}
                      <div className="text-sm leading-relaxed whitespace-pre-line font-body">
                        {message.content}
                      </div>
                    </div>
                    
                    {message.actions && (
                      <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-accent/20">
                        {message.actions.map((action, index) => (
                          <Modal
                            key={index}
                            trigger={
                              <Button size="sm" variant="secondary" className="text-xs rounded-full hover:bg-accent/20">
                                {action.label}
                                <ChevronRight className="h-3 w-3 ml-1" />
                              </Button>
                            }
                            title={action.label}
                          >
                            {action.action === "add-to-slip" ? (
                              <div className="space-y-4">
                                <div className="p-4 rounded-xl bg-accent/10 border border-accent/30">
                                  <h3 className="font-heading font-semibold text-foreground mb-2">Josh Allen Over 1.5 Pass TDs</h3>
                                  <p className="text-sm text-muted-foreground mb-3">Odds: -115 • Stake: $25 • To Win: $21.74</p>
                                  <p className="text-xs text-accent">This will be added to your bet slip for review.</p>
                                </div>
                                <div className="flex gap-2">
                                  <Button disabled className="flex-1">Confirm Add (Demo)</Button>
                                  <Button variant="outline" className="flex-1">Cancel</Button>
                                </div>
                              </div>
                            ) : action.action === "explain-volatility" ? (
                              <div className="space-y-4">
                                <div className="space-y-3">
                                  <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-accent rounded-full mt-2" />
                                    <p className="text-sm text-muted-foreground">
                                      <strong className="text-foreground">Weather Impact:</strong> Indoor game, no wind/precipitation concerns
                                    </p>
                                  </div>
                                  <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-accent rounded-full mt-2" />
                                    <p className="text-sm text-muted-foreground">
                                      <strong className="text-foreground">Game Script:</strong> Close spread suggests balanced offensive approach
                                    </p>
                                  </div>
                                  <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-accent rounded-full mt-2" />
                                    <p className="text-sm text-muted-foreground">
                                      <strong className="text-foreground">Player Health:</strong> No injury concerns reported for key players
                                    </p>
                                  </div>
                                </div>
                                <div className="p-3 rounded-lg bg-muted/30">
                                  <p className="text-xs text-muted-foreground mb-2">10-Game Variance</p>
                                  <TrendlineChart data={[1, 3, 2, 1, 2, 3, 1, 2, 2, 3]} />
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-4">
                                <p className="text-sm text-muted-foreground">
                                  This feature demonstrates how FYNETIC would provide detailed analysis and suggestions. 
                                  In the full version, this would show real-time data and actionable insights.
                                </p>
                                <Button disabled className="w-full">Feature Coming Soon</Button>
                              </div>
                            )}
                          </Modal>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Typing indicator */}
              <div className="flex justify-start">
                <div className="bg-gradient-surface rounded-2xl rounded-bl-md p-4 border border-accent/20">
                  <div className="flex items-center gap-2 text-xs text-accent mb-2">
                    <Brain className="h-3 w-3" />
                    <span className="font-heading font-medium">FYNETIC AI</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-accent rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <span className="ml-2 text-xs text-muted-foreground font-body">Analyzing latest data...</span>
                  </div>
                </div>
              </div>
            </CardContent>

            <Separator />
            
            {/* Input Area */}
            <CardContent className="p-4">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={isBeginnerMode ? "Ask me about any player or game..." : "Ask about players, matchups, trends, or analysis..."}
                  className="flex-1 bg-background border-accent/30 focus:border-accent/50 rounded-xl"
                />
                <Button 
                  onClick={handleSendMessage}
                  size="icon" 
                  className="bg-accent text-accent-foreground hover:bg-accent-hover rounded-xl"
                  disabled
                  title="Static preview - messaging disabled"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center font-body">
                💡 Try: {isBeginnerMode 
                  ? '"Explain Josh Allen passing yards" or "What are the best bets tonight?"'
                  : '"Mahomes variance last 5" or "Show me high-confidence overs"'
                }
              </p>
              <p className="text-xs text-warning mt-1 text-center font-body">
                🚀 Static preview - Full AI chat coming soon
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}