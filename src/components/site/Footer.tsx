import * as Icons from "lucide-react";
import { useSheet } from "@/hooks/useSheet";
import { transformSocial, transformSettings, type SocialLink } from "@/services/transformData";
import { LogoMark } from "./Navbar";
import { SectionSkeleton } from "../ui/section-skeleton";

export function Footer() {
  const { data: rawSocial } = useSheet("social");
  const social = transformSocial(rawSocial);
  
  const { data: rawSettings, loading } = useSheet("Site_setting");
  const settings = transformSettings(rawSettings);

  if (loading) return null;

  if (!rawSettings || !rawSettings.length) {
    return <SectionSkeleton title="Coming Soon" />;
  }

  const companyName = settings?.company_name || "Coming Soon";
  const tagline = settings?.tagline || "Coming Soon";

  return (
    <footer className="relative overflow-hidden bg-footer text-background">
      <div className="absolute inset-x-0 top-0 h-px bg-background/10" />
      <div className="container-prose py-20">
        <div className="grid gap-12 text-center md:text-left md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2.5">
              {settings?.logo_url ? (
                <img src={settings.logo_url || undefined} alt={companyName} className="h-7 w-auto" onError={(e) => e.currentTarget.style.display='none'} />
              ) : (
                <LogoMark className="h-7 w-7" />
              )}
              <span className="font-display text-xl font-bold tracking-tight text-background">{companyName}</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-background/70">
              {tagline}
            </p>
            <div className="mt-6 flex justify-center gap-3 md:justify-start">
              {social.map((s, i) => {
                const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[s.icon] ?? Icons.Link;
                return (
                  <a key={i} href={s.url} aria-label={s.platform}
                     className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-footer-2 text-background/80 transition hover:bg-brand hover:text-background">
                    <Icon className="h-4.5 w-4.5" />
                  </a>
                );
              })}
            </div>
          </div>

          <FooterCol title="Company" links={[["About", "#"],["Work","#work"],["Process","#process"],["Team","#team"]]} />
          <FooterCol title="Services" links={[["Product","#services"],["Engineering","#services"],["Design","#services"],["Growth","#services"]]} />

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-background/60">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-background/80">
              {settings?.email && <li><a href={`mailto:${settings.email}`} className="min-h-[32px] inline-flex items-center hover:text-background">{settings.email}</a></li>}
              {settings?.phone && <li><a href={`tel:${settings.phone}`} className="min-h-[32px] inline-flex items-center hover:text-background">{settings.phone}</a></li>}
              {settings?.address && <li className="text-background/60 leading-relaxed">{settings.address}</li>}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-background/10 pt-8 text-xs text-background/60 sm:flex-row">
          <p>© {new Date().getFullYear()} {companyName}. All rights reserved.</p>
          <p>Crafted with intention.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div className="flex flex-col items-center md:items-start">
      <h4 className="text-xs font-semibold uppercase tracking-widest text-background/60">{title}</h4>
      <ul className="mt-4 space-y-3 text-sm text-background/80">
        {links.map(([l, h]) => (
          <li key={l}><a href={h} className="min-h-[32px] inline-flex items-center transition hover:text-background">{l}</a></li>
        ))}
      </ul>
    </div>
  );
}
