import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import * as Icons from "lucide-react";
import { useSheet } from "@/hooks/useSheet";
import { transformProcess } from "@/services/transformData";
import { fbProcess } from "@/data/fallbacks";
import { SectionHeader } from "./Services";

function Icon({ name, className }: { name: string; className?: string }) {
  const C = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[name] ?? Icons.Workflow;
  return <C className={className} />;
}

export function Process() {
  const { data } = useSheet("process", transformProcess, fbProcess);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // travel
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66%"]);

  return (
    <section id="process" ref={ref} className="relative" style={{ height: `${data.length * 70}vh` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden bg-surface">
        <div className="container-prose">
          <SectionHeader kicker="How we work" title="A studio operating system, end to end" subtitle="Six phases that turn ambiguity into momentum — with measurable outputs every step of the way." />
        </div>
        <motion.div style={{ x }} className="mt-14 flex w-max gap-6 px-[12vw]">
          {data.map((s, i) => (
            <div key={s.step} className="relative w-[78vw] max-w-[440px] shrink-0 rounded-2xl border border-border bg-card p-8 shadow-card">
              <div className="flex items-center justify-between">
                <span className="font-display text-5xl font-bold text-brand/20">{s.step}</span>
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <Icon name={s.icon} className="h-5 w-5" />
                </div>
              </div>
              <h3 className="mt-6 font-display text-2xl font-semibold text-ink">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
              {i < data.length - 1 && (
                <div className="absolute right-[-26px] top-1/2 hidden h-[2px] w-6 bg-gradient-to-r from-border to-transparent md:block" />
              )}
            </div>
          ))}
        </motion.div>
        <p className="container-prose mt-8 text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Scroll to advance →
        </p>
      </div>
    </section>
  );
}
