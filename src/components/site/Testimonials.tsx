import { Star } from "lucide-react";
import { useSheet } from "@/hooks/useSheet";
import { transformTestimonials } from "@/services/transformData";
import { SectionHeader } from "./Services";
import { SectionSkeleton } from "../ui/section-skeleton";

export function Testimonials() {
  const { data: raw, loading } = useSheet("testimonials");
  
  // Data Pipeline for Audit/Logs
  const data = transformTestimonials(raw);

  if (loading) return <div className="min-h-[400px]" />;
  
  // Show skeleton if no valid testimonials found after transform
  if (!data.length) return <SectionSkeleton title="Coming Soon" />;
  
  const doubled = [...data, ...data];

  return (
    <section className="relative py-24 md:py-32">
      <div className="container-prose">
        <SectionHeader kicker="Voices" title="What partners say about working with Syncera" />
      </div>
      <div className="group mt-14 overflow-hidden mask-fade-x">
        <div className="flex w-max animate-marquee-l gap-5 group-hover:[animation-play-state:paused]">
          {doubled.map((t, i) => {
            return (
              <figure key={i} className="w-[360px] shrink-0 rounded-2xl border border-border bg-card p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card">
                {/* Dynamic Stars */}
                <div className="flex gap-0.5 text-amber-500">
                  {Array.from({ length: Math.min(Math.max(t.rating || 5, 1), 5) }).map((_, k) => (
                    <Star key={k} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                
                <blockquote className="mt-4 text-pretty text-sm leading-relaxed text-foreground/90">
                  {t.review ? `"${t.review}"` : "Review missing"}
                </blockquote>
                
                <figcaption className="mt-6 flex items-center gap-3">
                  {t.profile_image ? (
                    <img 
                      src={t.profile_image} 
                      alt={t.client_name} 
                      className="h-10 w-10 rounded-full object-cover" 
                      loading="lazy" 
                      onError={(e) => { 
                        e.currentTarget.style.display = 'none'; 
                        // Show fallback initials if image fails
                        const parent = e.currentTarget.parentElement;
                        if (parent && !parent.querySelector('.avatar-fallback')) {
                          const fallback = document.createElement('div');
                          fallback.className = 'avatar-fallback flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-sm font-semibold text-brand';
                          fallback.innerText = (t.client_name || "A").split(" ").map((s) => s[0]).join("").slice(0, 2);
                          parent.appendChild(fallback);
                        }
                      }}
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-sm font-semibold text-brand">
                      {(t.client_name || "A").split(" ").map((s) => s[0]).join("").slice(0, 2)}
                    </div>
                  )}
                  <div>
                    <div className="text-sm font-semibold text-ink">{t.client_name || "Client missing"}</div>
                    <div className="text-xs text-muted-foreground">
                      {t.role}{t.company ? ` · ${t.company}` : ""}
                    </div>
                  </div>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
