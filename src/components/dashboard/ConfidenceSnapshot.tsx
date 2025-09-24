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
    <Card className="animate-slide-up bg-gradient-surface border-0 shadow-md rounded-2xl">
      <CardContent className="p-6">
        <div className="mb-6">
          <h3 className="font-heading font-semibold text-lg mb-2">FYNETIC Insights</h3>
          <p className="text-muted-foreground text-sm">Today's key market trends and opportunities</p>
        </div>
        
        <div className="bg-gradient-accent rounded-xl p-6 text-white mb-6">
          <div className="text-center">
            <div className="text-2xl font-heading font-bold mb-1">2 games trending high</div>
            <div className="text-white/80 text-sm">1 defensive matchup expected</div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-chart-1 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-medium">High-scoring games</span>
            </div>
            <Badge className="bg-chart-1/10 text-chart-1 border-chart-1/20 rounded-full">2 games</Badge>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-chart-2 rounded-lg flex items-center justify-center">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-medium">Defensive battles</span>
            </div>
            <Badge className="bg-chart-2/10 text-chart-2 border-chart-2/20 rounded-full">1 game</Badge>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-chart-3 rounded-lg flex items-center justify-center">
                <Target className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-medium">Close spreads</span>
            </div>
            <Badge className="bg-chart-3/10 text-chart-3 border-chart-3/20 rounded-full">3 games</Badge>
          </div>
        </div>
        
        <Button 
          onClick={onSeeWhy}
          className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary-hover rounded-xl font-medium"
        >
          <Info className="h-4 w-4 mr-2" />
          See Analysis Details
        </Button>
      </CardContent>
    </Card>
  );
}