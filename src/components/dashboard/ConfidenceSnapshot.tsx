import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Info } from "lucide-react";

interface ConfidenceSnapshotProps {
  insights: string;
  onSeeWhy: () => void;
}

export function ConfidenceSnapshot({ insights, onSeeWhy }: ConfidenceSnapshotProps) {
  return (
    <Card className="bg-accent/5 border-accent/20">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="font-medium text-sm">FYNETIC Insights</p>
              <p className="text-sm text-muted-foreground">{insights}</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onSeeWhy}
            className="gap-1 text-accent hover:text-accent-foreground hover:bg-accent/10"
          >
            <Info className="h-3 w-3" />
            See Why
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}