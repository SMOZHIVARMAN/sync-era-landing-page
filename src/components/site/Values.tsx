import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, TrendingUp, Award, Heart } from "lucide-react";
import { SectionHeader } from "./Services";
import { useIsMobile } from "@/hooks/use-mobile";

const values = [
  {
    title: "Client-Focused",
    icon: Users,
    description: "Your success is our success. We prioritize your needs and goals in everything we do."
  },
  {
    title: "Results-Driven",
    icon: TrendingUp,
    description: "We focus on delivering measurable outcomes that make a real impact on your business."
  },
  {
    title: "Excellence",
    icon: Award,
    description: "We maintain the highest standards in our work, never settling for good enough."
  },
  {
    title: "Passion",
    icon: Heart,
    description: "We love what we do, and it shows in the quality and creativity of our work."
  }
];

export function Values() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isMobile = useIsMobile();

  return (
    <section className="relative py-24 md:py-32">
      <div className="container-prose">
        <SectionHeader 
          kicker="Our values" 
          title="Our Values" 
          subtitle="The principles that guide our work and relationships" 
        />
        
        <div className="mt-14 flex gap-6 justify-center items-center flex-wrap">
          {values.map((v, i) => {
            const isHovered = hoveredIndex === i;
            const Icon = v.icon;
            
            // Responsive width calculation
            const baseWidth = isMobile ? "100%" : 260;
            const expandedWidth = isMobile ? "100%" : 420;

            return (
              <motion.div
                key={i}
                layout
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`
                  relative cursor-default overflow-hidden
                  rounded-3xl border border-border bg-white shadow-sm hover:shadow-xl
                  transition-shadow duration-500 ease-out
                  p-6 text-center w-full sm:w-auto
                `}
                animate={{
                  width: isHovered ? expandedWidth : baseWidth,
                  height: isHovered ? 260 : 100,
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }}
              >
                <motion.div 
                  layout
                  className={`flex h-full w-full ${isHovered ? 'flex-col items-center justify-start pt-2 gap-4' : 'flex-row items-center justify-center gap-3'}`}
                >
                  <motion.div 
                    layout
                    className="flex items-center justify-center rounded-full bg-brand/10 text-brand shrink-0"
                    animate={{
                      width: isHovered ? 56 : 40,
                      height: isHovered ? 56 : 40,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20
                    }}
                  >
                    <Icon className={isHovered ? "h-6 w-6" : "h-5 w-5"} />
                  </motion.div>

                  <motion.h3 
                    layout
                    className="font-display text-xl font-semibold text-ink whitespace-nowrap"
                  >
                    {v.title}
                  </motion.h3>
                  
                  <AnimatePresence>
                    {isHovered && (
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                        className="text-sm leading-relaxed text-muted-foreground mt-1"
                      >
                        {v.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
