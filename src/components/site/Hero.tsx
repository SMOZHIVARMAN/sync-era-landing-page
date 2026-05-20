import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useSheet } from "@/hooks/useSheet";
import { transformHero, transformClients } from "@/services/transformData";
import { LogoMark } from "./Navbar";
import { SectionSkeleton } from "../ui/section-skeleton";
import blueArrowAsset from "@/assets/blue_arrow.png";

export function Hero() {
  const { data: raw, loading } = useSheet("hero");
  const data = transformHero(raw);
  console.log("Transformed Hero:", data);

  // 3D tilt
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 120, damping: 14 });
  const sy = useSpring(y, { stiffness: 120, damping: 14 });
  const rotateY = useTransform(sx, [-1, 1], [-22, 22]);
  const rotateX = useTransform(sy, [-1, 1], [16, -16]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set(((e.clientX - r.left) / r.width) * 2 - 1);
    y.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };
  const reset = () => { x.set(0); y.set(0); };

  if (loading) return <div className="h-[100vh] flex items-center justify-center"><span className="animate-pulse text-muted-foreground font-medium">Syncing...</span></div>;
  if (!raw.length || !data?.heading) return <SectionSkeleton title="Coming Soon" />;

  const renderHeading = (text: string) => {
    if (!text) return null;
    const words = text.split(" ");
    return words.map((word, i) => {
      let colorClass = "text-ink";
      let cleanWord = word;
      
      // Last two words = blue
      if (i >= words.length - 2) {
        colorClass = "text-brand-soft";
      } 
      // Highlighted words in {word}
      else if (word.startsWith("{") && word.endsWith("}")) {
        colorClass = "text-brand";
        cleanWord = word.slice(1, -1);
      }
      
      return (
        <span key={i} className={colorClass}>
          {cleanWord}{" "}
        </span>
      );
    });
  };

  return (
    <section className="relative h-[100vh] min-h-[700px] flex flex-col justify-center overflow-hidden">
      {/* 0. Background Wash (z-0) - Subtle bluish atmosphere */}
      <div aria-hidden className="absolute inset-0 bg-white z-0" />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_10%_90%,rgba(37,99,235,0.22),transparent_50%),radial-gradient(circle_at_90%_50%,rgba(37,99,235,0.18),transparent_60%)] z-0" />

      {/* 1. Background Grid (z-[1]) */}
      <div aria-hidden className="absolute inset-0 grid-bg opacity-50 z-[1]" />

      {/* 2. Large Decorative Arrow (z-[2]) - Corrected trajectory: starts bottom-left, ends far right-middle */}
      <div aria-hidden className="absolute inset-0 pointer-events-none select-none z-[2]">
        <img 
          src={blueArrowAsset} 
          alt="" 
          className="absolute -left-[22%] -bottom-[25%] w-[165%] max-w-[2400px] h-auto opacity-[0.75] object-contain origin-bottom-left brightness-95 saturate-[1.2] mix-blend-multiply transition-all duration-700" 
        />
      </div>

      {/* 3. Hero Glow Effects (z-[3]) */}
      <div aria-hidden className="absolute -top-32 right-[-10%] h-[520px] w-[520px] rounded-full bg-brand/15 blur-3xl z-[3]" />
      <div aria-hidden className="absolute -bottom-40 left-[-10%] h-[420px] w-[420px] rounded-full bg-success/15 blur-3xl z-[3]" />

      <div className="container-prose relative z-10 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* 4. Hero Content (Text Side) */}
        <div>
          {data?.badge_image ? (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="mb-6">
              <img src={data.badge_image} alt="Badge" className="h-8 w-auto object-contain" onError={(e) => e.currentTarget.style.display='none'} />
            </motion.div>
          ) : data?.badge && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-soft backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-brand" />
              {data.badge}
            </motion.div>
          )}

          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-6 text-balance font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            {renderHeading(data.heading)}
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {data?.subheading}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-9 flex flex-wrap items-center gap-3">
            {data?.ctaPrimary && (
              <a href="#contact" className="group inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-semibold text-background shadow-elev transition-transform hover:-translate-y-0.5">
                {data.ctaPrimary}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            )}
            {data?.ctaSecondary && (
              <a href="#work" className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-5 py-3 text-sm font-semibold text-foreground shadow-soft transition-colors hover:bg-secondary">
                {data.ctaSecondary}
              </a>
            )}
          </motion.div>
        </div>

        {/* 5. Hero Image Card (Visual Side) */}
        <div className="relative mx-auto w-full max-w-md" style={{ perspective: 1400 }}>
          <motion.div
            onMouseMove={handleMove}
            onMouseLeave={reset}
            style={{ rotateX: rotateX || 0, rotateY: rotateY || 0, transformStyle: "preserve-3d" }}
            className="relative aspect-square w-full rounded-[2rem] border border-border bg-gradient-to-br from-white via-surface to-surface-2 shadow-elev overflow-hidden"
          >
            {data?.image ? (
              <div style={{ transform: "translateZ(0px)" }} className="absolute inset-0">
                <img 
                  src={data.image || undefined} 
                  alt="" 
                  className="h-full w-full object-cover" 
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
            ) : (
              <>
                <div aria-hidden className="absolute inset-6 rounded-[1.5rem] border border-border/60" />
                <div aria-hidden className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.10),transparent_55%)]" />

                <motion.div
                  style={{ transformStyle: "preserve-3d", translateZ: 60 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <motion.div animate={{ y: [-8, 8, -8] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
                    <LogoMark className="h-44 w-44 drop-shadow-[0_20px_30px_rgba(37,99,235,0.25)]" />
                  </motion.div>
                </motion.div>
              </>
            )}

            <div style={{ transform: "translateZ(40px)" }} className="absolute left-6 top-6 rounded-full bg-white/80 px-3 py-1 text-[11px] font-medium text-muted-foreground shadow-soft backdrop-blur">
              SYNCERA · v9
            </div>
            <div style={{ transform: "translateZ(40px)" }} className="absolute bottom-6 right-6 inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1 text-[11px] font-medium text-muted-foreground shadow-soft backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-success" /> Live build
            </div>
          </motion.div>
          <div aria-hidden className="mx-auto mt-6 h-8 w-2/3 rounded-[100%] bg-foreground/10 blur-xl" />
        </div>
      </div>

      <ClientStrip />
    </section>
  );
}

function ClientStrip() {
  const { data: raw, loading } = useSheet("clients");
  const data = transformClients(raw);

  if (loading || !raw.length || !data.length) return null;

  // Duplicate data for seamless looping
  const duplicatedData = [...data, ...data];

  return (
    <div className="container-prose mt-20 relative z-10">
      <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
        Trusted by teams at
      </p>
      <div className="relative mt-8 overflow-hidden">
        {/* Faded edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent" />

        <motion.div
          className="flex w-fit items-center gap-12 py-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          whileHover={{ animationPlayState: "paused" }}
          style={{ cursor: "default" }}
        >
          {duplicatedData.map((c, i) => (
            <div key={i} className="flex flex-none items-center justify-center text-muted-foreground/80">
              {c.logo ? (
                <img 
                  src={c.logo || undefined} 
                  alt={c.name} 
                  className="h-7 w-auto opacity-60 transition hover:opacity-100" 
                  loading="lazy" 
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              ) : (
                <span className="font-display text-lg font-semibold tracking-tight whitespace-nowrap">{c.name}</span>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
