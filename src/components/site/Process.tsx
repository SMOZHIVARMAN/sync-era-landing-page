import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useSheet } from "@/hooks/useSheet";
import { transformProcess } from "@/services/transformData";
import { SectionHeader } from "./Services";

export function Process() {
  // 1. DATA SOURCE (STRICT)
  const { data: rawData, loading } = useSheet("process");
  
  // Safe data extraction and transform
  const rawArray = Array.isArray(rawData) ? rawData : [];
  const processSteps = transformProcess(rawArray);

  // 2. SCROLL SETUP (VERTICAL STORYLINE)
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"]
  });

  // Loading protection
  if (loading) {
    return (
      <div className="h-[100vh] flex items-center justify-center">
        <span className="text-muted-foreground font-medium">Loading Story...</span>
      </div>
    );
  }

  // Empty-state protection
  if (!processSteps.length) {
    return (
      <section className="py-24">
        <div className="container-prose text-center">
          <h2 className="text-3xl font-bold text-ink">Our Process</h2>
          <p className="mt-4 text-muted-foreground">Coming Soon</p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-surface/30 overflow-hidden"
    >
      <div className="container-prose relative">
        {/* Section Header */}
        <SectionHeader 
          kicker="How we work" 
          title="A studio operating system, end to end" 
          subtitle="Six phases that turn ambiguity into momentum — with measurable outputs every step of the way." 
        />

        <div className="relative mt-24">
          {/* Central Vertical Line (Base) */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border/40 -translate-x-1/2 hidden md:block" />
          
          {/* Animated Progress Line */}
          <motion.div 
            style={{ 
              scaleY: scrollYProgress,
              originY: 0
            }}
            className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-brand -translate-x-1/2 hidden md:block"
          />

          <div className="space-y-16 md:space-y-24 relative">
            {processSteps.map((item, index) => {
              const isEven = index % 2 === 0;
              const stepId = item.id || index;
              const stepTitle = item.title || "Step";
              const stepDesc = item.description || "";
              const stepIcon = String(item.icon || item.id || index).slice(0, 2);

              return (
                <div 
                  key={stepId} 
                  className={`flex flex-col md:flex-row items-center justify-between ${isEven ? '' : 'md:flex-row-reverse'}`}
                >
                  {/* Card Side */}
                  <div className="w-full md:w-[42%]">
                    <motion.div
                      initial={{ 
                        x: isEven ? -150 : 150, 
                        opacity: 0, 
                        scale: 0.9 
                      }}
                      whileInView={{ 
                        x: 0, 
                        opacity: 1, 
                        scale: 1 
                      }}
                      viewport={{ 
                        once: false, 
                        amount: 0.3 
                      }}
                      transition={{ 
                        duration: 0.6, 
                        ease: [0.21, 1, 0.36, 1] 
                      }}
                      className="bg-white p-8 rounded-3xl border border-border/60 shadow-card hover:shadow-elev transition-shadow group relative"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <span className="font-display text-5xl font-bold text-brand/10 group-hover:text-brand/20 transition-colors">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="h-10 w-10 rounded-xl bg-brand/5 flex items-center justify-center text-brand">
                          <span className="text-xs font-bold uppercase">
                            {stepIcon}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-ink">
                        {stepTitle}
                      </h3>

                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {stepDesc}
                      </p>
                    </motion.div>
                  </div>

                  {/* Center Progress Dot */}
                  <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center text-white font-bold relative z-10 my-8 md:my-0 shadow-[0_0_0_8px_rgba(255,255,255,1)]">
                    <span className="text-[10px]">{index + 1}</span>
                  </div>

                  {/* Empty Side (Desktop Only) */}
                  <div className="hidden md:block md:w-[42%]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
