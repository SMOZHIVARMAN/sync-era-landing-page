import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#team", label: "Team" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "py-2" : "py-4"}`}>
      <div className="container-prose">
        <nav className={`flex items-center justify-between rounded-2xl px-4 py-3 transition-all ${scrolled ? "glass shadow-card" : "bg-transparent"}`}>
          <Link to="/" className="flex items-center gap-2.5">
            <LogoMark className="h-7 w-7" />
            <span className="font-display text-lg font-bold tracking-tight text-ink">Syncera</span>
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                {l.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <a href="#contact" className="hidden rounded-xl bg-foreground px-4 py-2 text-sm font-semibold text-background shadow-soft transition-transform hover:-translate-y-0.5 md:inline-block">
              Start a Project
            </a>
            <button onClick={() => setOpen((o) => !o)} className="rounded-lg p-2 md:hidden" aria-label="Menu">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
        {open && (
          <div className="mt-2 rounded-2xl bg-card p-4 shadow-card md:hidden">
            <div className="flex flex-col gap-3">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm font-medium text-foreground">{l.label}</a>
              ))}
              <a href="#contact" onClick={() => setOpen(false)} className="rounded-xl bg-foreground px-4 py-2 text-center text-sm font-semibold text-background">Start a Project</a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <linearGradient id="lg-brand" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.62 0.2 255)" />
          <stop offset="100%" stopColor="oklch(0.48 0.2 260)" />
        </linearGradient>
      </defs>
      <path
        d="M32 6 C18 6 10 16 10 28 C10 42 22 50 32 58 C42 50 54 42 54 28 C54 16 46 6 32 6 Z"
        fill="none" stroke="url(#lg-brand)" strokeWidth="3.5" strokeLinecap="round"
      />
      <path d="M44 14 L50 18 L46 24" fill="none" stroke="url(#lg-brand)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <g fill="url(#lg-brand)">
        <rect x="20" y="32" width="5" height="12" rx="1.2" />
        <rect x="28" y="26" width="5" height="18" rx="1.2" />
        <rect x="36" y="20" width="5" height="24" rx="1.2" />
      </g>
    </svg>
  );
}
