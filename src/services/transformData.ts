import type { SheetRow } from "./googleSheetsService";

const pick = (r: SheetRow, ...keys: string[]) => {
  if (!r) return "";
  for (const k of keys) {
    const found = Object.keys(r).find((kk) => kk.toLowerCase() === k.toLowerCase());
    if (found && r[found] && r[found].trim() !== "") return r[found].trim();
  }
  return "";
};

function isActive(value: any) {
  return ["active", "true", "1", "yes"].includes(String(value).toLowerCase().trim());
}

const bool = (v: string) => isActive(v);
const list = (v: string) => v.split(/[,;|]/).map((s) => s.trim()).filter(Boolean);

const normalizeIcon = (name: string) => {
  if (!name) return "";
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

const active = (rows: SheetRow[]) => {
  if (!Array.isArray(rows)) return [];
  return rows.filter((r) => {
    const status = pick(r, "status", "active");
    if (status === "") return true; // Default to active if column is missing or empty
    return isActive(status);
  });
};

const sorted = (rows: SheetRow[]) => {
  if (!Array.isArray(rows)) return [];
  return [...rows].sort((a, b) => {
    const oa = parseInt(pick(a, "order") || "999");
    const ob = parseInt(pick(b, "order") || "999");
    return oa - ob;
  });
};

export const transformSettings = (rows: any[] = []) => {
  if (!Array.isArray(rows) || !rows.length) return {} as any;
  const r = rows[0];
  return {
    company_name: pick(r, "company_name") || "Coming Soon",
    tagline: pick(r, "tagline") || "Coming Soon",
    logo_url: pick(r, "logo_url") || "",
    favicon_url: pick(r, "favicon_url") || "",
    primary_color: pick(r, "primary_color") || "",
    secondary_color: pick(r, "secondary_color") || "",
    email: pick(r, "email") || "",
    phone: pick(r, "phone") || "",
    address: pick(r, "address") || ""
  };
};

export type HeroData = {
  badge: string; 
  badge_image: string;
  heading: string; 
  subheading: string;
  ctaPrimary: string; 
  ctaSecondary: string; 
  image: string;
};
export const transformHero = (rows: any[] = []): HeroData => {
  if (!Array.isArray(rows)) return {} as any;
  const r = active(rows)[0] ?? {};
  return {
    badge: pick(r, "badge_text", "badge"),
    badge_image: pick(r, "badge_image"),
    heading: pick(r, "heading", "title"),
    subheading: pick(r, "subheading", "subtitle"),
    ctaPrimary: pick(r, "cta_primary"),
    ctaSecondary: pick(r, "cta_secondary"),
    image: pick(r, "hero_image", "image"),
  };
};

export type ServiceItem = {
  id: string; title: string; description: string; longDescription: string;
  icon: string; image: string; featured: boolean;
};
export const transformServices = (rows: any[] = []): ServiceItem[] => {
  if (!Array.isArray(rows)) return [];
  return sorted(active(rows)).map((r, i) => ({
    id: pick(r, "id") || String(i),
    title: pick(r, "title"),
    description: pick(r, "short_description", "description"),
    longDescription: pick(r, "long_description"),
    icon: pick(r, "icon"),
    image: pick(r, "image_url", "image"),
    featured: bool(pick(r, "featured")),
  }));
};

export type ProjectItem = {
  id: string; title: string; category: string; client: string;
  description: string; fullDescription: string; technologies: string[];
  gallery: string[]; liveUrl: string; githubUrl: string;
  featured: boolean; date: string;
};
export const transformProjects = (rows: any[] = []): ProjectItem[] => {
  if (!Array.isArray(rows)) return [];
  return active(rows).map((r, i) => ({
    id: pick(r, "id") || String(i),
    title: pick(r, "project_name", "title"),
    category: pick(r, "category"),
    client: pick(r, "client_name"),
    description: pick(r, "short_description"),
    fullDescription: pick(r, "full_description"),
    technologies: list(pick(r, "technologies")),
    gallery: list(pick(r, "gallery_images")),
    liveUrl: pick(r, "live_url"),
    githubUrl: pick(r, "github_url"),
    featured: bool(pick(r, "featured")),
    date: pick(r, "completion_date"),
  }));
};

export type TestimonialItem = {
  id: string;
  client_name: string;
  company: string;
  role: string;
  review: string;
  profile_image: string;
  rating: number;
  featured: boolean;
  status: string;
};

export const transformTestimonials = (rows: any[] = []): TestimonialItem[] => {
  if (!Array.isArray(rows)) return [];
  
  return rows.map((r, i) => ({
    id: pick(r, "id") || String(i + 1),
    client_name: pick(r, "client_name", "clientName", "name", "client") || "",
    company: pick(r, "company", "organization") || "",
    role: pick(r, "role", "position", "title") || "",
    review: pick(r, "review", "message", "feedback", "content") || "",
    profile_image: pick(r, "profile_image", "profileImage", "image", "avatar", "photo") || "",
    rating: Number(pick(r, "rating")) || 5,
    featured: bool(pick(r, "featured")),
    status: pick(r, "status") || "active"
  })).filter(item => {
    const status = String(item.status).toLowerCase().trim();
    // featured is already a boolean from bool()
    return (status === "active" || status === "1" || status === "true" || status === "yes") && item.featured;
  });
};

export type TeamMember = {
  name: string; role: string; bio: string; image: string;
  linkedin: string; github: string; twitter: string; instagram: string;
};
export const transformTeam = (rows: any[] = []): TeamMember[] => {
  if (!Array.isArray(rows)) return [];
  return active(rows).map((r) => ({
    name: pick(r, "name"),
    role: pick(r, "role"),
    bio: pick(r, "bio"),
    image: pick(r, "image_url", "image"),
    linkedin: pick(r, "linkedin"),
    github: pick(r, "github"),
    twitter: pick(r, "twitter"),
    instagram: pick(r, "instagram"),
  }));
};

export type TechItem = { name: string; category: string; iconUrl: string; proficiency: number; featured: boolean };
export const transformTech = (rows: any[] = []): TechItem[] => {
  if (!Array.isArray(rows)) return [];
  return active(rows).map((r) => ({
    name: pick(r, "technology_name", "name"),
    category: pick(r, "category"),
    iconUrl: pick(r, "icon_url"),
    proficiency: Number(pick(r, "proficiency")) || 0,
    featured: bool(pick(r, "featured")),
  }));
};

export type StatItem = { label: string; value: number; suffix: string; icon: string };
export const transformStats = (rows: any[] = []): StatItem[] => {
  if (!Array.isArray(rows)) return [];
  return sorted(rows).map((r) => ({
    label: pick(r, "title"),
    value: Number(pick(r, "value")) || 0,
    suffix: pick(r, "suffix") || "",
    icon: normalizeIcon(pick(r, "icon")),
  }));
};

export type FaqItem = { question: string; answer: string; category: string };
export const transformFaq = (rows: any[] = []): FaqItem[] => {
  if (!Array.isArray(rows)) return [];
  return sorted(active(rows)).map((r) => ({
    question: pick(r, "question"),
    answer: pick(r, "answer"),
    category: pick(r, "category"),
  }));
};

export type ContactsData = Record<string, string>;
export const transformContacts = (rows: any[] = []): ContactsData => {
  const contacts: ContactsData = {};
  if (!Array.isArray(rows)) return contacts;
  rows.forEach((r) => {
    const type = pick(r, "type");
    const val = pick(r, "value");
    if (type && val) contacts[type.toLowerCase()] = val;
  });
  return contacts;
};

export type SocialLink = { platform: string; url: string; icon: string };
export const transformSocial = (rows: any[] = []): SocialLink[] => {
  if (!Array.isArray(rows)) return [];
  return rows.filter(r => bool(pick(r, "active"))).map((r) => ({
    platform: pick(r, "platform"),
    url: pick(r, "url"),
    icon: normalizeIcon(pick(r, "icon")),
  }));
};

export type ProcessStep = { id: string; title: string; description: string; icon: string; order: number };
export const transformProcess = (rows: any[] = []): ProcessStep[] => {
  if (!Array.isArray(rows)) return [];
  // Use active() to filter and sorted() to order by the 'order' column
  return sorted(active(rows)).map((r, i) => ({
    id: pick(r, "id") || String(i + 1),
    title: pick(r, "title", "step_title", "name") || "Step",
    description: pick(r, "description", "desc", "content", "info", "text", "short_description") || "",
    icon: pick(r, "icon", "image", "icon_url") || "",
    order: Number(pick(r, "order")) || i + 1,
  }));
};

export type ClientItem = { name: string; logo: string; website: string; featured: boolean };
export const transformClients = (rows: any[] = []): ClientItem[] => {
  if (!Array.isArray(rows)) return [];
  return rows.map((r) => ({
    name: pick(r, "company_name", "name"),
    logo: pick(r, "logo_url", "logo"),
    website: pick(r, "website"),
    featured: bool(pick(r, "featured")),
  }));
};

export type SeoData = {
  page: string; title: string; description: string; keywords: string[]; ogImage: string;
};
export const transformSeo = (rows: any[] = []): SeoData[] => {
  if (!Array.isArray(rows)) return [];
  return rows.map((r) => ({
    page: pick(r, "page"),
    title: pick(r, "title"),
    description: pick(r, "description"),
    keywords: list(pick(r, "keywords")),
    ogImage: pick(r, "og_image"),
  }));
};

export type ValueItem = { title: string; desc: string; icon: string };
export const transformValues = (rows: any[] = []): ValueItem[] => {
  if (!Array.isArray(rows)) return [];
  return sorted(active(rows)).map((r) => ({
    title: pick(r, "title"),
    desc: pick(r, "description", "desc"),
    icon: normalizeIcon(pick(r, "icon")),
  }));
};

export type CareerItem = {
  id: string; position: string; department: string; location: string;
  employmentType: string; description: string; applyUrl: string;
};
export const transformCareers = (rows: any[] = []): CareerItem[] => {
  if (!Array.isArray(rows)) return [];
  return active(rows).map((r, i) => ({
    id: pick(r, "id") || String(i),
    position: pick(r, "position"),
    department: pick(r, "department"),
    location: pick(r, "location"),
    employmentType: pick(r, "employment_type"),
    description: pick(r, "description"),
    applyUrl: pick(r, "apply_url"),
  }));
};
