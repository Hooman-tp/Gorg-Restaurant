"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/adminClient";

/** واکشی داده با وضعیت loading/error و امکان بارگذاری دوباره (و به‌روزرسانیِ خودکار اختیاری) */
export function useFetch<T>(url: string | null, opts: { refreshMs?: number; refreshOnNewOrder?: boolean } = {}) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(Boolean(url));

  const load = useCallback(
    async (silent = false) => {
      if (!url) return;
      if (!silent) setLoading(true);
      try {
        const d = await api<T>(url);
        setData(d);
        setError("");
      } catch (e) {
        setError(e instanceof Error ? e.message : "خطا");
      } finally {
        setLoading(false);
      }
    },
    [url]
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  useEffect(() => {
    if (!opts.refreshMs) return;
    const t = setInterval(() => load(true), opts.refreshMs);
    return () => clearInterval(t);
  }, [load, opts.refreshMs]);

  useEffect(() => {
    if (!opts.refreshOnNewOrder) return;
    const h = () => load(true);
    window.addEventListener("admin-new-orders", h);
    return () => window.removeEventListener("admin-new-orders", h);
  }, [load, opts.refreshOnNewOrder]);

  return { data, error, loading, reload: load, setData };
}
