import { Star } from "lucide-react";
import { useSheet } from "@/hooks/useSheet";
import { transformTestimonials } from "@/services/transformData";
import { SectionHeader } from "./Services";
import { SectionSkeleton } from "../ui/section-skeleton";

export function Testimonials() {
  const { data: raw, loading } = useSheet("testimonials");
  const data = transformTestimonials(raw);
  
  if (loading) return <div className="min-h-[400px]" />;
  if (!raw.length || !data.length) return <SectionSkeleton title="Coming Soon" />;
  
  const doubled = [...data, ...data];

  return (
    <section className="relative py-24 md:py-32">
      <div className="container-prose">
        <SectionHeader kicker="Voices" title="What partners say about working with Syncera" />
      </div>
      <div className="group mt-14 overflow-hidden mask-fade-x">
        <div className="flex w-max animate-marquee-l gap-5 group-hover:[animation-play-state:paused]">
          {doubled.map((t, i) => (
            <figure key={i} className="w-[360px] shrink-0 rounded-2xl border border-border bg-card p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card">
              <div className="flex gap-0.5 text-amber-500">
                {Array.from({ length: t.rating || 5 }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 text-pretty text-sm leading-relaxed text-foreground/90">
                "{t.review}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                {t.profileImage ? (
                  <img 
                    src={t.profileImage || undefined} 
                    alt={t.clientName} 
                    className="h-10 w-10 rounded-full object-cover" 
                    loading="lazy" 
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-sm font-semibold text-brand">
                    {(t.clientName || "A").split(" ").map((s) => s[0]).join("").slice(0, 2)}
                  </div>
                )}
                <div>
                  <div className="text-sm font-semibold text-ink">{t.clientName}</div>
                  <div className="text-xs text-muted-foreground">{t.role}{t.company ? ` · ${t.company}` : ""}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
