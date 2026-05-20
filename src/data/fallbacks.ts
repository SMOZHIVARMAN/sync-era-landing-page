import type {
  HeroData, ServiceItem, ProjectItem, TestimonialItem, TeamMember,
  TechItem, StatItem, FaqItem, ContactsData, SocialLink, ProcessStep, ClientItem, SeoData,
} from "@/services/transformData";

export const fbHero: HeroData = {
  badge: "Premium Digital Agency",
  heading: "Engineering exceptional digital products.",
  subheading:
    "Syncera partners with ambitious teams to design, build, and scale software that moves the business forward.",
  ctaPrimary: "Start a Project", ctaPrimaryHref: "#contact",
  ctaSecondary: "View Our Work", ctaSecondaryHref: "#work",
  intro: "An enterprise-grade studio for product, engineering and growth.",
};

export const fbServices: ServiceItem[] = [
  { id: "1", title: "Product Strategy", description: "Roadmaps, research, and clarity for what to build next.", longDescription: "Discovery workshops, customer research, opportunity mapping, and a measurable roadmap that connects product bets to business outcomes.", icon: "Compass", image: "", featured: true },
  { id: "2", title: "Web Engineering", description: "Performant, accessible web apps built to scale.", longDescription: "Modern React/TypeScript stacks, edge rendering, design systems and rigorous quality engineering across the full lifecycle.", icon: "Code2", image: "", featured: false },
  { id: "3", title: "Brand & Interface", description: "Identity systems and product UI with executive polish.", longDescription: "From brand foundations to component libraries — we ship interface systems that scale across surfaces and teams.", icon: "Palette", image: "", featured: false },
  { id: "4", title: "Platform & Cloud", description: "Reliable infrastructure, automation and observability.", longDescription: "Cloud architecture, CI/CD, infra-as-code, and observability tuned for cost, velocity and resilience.", icon: "Cloud", image: "", featured: false },
  { id: "5", title: "Data & AI", description: "Insights, pipelines and AI features customers feel.", longDescription: "Modern data platforms, evals-driven AI features, and analytics that change the way teams make decisions.", icon: "Sparkles", image: "", featured: true },
  { id: "6", title: "Growth Engineering", description: "SEO, analytics and experimentation that compound.", longDescription: "Technical SEO, attribution, server-side analytics and structured experimentation to drive predictable growth.", icon: "TrendingUp", image: "", featured: false },
];

export const fbProjects: ProjectItem[] = [
  { id: "1", title: "Northwind Banking", description: "Re-platformed a tier-1 retail banking dashboard.", image: "", date: "2025", category: "Fintech", technologies: ["React","TypeScript","Node","AWS"], liveUrl: "#", githubUrl: "", featured: true },
  { id: "2", title: "Helio Health", description: "HIPAA-grade patient portal with realtime intake.", image: "", date: "2025", category: "Healthcare", technologies: ["Next.js","Postgres","tRPC"], liveUrl: "#", githubUrl: "", featured: false },
  { id: "3", title: "Atlas Logistics", description: "Operations cockpit for a global 3PL.", image: "", date: "2024", category: "Logistics", technologies: ["React","GraphQL","Kafka"], liveUrl: "#", githubUrl: "", featured: false },
  { id: "4", title: "Form Studio", description: "AI-assisted form builder for enterprise.", image: "", date: "2024", category: "SaaS", technologies: ["TypeScript","OpenAI","Edge"], liveUrl: "#", githubUrl: "", featured: false },
];

export const fbTestimonials: TestimonialItem[] = [
  { id: "1", client_name: "Avery Okafor", company: "Northwind", role: "VP Engineering", review: "Syncera operates like an extension of our staff team — sharp, calm, and consistently shipping.", profile_image: "", rating: 5, featured: true, status: "Active" },
  { id: "2", client_name: "Maya Brennan", company: "Helio", role: "Chief Product Officer", review: "They reframed our roadmap and shipped a portal our patients actually love.", profile_image: "", rating: 5, featured: false, status: "Active" },
  { id: "3", client_name: "Daniel Park", company: "Atlas Logistics", role: "Head of Ops", review: "Hands down the most technically rigorous partner we've worked with.", profile_image: "", rating: 5, featured: false, status: "Active" },
  { id: "4", client_name: "Sara Lehmann", company: "Form Studio", role: "Founder & CEO", review: "Strategy, design, engineering — every surface felt considered.", profile_image: "", rating: 5, featured: false, status: "Active" },
];

export const fbTeam: TeamMember[] = [
  { name: "Iris Calder", role: "Founder & CEO", bio: "Twenty years building product organizations.", image: "", linkedin: "#", twitter: "", github: "" },
  { name: "Jonah Reyes", role: "Head of Engineering", bio: "Distributed systems and platform leadership.", image: "", linkedin: "#", twitter: "", github: "" },
  { name: "Priya Anand", role: "Design Director", bio: "Interface systems for enterprise software.", image: "", linkedin: "#", twitter: "", github: "" },
  { name: "Marco Bianchi", role: "Principal PM", bio: "Strategy and discovery for regulated industries.", image: "", linkedin: "#", twitter: "", github: "" },
];

export const fbTech: TechItem[] = [
  { name: "React", iconUrl: "https://cdn.simpleicons.org/react/2563eb", category: "Frontend" },
  { name: "TypeScript", iconUrl: "https://cdn.simpleicons.org/typescript/2563eb", category: "Language" },
  { name: "Next.js", iconUrl: "https://cdn.simpleicons.org/nextdotjs/111111", category: "Framework" },
  { name: "Node.js", iconUrl: "https://cdn.simpleicons.org/nodedotjs/16a34a", category: "Runtime" },
  { name: "Postgres", iconUrl: "https://cdn.simpleicons.org/postgresql/2563eb", category: "Database" },
  { name: "AWS", iconUrl: "https://cdn.simpleicons.org/amazonwebservices/111111", category: "Cloud" },
  { name: "Cloudflare", iconUrl: "https://cdn.simpleicons.org/cloudflare/f97316", category: "Edge" },
  { name: "Docker", iconUrl: "https://cdn.simpleicons.org/docker/2563eb", category: "DevOps" },
  { name: "Kubernetes", iconUrl: "https://cdn.simpleicons.org/kubernetes/2563eb", category: "DevOps" },
  { name: "GraphQL", iconUrl: "https://cdn.simpleicons.org/graphql/e91e63", category: "API" },
  { name: "Tailwind", iconUrl: "https://cdn.simpleicons.org/tailwindcss/2563eb", category: "CSS" },
  { name: "Figma", iconUrl: "https://cdn.simpleicons.org/figma/111111", category: "Design" },
  { name: "Vercel", iconUrl: "https://cdn.simpleicons.org/vercel/111111", category: "Platform" },
  { name: "Stripe", iconUrl: "https://cdn.simpleicons.org/stripe/635bff", category: "Payments" },
  { name: "Supabase", iconUrl: "https://cdn.simpleicons.org/supabase/16a34a", category: "Backend" },
  { name: "OpenAI", iconUrl: "https://cdn.simpleicons.org/openai/111111", category: "AI" },
  { name: "GitHub", iconUrl: "https://cdn.simpleicons.org/github/111111", category: "VCS" },
  { name: "Linear", iconUrl: "https://cdn.simpleicons.org/linear/2563eb", category: "Ops" },
];

export const fbStats: StatItem[] = [
  { label: "Projects shipped", value: 120, suffix: "+", icon: "Rocket" },
  { label: "Enterprise clients", value: 48, suffix: "+", icon: "Building2" },
  { label: "Avg. CSAT", value: 98, suffix: "%", icon: "Star" },
  { label: "Years compounding", value: 9, suffix: "+", icon: "Calendar" },
];

export const fbFaq: FaqItem[] = [
  { question: "How do engagements typically start?", answer: "We begin with a structured discovery sprint to align on goals, constraints and a measurable plan.", category: "Engagement" },
  { question: "Do you work fixed-scope or retained?", answer: "Both. We adapt the contract model to the stage of the work — fixed scope for discovery and launches, retained for product lines.", category: "Engagement" },
  { question: "Which industries do you serve?", answer: "Fintech, healthcare, logistics, and SaaS — anywhere reliability and craft matter.", category: "About" },
  { question: "Where is the team based?", answer: "We're a distributed studio with hubs across North America and Europe.", category: "About" },
  { question: "How do you handle security?", answer: "We follow SOC 2 aligned practices, with least-privilege access and isolated environments per client.", category: "Security" },
];

export const fbContacts: ContactsData = {
  email: "hello@syncera.studio",
  phone: "+1 (415) 555 0144",
  address: "San Francisco · New York · Berlin",
};

export const fbSocial: SocialLink[] = [
  { platform: "LinkedIn", url: "#", icon: "Linkedin" },
  { platform: "Twitter", url: "#", icon: "Twitter" },
  { platform: "GitHub", url: "#", icon: "Github" },
  { platform: "Dribbble", url: "#", icon: "Dribbble" },
];

export const fbProcess: ProcessStep[] = [
  { step: "01", title: "Discover", description: "Stakeholder interviews, research and a measurable plan.", icon: "Search" },
  { step: "02", title: "Define", description: "Architecture, design language, and a sequenced roadmap.", icon: "PenTool" },
  { step: "03", title: "Design", description: "Interface systems, prototypes, and validated patterns.", icon: "Layout" },
  { step: "04", title: "Build", description: "High-velocity engineering with weekly demos.", icon: "Code2" },
  { step: "05", title: "Launch", description: "Hardening, observability and a confident release.", icon: "Rocket" },
  { step: "06", title: "Evolve", description: "Continuous discovery and platform improvement.", icon: "Repeat" },
];

export const fbClients: ClientItem[] = [
  { name: "Northwind", logo: "" }, { name: "Helio", logo: "" },
  { name: "Atlas", logo: "" }, { name: "Form Studio", logo: "" },
  { name: "Orbit", logo: "" }, { name: "Lumen", logo: "" },
];

export const fbSeo: SeoData = {
  title: "Syncera — Premium Digital Agency for Ambitious Teams",
  description:
    "Syncera designs and builds enterprise-grade digital products with measurable impact. Strategy, design, engineering, and growth.",
  keywords: "digital agency, product design, web engineering, enterprise software",
  ogImage: "",
};
