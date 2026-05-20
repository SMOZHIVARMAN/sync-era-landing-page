import { useSheet } from "@/hooks/useSheet";
import { transformTech } from "@/services/transformData";
import { SectionHeader } from "./Services";
import { SectionSkeleton } from "../ui/section-skeleton";

export function Technologies() {
  const { data: raw, loading } = useSheet("technologies");
  const data = transformTech(raw);
  
  if (loading) return <div className="min-h-[400px]" />;
  if (!raw.length || !data.length) return <SectionSkeleton title="Coming Soon" />;

  // Dynamic row generation: each row must have exactly 8 items
  const perRow = 8;
  const numRows = Math.ceil(data.length / perRow);
  const rows: typeof data[] = [];
  
  for (let i = 0; i < numRows; i++) {
    const start = i * perRow;
    const chunk = data.slice(start, start + perRow);
    
    // Fill to exactly 8 items by wrapping from the start of the data
    const row = [...chunk];
    while (row.length < perRow && data.length > 0) {
      row.push(...data.slice(0, perRow - row.length));
    }
    rows.push(row);
  }

  return (
    <section className="relative py-24 md:py-32">
      <div className="container-prose">
        <SectionHeader kicker="Our stack" title="A modern, battle-tested toolchain" subtitle="We pick boring where it matters and bold where it pays — always tuned to your team's strengths." />
      </div>
      <div className="mt-14 space-y-6 mask-fade-x">
        {rows.map((row, i) => (
          <MarqueeRow key={i} items={row} reverse={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

function MarqueeRow({ items, reverse }: { items: { name: string; iconUrl: string; category: string }[]; reverse: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="group overflow-hidden">
      <div className={`flex w-max gap-4 ${reverse ? "animate-marquee-r" : "animate-marquee-l"} group-hover:[animation-play-state:paused]`}>
        {doubled.map((t, i) => (
          <div key={i} className="flex w-56 shrink-0 items-center gap-3 rounded-xl border border-border bg-card px-5 py-4 shadow-soft transition-transform hover:-translate-y-0.5">
            {t.iconUrl ? (
              <img 
                src={t.iconUrl || undefined} 
                alt={t.name} 
                className="h-8 w-8 object-contain" 
                loading="lazy" 
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            ) : (
              <div className="h-8 w-8 rounded-lg bg-secondary" />
            )}
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink">{t.name}</p>
              {t.category && <p className="truncate text-xs text-muted-foreground">{t.category}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
