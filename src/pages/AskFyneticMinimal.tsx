import { useState, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import { TrendingPanel } from "@/components/trending/TrendingPanel";
import { getConfidenceTier, getConfidenceColor } from "@/utils/confidence";
import type { ExploreContextPayload } from "@/types/explore";

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
  const incomingContext = (location.state?.context ?? null) as ExploreContextPayload | null;
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showTrending, setShowTrending] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const hasMessages = messages.length > 0;

  // Check for prefilled text from navigation
  useEffect(() => {
    if (location.state?.prefilledText) {
      setInputValue(location.state.prefilledText);
    }
  }, [location.state]);

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

  const handleTrendingSelect = (question: string) => {
    setInputValue(question);
    setShowTrending(false);
    inputRef.current?.focus();
  };

  const handleInputFocus = () => {
    setShowTrending(false);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      if (!hasMessages) setShowTrending(true);
    }, 0);
  };

  const handleSendMouseDown: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-[calc(100vh-58px-40px)] bg-bg">
      <div 
        className={cn(
          "max-w-[1200px] mx-auto px-4 py-6 transition-all duration-300",
          showTrending
            ? "grid md:grid-cols-[minmax(260px,340px)_minmax(0,1fr)] gap-6"
            : "grid grid-cols-1"
        )}
      >
        {/* Left Column: Trending Panel (Desktop only) */}
        <AnimatePresence>
          {showTrending && (
            <div className="hidden md:block">
              <TrendingPanel onSelect={handleTrendingSelect} />
            </div>
          )}
        </AnimatePresence>

        {/* Right Column: Chat */}
        <div className="flex flex-col min-h-[calc(100vh-58px-40px-3rem)]">
          {/* Manual "Show trending" button (desktop, during conversation) */}
          {hasMessages && !showTrending && (
            <div className="hidden md:flex items-center mb-3">
              <button
                type="button"
                onClick={() => setShowTrending(true)}
                className="inline-flex items-center gap-1.5 text-[13px] text-white/70 hover:text-white/90
                           border border-white/10 rounded-full px-3 py-1.5
                           bg-[var(--surface)]/60 hover:bg-white/[0.04]
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25
                           transition-colors"
                aria-pressed={showTrending}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                Show trending
              </button>
            </div>
          )}

          {/* Chat Area */}
          <div className="flex-1 mb-6">
            {messages.length === 0 ? (
              <div className="h-[60vh] flex items-center justify-center">
                {/* Empty state - no welcome message */}
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
                        "max-w-2xl rounded-lg px-4 py-3",
                        message.role === "user"
                          ? "bg-surface ml-12"
                          : "bg-surface/50 border-l-2 border-l-accent-teal"
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
                    <div className="bg-surface/50 border-l-2 border-l-accent-teal rounded-lg px-4 py-3">
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

          {/* Input Area - aligned to chat column */}
          <div className="sticky bottom-0 bg-[var(--bg)]/80 backdrop-blur supports-[backdrop-filter]:bg-[var(--bg)]/60">
            <div className={cn("pb-6", showTrending && messages.length === 0 ? "" : "max-w-[900px] mx-auto")}>
              <div className="flex items-center gap-2 rounded-xl border border-border/50 bg-surface px-3 py-2 focus-within:ring-1 focus-within:ring-white/20">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask anything about players, props, matchups…"
                  className="flex-1 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
                <Button
                  onMouseDown={handleSendMouseDown}
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-accent-teal hover:bg-accent-teal-700 text-bg shrink-0"
                  size="sm"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              <p className="text-xs text-white/40 text-center mt-2">
                Analytics for information only — not betting advice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}