import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { PropTicket, PropContextPayload, VegasBaseline } from "@/types/props";
import { VegasLinesService } from "@/lib/vegas/VegasLinesService";

function buildPrefilled(ticket: PropTicket, baseline: VegasBaseline | null) {
  const parts = [`${ticket.player} ${ticket.market} ${ticket.side} ${ticket.line}`];
  if (baseline) parts.push(`(Vegas baseline: ${baseline.line}${baseline.odds ? ` @ ${baseline.odds}` : ""})`);
  return `Analyze ${parts.join(" ")}. Consider matchup, pace, injuries, role changes, and how the Vegas line informs win probability and edge.`;
}

export default function PropTicketCard({ ticket }: { ticket: PropTicket }) {
  const [baseline, setBaseline] = useState<VegasBaseline | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const b = await VegasLinesService.fetchBaseline({ player: ticket.player, market: ticket.market, league: "NBA" });
      if (!cancelled) { setBaseline(b); setLoading(false); }
    })();
    return () => { cancelled = true; };
  }, [ticket.player, ticket.market]);

  const onAsk = () => {
    const prefilledText = buildPrefilled(ticket, baseline);
    const context: PropContextPayload = { type: "prop_ticket", ticket, vegasBaseline: baseline };
    navigate("/ask", { state: { prefilledText, context } });
  };

  return (
    <div className="rounded-xl border border-white/10 bg-[var(--surface)]/60 p-3">
      <div className="text-sm font-medium">{ticket.player}</div>
      <div className="text-[13px] text-white/70">
        {ticket.market} {ticket.side} {ticket.line}{ticket.odds ? `  @ ${ticket.odds}` : ""}
      </div>
      {loading ? (
        <div className="mt-1 text-[12px] text-white/50">Checking Vegas…</div>
      ) : baseline ? (
        <div className="mt-1 text-[12px] text-white/60">
          Vegas: {baseline.line}{baseline.odds ? `  @ ${baseline.odds}` : ""} • <span className="text-white/45">{baseline.source}</span>
        </div>
      ) : null}
      <button
        onClick={onAsk}
        className="mt-2 text-[13px] text-[var(--accent-teal)] hover:brightness-110"
      >
        Ask FYNETIC →
      </button>
    </div>
  );
}
