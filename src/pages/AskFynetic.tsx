import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  MessageSquare, 
  Send, 
  Bookmark,
  Plus,
  TrendingUp,
  Clock,
  Target,
  Brain
} from "lucide-react";

interface ChatMessage {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  actions?: Array<{
    label: string;
    action: string;
  }>;
}

export default function AskFynetic() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "assistant",
      content: "👋 FYNETIC here! I see you're looking at today's slate. The Bills @ Chiefs game at 8:20 PM looks particularly interesting with a high total of 47.5 points. Want me to break down Josh Allen's passing props for this matchup?",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      actions: [
        { label: "Analyze Josh Allen", action: "analyze-player" },
        { label: "Show Game Breakdown", action: "game-breakdown" }
      ]
    },
    {
      id: "2", 
      type: "user",
      content: "Yes, tell me about Josh Allen's passing yards",
      timestamp: new Date(Date.now() - 3 * 60 * 1000)
    },
    {
      id: "3",
      type: "assistant", 
      content: "Great choice! Josh Allen's passing yards prop is set at 259.5. Here's what the data shows:\n\n📊 **Recent Form**: Allen has averaged 267.3 passing yards over his last 10 games, sitting comfortably above the line.\n\n🏈 **Matchup**: Chiefs rank 18th in pass defense, allowing 248.2 yards per game - a favorable spot for Allen.\n\n⚡ **Game Script**: With a high total (47.5), both teams will likely need to throw frequently to keep pace.\n\n**FYNETIC Projection**: 272.1 yards (71% confidence)\n\n*Informational only - not betting advice.*",
      timestamp: new Date(Date.now() - 1 * 60 * 1000),
      actions: [
        { label: "Save as Prop", action: "save-prop" },
        { label: "Add to Slip", action: "add-slip" },
        { label: "See More Stats", action: "more-stats" }
      ]
    }
  ]);

  const [inputMessage, setInputMessage] = useState("");

  const mockSlateGames = [
    { id: "1", matchup: "Bills @ Chiefs", time: "8:20 PM EST", status: "upcoming" },
    { id: "2", matchup: "Cowboys @ Eagles", time: "4:25 PM EST", status: "upcoming" },
    { id: "3", matchup: "49ers @ Rams", time: "Live", status: "live" }
  ];

  const mockActiveProps = [
    { id: "1", player: "Josh Allen", market: "Passing Yards", line: "259.5" },
    { id: "2", player: "Travis Kelce", market: "Receiving Yards", line: "67.5" }
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date()
    };
    
    setMessages([...messages, newMessage]);
    setInputMessage("");
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: "Thanks for your question! I'm analyzing the latest data to give you the most accurate insights. This feature will be fully functional once we connect the AI backend.",
        timestamp: new Date(),
        actions: [
          { label: "Learn More", action: "learn-more" }
        ]
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="container mx-auto p-6 space-y-6 animate-fade-in">
      {/* Hero Header */}
      <Card className="bg-gradient-surface border-accent/20">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-accent">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                Ask FYNETIC
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Your AI-powered sports analytics assistant. Ask questions about players, matchups, and get data-driven insights for smarter decisions.
              </p>
            </div>
            <div className="hidden md:block text-6xl opacity-20">
              🤖
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Context Dock */}
        <div className="lg:col-span-1 space-y-4">
          {/* Today's Slate */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Clock className="h-4 w-4 text-accent" />
                Today's Games
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockSlateGames.map((game) => (
                <div key={game.id} className="p-3 rounded-lg bg-muted/50 space-y-1">
                  <p className="font-medium text-sm">{game.matchup}</p>
                  <Badge 
                    variant={game.status === "live" ? "destructive" : "secondary"}
                    className="text-xs"
                  >
                    {game.status === "live" ? "🔴 Live" : game.time}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Active Props */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Target className="h-4 w-4 text-accent" />
                Your Props
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockActiveProps.map((prop) => (
                <div key={prop.id} className="p-3 rounded-lg bg-muted/50 space-y-1">
                  <p className="font-medium text-sm">{prop.player}</p>
                  <p className="text-xs text-muted-foreground">{prop.market} • {prop.line}</p>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full gap-1">
                <Plus className="h-3 w-3" />
                Add More
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-accent" />
                Chat with FYNETIC
                <Badge variant="secondary" className="ml-auto">AI Assistant</Badge>
              </CardTitle>
            </CardHeader>
            
            {/* Messages Area */}
            <CardContent className="flex-1 overflow-y-auto space-y-4 p-6">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] space-y-2 ${
                    message.type === "user" 
                      ? "bg-accent text-accent-foreground rounded-xl rounded-br-md p-4" 
                      : "bg-muted rounded-xl rounded-bl-md p-4"
                  }`}>
                    <div className="space-y-2">
                      {message.type === "assistant" && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Brain className="h-3 w-3" />
                          FYNETIC
                        </div>
                      )}
                      <p className="text-sm leading-relaxed whitespace-pre-line">
                        {message.content}
                      </p>
                    </div>
                    
                    {message.actions && (
                      <div className="flex gap-2 mt-3 pt-2 border-t border-border/50">
                        {message.actions.map((action, index) => (
                          <Button key={index} size="sm" variant="secondary" className="text-xs">
                            {action.label}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>

            <Separator />
            
            {/* Input Area */}
            <CardContent className="p-4">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask about players, matchups, or trends..."
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="icon" className="bg-gradient-accent hover:bg-accent-hover">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                💡 Try asking: "What do you think about Mahomes passing TDs?" or "Show me today's best props"
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}