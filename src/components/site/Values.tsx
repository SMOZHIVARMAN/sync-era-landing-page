import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "./Services";

const values = [
  {
    title: "Client-Focused",
    description: "Your success is our success. We prioritize your needs and goals in everything we do."
  },
  {
    title: "Results-Driven",
    description: "We focus on delivering measurable outcomes that make a real impact on your business."
  },
  {
    title: "Excellence",
    description: "We maintain the highest standards in our work, never settling for good enough."
  },
  {
    title: "Passion",
    description: "We love what we do, and it shows in the quality and creativity of our work."
  }
];

export function Values() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
            
            return (
              <motion.div
                key={i}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`
                  relative cursor-default overflow-hidden
                  rounded-3xl border bg-white shadow-sm hover:shadow-xl
                  transition-all duration-500 ease-out
                  flex flex-col justify-center items-center p-6 text-center
                `}
                style={{
                  width: isHovered ? "420px" : "220px",
                  height: isHovered ? "260px" : "100px",
                }}
              >
                <motion.h3 
                  layout
                  className={`font-display text-xl font-semibold text-ink ${isHovered ? "mb-4" : ""}`}
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
                      className="text-sm leading-relaxed text-muted-foreground"
                    >
                      {v.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
