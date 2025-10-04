import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, MessageSquare, TrendingUp, Calendar, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { parseExploreQuery } from "@/lib/explore/parseExploreQuery";
import { getMockStats } from "@/lib/explore/mockStats";
import type { ExploreContextPayload, ExploreParsedQuery, ExploreStatsPreview } from "@/types/explore";

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

function buildPrefilledText(p: ExploreParsedQuery, s: ExploreStatsPreview) {
  const parts: string[] = [];
  if (p.player) parts.push(p.player);
  if (p.opponent) parts.push(`vs ${p.opponent}`);
  if (p.venue) parts.push(p.venue === "home" ? "at home" : "away");
  if (p.window === "last_5") parts.push("(last 5 games)");
  if (p.window === "last_10") parts.push("(last 10 games)");
  if (p.window === "season") parts.push("(this season)");

  const headline = parts.join(" ");
  const sline = s.summary.map(x => `${x.label}: ${x.value}`).join(", ");
  return `Discuss ${headline}. Summary — ${sline}. Given this context, analyze value on relevant props and matchup factors.`;
}

export default function ExplorePlayers() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("all");
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [parsed, setParsed] = useState<ExploreParsedQuery>(parseExploreQuery(""));
  const [preview, setPreview] = useState<ExploreStatsPreview>(getMockStats(parsed));

  const filteredPlayers = mockPlayers.filter(player =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedTeam === "all" || player.team === selectedTeam)
  );

  const handleSearch = () => {
    const p = parseExploreQuery(searchQuery);
    setParsed(p);
    setPreview(getMockStats(p));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handoffToAsk = () => {
    const prefilledText = buildPrefilledText(parsed, preview);
    const context: ExploreContextPayload = {
      type: "player_query",
      parsedQuery: parsed,
      statsPreview: preview,
    };
    navigate("/ask", { state: { prefilledText, context } });
  };

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
          <div className="space-y-3">
            <div className="flex gap-4 items-center">
              <div className="flex-1 max-w-md">
                <Input
                  placeholder="Try: 'luka doncic vs magic' or 'tatum at home last 10 games'"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="bg-surface border-border"
                />
              </div>
              <Button onClick={handleSearch} size="sm" variant="outline">
                Search
              </Button>
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
            
            {/* Chips */}
            {(parsed.player || parsed.opponent || parsed.venue || parsed.window || parsed.season) && (
              <div className="flex flex-wrap gap-2 text-xs">
                {parsed.player && (
                  <span className="px-2 py-1 rounded-full bg-white/[0.04] border border-white/10 text-text-primary">
                    {parsed.player}
                  </span>
                )}
                {parsed.opponent && (
                  <span className="px-2 py-1 rounded-full bg-white/[0.04] border border-white/10 text-text-primary">
                    vs {parsed.opponent}
                  </span>
                )}
                {parsed.venue && (
                  <span className="px-2 py-1 rounded-full bg-white/[0.04] border border-white/10 text-text-primary">
                    {parsed.venue}
                  </span>
                )}
                {typeof parsed.window === "string" && (
                  <span className="px-2 py-1 rounded-full bg-white/[0.04] border border-white/10 text-text-primary">
                    {parsed.window.replace("_", " ")}
                  </span>
                )}
                {parsed.season && (
                  <span className="px-2 py-1 rounded-full bg-white/[0.04] border border-white/10 text-text-primary">
                    {parsed.season}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        {/* Show parsed stats preview if we have a player */}
        {parsed.player && preview && (
          <Card className="bg-surface border-border mb-6">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg text-text-primary">{parsed.player}</CardTitle>
                <button
                  type="button"
                  onClick={handoffToAsk}
                  className="inline-flex items-center gap-1 text-[13px] text-accent-teal hover:brightness-110 border border-white/10 rounded-full px-3 py-1.5 bg-white/[0.02] hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25"
                >
                  Ask FYNETIC about this →
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                {preview.summary.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-2xl font-bold text-accent-teal">{stat.value}</p>
                    <p className="text-xs text-text-muted">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-text-primary">Recent Games</h4>
                {preview.gameLog.slice(0, 3).map((game, i) => (
                  <div key={i} className="flex justify-between items-center py-1.5 border-b border-border text-sm">
                    <span className="text-text-primary">vs {game.opp}</span>
                    <span className="text-text-muted">{game.line}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {searchQuery === "" && !parsed.player && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-text-muted mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-text-primary mb-2">
              Search for any NBA player
            </h2>
            <p className="text-text-muted mb-6">
              Try natural language: "luka doncic vs magic" or "tatum at home last 10 games"
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {["luka doncic vs magic", "tatum at home", "jokic last 5 games"].map((q) => (
                <Button
                  key={q}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchQuery(q);
                    const p = parseExploreQuery(q);
                    setParsed(p);
                    setPreview(getMockStats(p));
                  }}
                >
                  {q}
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