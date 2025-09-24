export const demoSlate = [
  { id: "g1", matchup: "Bills @ Chiefs", time: "8:20 PM EST", note: "High-tempo, pass leaning" },
  { id: "g2", matchup: "Eagles @ Cowboys", time: "4:25 PM EST", note: "Competitive, close spread" },
  { id: "g3", matchup: "Rams @ 49ers", time: "1:00 PM EST", note: "Defensive edges on ground" },
];

export const demoSlip = [
  { id: "p1", title: "Josh Allen Over 1.5 Pass TDs", price: -115 },
  { id: "p2", title: "Travis Kelce Over 6.5 Receptions", price: -110 },
];

export const demoMessages = [
  { role: "system" as const, text: "FYNETIC provides informational insights, not betting advice." },
  { role: "user" as const, text: "What stands out in Bills @ Chiefs tonight?" },
  { 
    role: "assistant" as const, 
    text: "Two angles stand out:\n• Pace & pass rate → QB passing yards\n• Tight spread → WR receptions\nLast 5: Allen avg **271 yds** vs typical line **259.5**; KC pass D mid-tier. Want a prop suggestion?",
    actions: ["Suggest a prop", "Open team matchups", "Explain volatility"]
  },
  { role: "user" as const, text: "Suggest a safe option." },
  { 
    role: "assistant" as const, 
    text: "**Josh Allen Over 1.5 Pass TDs (-115)**\nContext: Last 10 median **2 TDs**; red-zone rate improving; weather stable.\nConfidence: **72/100** (heuristic).",
    actions: ["Add to Slip", "View player trend", "Compare to alt line"]
  }
];

export const shortcuts = [
  { label: "Top Overs", icon: "TrendingUp", color: "bg-success/10 text-success" },
  { label: "QB Passing", icon: "Target", color: "bg-accent/10 text-accent" },
  { label: "Beginner Mode", icon: "Lightbulb", color: "bg-warning/10 text-warning" },
  { label: "Live Games", icon: "Zap", color: "bg-destructive/10 text-destructive" }
];