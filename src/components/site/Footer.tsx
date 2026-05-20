import * as Icons from "lucide-react";
import { useSheet } from "@/hooks/useSheet";
import { transformSocial, transformContacts } from "@/services/transformData";
import { fbSocial, fbContacts } from "@/data/fallbacks";
import { LogoMark } from "./Navbar";

export function Footer() {
  const { data: social } = useSheet("social", transformSocial, fbSocial);
  const { data: contacts } = useSheet("contacts", transformContacts, fbContacts);

  return (
    <footer className="relative overflow-hidden bg-footer text-background">
      <div className="absolute inset-x-0 top-0 h-px bg-background/10" />
      <div className="container-prose py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <LogoMark className="h-7 w-7" />
              <span className="font-display text-xl font-bold tracking-tight text-background">Syncera</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-background/70">
              A premium digital agency partnering with ambitious teams to design, build, and scale software that moves the business.
            </p>
            <div className="mt-6 flex gap-2">
              {social.map((s, i) => {
                const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[s.icon] ?? Icons.Link;
                return (
                  <a key={i} href={s.url} aria-label={s.platform}
                     className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-footer-2 text-background/80 transition hover:bg-brand hover:text-background">
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <FooterCol title="Company" links={[["About", "#"],["Work","#work"],["Process","#process"],["Team","#team"]]} />
          <FooterCol title="Services" links={[["Product","#services"],["Engineering","#services"],["Design","#services"],["Growth","#services"]]} />

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-background/60">Contact</h4>
            <ul className="mt-4 space-y-2 text-sm text-background/80">
              {contacts.email && <li><a href={`mailto:${contacts.email}`} className="hover:text-background">{contacts.email}</a></li>}
              {contacts.phone && <li><a href={`tel:${contacts.phone}`} className="hover:text-background">{contacts.phone}</a></li>}
              {contacts.address && <li className="text-background/60">{contacts.address}</li>}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-background/10 pt-8 text-xs text-background/60 sm:flex-row">
          <p>© {new Date().getFullYear()} Syncera. All rights reserved.</p>
          <p>Crafted with intention.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-widest text-background/60">{title}</h4>
      <ul className="mt-4 space-y-2 text-sm text-background/80">
        {links.map(([l, h]) => (
          <li key={l}><a href={h} className="transition hover:text-background">{l}</a></li>
        ))}
      </ul>
    </div>
  );
}
