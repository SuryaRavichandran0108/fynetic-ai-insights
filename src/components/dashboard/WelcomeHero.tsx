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
    <Card className="relative overflow-hidden bg-gradient-primary border-0 text-white shadow-xl animate-fade-in rounded-2xl">
      <CardContent className="p-8">
        <div className="flex items-center justify-between relative z-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-white/80">
              <Calendar className="h-4 w-4" />
              {getToday()}
            </div>
            <h1 className="text-3xl font-heading font-bold text-white">
              👋 {getGreeting()}, {userName}
            </h1>
            <p className="text-white/90 max-w-lg text-lg">
              You've got <span className="font-semibold text-secondary">{gamesCount} games</span> today. 
              Here's where to start.
            </p>
            <Button 
              onClick={onViewSlate}
              size="lg" 
              className="gap-2 bg-white text-primary hover:bg-white/90 mt-6 rounded-full px-8 py-3 font-medium shadow-lg"
            >
              <Clock className="h-4 w-4" />
              See Today's Slate
            </Button>
          </div>
          <div className="hidden md:block text-8xl opacity-20 absolute right-8 top-1/2 transform -translate-y-1/2">
            🏈
          </div>
        </div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-secondary/10 pointer-events-none" />
      </CardContent>
    </Card>
  );
}