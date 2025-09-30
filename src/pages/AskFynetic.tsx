import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Send, MessageSquare, TrendingUp, Users, Calendar, BarChart3, Activity, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  confidence?: number;
  timestamp: Date;
}

interface ConfidenceIndicatorProps {
  value: number;
  label?: "Low" | "Medium" | "High";
}

function ConfidenceIndicator({ value, label }: ConfidenceIndicatorProps) {
  const tier = label || (value >= 70 ? "High" : value >= 40 ? "Medium" : "Low");
  const colorClass = value >= 70 ? "bg-accent-teal" : value >= 40 ? "bg-warning" : "bg-negative";
  
  return (
    <div className="mt-3 p-3 rounded-lg bg-surface/50 border border-border">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-text-muted">Confidence</span>
        <span className="text-sm font-medium text-text-primary">{value}% ({tier})</span>
      </div>
      <div className="w-full bg-surface-2 rounded-full h-2">
        <div 
          className={cn("h-2 rounded-full transition-all duration-300", colorClass)}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

interface RecentItem {
  id: string;
  name: string;
  type: "player" | "prop";
  subtitle?: string;
}

function ContextDock() {
  const recentPlayers: RecentItem[] = [
    { id: "1", name: "Luka Dončić", type: "player", subtitle: "DAL • PG" },
    { id: "2", name: "Jayson Tatum", type: "player", subtitle: "BOS • SF" },
    { id: "3", name: "Nikola Jokić", type: "player", subtitle: "DEN • C" },
  ];

  const recentProps: RecentItem[] = [
    { id: "1", name: "Tatum 3PT over 2.5", type: "prop" },
    { id: "2", name: "Luka REB over 8.5", type: "prop" },
    { id: "3", name: "Jokić AST over 9.5", type: "prop" },
  ];

  return (
    <div className="w-80 border-l border-border bg-surface-2/30 p-4 space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
          <Users className="h-4 w-4" />
          Recent Players
        </h3>
        <div className="space-y-2">
          {recentPlayers.map((player) => (
            <div
              key={player.id}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface/50 cursor-pointer transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-accent-teal/20 flex items-center justify-center">
                <span className="text-xs font-medium text-accent-teal">
                  {player.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">{player.name}</p>
                <p className="text-xs text-text-muted">{player.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          Recent Props
        </h3>
        <div className="space-y-2">
          {recentProps.map((prop) => (
            <div
              key={prop.id}
              className="p-2 rounded-lg hover:bg-surface/50 cursor-pointer transition-colors"
            >
              <Badge variant="outline" className="text-xs">
                {prop.name}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
          <Star className="h-4 w-4" />
          Pinned
        </h3>
        <p className="text-xs text-text-muted">No pinned items yet</p>
      </div>
    </div>
  );
}

export default function AskFynetic() {
  const location = useLocation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "👋 Hey there! I'm FYNETIC, your AI sports analyst. I can help you analyze player performance, evaluate props, compare matchups, and dive deep into any sports analytics question you have. What would you like to explore?",
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check for prefilled text from navigation
  useEffect(() => {
    if (location.state?.prefilledText) {
      setInputValue(location.state.prefilledText);
    }
  }, [location.state]);

  const examplePrompts = [
    "How has Luka Dončić performed in his last 5 games?",
    "Is this prop a good value: Tatum over 6.5 rebounds?",
    "Compare Jokić vs Embiid over the last 10 games",
    "How do injuries affect tonight's Lakers vs Warriors total?"
  ];

  const quickActions = [
    { label: "Compare Players", icon: Users },
    { label: "Recent Trends", icon: TrendingUp },
    { label: "Injuries", icon: Activity },
    { label: "Game Log", icon: Calendar },
    { label: "Team Pace", icon: BarChart3 },
    { label: "Usage Rate", icon: BarChart3 },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Based on the available data, here's my analysis:\n\n• Luka has been averaging 28.4 points over his last 5 games\n• His shooting efficiency has improved to 47% from the field\n• He's dealing with minor ankle soreness but it hasn't affected his performance\n• Against similar opponents, he typically exceeds this line 67% of the time\n\nThe matchup favors Luka with a pace-up spot and potential overtime scenario.",
        confidence: 72,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const handleQuickAction = (action: string) => {
    setInputValue(`Help me analyze ${action.toLowerCase()} for `);
  };

  const handleExamplePrompt = (prompt: string) => {
    setInputValue(prompt);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-border bg-surface-2/50 p-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-6 w-6 text-accent-teal" />
              <h1 className="text-xl font-semibold text-text-primary">Ask FYNETIC</h1>
            </div>
            <p className="text-sm text-text-muted">Analytics for information only — not betting advice</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.length === 1 && (
              <div className="text-center py-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-text-primary mb-2">
                    What would you like to analyze?
                  </h2>
                  <p className="text-text-muted">
                    Ask me about player performance, prop analysis, matchups, or any sports analytics question.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                  {examplePrompts.map((prompt, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-auto p-4 text-left justify-start"
                      onClick={() => handleExamplePrompt(prompt)}
                    >
                      {prompt}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-accent-teal/20 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="h-4 w-4 text-accent-teal" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-2xl rounded-2xl px-4 py-3",
                    message.role === "user"
                      ? "bg-accent-teal text-background ml-12"
                      : "bg-surface border border-border"
                  )}
                >
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.content}
                  </div>
                  {message.confidence !== undefined && (
                    <ConfidenceIndicator value={message.confidence} />
                  )}
                </div>
                {message.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium text-text-primary">U</span>
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-accent-teal/20 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="h-4 w-4 text-accent-teal" />
                </div>
                <div className="bg-surface border border-border rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-border bg-surface-2/50 p-4">
          <div className="max-w-4xl mx-auto space-y-4">
            {/* Quick Actions */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {quickActions.map((action) => (
                <Button
                  key={action.label}
                  variant="outline"
                  size="sm"
                  className="flex-shrink-0"
                  onClick={() => handleQuickAction(action.label)}
                >
                  <action.icon className="h-4 w-4 mr-2" />
                  {action.label}
                </Button>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-3">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about player performance, props, matchups..."
                className="flex-1 bg-surface border-border"
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <Button
                onClick={handleSend}
                disabled={!inputValue.trim() || isLoading}
                className="bg-accent-teal hover:bg-accent-teal-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>

            <p className="text-xs text-text-muted text-center">
              FYNETIC provides analytics for information only. Not betting advice.
            </p>
          </div>
        </div>
      </div>

      {/* Context Dock */}
      <div className="hidden lg:block">
        <ContextDock />
      </div>
    </div>
  );
}