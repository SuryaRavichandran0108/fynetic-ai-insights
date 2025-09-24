import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  GamepadIcon, 
  Bookmark, 
  Receipt, 
  TrendingUp 
} from "lucide-react";

interface KPI {
  label: string;
  value: string | number;
  change?: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export function QuickKPIs() {
  const kpis: KPI[] = [
    {
      label: "Games Today",
      value: 12,
      icon: GamepadIcon,
      color: "text-accent"
    },
    {
      label: "Saved Props",
      value: 8,
      change: "+3",
      icon: Bookmark,
      color: "text-chart-3"
    },
    {
      label: "Open Slips",
      value: 2,
      icon: Receipt,
      color: "text-chart-2"
    },
    {
      label: "Demo ROI YTD",
      value: "+12.3%",
      change: "+2.1%",
      icon: TrendingUp,
      color: "text-success"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <Card key={kpi.label} className="hover:bg-card-hover transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {kpi.label}
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold">
                      {kpi.value}
                    </p>
                    {kpi.change && (
                      <span className="text-xs text-success bg-success/10 px-2 py-1 rounded-full">
                        {kpi.change}
                      </span>
                    )}
                  </div>
                </div>
                <Icon className={`h-8 w-8 ${kpi.color}`} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}