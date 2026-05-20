import { motion } from "framer-motion";

export function SectionSkeleton({ title }: { title: string }) {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-prose">
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-surface p-12 text-center">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-4"
          >
            <div className="h-12 w-12 rounded-full bg-muted/20" />
            <h2 className="font-display text-2xl font-bold text-muted-foreground/60">{title}</h2>
            <p className="max-w-xs text-sm text-muted-foreground/40">
              We're currently updating this section. Please check back soon for fresh insights and details.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
