import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useSheet } from "@/hooks/useSheet";
import { transformFaq } from "@/services/transformData";
import { SectionHeader } from "./Services";
import { SectionSkeleton } from "../ui/section-skeleton";

export function FAQ() {
  const { data: raw, loading } = useSheet("faq");
  const data = transformFaq(raw);
  
  const grouped = (() => {
    const map = new Map<string, typeof data>();
    data.forEach((f) => {
      const k = f.category || "General";
      if (!map.has(k)) map.set(k, []);
      map.get(k)!.push(f);
    });
    return Array.from(map.entries());
  })();

  if (loading) return <div className="min-h-[400px]" />;
  if (!raw.length || !data.length) return <SectionSkeleton title="Coming Soon" />;

  return (
    <section id="faq" className="relative py-24 md:py-32">
      <div className="container-prose">
        <SectionHeader kicker="Questions" title="Things people often ask us" />
        <div className="mx-auto mt-14 max-w-3xl space-y-10">
          {grouped.map(([cat, items]) => (
            <div key={cat}>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{cat}</h3>
              <div className="divide-y divide-border rounded-2xl border border-border bg-card shadow-soft">
                {items.map((f, i) => <FaqItem key={i} q={f.question} a={f.answer} />)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-center justify-between gap-6 px-4 sm:px-6 py-5 text-left">
        <span className="text-base font-medium text-ink">{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
            <p className="px-4 sm:px-6 pb-5 text-sm leading-relaxed text-muted-foreground">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
