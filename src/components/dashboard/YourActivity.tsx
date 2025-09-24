import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bookmark, 
  MessageSquare, 
  Receipt, 
  Clock,
  TrendingUp,
  ExternalLink
} from "lucide-react";

interface ActivityItem {
  id: string;
  type: "prop" | "chat" | "slip";
  title: string;
  subtitle: string;
  timestamp: string;
  status?: string;
  confidence?: number;
}

export function YourActivity() {
  const mockActivity: ActivityItem[] = [
    {
      id: "1",
      type: "prop",
      title: "Josh Allen Over 1.5 Pass TDs",
      subtitle: "vs Chiefs • -115",
      timestamp: "2 hours ago",
      confidence: 78
    },
    {
      id: "2", 
      type: "chat",
      title: "Analyzed Mahomes rushing props",
      subtitle: "Weather impact discussion",
      timestamp: "4 hours ago"
    },
    {
      id: "3",
      type: "slip",
      title: "Sunday Afternoon Parlay",
      subtitle: "3 legs • $25 stake",
      timestamp: "Yesterday",
      status: "Won"
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "prop": return Bookmark;
      case "chat": return MessageSquare;
      case "slip": return Receipt;
      default: return Clock;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "prop": return "bg-accent/10 text-accent";
      case "chat": return "bg-chart-2/10 text-chart-2";
      case "slip": return "bg-chart-3/10 text-chart-3";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-accent" />
          Your Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="props">Props</TabsTrigger>
            <TabsTrigger value="chats">Chats</TabsTrigger>
            <TabsTrigger value="slips">Slips</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-3 mt-4">
            {mockActivity.map((item) => {
              const Icon = getIcon(item.type);
              return (
                <div 
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${getTypeColor(item.type)}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">{item.timestamp}</span>
                        {item.confidence && (
                          <Badge variant="secondary" className="text-xs">
                            {item.confidence}% confidence
                          </Badge>
                        )}
                        {item.status && (
                          <Badge 
                            variant={item.status === "Won" ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {item.status}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              );
            })}
          </TabsContent>
          
          {/* Other tab content would be filtered versions */}
          <TabsContent value="props">
            <div className="text-center py-8 text-muted-foreground">
              <Bookmark className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No saved props yet</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
