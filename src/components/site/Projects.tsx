import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Calendar, Github, Globe } from "lucide-react";
import * as Icons from "lucide-react";
import { useSheet } from "@/hooks/useSheet";
import { transformProjects, transformStats } from "@/services/transformData";
import { SectionHeader } from "./Services";
import { SectionSkeleton } from "../ui/section-skeleton";

export function Projects() {
  const { data: raw, loading } = useSheet("projects");
  const data = transformProjects(raw);

  return (
    <section id="work" className="relative py-24 md:py-32 bg-surface min-h-[400px]">
      {loading ? (
        <div className="flex h-40 items-center justify-center">
          <span className="text-muted-foreground font-medium animate-pulse">Syncing Projects...</span>
        </div>
      ) : !data.length ? (
        <SectionSkeleton title="Coming Soon" />
      ) : (
        <div className="container-prose">
          <SectionHeader 
            kicker="Selected work" 
            title="Projects that deliver measurable impact" 
            subtitle="A small set of recent partnerships across fintech, healthcare, logistics and SaaS." 
          />
          
          {/* Dynamic 2-column grid for portfolio rectangular cards */}
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {data.map((p) => (
              <motion.article 
                key={p.id} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-card transition-all duration-500 hover:shadow-elev"
              >
                {/* Image / Background Area */}
                <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                  {p.gallery && p.gallery[0] ? (
                    <img 
                      src={p.gallery[0] || undefined} 
                      alt={p.title} 
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:blur-sm" 
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand/5 to-brand/10 group-hover:blur-sm transition-all duration-700">
                      <span className="font-display text-4xl font-bold text-brand/20 select-none uppercase tracking-tighter">{p.title}</span>
                    </div>
                  )}

                  {/* Hover Reveal: Full Description */}
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-foreground/60 p-8 opacity-0 backdrop-blur-md transition-opacity duration-500 group-hover:opacity-100">
                    <p className="text-center text-sm leading-relaxed text-background/90">
                      {p.fullDescription || p.description}
                    </p>
                  </div>

                  {/* Status Badge */}
                  {p.status?.toLowerCase() === "completed" && (
                    <div className="absolute left-4 top-4 z-20 rounded-full bg-success/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-background shadow-soft backdrop-blur-sm">
                      Completed
                    </div>
                  )}
                </div>

                {/* Content Area */}
                <div className="flex flex-1 flex-col p-8">
                  {/* Top Row: Title + Client + Links */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="truncate font-display text-2xl font-bold tracking-tight text-ink">
                        {p.title}
                      </h3>
                      <p className="mt-1 text-xs font-medium uppercase tracking-widest text-brand">
                        {p.client}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      {p.liveUrl && (
                        <a 
                          href={p.liveUrl} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-foreground text-background shadow-soft transition-transform hover:-translate-y-0.5 active:scale-95"
                          title="View Live"
                        >
                          <Globe className="h-4 w-4" />
                        </a>
                      )}
                      {p.githubUrl && (
                        <a 
                          href={p.githubUrl} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-white text-foreground shadow-soft transition-transform hover:-translate-y-0.5 active:scale-95"
                          title="Source Code"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Middle Area: Short Desc + Date */}
                  <div className="mt-6 flex items-baseline justify-between gap-4">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {p.description}
                    </p>
                    {p.date && (
                      <span className="shrink-0 text-[11px] font-medium text-muted-foreground/60 uppercase">
                        {p.date}
                      </span>
                    )}
                  </div>

                  {/* Bottom Area: Dynamic Tech Chips */}
                  {p.technologies && p.technologies.length > 0 && (
                    <div className="mt-8 flex flex-wrap gap-2">
                      {p.technologies.map((t) => (
                        <span 
                          key={t} 
                          className="rounded-lg bg-secondary/80 px-2.5 py-1 text-[11px] font-semibold text-foreground/70 ring-1 ring-inset ring-foreground/5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </div>

          <Stats />
        </div>
      )}
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

const STAT_FALLBACK = "https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/sparkles.svg";

function Stats() {
  const { data: raw, loading } = useSheet("stats");
  const data = transformStats(raw);
  if (loading || !raw.length || !data.length) return null;

  return (
    <div className="mt-20 grid gap-4 rounded-3xl border border-border bg-card p-6 shadow-card md:grid-cols-4 md:p-8">
      {data.map((s, i) => {
        return (
          <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
            className="flex flex-col items-start gap-3 rounded-2xl px-4 py-5">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <img 
                src={s.icon || STAT_FALLBACK} 
                alt={s.label} 
                className="h-7 w-7 object-contain"
                style={{ filter: "brightness(0) saturate(100%) invert(43%) sepia(91%) saturate(3042%) hue-rotate(204deg) brightness(96%) contrast(92%)" }}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = STAT_FALLBACK;
                }}
              />
            </div>
            <div className="font-display text-4xl font-bold tracking-tight text-ink">
              <Counter value={s.value || 0} suffix={s.suffix || ""} />
            </div>
            <div className="text-sm text-muted-foreground">{s.label}</div>
          </motion.div>
        );
      })}
    </div>
  );
}
