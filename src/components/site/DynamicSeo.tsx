import { useEffect } from "react";
import { useSheet } from "@/hooks/useSheet";
import { transformSeo } from "@/services/transformData";
import { fbSeo } from "@/data/fallbacks";

export function DynamicSeo() {
  const { data } = useSheet("seo", transformSeo, fbSeo);
  useEffect(() => {
    if (data.title) document.title = data.title;
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
    setMeta('meta[name="description"]', "content", data.description);
    setMeta('meta[name="keywords"]', "content", data.keywords);
    setMeta('meta[property="og:title"]', "content", data.title);
    setMeta('meta[property="og:description"]', "content", data.description);
    if (data.ogImage) setMeta('meta[property="og:image"]', "content", data.ogImage);
  }, [data]);
  return null;
}
