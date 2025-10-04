export default function PremiumPaywall() {
  return (
    <div className="max-w-[760px] mx-auto mt-16 rounded-2xl border border-white/10 bg-[var(--surface)]/60 p-8 text-center">
      <h2 className="text-2xl font-semibold mb-2">Prop Builder is a premium feature</h2>
      <p className="text-white/70">
        Build and analyze your props with Vegas baselines, then chat with FYNETIC for deeper, AI-forward insights.
      </p>
      <div className="mt-5 flex justify-center gap-3">
        <a className="px-4 py-2 rounded-lg bg-[var(--accent-teal)]/90 hover:brightness-110 text-black font-medium" href="#">
          Upgrade to Premium
        </a>
        <a className="px-4 py-2 rounded-lg border border-white/15 hover:bg-white/[0.04]" href="/ask">
          Continue with Ask FYNETIC
        </a>
      </div>
      <div className="mt-4 text-xs text-white/45">
        Analytics for information only — not betting advice.
      </div>
    </div>
  );
}
