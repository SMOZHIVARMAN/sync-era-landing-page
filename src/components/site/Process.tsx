import { useRef, useState, useLayoutEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent
} from "framer-motion";
import { useSheet } from "@/hooks/useSheet";
import { transformProcess } from "@/services/transformData";
import { SectionHeader } from "./Services";

export function Process() {
  // 1. DATA SOURCE
  const { data: rawData, loading } = useSheet("process");
  
  const rawArray = Array.isArray(rawData) ? rawData : [];
  const processSteps = transformProcess(rawArray);

  // 2. SCROLL SETUP
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [totalMovement, setTotalMovement] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // Audit Scroll Progress
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log("Process Scroll Progress:", latest);
  });

  useLayoutEffect(() => {
    if (!sliderRef.current) return;
    
    const measure = () => {
      const sliderWidth = sliderRef.current?.scrollWidth || 0;
      const viewportWidth = window.innerWidth;
      // We want the last card to be centered or at least visible
      // Current padding in JSX is px-[calc(50vw-190px)] where 190 is half of 380
      const padding = (viewportWidth - 380) / 2;
      const movement = Math.max(0, sliderWidth - viewportWidth + padding);
      setTotalMovement(movement);
      console.log("Measured sliderWidth:", sliderWidth);
      console.log("Measured totalMovement:", movement);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [processSteps.length]);

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -totalMovement]
  );

  const progressWidth = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"]
  );

  if (loading) {
    return (
      <div className="h-[100vh] flex items-center justify-center">
        <span className="text-muted-foreground font-medium">Loading Story...</span>
      </div>
    );
  }

  if (!processSteps.length) {
    return (
      <section className="py-24">
        <div className="container-prose">
          <h2 className="text-3xl font-bold">Our Process</h2>
          <p className="mt-4 text-muted-foreground">Coming Soon</p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      style={{ height: `${processSteps.length * 100}vh` }}
      className="relative bg-surface/30"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        <div className="container-prose">
          <SectionHeader 
            kicker="How we work" 
            title="A studio operating system, end to end" 
            subtitle="Six phases that turn ambiguity into momentum — with measurable outputs every step of the way." 
          />
        </div>

        <div className="relative mt-20 overflow-hidden">
          <motion.div
            ref={sliderRef}
            style={{ x }}
            className="flex gap-8 px-[calc(50vw-190px)] w-max"
          >
            {processSteps.map((item, index) => (
              <div
                key={item.id || String(index)}
                className="
                  w-[380px]
                  h-[220px]
                  rounded-3xl
                  bg-white
                  border
                  shadow-card
                  p-8
                  flex-shrink-0
                  relative
                  group
                  transition-shadow
                  hover:shadow-elev
                "
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-5xl font-bold text-brand/10 group-hover:text-brand/20 transition-colors">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="h-10 w-10 rounded-xl bg-brand/5 flex items-center justify-center text-brand">
                    <span className="text-xs font-bold uppercase">
                      {String(item.icon || item.id || index).slice(0, 2)}
                    </span>
                  </div>
                </div>

                <h3 className="mt-6 text-2xl font-bold text-ink">
                  {item.title || "Step"}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                  {item.description || "No description provided"}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="container-prose mt-16">
          <div className="w-full max-w-2xl mx-auto">
            <div className="h-1 w-full bg-border/40 rounded-full overflow-hidden">
              <motion.div
                style={{
                  width: progressWidth
                }}
                className="h-full bg-brand"
              />
            </div>
            <div className="mt-6 text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
                SCROLL TO ADVANCE →
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
