import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import { TrendingPopover } from "@/components/TrendingPopover";
import { getConfidenceTier, getConfidenceColor } from "@/utils/confidence";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  confidence?: number;
  timestamp: Date;
}

interface ConfidenceIndicatorProps {
  value: number;
}

function ConfidenceIndicator({ value }: ConfidenceIndicatorProps) {
  const tier = getConfidenceTier(value);
  const colorClass = getConfidenceColor(value);
  
  return (
    <div className="mt-3 p-3 rounded-lg bg-surface/30 border border-border/30">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-text-muted">Confidence</span>
        <span className="text-sm font-medium text-text-primary">{value}% ({tier})</span>
      </div>
      <div className="w-full bg-surface rounded-full h-2">
        <div 
          className={cn("h-2 rounded-full transition-all duration-300", colorClass)}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export default function AskFyneticMinimal() {
  const location = useLocation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showTrending, setShowTrending] = useState(false);
  const [showContextDock, setShowContextDock] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Check for prefilled text from navigation
  useEffect(() => {
    if (location.state?.prefilledText) {
      setInputValue(location.state.prefilledText);
    }
  }, [location.state]);

  // Keyboard shortcut to toggle context dock for development
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        setShowContextDock(prev => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

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
    setShowTrending(false);

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

  const handleInputFocus = () => {
    setShowTrending(true);
  };

  const handleInputBlur = () => {
    // Delay to allow clicking trending items
    setTimeout(() => setShowTrending(false), 150);
  };

  const handleTrendingPick = (text: string) => {
    setInputValue(text);
    setShowTrending(false);
    inputRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {messages.length === 0 ? (
            <div className="h-[60vh] flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 text-accent-teal/60 mx-auto mb-4" />
                <h2 className="text-xl font-medium text-text-primary mb-2">
                  Ask FYNETIC anything
                </h2>
                <p className="text-text-muted max-w-md">
                  Get analytics on players, props, matchups, or any sports question.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-2xl rounded-lg px-4 py-3 border-l-2",
                      message.role === "user"
                        ? "bg-surface border-l-accent-teal ml-12"
                        : "bg-surface/50 border-l-accent-teal/50"
                    )}
                  >
                    <div className="whitespace-pre-wrap text-sm leading-relaxed text-text-primary">
                      {message.content}
                    </div>
                    {message.confidence !== undefined && (
                      <ConfidenceIndicator value={message.confidence} />
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="bg-surface/50 border-l-2 border-l-accent-teal/50 rounded-lg px-4 py-3">
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
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-border/30 bg-surface/30 backdrop-blur p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask anything about players, props, matchups…"
              className="flex-1 bg-surface border-border/50 focus:border-accent-teal"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
            <Button
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
              className="bg-accent-teal hover:bg-accent-teal-700 text-bg"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          <p className="text-xs text-text-muted text-center mt-3">
            Analytics for information only — not betting advice.
          </p>
        </div>
      </div>

      {/* Trending Popover */}
      <TrendingPopover
        open={showTrending}
        onPick={handleTrendingPick}
        anchorRef={inputRef}
        onClose={() => setShowTrending(false)}
      />
    </div>
  );
}