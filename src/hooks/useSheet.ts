import { useEffect, useState } from "react";
import { fetchSheet, type SheetTab, type SheetRow } from "@/services/googleSheetsService";

export function useSheet<T>(tab: SheetTab, transform: (rows: SheetRow[]) => T, fallback: T) {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    fetchSheet(tab)
      .then((rows) => {
        if (!alive) return;
        if (rows.length === 0) {
          setData(fallback);
        } else {
          try { setData(transform(rows)); } catch { setData(fallback); }
        }
      })
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  return { data, loading };
}
