import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useSheet } from "@/hooks/useSheet";
import { transformSettings } from "@/services/transformData";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#team", label: "Team" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const { data: raw } = useSheet("Site_setting");
  const settings = transformSettings(raw);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-close menu on resize if screen becomes large
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const logoUrl = settings?.logo_url;
  const companyName = settings?.company_name || "Coming Soon";

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "py-2" : "py-4"}`}>
      <div className="container-prose">
        <nav className={`flex items-center justify-between rounded-2xl px-4 py-3 transition-all ${scrolled || open ? "glass shadow-card" : "bg-transparent"}`}>
          <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
            {logoUrl ? (
              <img src={logoUrl || undefined} alt={companyName} className="h-7 w-auto" onError={(e) => e.currentTarget.style.display='none'} />
            ) : (
              <LogoMark className="h-7 w-7" />
            )}
            <span className="font-display text-lg font-bold tracking-tight text-ink">{companyName}</span>
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
            <button 
              onClick={() => setOpen((o) => !o)} 
              className="relative h-10 w-10 rounded-lg p-2 text-ink transition-colors hover:bg-brand/5 md:hidden" 
              aria-label="Toggle Menu"
            >
              <div className="relative h-full w-full">
                <motion.div
                  initial={false}
                  animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
                  className="absolute left-1 top-1/2 h-0.5 w-6 bg-current"
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  initial={false}
                  animate={open ? { opacity: 0 } : { opacity: 1 }}
                  className="absolute left-1 top-1/2 h-0.5 w-6 -translate-y-1/2 bg-current"
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  initial={false}
                  animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
                  className="absolute left-1 top-1/2 h-0.5 w-6 bg-current"
                  transition={{ duration: 0.3 }}
                />
              </div>
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="mt-2 overflow-hidden rounded-2xl glass p-4 shadow-card md:hidden"
            >
              <div className="flex flex-col gap-4 py-2">
                {links.map((l) => (
                  <a 
                    key={l.href} 
                    href={l.href} 
                    onClick={() => setOpen(false)} 
                    className="px-2 text-base font-semibold tracking-tight text-ink transition-colors hover:text-brand"
                  >
                    {l.label}
                  </a>
                ))}
                <div className="mt-2 border-t border-border pt-4">
                  <a 
                    href="#contact" 
                    onClick={() => setOpen(false)} 
                    className="flex h-12 w-full items-center justify-center rounded-xl bg-foreground text-sm font-bold text-background shadow-elev transition-active active:scale-95"
                  >
                    Start a Project
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
