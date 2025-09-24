import { Card, CardContent } from "@/components/ui/card";
import { Search, Target, MessageCircle } from "lucide-react";

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
      description: "Research trends and matchup edges with data-driven insights",
      onClick: onExploreClick,
      gradient: "bg-gradient-accent"
    },
    {
      icon: Target,
      title: "Build a Prop",
      description: "Create and analyze custom propositions with AI guidance",
      onClick: onBuildPropClick,
      gradient: "bg-gradient-primary"
    },
    {
      icon: MessageCircle,
      title: "Ask FYNETIC",
      description: "Get personalized AI insights for today's slate",
      onClick: onAskFyneticClick,
      gradient: "bg-secondary"
    }
  ];

  return (
    <div className="animate-slide-up">
      <h2 className="text-xl font-heading font-semibold mb-6 text-foreground">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Card 
              key={action.title}
              onClick={action.onClick}
              className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-0 shadow-md rounded-2xl group"
            >
              <CardContent className="p-8 text-center">
                <div className={`w-16 h-16 ${action.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">{action.title}</h3>
                <p className="text-muted-foreground text-sm">{action.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}