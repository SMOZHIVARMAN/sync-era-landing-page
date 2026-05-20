import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
} from "framer-motion";

import { useSheet } from "@/hooks/useSheet";
import { transformProcess } from "@/services/transformData";
import { SectionHeader } from "./Services";

export function Process() {
  // DATA SOURCE (UNCHANGED)
  const { data: rawData, loading } = useSheet("process");

  // Safe data extraction
  const rawArray = Array.isArray(rawData) ? rawData : [];
  const processSteps = transformProcess(rawArray);

  // SCROLL SETUP
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  // Smooth progress line movement
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    restDelta: 0.001,
  });

  // Loading state
  if (loading) {
    return (
      <div className="h-[100vh] flex items-center justify-center">
        <span className="text-muted-foreground font-medium">
          Loading Story...
        </span>
      </div>
    );
  }

  // Empty state
  if (!processSteps.length) {
    return (
      <section className="py-24">
        <div className="container-prose text-center">
          <h2 className="text-3xl font-bold text-ink">
            Our Process
          </h2>
          <p className="mt-4 text-muted-foreground">
            Coming Soon
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-surface overflow-hidden"
    >
      <div className="container-prose relative">
        {/* Header */}
        <SectionHeader
          kicker="How we work"
          title="A studio operating system, end to end"
          subtitle="Six phases that turn ambiguity into momentum — with measurable outputs every step of the way."
        />

        <div className="relative mt-24">
          {/* Base timeline */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-brand/10 z-0" />

          {/* Smooth animated progress line */}
          <motion.div
            style={{
              scaleY: smoothProgress,
              originY: 0,
            }}
            className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-brand -translate-x-1/2 z-[1]"
          />

          <div className="space-y-16 md:space-y-24 relative">
            {processSteps.map((item, index) => {
              const isEven = index % 2 === 0;

              const stepId = item.id || index;
              const stepTitle = item.title || "Step";
              const stepDesc = item.description || "";
              const stepIcon = item.icon || "";

              return (
                <div
                  key={stepId}
                  className={`flex flex-col md:flex-row items-center justify-between relative ${
                    isEven ? "" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Card Side */}
                  <div className="w-full md:w-[42%] relative z-10">
                    <motion.div
                      initial={{
                        opacity: 0,
                        x: isEven ? -50 : 50,
                        y: 15,
                        scale: 0.98,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                        y: 0,
                        scale: 1,
                      }}
                      viewport={{
                        once: false,
                        amount: 0.35,
                        margin: "-100px",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 80,
                        damping: 18,
                        mass: 0.8,
                      }}
                      className="
                        bg-white
                        p-8
                        rounded-3xl
                        border
                        border-border/60
                        shadow-md
                        hover:shadow-lg
                        transition-shadow
                        duration-500
                        group
                        relative
                        min-h-fit
                        h-auto
                        flex
                        flex-col
                        will-change-transform
                      "
                    >
                      {/* ID + Title */}
                      <div className="flex items-baseline gap-4 mb-4">
                        <span className="font-display text-4xl font-bold text-brand/30 group-hover:text-brand/50 transition-colors leading-none shrink-0">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <h3 className="text-2xl font-semibold text-brand leading-tight">
                          {stepTitle}
                        </h3>
                      </div>

                      {/* Description */}
                      {stepDesc && (
                        <p className="text-sm leading-relaxed text-muted-foreground whitespace-normal overflow-visible block opacity-100 visible">
                          {stepDesc}
                        </p>
                      )}
                    </motion.div>
                  </div>

                  {/* Timeline icon */}
                  <div className="relative z-20 h-14 w-14 rounded-full bg-white shadow-md border flex items-center justify-center overflow-hidden my-8 md:my-0 shadow-[0_0_0_8px_rgba(255,255,255,1)]">
                    {stepIcon ? (
                      <img
                        src={stepIcon}
                        alt={stepTitle}
                        className="w-8 h-8 object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <span className="text-xs font-bold text-brand">
                        {index + 1}
                      </span>
                    )}
                  </div>

                  {/* Empty desktop side */}
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