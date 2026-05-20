import { useState } from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { useSheet } from "@/hooks/useSheet";
import { transformValues } from "@/services/transformData";
import { SectionHeader } from "./Services";
import { SectionSkeleton } from "../ui/section-skeleton";

function Icon({ name, className }: { name: string; className?: string }) {
  const C = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[name] ?? Icons.Sparkles;
  return <C className={className} />;
}

export function Values() {
  const { data: raw, loading } = useSheet("values");
  const data = transformValues(raw);
  const [hover, setHover] = useState<number | null>(null);

  if (loading) return <div className="min-h-[400px]" />;
  if (!raw.length || !data.length) return <SectionSkeleton title="Coming Soon" />;

  return (
    <section className="relative py-24 md:py-32">
      <div className="container-prose">
        <SectionHeader kicker="Our values" title="Our Values" subtitle="The principles that guide our work and relationships" />
        <div className="mt-14 grid gap-4 md:grid-cols-2" onMouseLeave={() => setHover(null)}>
          {data.map((v, i) => {
            const active = hover === i;
            const dim = hover !== null && !active;
            return (
              <motion.div key={v.title}
                onMouseEnter={() => setHover(i)}
                animate={{
                  scale: active ? 1.04 : dim ? 0.97 : 1,
                  opacity: dim ? 0.55 : 1,
                }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className={`relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-soft ${active ? "shadow-elev" : ""}`}
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-success/10 text-success">
                  <Icon name={v.icon} className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-ink">{v.title}</h3>
                <motion.p
                  animate={{ opacity: active ? 1 : 0.7, height: "auto" }}
                  className="mt-2 text-sm leading-relaxed text-muted-foreground"
                >
                  {v.desc}
                </motion.p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
