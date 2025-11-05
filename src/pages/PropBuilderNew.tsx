import { useEffect, useMemo, useState } from "react";
import { usePremiumGate } from "@/hooks/usePremiumGate";
import PremiumPaywall from "@/components/paywall/PremiumPaywall";
import { VegasLinesService } from "@/lib/vegas/VegasLinesService";
import { loadRecentProps, saveRecentProp } from "@/lib/storage/recentProps";
import PropTicketCard from "@/components/prop/PropTicketCard";
import SectionCard from "@/components/ui/SectionCard";
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

  const hasBaseline = !!vegas;
  const numericLine = Number(line);
  const edge = hasBaseline && !isNaN(numericLine) ? (numericLine - vegas!.line) : null;

  return (
    <div className="max-w-[1100px] mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-2">Prop Builder</h1>
      <p className="text-white/60 mb-6">Build your props with Vegas baselines, then discuss with FYNETIC.</p>

      <div className="grid md:grid-cols-[minmax(0,1fr)_360px] gap-6">
        {/* Main form */}
        <SectionCard title="New Prop">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Sport */}
            <div>
              <label className="block text-sm text-white/70 mb-1.5">Sport</label>
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
              <label className="block text-sm text-white/70 mb-1.5">League</label>
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
            <div className="md:col-span-2">
              <label className="block text-sm text-white/70 mb-1.5">Player</label>
              <input
                type="text"
                value={player}
                onChange={(e) => setPlayer(e.target.value)}
                placeholder="e.g., Jayson Tatum"
                className="w-full px-3 py-2 rounded-lg border border-white/10 bg-[var(--surface)] text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
              <p className="mt-1 text-[12px] text-white/45">Full name preferred for Vegas lookup.</p>
            </div>

            {/* Team (optional) */}
            <div>
              <label className="block text-sm text-white/70 mb-1.5">Team (optional)</label>
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
              <label className="block text-sm text-white/70 mb-1.5">Market</label>
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
            <div className="md:col-span-2">
              <label className="block text-sm text-white/70 mb-1.5">Line</label>
              <input
                type="text"
                value={line}
                onChange={(e) => setLine(e.target.value)}
                placeholder="e.g., 8.5"
                className="w-full px-3 py-2 rounded-lg border border-white/10 bg-[var(--surface)] text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
              {/* Vegas chip + edge */}
              {vegas && (
                <div className="mt-2 flex items-center gap-3 text-[12px] flex-wrap">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/10">
                    Vegas: <span className="text-white/90">{vegas.line}</span>
                    {typeof vegas.odds === "number" && <span className="text-white/70">@ {vegas.odds}</span>}
                    <span className="text-white/45">• {new Date(vegas.asOf).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span>
                  </span>
                  {edge !== null && (
                    <span className={
                      "inline-flex items-center gap-1 px-2 py-0.5 rounded-full border " +
                      (edge > 0.01 ? "border-primary-500 text-primary-400 bg-primary-500/10" :
                       edge < -0.01 ? "border-white/15 text-white/70 bg-white/[0.04]" :
                                      "border-white/10 text-white/60 bg-white/[0.04]")}
                    >
                      {edge > 0 ? `+${edge.toFixed(1)}` : edge.toFixed(1)} vs Vegas
                    </span>
                  )}
                </div>
              )}
              {isFetchingVegas && <div className="mt-1 text-[12px] text-white/50">Checking Vegas baseline…</div>}
            </div>

            {/* Side */}
            <div className="md:col-span-2">
              <label className="block text-sm text-white/70 mb-1.5">Side</label>
              <div className="mt-1 flex rounded-lg border border-white/10 overflow-hidden w-fit">
                <button
                  type="button"
                  onClick={() => setSide("over")}
                  className={"px-4 py-2 text-sm transition-colors " + (side === "over"
                    ? "bg-primary-500/10 text-primary-400 border-r border-white/10"
                    : "text-white/70 hover:bg-white/[0.04] border-r border-white/10")}
                >
                  Over
                </button>
                <button
                  type="button"
                  onClick={() => setSide("under")}
                  className={"px-4 py-2 text-sm transition-colors " + (side === "under"
                    ? "bg-primary-500/10 text-primary-400"
                    : "text-white/70 hover:bg-white/[0.04]")}
                >
                  Under
                </button>
              </div>
            </div>

            {/* Odds */}
            <div>
              <label className="block text-sm text-white/70 mb-1.5">Odds (optional)</label>
              <input
                type="text"
                value={odds}
                onChange={(e) => setOdds(e.target.value)}
                placeholder="e.g., -110"
                className="w-full px-3 py-2 rounded-lg border border-white/10 bg-[var(--surface)] text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
              <p className="mt-1 text-[12px] text-white/45">American odds. Positive or negative values allowed.</p>
            </div>

            {/* Notes */}
            <div className="md:col-span-2">
              <label className="block text-sm text-white/70 mb-1.5">Notes (optional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Any additional context..."
                className="w-full px-3 py-2 rounded-lg border border-white/10 bg-[var(--surface)] text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 resize-none"
              />
            </div>

            {/* Mock toggle */}
            <div className="md:col-span-2 flex items-center gap-2">
              <input
                type="checkbox"
                id="mockOnly"
                checked={mockOnly}
                onChange={(e) => setMockOnly(e.target.checked)}
                className="w-4 h-4 rounded border-white/10"
              />
              <label htmlFor="mockOnly" className="text-[13px] text-white/70">
                Mock prop (practice mode)
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="mt-5">
            <button
              type="button"
              disabled={!isValid}
              onClick={onCreate}
              className={
                "px-4 py-2.5 rounded-lg font-medium transition-all " +
                (isValid
                  ? "bg-primary-500 text-black hover:bg-primary-600 hover:shadow-[0_0_0_3px_rgba(0,224,106,0.25)]"
                  : "bg-white/[0.06] text-white/40 cursor-not-allowed")
              }
            >
              Create Prop
            </button>
          </div>
        </SectionCard>

        {/* Recent Props sidebar */}
        <SectionCard title="Recent Props">
          {recent.length === 0 ? (
            <div className="text-sm text-white/60">No recent props yet.</div>
          ) : (
            <div className="space-y-3">
              {recent.map((t) => (
                <PropTicketCard key={t.id} ticket={t} onRemoved={() => setRecent(loadRecentProps())} />
              ))}
            </div>
          )}
          <div className="mt-4 text-xs text-white/45">You can analyze any ticket immediately in Ask FYNETIC.</div>
        </SectionCard>
      </div>

      <div className="text-xs text-white/45 mt-6 text-center">
        Analytics for information only — not betting advice.
      </div>
    </div>
  );
}
