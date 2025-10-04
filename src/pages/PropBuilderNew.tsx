import { useEffect, useMemo, useState } from "react";
import { usePremiumGate } from "@/hooks/usePremiumGate";
import PremiumPaywall from "@/components/paywall/PremiumPaywall";
import { VegasLinesService } from "@/lib/vegas/VegasLinesService";
import { loadRecentProps, saveRecentProp } from "@/lib/storage/recentProps";
import PropTicketCard from "@/components/prop/PropTicketCard";
import type { Market, PropTicket, Side, Sport, League, VegasBaseline } from "@/types/props";
import { v4 as uuid } from "uuid";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const SPORTS: Sport[] = ["NBA"];
const LEAGUES: League[] = ["NBA"];
const MARKETS: Market[] = ["PTS", "REB", "AST", "3PM", "PRA", "PR", "RA", "PA"];

export default function PropBuilderNew() {
  const { isPremium } = usePremiumGate();

  const [sport, setSport] = useState<Sport>("NBA");
  const [league, setLeague] = useState<League>("NBA");
  const [player, setPlayer] = useState<string>("");
  const [team, setTeam] = useState<string>("");
  const [market, setMarket] = useState<Market | "">("");
  const [side, setSide] = useState<Side>("over");
  const [line, setLine] = useState<string>("");
  const [odds, setOdds] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [mockOnly, setMockOnly] = useState<boolean>(true);

  const [vegas, setVegas] = useState<VegasBaseline | null>(null);
  const [recent, setRecent] = useState<PropTicket[]>(() => loadRecentProps());
  const [isFetchingVegas, setIsFetchingVegas] = useState(false);

  const isValid = useMemo(() => {
    if (!sport || !league || !player || !market || !side) return false;
    if (line.trim() === "" || isNaN(Number(line))) return false;
    return true;
  }, [sport, league, player, market, side, line]);

  // Fetch vegas baseline when player + market ready
  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (!player || !market) {
        setVegas(null);
        return;
      }
      setIsFetchingVegas(true);
      const baseline = await VegasLinesService.fetchBaseline({ player, market, league: "NBA" });
      if (!cancelled) {
        setVegas(baseline);
        if (baseline && line.trim() === "") {
          setLine(String(baseline.line));
        }
        setIsFetchingVegas(false);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [player, market, league]);

  const onCreate = () => {
    if (!isValid) return;
    const ticket: PropTicket = {
      id: uuid(),
      createdAt: new Date().toISOString(),
      sport,
      league,
      player,
      team: team || undefined,
      market: market as Market,
      line: Number(line),
      side,
      odds: odds.trim() === "" ? null : Number(odds),
      notes: notes.trim() === "" ? null : notes,
      mockOnly,
    };
    saveRecentProp(ticket);
    setRecent(loadRecentProps());
  };

  if (!isPremium) return <PremiumPaywall />;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="max-w-[1100px] mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-1">Prop Builder</h1>
          <p className="text-sm text-white/60">
            Build your props with Vegas baselines, then discuss with FYNETIC.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main form */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-white/10 bg-[var(--surface)]/60 p-6">
              <h2 className="text-lg font-medium mb-4">New Prop</h2>
              <div className="space-y-4">
                {/* Sport */}
                <div>
                  <label className="block text-sm font-medium mb-1.5">Sport</label>
                  <Select value={sport} onValueChange={(v) => setSport(v as Sport)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select sport" />
                    </SelectTrigger>
                    <SelectContent>
                      {SPORTS.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* League */}
                <div>
                  <label className="block text-sm font-medium mb-1.5">League</label>
                  <Select value={league} onValueChange={(v) => setLeague(v as League)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select league" />
                    </SelectTrigger>
                    <SelectContent>
                      {LEAGUES.map((l) => (
                        <SelectItem key={l} value={l}>
                          {l}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Player */}
                <div>
                  <label className="block text-sm font-medium mb-1.5">Player</label>
                  <input
                    type="text"
                    value={player}
                    onChange={(e) => setPlayer(e.target.value)}
                    placeholder="e.g., Jayson Tatum"
                    className="w-full px-3 py-2 rounded-lg border border-white/10 bg-[var(--surface)] text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                  />
                </div>

                {/* Team (optional) */}
                <div>
                  <label className="block text-sm font-medium mb-1.5">Team (optional)</label>
                  <input
                    type="text"
                    value={team}
                    onChange={(e) => setTeam(e.target.value)}
                    placeholder="e.g., BOS"
                    className="w-full px-3 py-2 rounded-lg border border-white/10 bg-[var(--surface)] text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                  />
                </div>

                {/* Market */}
                <div>
                  <label className="block text-sm font-medium mb-1.5">Market</label>
                  <Select value={market} onValueChange={(v) => setMarket(v as Market)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select market" />
                    </SelectTrigger>
                    <SelectContent>
                      {MARKETS.map((m) => (
                        <SelectItem key={m} value={m}>
                          {m}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Line */}
                <div>
                  <label className="block text-sm font-medium mb-1.5">Line</label>
                  <input
                    type="text"
                    value={line}
                    onChange={(e) => setLine(e.target.value)}
                    placeholder="e.g., 8.5"
                    className="w-full px-3 py-2 rounded-lg border border-white/10 bg-[var(--surface)] text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                  />
                  {vegas && (
                    <div className="text-[12px] text-white/70 mt-1">
                      Vegas: <span className="text-white">{vegas.line}</span>
                      {typeof vegas.odds === "number" ? <> @ {vegas.odds}</> : null}
                      <span className="text-white/45">
                        {" "}
                        • {new Date(vegas.asOf).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  )}
                  {isFetchingVegas && <div className="text-[12px] text-white/50 mt-1">Checking Vegas baseline…</div>}
                </div>

                {/* Side */}
                <div>
                  <label className="block text-sm font-medium mb-1.5">Side</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setSide("over")}
                      className={`flex-1 px-4 py-2 rounded-lg border transition-all ${
                        side === "over"
                          ? "border-[var(--accent-teal)] bg-[var(--accent-teal)]/10 text-[var(--accent-teal)]"
                          : "border-white/10 text-white/70 hover:border-white/20"
                      }`}
                    >
                      Over
                    </button>
                    <button
                      type="button"
                      onClick={() => setSide("under")}
                      className={`flex-1 px-4 py-2 rounded-lg border transition-all ${
                        side === "under"
                          ? "border-[var(--accent-teal)] bg-[var(--accent-teal)]/10 text-[var(--accent-teal)]"
                          : "border-white/10 text-white/70 hover:border-white/20"
                      }`}
                    >
                      Under
                    </button>
                  </div>
                </div>

                {/* Odds (optional) */}
                <div>
                  <label className="block text-sm font-medium mb-1.5">Odds (optional)</label>
                  <input
                    type="text"
                    value={odds}
                    onChange={(e) => setOdds(e.target.value)}
                    placeholder="e.g., -110"
                    className="w-full px-3 py-2 rounded-lg border border-white/10 bg-[var(--surface)] text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                  />
                </div>

                {/* Notes (optional) */}
                <div>
                  <label className="block text-sm font-medium mb-1.5">Notes (optional)</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any additional context..."
                    rows={3}
                    className="w-full px-3 py-2 rounded-lg border border-white/10 bg-[var(--surface)] text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 resize-none"
                  />
                </div>

                {/* Mock toggle */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="mockOnly"
                    checked={mockOnly}
                    onChange={(e) => setMockOnly(e.target.checked)}
                    className="w-4 h-4 rounded border-white/10"
                  />
                  <label htmlFor="mockOnly" className="text-sm text-white/70">
                    Mock prop (practice mode)
                  </label>
                </div>

                {/* Create button */}
                <button
                  type="button"
                  onClick={onCreate}
                  disabled={!isValid}
                  className="w-full px-4 py-2.5 rounded-lg bg-[var(--accent-teal)]/90 hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed text-black font-medium transition-all"
                >
                  Create Prop
                </button>
              </div>
            </div>
          </div>

          {/* Recent Props sidebar */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-white/10 bg-[var(--surface)]/60 p-6">
              <h2 className="text-lg font-medium mb-4">Recent Props</h2>
              <div className="space-y-3">
                {recent.length === 0 ? (
                  <div className="text-sm text-white/60">No recent props yet.</div>
                ) : (
                  recent.map((t) => (
                    <PropTicketCard
                      key={t.id}
                      ticket={t}
                      baseline={vegas && vegas.player === t.player && vegas.market === t.market ? vegas : null}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Legal disclaimer */}
        <div className="mt-6 text-center text-xs text-white/45">
          Analytics for information only — not betting advice.
        </div>
      </div>
    </div>
  );
}
