import { useEffect } from "react";
import { useSheet } from "@/hooks/useSheet";
import { transformSeo } from "@/services/transformData";
import { useLocation } from "@tanstack/react-router";

export function DynamicSeo() {
  const { data: raw } = useSheet("seo");
  const data = transformSeo(raw);
  const location = useLocation();
  
  const currentPage = location.pathname === "/" ? "Home" : location.pathname.slice(1);
  const pageSeo = (data as any[] || []).find((s) => s.page === currentPage) || (data as any[] || [])[0];

  useEffect(() => {
    if (!pageSeo) return;
    
    if (pageSeo.title) document.title = pageSeo.title;
    
    const setMeta = (sel: string, attr: string, val: string) => {
      if (!val) return;
      let el = document.head.querySelector<HTMLMetaElement>(sel);
      if (!el) {
        el = document.createElement("meta");
        const parts = sel.replace(/^meta\[/, "").replace(/\]$/, "").split("=");
        if (parts.length === 2) el.setAttribute(parts[0], parts[1].replace(/['"]/g, ""));
        document.head.appendChild(el);
      }
      el.setAttribute(attr, val);
    };

    setMeta('meta[name="description"]', "content", pageSeo.description || "");
    setMeta('meta[name="keywords"]', "content", pageSeo.keywords?.join(", ") || "");
    setMeta('meta[property="og:title"]', "content", pageSeo.title || "");
    setMeta('meta[property="og:description"]', "content", pageSeo.description || "");
    if (pageSeo.ogImage) setMeta('meta[property="og:image"]', "content", pageSeo.ogImage);
  }, [pageSeo]);

  return null;
}
