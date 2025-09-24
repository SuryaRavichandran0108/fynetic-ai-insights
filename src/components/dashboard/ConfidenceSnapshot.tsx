import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Info, TrendingUp, Shield, Target } from "lucide-react";

interface ConfidenceSnapshotProps {
  insights: string;
  onSeeWhy: () => void;
}

export function ConfidenceSnapshot({ insights, onSeeWhy }: ConfidenceSnapshotProps) {
  return (
    <Card className="animate-slide-up bg-gradient-surface border border-border shadow-xl rounded-2xl">
      <CardContent className="p-6">
        <div className="mb-6">
          <h3 className="font-heading font-semibold text-lg mb-2 text-foreground tracking-tight">FYNETIC Insights</h3>
          <p className="text-muted-foreground text-sm font-body">Today's key market trends and opportunities</p>
        </div>
        
        <div className="bg-gradient-accent rounded-xl p-6 text-foreground mb-6 border border-accent/30">
          <div className="text-center">
            <div className="text-2xl font-heading font-bold mb-1">2 games trending high</div>
            <div className="text-foreground/80 text-sm font-body">1 defensive matchup expected</div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl border border-border/30">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-chart-1 rounded-lg flex items-center justify-center shadow-lg">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-medium text-foreground font-body">High-scoring games</span>
            </div>
            <Badge className="bg-chart-1/20 text-chart-1 border-chart-1/30 rounded-full">2 games</Badge>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl border border-border/30">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-chart-2 rounded-lg flex items-center justify-center shadow-lg">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-medium text-foreground font-body">Defensive battles</span>
            </div>
            <Badge className="bg-chart-2/20 text-chart-2 border-chart-2/30 rounded-full">1 game</Badge>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl border border-border/30">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-chart-3 rounded-lg flex items-center justify-center shadow-lg">
                <Target className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-medium text-foreground font-body">Close spreads</span>
            </div>
            <Badge className="bg-chart-3/20 text-chart-3 border-chart-3/30 rounded-full">3 games</Badge>
          </div>
        </div>
        
        <Button 
          onClick={onSeeWhy}
          className="w-full mt-6 bg-accent text-accent-foreground hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/25 rounded-xl font-medium transition-all duration-300"
        >
          <Info className="h-4 w-4 mr-2" />
          See Analysis Details
        </Button>
      </CardContent>
    </Card>
  );
}