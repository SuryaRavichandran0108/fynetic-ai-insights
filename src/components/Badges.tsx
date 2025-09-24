import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock, Minus } from "lucide-react";

export interface StatusBadgeProps {
  status: 'won' | 'lost' | 'pending' | 'push';
  className?: string;
}

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const configs = {
    won: {
      icon: CheckCircle,
      label: 'WON',
      className: 'bg-success/10 text-success border-success/30 hover:bg-success/20'
    },
    lost: {
      icon: XCircle,
      label: 'LOST', 
      className: 'bg-destructive/10 text-destructive border-destructive/30 hover:bg-destructive/20'
    },
    pending: {
      icon: Clock,
      label: 'PENDING',
      className: 'bg-muted/20 text-muted-foreground border-muted/30 hover:bg-muted/30'
    },
    push: {
      icon: Minus,
      label: 'PUSH',
      className: 'bg-warning/10 text-warning border-warning/30 hover:bg-warning/20'
    }
  };

  const config = configs[status];
  const Icon = config.icon;

  return (
    <Badge 
      variant="outline" 
      className={`gap-1 text-xs font-medium rounded-full px-3 py-1 transition-colors ${config.className} ${className}`}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  );
}

export interface LeagueBadgeProps {
  league: 'NFL' | 'NBA' | 'MLB';
  className?: string;
}

export function LeagueBadge({ league, className = "" }: LeagueBadgeProps) {
  const colors = {
    NFL: 'bg-accent/10 text-accent border-accent/30',
    NBA: 'bg-secondary/10 text-secondary border-secondary/30', 
    MLB: 'bg-chart-3/10 text-chart-3 border-chart-3/30'
  };

  return (
    <Badge 
      variant="outline"
      className={`text-xs font-medium rounded-full ${colors[league]} ${className}`}
    >
      {league}
    </Badge>
  );
}

export interface ConfidenceBadgeProps {
  confidence: number;
  className?: string;
}

export function ConfidenceBadge({ confidence, className = "" }: ConfidenceBadgeProps) {
  let colorClass = 'bg-muted/20 text-muted-foreground border-muted/30';
  
  if (confidence >= 70) {
    colorClass = 'bg-success/10 text-success border-success/30';
  } else if (confidence >= 50) {
    colorClass = 'bg-warning/10 text-warning border-warning/30';
  }

  return (
    <Badge 
      variant="outline"
      className={`text-xs font-medium rounded-full ${colorClass} ${className}`}
    >
      {confidence}% confident
    </Badge>
  );
}