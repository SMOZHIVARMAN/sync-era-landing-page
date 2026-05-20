import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { Values } from "@/components/site/Values";
import { Process } from "@/components/site/Process";
import { Technologies } from "@/components/site/Technologies";
import { Projects } from "@/components/site/Projects";
import { Testimonials } from "@/components/site/Testimonials";
import { Team } from "@/components/site/Team";
import { FAQ } from "@/components/site/FAQ";
import { Careers } from "@/components/site/Careers";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { DynamicSeo } from "@/components/site/DynamicSeo";
import { useSheet } from "@/hooks/useSheet";
import { transformSettings } from "@/services/transformData";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { data: raw } = useSheet("Site_setting");
  const settings = transformSettings(raw);
  
  useEffect(() => {
    if (!raw.length) return;
    
    if (settings?.primary_color) {
      document.documentElement.style.setProperty("--brand", settings.primary_color);
    }
    if (settings?.secondary_color) {
      document.documentElement.style.setProperty("--success", settings.secondary_color);
    }
  }, [raw, settings]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <DynamicSeo />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Values />
        <Process />
        <Technologies />
        <Projects />
        <Testimonials />
        <Team />
        <FAQ />
        <Careers />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
