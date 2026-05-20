import { useSheet } from "@/hooks/useSheet";
import { transformCareers } from "@/services/transformData";
import { SectionHeader } from "./Services";
import { SectionSkeleton } from "../ui/section-skeleton";
import { ArrowRight, MapPin, Briefcase } from "lucide-react";

export function Careers() {
  const { data: raw, loading } = useSheet("careers");
  const data = transformCareers(raw);

  if (loading) return <div className="min-h-[400px]" />;
  if (!raw.length || !data.length) return <SectionSkeleton title="Coming Soon" />;

  return (
    <section id="careers" className="relative py-24 md:py-32">
      <div className="container-prose">
        <SectionHeader kicker="Join us" title="Build the future of enterprise software" subtitle="We're always looking for senior operators who value craft, autonomy, and impact." />
        <div className="mt-14 space-y-4">
          {data.map((job) => (
            <div key={job.id} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elev md:p-8">
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-xl font-semibold text-ink">{job.position}</h3>
                    <span className="rounded-full bg-brand/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand">
                      {job.employmentType}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Briefcase className="h-4 w-4" />
                      {job.department}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </div>
                  </div>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    {job.description}
                  </p>
                </div>
                <a href={job.applyUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-foreground px-6 py-3 text-sm font-semibold text-background shadow-soft transition-transform group-hover:bg-brand group-hover:text-background md:w-auto">
                  Apply Now <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
