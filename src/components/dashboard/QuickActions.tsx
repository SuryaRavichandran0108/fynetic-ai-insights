import { Card, CardContent } from "@/components/ui/card";
import { Search, Target, MessageSquare } from "lucide-react";

interface QuickActionsProps {
  onExploreClick: () => void;
  onBuildPropClick: () => void;
  onAskFyneticClick: () => void;
}

export function QuickActions({ onExploreClick, onBuildPropClick, onAskFyneticClick }: QuickActionsProps) {
  const actions = [
    {
      icon: Search,
      title: "Explore Players",
      description: "Research player trends and matchup data",
      onClick: onExploreClick,
      color: "text-chart-1"
    },
    {
      icon: Target,
      title: "Build a Prop",
      description: "Create and analyze player propositions",
      onClick: onBuildPropClick,
      color: "text-accent"
    },
    {
      icon: MessageSquare,
      title: "Ask FYNETIC",
      description: "Get AI insights about today's games",
      onClick: onAskFyneticClick,
      color: "text-chart-3"
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Card 
              key={action.title}
              className="cursor-pointer hover:bg-card-hover transition-all duration-200 hover:scale-[1.02] group"
              onClick={action.onClick}
            >
              <CardContent className="p-6 text-center space-y-3">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-muted group-hover:bg-accent/10 transition-colors`}>
                  <Icon className={`h-6 w-6 ${action.color} group-hover:text-accent transition-colors`} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{action.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {action.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}