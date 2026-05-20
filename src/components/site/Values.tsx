import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Target, Star, Users } from "lucide-react";
import { SectionHeader } from "./Services";

const VALUES = [
  { icon: Users, title: "Client-Focused", desc: "Your success is our success. We prioritize your needs and goals in everything we do." },
  { icon: Target, title: "Results-Driven", desc: "We focus on delivering measurable outcomes that make a real impact on your business." },
  { icon: Star, title: "Excellence", desc: "We maintain the highest standards in our work, never settling for good enough." },
  { icon: Heart, title: "Passion", desc: "We love what we do, and it shows in the quality and creativity of our work." },
];

export function Values() {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-prose">
        <SectionHeader kicker="Our values" title="Our Values" subtitle="The principles that guide our work and relationships" />
        <div className="mt-14 grid gap-4 md:grid-cols-2" onMouseLeave={() => setHover(null)}>
          {VALUES.map((v, i) => {
            const active = hover === i;
            const dim = hover !== null && !active;
            return (
              <motion.div key={v.title}
                onMouseEnter={() => setHover(i)}
                animate={{
                  scale: active ? 1.04 : dim ? 0.97 : 1,
                  opacity: dim ? 0.55 : 1,
                }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className={`relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-soft ${active ? "shadow-elev" : ""}`}
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-success/10 text-success">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-ink">{v.title}</h3>
                <motion.p
                  animate={{ opacity: active ? 1 : 0.7, height: "auto" }}
                  className="mt-2 text-sm leading-relaxed text-muted-foreground"
                >
                  {v.desc}
                </motion.p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
