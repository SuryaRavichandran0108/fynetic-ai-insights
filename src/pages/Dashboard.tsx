import { Button } from "@/components/ui/button";
import { TodaysSlate } from "@/components/dashboard/TodaysSlate";
import { QuickKPIs } from "@/components/dashboard/QuickKPIs";
import { YourActivity } from "@/components/dashboard/YourActivity";
import { Target, MessageSquare } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="container mx-auto p-6 space-y-6 animate-fade-in">
      {/* Hero CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" className="gap-2 bg-gradient-accent hover:bg-accent-hover">
          <Target className="h-5 w-5" />
          Open Prop Builder
        </Button>
        <Button size="lg" variant="outline" className="gap-2">
          <MessageSquare className="h-5 w-5" />
          Ask FYNETIC about this slate
        </Button>
      </div>

      {/* Quick KPIs */}
      <QuickKPIs />

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Slate - Takes 2 columns */}
        <TodaysSlate games={[]} />
        
        {/* Your Activity - Takes 1 column */}
        <YourActivity />
      </div>
    </div>
  );
}