import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Target, MessageSquare, Receipt } from "lucide-react";

export default function Activity() {
  const activities = [
    {
      id: "1",
      type: "prop",
      title: "Mahomes Rushing Yards",
      description: "Analyzed rushing props vs Chiefs defense",
      time: "4 hours ago",
      status: "saved"
    },
    {
      id: "2", 
      type: "chat",
      title: "Asked about Bills defense",
      description: "Discussed matchup implications for passing game",
      time: "6 hours ago",
      status: "completed"
    },
    {
      id: "3",
      type: "slip",
      title: "Sunday NFL Props",
      description: "Created bet slip with 3 player props",
      time: "1 day ago",
      status: "pending"
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "prop": return Target;
      case "chat": return MessageSquare;
      case "slip": return Receipt;
      default: return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "saved": return "secondary";
      case "completed": return "success";
      case "pending": return "warning";
      default: return "secondary";
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Your Activity</h1>
        <p className="text-muted-foreground">
          Track your props, chats, and betting activity
        </p>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Activity</TabsTrigger>
          <TabsTrigger value="props">Props</TabsTrigger>
          <TabsTrigger value="chats">Chats</TabsTrigger>
          <TabsTrigger value="slips">Bet Slips</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="space-y-3">
            {activities.map((activity) => {
              const Icon = getIcon(activity.type);
              return (
                <Card key={activity.id} className="hover:bg-card-hover transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                          <Icon className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <h3 className="font-medium">{activity.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {activity.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <Badge variant={getStatusColor(activity.status) as any}>
                          {activity.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="props">
          <Card>
            <CardHeader>
              <CardTitle>Saved Props</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Your saved prop analysis will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chats">
          <Card>
            <CardHeader>
              <CardTitle>Chat History</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Your FYNETIC conversations will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="slips">
          <Card>
            <CardHeader>
              <CardTitle>Bet Slips</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Your bet tracking will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}