"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { CartLine } from "@/lib/types";

interface CartContextValue {
  lines: CartLine[];
  count: number;
  total: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: { id: string; name: string; price: number }) => void;
  incrementItem: (id: string) => void;
  decrementItem: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "gorg-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // بارگذاری سبد از localStorage فقط در کلاینت (یک‌بار، بعد از mount).
  // این effect دقیقاً برای همگام‌سازی state با یک سیستم خارجی (localStorage)
  // است، نه مشتق‌شده از props/state دیگر، پس اجرای setState اینجا لازم است.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setLines(JSON.parse(raw));
    } catch {
      // در صورت خرابی داده‌ی ذخیره‌شده، نادیده گرفته می‌شود
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // ذخیره‌سازی ممکن است در حالت خصوصی مرورگر ناموفق باشد؛ بی‌اهمیت است
    }
  }, [lines, hydrated]);

  const addItem = useCallback((item: { id: string; name: string; price: number }) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.id === item.id);
      if (existing) {
        return prev.map((l) => (l.id === item.id ? { ...l, qty: l.qty + 1 } : l));
      }
      return [...prev, { ...item, qty: 1 }];
    });
    setIsOpen(true);
  }, []);

  const incrementItem = useCallback((id: string) => {
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l)));
  }, []);

  const decrementItem = useCallback((id: string) => {
    setLines((prev) =>
      prev
        .map((l) => (l.id === id ? { ...l, qty: l.qty - 1 } : l))
        .filter((l) => l.qty > 0)
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const count = useMemo(() => lines.reduce((sum, l) => sum + l.qty, 0), [lines]);
  const total = useMemo(() => lines.reduce((sum, l) => sum + l.qty * l.price, 0), [lines]);

  const value: CartContextValue = {
    lines,
    count,
    total,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addItem,
    incrementItem,
    decrementItem,
    removeItem,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart باید داخل CartProvider استفاده شود");
  return ctx;
}
