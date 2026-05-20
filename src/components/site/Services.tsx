import { useState } from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { useSheet } from "@/hooks/useSheet";
import { transformServices } from "@/services/transformData";
import { SectionSkeleton } from "../ui/section-skeleton";

export function SectionHeader({ kicker, title, subtitle }: { kicker: string; title: string; subtitle?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-brand">{kicker}</p>
      <h2 className="mt-3 text-balance font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">{title}</h2>
      {subtitle && <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

const FALLBACK_ICON = "https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/sparkles.svg";

export function Services() {
  const { data: raw, loading } = useSheet("services");
  const data = transformServices(raw);
  const [flipped, setFlipped] = useState<string | null>(null);

  if (loading) return <div className="min-h-[400px]" />;
  if (!raw.length || !data.length) return <SectionSkeleton title="Coming Soon" />;

  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="container-prose">
        <SectionHeader kicker="What we do" title="Services built for the entire product lifecycle" subtitle="A unified team for strategy, design, engineering and growth — sequenced to compound outcomes." />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.map((s) => {
            const isFlipped = flipped === s.id;
            return (
              <div key={s.id} className={`group relative ${s.featured ? "lg:row-span-1" : ""}`} style={{ perspective: 1200 }}>
                <motion.div
                  onMouseEnter={() => setFlipped(s.id)}
                  onMouseLeave={() => setFlipped(null)}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                  style={{ transformStyle: "preserve-3d", willChange: "transform" }}
                  className="relative h-72 w-full"
                >
                  {/* Front */}
                  <div style={{ 
                         backfaceVisibility: "hidden", 
                         WebkitBackfaceVisibility: "hidden", 
                         transform: "rotateY(0deg) translateZ(1px)",
                         transformStyle: "preserve-3d"
                       }}
                       className="absolute inset-0 z-10 flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-card transition-shadow duration-500 group-hover:shadow-elev">
                    {s.image && (
                      <img src={s.image || undefined} alt="" loading="lazy"
                           className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.08]" 
                           onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                    )}
                    <div className="relative" style={{ transform: "translateZ(20px)" }}>
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                        <img 
                          src={s.icon || FALLBACK_ICON} 
                          alt="" 
                          className="h-5 w-5 object-contain transition-all"
                          style={{ filter: "brightness(0) saturate(100%) invert(43%) sepia(91%) saturate(3042%) hue-rotate(204deg) brightness(96%) contrast(92%)" }}
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src = FALLBACK_ICON;
                          }}
                        />
                      </div>
                      <h3 className="mt-5 font-display text-xl font-semibold text-ink">{s.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                    </div>
                    <div className="relative flex items-center gap-2 text-xs font-medium text-brand" style={{ transform: "translateZ(20px)" }}>
                      Hover to explore <Icons.ArrowUpRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                  {/* Back */}
                  <div style={{ 
                         backfaceVisibility: "hidden", 
                         WebkitBackfaceVisibility: "hidden", 
                         transform: "rotateY(180deg) translateZ(1px)",
                         transformStyle: "preserve-3d"
                       }}
                       className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-foreground p-7 text-background shadow-elev">
                    <div style={{ transform: "translateZ(20px)" }}>
                      <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-background/80">{s.longDescription}</p>
                    </div>
                    <a href="#contact" className="inline-flex items-center gap-1.5 text-xs font-semibold text-background/90 hover:text-background" style={{ transform: "translateZ(20px)" }}>
                      Discuss this engagement <Icons.ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
