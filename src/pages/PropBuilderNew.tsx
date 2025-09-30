import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Target, MessageSquare, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PropFormData {
  sport: string;
  league: string;
  player: string;
  market: string;
  line: string;
  side: string;
  odds: string;
  notes: string;
  isMock: boolean;
}

interface Prop {
  id: string;
  player: string;
  market: string;
  line: number;
  side: string;
  odds: number | null;
  isMock: boolean;
  createdAt: Date;
}

export default function PropBuilderNew() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PropFormData>({
    sport: "",
    league: "",
    player: "",
    market: "",
    line: "",
    side: "",
    odds: "",
    notes: "",
    isMock: true,
  });
  const [recentProps, setRecentProps] = useState<Prop[]>([
    {
      id: "1",
      player: "Jayson Tatum",
      market: "Rebounds",
      line: 8.5,
      side: "over",
      odds: -110,
      isMock: true,
      createdAt: new Date(),
    },
    {
      id: "2",
      player: "Luka Dončić",
      market: "3-Pointers",
      line: 2.5,
      side: "over",
      odds: null,
      isMock: true,
      createdAt: new Date(),
    },
  ]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [lastCreatedProp, setLastCreatedProp] = useState<Prop | null>(null);

  const handleInputChange = (field: keyof PropFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProp: Prop = {
      id: Date.now().toString(),
      player: formData.player,
      market: formData.market,
      line: parseFloat(formData.line),
      side: formData.side,
      odds: formData.odds ? parseFloat(formData.odds) : null,
      isMock: formData.isMock,
      createdAt: new Date(),
    };

    setRecentProps(prev => [newProp, ...prev.slice(0, 4)]);
    setLastCreatedProp(newProp);
    setShowConfirmation(true);
    
    // Reset form
    setFormData({
      sport: "",
      league: "",
      player: "",
      market: "",
      line: "",
      side: "",
      odds: "",
      notes: "",
      isMock: true,
    });
  };

  const handleDiscussWithFynetic = (prop: Prop) => {
    const propText = `${prop.player} ${prop.market} ${prop.side} ${prop.line}${prop.odds ? ` @ ${prop.odds}` : ''}`;
    navigate('/ask', { 
      state: { 
        prefilledText: `Analyze this prop: ${propText}` 
      } 
    });
  };

  const isFormValid = formData.player && formData.market && formData.line && formData.side;

  if (showConfirmation && lastCreatedProp) {
    return (
      <div className="min-h-screen bg-background">
        <div className="border-b border-border bg-surface-2/50 p-4">
          <div className="max-w-4xl mx-auto flex items-center gap-3">
            <Target className="h-6 w-6 text-accent-teal" />
            <h1 className="text-xl font-semibold text-text-primary">Prop Builder</h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto p-4">
          <Card className="bg-surface border-border">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-accent-teal/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-accent-teal" />
              </div>
              <CardTitle className="text-text-primary">Prop Created Successfully!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-surface-2 px-4 py-2 rounded-lg">
                  <span className="font-medium text-text-primary">
                    {lastCreatedProp.player} • {lastCreatedProp.market} {lastCreatedProp.side} {lastCreatedProp.line}
                  </span>
                  {lastCreatedProp.odds && (
                    <Badge variant="outline">@ {lastCreatedProp.odds}</Badge>
                  )}
                  {lastCreatedProp.isMock && (
                    <Badge variant="secondary">Mock</Badge>
                  )}
                </div>
              </div>

              <div className="flex gap-3 justify-center">
                <Button 
                  onClick={() => handleDiscussWithFynetic(lastCreatedProp)}
                  className="bg-accent-teal hover:bg-accent-teal-700"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Discuss this prop with FYNETIC
                </Button>
                <Button variant="outline">
                  <Star className="h-4 w-4 mr-2" />
                  Save to Tracker
                </Button>
              </div>

              <div className="text-center">
                <p className="text-sm text-text-muted mb-4">
                  Prop created. You can analyze it in Ask FYNETIC.
                </p>
                <Button 
                  variant="ghost" 
                  onClick={() => setShowConfirmation(false)}
                >
                  Create Another Prop
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-surface-2/50 p-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Target className="h-6 w-6 text-accent-teal" />
          <h1 className="text-xl font-semibold text-text-primary">Prop Builder</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 grid gap-6 lg:grid-cols-3">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <Card className="bg-surface border-border">
            <CardHeader>
              <CardTitle className="text-text-primary">Build Your Prop</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Sport and League */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sport" className="text-text-primary">Sport</Label>
                    <Select value={formData.sport} onValueChange={(value) => handleInputChange('sport', value)}>
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue placeholder="Select sport" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basketball">Basketball</SelectItem>
                        <SelectItem value="football">Football</SelectItem>
                        <SelectItem value="baseball">Baseball</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="league" className="text-text-primary">League</Label>
                    <Select value={formData.league} onValueChange={(value) => handleInputChange('league', value)}>
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue placeholder="Select league" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nba">NBA</SelectItem>
                        <SelectItem value="nfl">NFL</SelectItem>
                        <SelectItem value="mlb">MLB</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Player */}
                <div>
                  <Label htmlFor="player" className="text-text-primary">Player</Label>
                  <Input
                    id="player"
                    value={formData.player}
                    onChange={(e) => handleInputChange('player', e.target.value)}
                    placeholder="Enter player name"
                    className="bg-background border-border"
                  />
                </div>

                {/* Market */}
                <div>
                  <Label htmlFor="market" className="text-text-primary">Market</Label>
                  <Select value={formData.market} onValueChange={(value) => handleInputChange('market', value)}>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Select market" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="points">Points</SelectItem>
                      <SelectItem value="rebounds">Rebounds</SelectItem>
                      <SelectItem value="assists">Assists</SelectItem>
                      <SelectItem value="3-pointers">3-Pointers</SelectItem>
                      <SelectItem value="steals">Steals</SelectItem>
                      <SelectItem value="blocks">Blocks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Line and Side */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="line" className="text-text-primary">Line</Label>
                    <Input
                      id="line"
                      type="number"
                      step="0.5"
                      value={formData.line}
                      onChange={(e) => handleInputChange('line', e.target.value)}
                      placeholder="e.g., 8.5"
                      className="bg-background border-border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="side" className="text-text-primary">Side</Label>
                    <Select value={formData.side} onValueChange={(value) => handleInputChange('side', value)}>
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue placeholder="Over/Under" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="over">Over</SelectItem>
                        <SelectItem value="under">Under</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Odds (Optional) */}
                <div>
                  <Label htmlFor="odds" className="text-text-primary">Odds (Optional)</Label>
                  <Input
                    id="odds"
                    type="number"
                    value={formData.odds}
                    onChange={(e) => handleInputChange('odds', e.target.value)}
                    placeholder="e.g., -110"
                    className="bg-background border-border"
                  />
                </div>

                {/* Mock Toggle */}
                <div className="flex items-center space-x-2">
                  <Switch
                    id="mock"
                    checked={formData.isMock}
                    onCheckedChange={(checked) => handleInputChange('isMock', checked)}
                  />
                  <Label htmlFor="mock" className="text-text-primary">
                    Mock Prop (for analysis only)
                  </Label>
                </div>

                {/* Notes */}
                <div>
                  <Label htmlFor="notes" className="text-text-primary">Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Add any additional context..."
                    className="bg-background border-border"
                    rows={3}
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={!isFormValid}
                  className="w-full bg-accent-teal hover:bg-accent-teal-700"
                >
                  Create Prop
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Recent Props Sidebar */}
        <div>
          <Card className="bg-surface border-border">
            <CardHeader>
              <CardTitle className="text-text-primary">Recent Props</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentProps.map((prop) => (
                <div key={prop.id} className="p-3 bg-surface-2/50 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {prop.player}
                    </Badge>
                    {prop.isMock && (
                      <Badge variant="secondary" className="text-xs">Mock</Badge>
                    )}
                  </div>
                  <p className="text-sm text-text-primary">
                    {prop.market} {prop.side} {prop.line}
                    {prop.odds && ` @ ${prop.odds}`}
                  </p>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDiscussWithFynetic(prop)}
                    className="w-full text-accent-teal hover:text-accent-teal"
                  >
                    <MessageSquare className="h-3 w-3 mr-2" />
                    Ask FYNETIC
                  </Button>
                </div>
              ))}
              
              {recentProps.length === 0 && (
                <p className="text-sm text-text-muted text-center py-4">
                  No props created yet
                </p>
              )}
              
              <div className="mt-4 p-3 bg-accent-teal/10 rounded-lg">
                <p className="text-sm text-text-muted">
                  You can analyze this immediately in Ask FYNETIC.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}