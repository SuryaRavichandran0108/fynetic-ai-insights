import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, MessageSquare, TrendingUp, Calendar, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Player {
  id: string;
  name: string;
  team: string;
  position: string;
  stats: {
    ppg: number;
    rpg: number;
    apg: number;
    fg_pct: number;
  };
  recentGames: number[];
}

const mockPlayers: Player[] = [
  {
    id: "1",
    name: "Luka Dončić",
    team: "DAL",
    position: "PG",
    stats: { ppg: 28.4, rpg: 8.2, apg: 9.1, fg_pct: 47.3 },
    recentGames: [32, 28, 31, 25, 29]
  },
  {
    id: "2",
    name: "Jayson Tatum",
    team: "BOS",
    position: "SF",
    stats: { ppg: 26.8, rpg: 8.4, apg: 4.6, fg_pct: 45.1 },
    recentGames: [24, 30, 28, 22, 27]
  },
  {
    id: "3",
    name: "Nikola Jokić",
    team: "DEN",
    position: "C",
    stats: { ppg: 24.2, rpg: 11.8, apg: 9.8, fg_pct: 58.2 },
    recentGames: [25, 23, 28, 21, 26]
  }
];

function PlayerCard({ player }: { player: Player }) {
  const navigate = useNavigate();

  const handleAskFynetic = () => {
    navigate('/ask', { 
      state: { 
        prefilledText: `Tell me about ${player.name}'s recent performance and trends` 
      } 
    });
  };

  return (
    <Card className="bg-surface border-border">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg text-text-primary">{player.name}</CardTitle>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs">
                {player.team} • {player.position}
              </Badge>
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={handleAskFynetic}
            className="flex items-center gap-2"
          >
            <MessageSquare className="h-3 w-3" />
            Ask FYNETIC
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="games">Game Log</TabsTrigger>
            <TabsTrigger value="splits">Splits</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-accent-teal">{player.stats.ppg}</p>
                <p className="text-xs text-text-muted">PPG</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-accent-teal">{player.stats.rpg}</p>
                <p className="text-xs text-text-muted">RPG</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-accent-teal">{player.stats.apg}</p>
                <p className="text-xs text-text-muted">APG</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-accent-teal">{player.stats.fg_pct}%</p>
                <p className="text-xs text-text-muted">FG%</p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-text-primary mb-2">Last 5 Games (Points)</h4>
              <div className="flex items-end gap-1 h-16">
                {player.recentGames.map((points, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-accent-teal/80 rounded-t-sm"
                      style={{ height: `${(points / 35) * 100}%` }}
                    />
                    <span className="text-xs text-text-muted mt-1">{points}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="games" className="space-y-3">
            <div className="text-sm text-text-muted">Recent game log data</div>
            {[1, 2, 3, 4, 5].map((game) => (
              <div key={game} className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-sm text-text-primary">vs LAL</span>
                <span className="text-sm text-text-muted">28 PTS • 8 REB • 9 AST</span>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="splits" className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-text-primary">Home</p>
                <p className="text-lg text-accent-teal">29.2 PPG</p>
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">Away</p>
                <p className="text-lg text-accent-teal">27.6 PPG</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-3">
            <div className="text-sm text-text-muted">
              Trending up in efficiency over last 10 games
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-4 text-right">
          <button 
            onClick={handleAskFynetic}
            className="text-accent-teal hover:text-accent-teal-700 text-sm font-medium inline-flex items-center gap-1"
          >
            Ask FYNETIC about this →
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ExplorePlayers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("all");
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const filteredPlayers = mockPlayers.filter(player =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedTeam === "all" || player.team === selectedTeam)
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-surface-2/50 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Search className="h-6 w-6 text-accent-teal" />
            <h1 className="text-xl font-semibold text-text-primary">Explore Players</h1>
          </div>
          
          {/* Search and Filters */}
          <div className="flex gap-4 items-center">
            <div className="flex-1 max-w-md">
              <Input
                placeholder="Search players..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-surface border-border"
              />
            </div>
            <Select value={selectedTeam} onValueChange={setSelectedTeam}>
              <SelectTrigger className="w-32 bg-surface border-border">
                <SelectValue placeholder="Team" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Teams</SelectItem>
                <SelectItem value="BOS">Boston</SelectItem>
                <SelectItem value="DAL">Dallas</SelectItem>
                <SelectItem value="DEN">Denver</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        {searchQuery === "" && !selectedPlayer && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-text-muted mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-text-primary mb-2">
              Search for any NBA player
            </h2>
            <p className="text-text-muted mb-6">
              Get detailed stats, game logs, and performance analysis
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {["Luka Dončić", "Jayson Tatum", "Nikola Jokić"].map((name) => (
                <Button
                  key={name}
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchQuery(name)}
                >
                  {name}
                </Button>
              ))}
            </div>
          </div>
        )}

        {filteredPlayers.length > 0 && (
          <div className="grid gap-6">
            {filteredPlayers.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        )}

        {searchQuery !== "" && filteredPlayers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-muted">No players found matching "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
}