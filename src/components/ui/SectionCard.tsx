export default function SectionCard({ title, subtitle, children }: { title?: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[var(--surface)]/60 p-5">
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h3 className="text-lg font-semibold">{title}</h3>}
          {subtitle && <p className="text-white/60 text-[13px] mt-1">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
}
