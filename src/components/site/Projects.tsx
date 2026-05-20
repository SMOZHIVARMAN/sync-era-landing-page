import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Calendar, Github, Globe } from "lucide-react";
import * as Icons from "lucide-react";
import { useSheet } from "@/hooks/useSheet";
import { transformProjects, transformStats } from "@/services/transformData";
import { fbProjects, fbStats } from "@/data/fallbacks";
import { SectionHeader } from "./Services";

export function Projects() {
  const { data } = useSheet("projects", transformProjects, fbProjects);
  return (
    <section id="work" className="relative py-24 md:py-32 bg-surface">
      <div className="container-prose">
        <SectionHeader kicker="Selected work" title="Engagements with measurable lift" subtitle="A small set of recent partnerships across fintech, healthcare, logistics and SaaS." />
        <div className="mt-14 grid gap-6 md:grid-cols-6">
          {data.map((p, i) => (
            <article key={p.id} className={`group relative overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-shadow hover:shadow-elev ${p.featured ? "md:col-span-4 md:row-span-2" : "md:col-span-2"}`}>
              <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                {p.image ? (
                  <img src={p.image} alt={p.title} loading="lazy"
                       className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:blur-sm" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand/10 to-success/10">
                    <span className="font-display text-3xl font-bold text-ink/30">{p.title}</span>
                  </div>
                )}
                <div className="absolute inset-0 flex flex-col justify-end gap-3 bg-gradient-to-t from-foreground/85 via-foreground/40 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="translate-y-2 text-sm leading-relaxed text-background transition-transform duration-300 group-hover:translate-y-0">
                    {p.description}
                  </p>
                  <div className="flex translate-y-2 gap-2 transition-transform duration-300 group-hover:translate-y-0">
                    {p.liveUrl && (
                      <a href={p.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-background px-3 py-1.5 text-xs font-semibold text-foreground">
                        <Globe className="h-3.5 w-3.5" /> Live
                      </a>
                    )}
                    {p.githubUrl && (
                      <a href={p.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-background/10 px-3 py-1.5 text-xs font-semibold text-background ring-1 ring-background/30">
                        <Github className="h-3.5 w-3.5" /> Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  {p.category && <span className="rounded-full bg-secondary px-2.5 py-1 font-medium text-foreground/80">{p.category}</span>}
                  {p.date && <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" /> {p.date}</span>}
                </div>
                <h3 className="mt-3 flex items-center justify-between gap-2 font-display text-xl font-semibold text-ink">
                  {p.title}
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                </h3>
                {p.technologies.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.technologies.slice(0, 5).map((t) => (
                      <span key={t} className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-muted-foreground">{t}</span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        <Stats />
      </div>
    </section>
  );
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now(); const dur = 1400;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.floor(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return <span ref={ref}>{n}{suffix}</span>;
}

function Stats() {
  const { data } = useSheet("stats", transformStats, fbStats);
  return (
    <div className="mt-20 grid gap-4 rounded-3xl border border-border bg-card p-6 shadow-card md:grid-cols-4 md:p-8">
      {data.map((s, i) => {
        const C = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[s.icon] ?? Icons.Sparkles;
        return (
          <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
            className="flex flex-col items-start gap-3 rounded-2xl px-4 py-5">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <C className="h-5 w-5" />
            </div>
            <div className="font-display text-4xl font-bold tracking-tight text-ink"><Counter value={s.value} suffix={s.suffix} /></div>
            <div className="text-sm text-muted-foreground">{s.label}</div>
          </motion.div>
        );
      })}
    </div>
  );
}
