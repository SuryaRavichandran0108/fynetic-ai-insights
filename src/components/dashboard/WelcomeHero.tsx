import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Calendar } from "lucide-react";

interface WelcomeHeroProps {
  userName?: string;
  gamesCount: number;
  onViewSlate: () => void;
}

export function WelcomeHero({ userName = "there", gamesCount, onViewSlate }: WelcomeHeroProps) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const getToday = () => {
    return new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <Card className="bg-gradient-surface border-accent/20 animate-fade-in">
      <CardContent className="p-8">
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {getToday()}
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              👋 {getGreeting()}, {userName}
            </h1>
            <p className="text-muted-foreground max-w-md">
              You've got <span className="font-semibold text-accent">{gamesCount} games</span> today. 
              Want to see what stands out?
            </p>
            <Button 
              onClick={onViewSlate}
              size="lg" 
              className="gap-2 bg-gradient-accent hover:bg-accent-hover mt-4"
            >
              <Clock className="h-4 w-4" />
              See Today's Slate
            </Button>
          </div>
          <div className="hidden md:block text-6xl opacity-20">
            🏈
          </div>
        </div>
      </CardContent>
    </Card>
  );
}