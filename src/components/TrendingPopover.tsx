import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrendingPopoverProps {
  open: boolean;
  onPick: (text: string) => void;
  anchorRef: React.RefObject<HTMLInputElement>;
  onClose: () => void;
}

const trendingQuestions = [
  "How has Luka Dončić performed in his last 5 games?",
  "Is Tatum over 6.5 rebounds a good value?",
  "Compare Jokić vs Embiid over the last 10 games.",
  "How do injuries and pace affect tonight's total for Lakers vs Warriors?",
  "What's the best prop bet for tonight's primetime game?"
];

export function TrendingPopover({ open, onPick, anchorRef, onClose }: TrendingPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        popoverRef.current && 
        !popoverRef.current.contains(e.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose, anchorRef]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <Card
        ref={popoverRef}
        className={cn(
          "absolute pointer-events-auto bg-surface border border-border/50 shadow-lg rounded-lg p-2 w-[500px] max-w-[90vw]",
          "transform -translate-x-1/2 mb-2"
        )}
        style={{
          left: "50%",
          bottom: anchorRef.current ? `${window.innerHeight - anchorRef.current.getBoundingClientRect().top + 8}px` : "120px"
        }}
      >
        <div className="flex items-center gap-2 mb-3 px-2">
          <TrendingUp className="h-4 w-4 text-accent-teal" />
          <span className="text-sm font-medium text-text-primary">Trending questions</span>
        </div>
        
        <div className="space-y-1">
          {trendingQuestions.map((question, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-start text-left h-auto py-2 px-2 text-sm text-text-muted hover:text-text-primary hover:bg-surface"
              onClick={() => {
                onPick(question);
                onClose();
              }}
            >
              {question}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
}