import type { SheetRow } from "./googleSheetsService";

const pick = (r: SheetRow, ...keys: string[]) => {
  for (const k of keys) {
    const found = Object.keys(r).find((kk) => kk.toLowerCase() === k.toLowerCase());
    if (found && r[found] && r[found].trim() !== "") return r[found].trim();
  }
  return "";
};

const bool = (v: string) => ["true", "yes", "1", "y"].includes(v.toLowerCase());
const list = (v: string) => v.split(/[,;|]/).map((s) => s.trim()).filter(Boolean);

export type HeroData = {
  badge: string; heading: string; subheading: string;
  ctaPrimary: string; ctaPrimaryHref: string;
  ctaSecondary: string; ctaSecondaryHref: string;
  intro: string;
};
export const transformHero = (rows: SheetRow[]): HeroData => {
  const r = rows[0] ?? {};
  return {
    badge: pick(r, "badge") || "Premium Digital Agency",
    heading: pick(r, "heading", "title") || "Engineering exceptional digital products.",
    subheading: pick(r, "subheading", "subtitle") ||
      "Syncera partners with ambitious teams to design, build, and scale software that moves the business.",
    ctaPrimary: pick(r, "cta_primary", "ctaPrimary") || "Start a Project",
    ctaPrimaryHref: pick(r, "cta_primary_href", "ctaPrimaryHref") || "#contact",
    ctaSecondary: pick(r, "cta_secondary", "ctaSecondary") || "View Our Work",
    ctaSecondaryHref: pick(r, "cta_secondary_href", "ctaSecondaryHref") || "#work",
    intro: pick(r, "intro", "company_intro") ||
      "An enterprise-grade studio for product, engineering and growth.",
  };
};

export type ServiceItem = {
  id: string; title: string; description: string; longDescription: string;
  icon: string; image: string; featured: boolean;
};
export const transformServices = (rows: SheetRow[]): ServiceItem[] =>
  rows.map((r, i) => ({
    id: pick(r, "id") || String(i),
    title: pick(r, "title", "name") || "",
    description: pick(r, "description", "short_description") || "",
    longDescription: pick(r, "long_description", "full_description", "details") ||
      pick(r, "description"),
    icon: pick(r, "icon") || "Sparkles",
    image: pick(r, "image", "image_url", "background_image") || "",
    featured: bool(pick(r, "featured")),
  }));

export type ProjectItem = {
  id: string; title: string; description: string; image: string;
  date: string; category: string; technologies: string[];
  liveUrl: string; githubUrl: string; featured: boolean;
};
export const transformProjects = (rows: SheetRow[]): ProjectItem[] =>
  rows.map((r, i) => ({
    id: pick(r, "id") || String(i),
    title: pick(r, "title", "name"),
    description: pick(r, "description"),
    image: pick(r, "image", "image_url", "background_image"),
    date: pick(r, "date", "completion_date", "completed"),
    category: pick(r, "category"),
    technologies: list(pick(r, "technologies", "tech", "stack")),
    liveUrl: pick(r, "live_url", "url", "live"),
    githubUrl: pick(r, "github_url", "github", "repo"),
    featured: bool(pick(r, "featured")),
  }));

export type TestimonialItem = {
  name: string; company: string; role: string; review: string;
  image: string; rating: number;
};
export const transformTestimonials = (rows: SheetRow[]): TestimonialItem[] =>
  rows.map((r) => ({
    name: pick(r, "name"),
    company: pick(r, "company"),
    role: pick(r, "role", "position"),
    review: pick(r, "review", "quote", "content"),
    image: pick(r, "image", "image_url", "avatar"),
    rating: Number(pick(r, "rating")) || 5,
  }));

export type TeamMember = {
  name: string; role: string; bio: string; image: string;
  linkedin: string; twitter: string; github: string;
};
export const transformTeam = (rows: SheetRow[]): TeamMember[] =>
  rows.map((r) => ({
    name: pick(r, "name"),
    role: pick(r, "role", "position"),
    bio: pick(r, "bio", "description"),
    image: pick(r, "image", "image_url", "photo"),
    linkedin: pick(r, "linkedin"),
    twitter: pick(r, "twitter", "x"),
    github: pick(r, "github"),
  }));

export type TechItem = { name: string; iconUrl: string; category: string };
export const transformTech = (rows: SheetRow[]): TechItem[] =>
  rows.map((r) => ({
    name: pick(r, "name", "title"),
    iconUrl: pick(r, "icon_url", "icon", "image"),
    category: pick(r, "category"),
  }));

export type StatItem = { label: string; value: number; suffix: string; icon: string };
export const transformStats = (rows: SheetRow[]): StatItem[] =>
  rows.map((r) => ({
    label: pick(r, "label", "title", "name"),
    value: Number(pick(r, "value", "number")) || 0,
    suffix: pick(r, "suffix") || "+",
    icon: pick(r, "icon") || "Sparkles",
  }));

export type FaqItem = { question: string; answer: string; category: string };
export const transformFaq = (rows: SheetRow[]): FaqItem[] =>
  rows.map((r) => ({
    question: pick(r, "question", "q"),
    answer: pick(r, "answer", "a"),
    category: pick(r, "category") || "General",
  }));

export type ContactsData = { email: string; phone: string; address: string };
export const transformContacts = (rows: SheetRow[]): ContactsData => {
  const r = rows[0] ?? {};
  return {
    email: pick(r, "email"),
    phone: pick(r, "phone", "tel"),
    address: pick(r, "address", "location"),
  };
};

export type SocialLink = { platform: string; url: string; icon: string };
export const transformSocial = (rows: SheetRow[]): SocialLink[] =>
  rows.map((r) => ({
    platform: pick(r, "platform", "name"),
    url: pick(r, "url", "link"),
    icon: pick(r, "icon") || pick(r, "platform"),
  }));

export type ProcessStep = { step: string; title: string; description: string; icon: string };
export const transformProcess = (rows: SheetRow[]): ProcessStep[] =>
  rows.map((r, i) => ({
    step: pick(r, "step", "number") || String(i + 1).padStart(2, "0"),
    title: pick(r, "title", "name"),
    description: pick(r, "description"),
    icon: pick(r, "icon") || "Workflow",
  }));

export type ClientItem = { name: string; logo: string };
export const transformClients = (rows: SheetRow[]): ClientItem[] =>
  rows.map((r) => ({
    name: pick(r, "name", "title"),
    logo: pick(r, "logo", "image", "image_url"),
  }));

export type SeoData = {
  title: string; description: string; keywords: string; ogImage: string;
};
export const transformSeo = (rows: SheetRow[]): SeoData => {
  const r = rows[0] ?? {};
  return {
    title: pick(r, "title", "page_title") ||
      "Syncera — Premium Digital Agency for Ambitious Teams",
    description: pick(r, "description", "meta_description") ||
      "Syncera designs and builds enterprise-grade digital products with measurable impact.",
    keywords: pick(r, "keywords"),
    ogImage: pick(r, "og_image", "image"),
  };
};
