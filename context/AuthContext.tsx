"use client";

import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";

interface AuthContextValue {
  /** شماره‌ی موبایلِ کاربرِ واردشده (۰۹xxxxxxxxx) یا null */
  phone: string | null;
  /** false تا وقتی که وضعیت ورود از سرور خوانده نشده */
  ready: boolean;
  isOpen: boolean;
  openLogin: () => void;
  closeLogin: () => void;
  onLoggedIn: (phone: string) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [phone, setPhone] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/me", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled) setPhone(typeof d?.phone === "string" ? d.phone : null);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const openLogin = useCallback(() => setIsOpen(true), []);
  const closeLogin = useCallback(() => setIsOpen(false), []);
  const onLoggedIn = useCallback((p: string) => {
    setPhone(p);
    setIsOpen(false);
  }, []);
  const logout = useCallback(async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      setPhone(null);
    }
  }, []);

  const value = useMemo(
    () => ({ phone, ready, isOpen, openLogin, closeLogin, onLoggedIn, logout }),
    [phone, ready, isOpen, openLogin, closeLogin, onLoggedIn, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth باید داخل AuthProvider استفاده شود");
  return ctx;
}
