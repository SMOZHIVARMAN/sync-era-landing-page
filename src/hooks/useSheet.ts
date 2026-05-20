import { useEffect, useState } from "react";
import { fetchSheet } from "@/services/googleSheetsService";

export function useSheet(sheetName: string) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        const result = await fetchSheet(sheetName);
        if (!cancelled) {
          setData(Array.isArray(result) ? result : []);
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          setError(err);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [sheetName]);

  return {
    data,
    loading,
    error,
  };
}
