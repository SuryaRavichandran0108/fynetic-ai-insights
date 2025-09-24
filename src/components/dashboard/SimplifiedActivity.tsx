import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, ArrowRight } from "lucide-react";

interface SimplifiedActivityProps {
  lastAction?: {
    description: string;
    timeAgo: string;
  };
  onViewAll: () => void;
}

export function SimplifiedActivity({ lastAction, onViewAll }: SimplifiedActivityProps) {
  const defaultAction = {
    description: "You analyzed Mahomes rushing props",
    timeAgo: "4 hours ago"
  };

  const action = lastAction || defaultAction;

  return (
    <Card className="bg-gradient-card border border-border shadow-lg">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-medium text-foreground font-heading tracking-tight">Your Activity</h3>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-body">
              <span className="font-medium text-foreground">Last Action:</span> {action.description}
            </p>
            <p className="text-xs text-muted-foreground font-body">
              {action.timeAgo}
            </p>
          </div>

          <Button 
            variant="outline" 
            size="sm" 
            onClick={onViewAll}
            className="w-full gap-1 border-border hover:border-accent/50 hover:bg-accent/10 transition-all duration-300"
          >
            View All Activity
            <ArrowRight className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}