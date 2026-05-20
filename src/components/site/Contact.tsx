import { useState } from "react";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { useSheet } from "@/hooks/useSheet";
import { transformContacts } from "@/services/transformData";
import { SectionSkeleton } from "../ui/section-skeleton";

export function Contact() {
  const { data: raw, loading } = useSheet("contacts");
  const data = transformContacts(raw);
  const [sent, setSent] = useState(false);

  if (loading) return <div className="min-h-[600px]" />;
  if (!raw.length || !data || Object.keys(data).length === 0) return <SectionSkeleton title="Coming Soon" />;

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="container-prose">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-foreground to-[oklch(0.22_0.04_255)] p-10 text-background shadow-elev md:p-16">
          <div className="relative mx-auto max-w-3xl text-center">
            <h2 className="text-balance font-display text-4xl font-bold tracking-tight md:text-5xl">
              Let's build something exceptional together.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-background/75">
              Tell us about your goals — we'll respond within one business day with a structured next step.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="#start" className="group inline-flex items-center gap-2 rounded-xl bg-background px-5 py-3 text-sm font-semibold text-foreground shadow-elev transition-transform hover:-translate-y-0.5">
                Start a Project <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#work" className="inline-flex items-center gap-2 rounded-xl border border-background/20 px-5 py-3 text-sm font-semibold text-background hover:bg-background/10">
                View Our Work
              </a>
            </div>
          </div>
        </div>

        <div id="start" className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand">Get in touch</p>
            <h3 className="mt-3 font-display text-3xl font-bold text-ink">A senior partner replies, always.</h3>
            <p className="mt-3 text-muted-foreground">No SDR funnels. Your first conversation is with someone who will work on the engagement.</p>
            <div className="mt-8 space-y-4">
              {data?.email && <ContactRow icon={<Mail className="h-4 w-4" />} label="Email" value={data.email} href={`mailto:${data.email}`} />}
              {data?.phone && <ContactRow icon={<Phone className="h-4 w-4" />} label="Phone" value={data.phone} href={`tel:${data.phone}`} />}
              {data?.address && <ContactRow icon={<MapPin className="h-4 w-4" />} label="Studios" value={data.address} />}
            </div>
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="rounded-2xl border border-border bg-card p-6 shadow-card md:p-8"
          >
            {sent ? (
              <div className="flex h-full min-h-[320px] flex-col items-center justify-center text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-success/15 text-success">✓</div>
                <h4 className="mt-4 font-display text-xl font-semibold text-ink">Thanks — we'll be in touch.</h4>
                <p className="mt-2 text-sm text-muted-foreground">We typically reply within one business day.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                <Field label="Name" name="name" />
                <Field label="Email" name="email" type="email" />
                <Field label="Company" name="company" />
                <Field label="Tell us about the project" name="message" textarea />
                <button type="submit" className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-semibold text-background shadow-elev transition-transform hover:-translate-y-0.5">
                  Send message <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const Inner = (
    <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft transition-shadow hover:shadow-card">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">{icon}</div>
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold text-ink">{value}</p>
      </div>
    </div>
  );
  return href ? <a href={href}>{Inner}</a> : Inner;
}

function Field({ label, name, type = "text", textarea = false }: { label: string; name: string; type?: string; textarea?: boolean }) {
  const cls = "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/15";
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
      {textarea ? <textarea name={name} rows={4} className={cls} /> : <input name={name} type={type} className={cls} />}
    </label>
  );
}
