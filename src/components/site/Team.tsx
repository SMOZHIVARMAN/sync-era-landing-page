import { Github, Linkedin, Twitter } from "lucide-react";
import { useSheet } from "@/hooks/useSheet";
import { transformTeam } from "@/services/transformData";
import { fbTeam } from "@/data/fallbacks";
import { SectionHeader } from "./Services";

export function Team() {
  const { data } = useSheet("team", transformTeam, fbTeam);
  if (!data.length) return null;
  return (
    <section id="team" className="relative py-24 md:py-32 bg-surface">
      <div className="container-prose">
        <SectionHeader kicker="The studio" title="A senior team you'd want on the inside" subtitle="Operators with decades of combined experience across product, design and engineering." />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {data.map((m, i) => (
            <article key={i} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-elev">
              <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-brand/10 to-success/10">
                {m.image ? (
                  <img src={m.image} alt={m.name} loading="lazy"
                       className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center font-display text-5xl font-bold text-ink/25">
                    {m.name.split(" ").map((s) => s[0]).join("").slice(0, 2)}
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 flex translate-y-2 gap-2 bg-gradient-to-t from-foreground/70 to-transparent p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {m.linkedin && <a href={m.linkedin} className="rounded-md bg-background/95 p-2 text-foreground"><Linkedin className="h-4 w-4" /></a>}
                  {m.twitter && <a href={m.twitter} className="rounded-md bg-background/95 p-2 text-foreground"><Twitter className="h-4 w-4" /></a>}
                  {m.github && <a href={m.github} className="rounded-md bg-background/95 p-2 text-foreground"><Github className="h-4 w-4" /></a>}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold text-ink">{m.name}</h3>
                <p className="text-xs font-medium uppercase tracking-wider text-brand">{m.role}</p>
                {m.bio && <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.bio}</p>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
