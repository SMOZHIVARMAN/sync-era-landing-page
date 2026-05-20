import Papa from "papaparse";
import { cacheManager } from "./cacheManager";

const SHEET_ID = (import.meta.env.VITE_GOOGLE_SHEET_ID as string | undefined)?.trim();

export const SHEET_TABS = {
  hero: "Hero_Section",
  services: "Services",
  projects: "Projects",
  testimonials: "Testimonials",
  team: "Team",
  technologies: "Technologies",
  stats: "Stats",
  faq: "FAQ",
  contacts: "Contacts",
  social: "Social_links",
  careers: "Careers",
  process: "process_steps",
  clients: "Client",
  seo: "SEO",
} as const;

export type SheetTab = keyof typeof SHEET_TABS;
export type SheetRow = Record<string, string>;

export const isSheetConfigured = () => Boolean(SHEET_ID);

const buildUrl = (tabName: string) =>
  `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tabName)}`;

export async function fetchSheet(tab: SheetTab): Promise<SheetRow[]> {
  if (!SHEET_ID) return [];
  const cacheKey = `sheet:${tab}`;
  const cached = cacheManager.get<SheetRow[]>(cacheKey);
  if (cached) return cached;

  try {
    const res = await fetch(buildUrl(SHEET_TABS[tab]), { cache: "no-store" });
    if (!res.ok) throw new Error(`Sheet fetch failed: ${res.status}`);
    const csv = await res.text();
    const parsed = Papa.parse<SheetRow>(csv, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.trim(),
    });
    const rows = (parsed.data || []).filter((r) =>
      Object.values(r).some((v) => v && String(v).trim() !== ""),
    );
    cacheManager.set(cacheKey, rows);
    return rows;
  } catch (e) {
    console.warn(`[sheets] ${tab} fetch failed`, e);
    return [];
  }
}
