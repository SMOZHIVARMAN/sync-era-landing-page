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
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { DynamicSeo } from "@/components/site/DynamicSeo";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Syncera — Premium Digital Agency for Ambitious Teams" },
      { name: "description", content: "Syncera designs and builds enterprise-grade digital products with measurable impact. Strategy, design, engineering, and growth." },
      { property: "og:title", content: "Syncera — Premium Digital Agency" },
      { property: "og:description", content: "Enterprise-grade digital products. Strategy, design, engineering, and growth." },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" },
    ],
  }),
});

function Index() {
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
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
