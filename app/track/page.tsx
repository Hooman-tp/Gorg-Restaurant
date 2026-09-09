"use client";

import { useState } from "react";
import { StoredOrder } from "@/lib/orders";

const STATUS_LABELS: Record<string, string> = {
  received: "ثبت شده",
  preparing: "در حال آماده‌سازی",
  ready: "آماده‌ی تحویل",
  delivered: "تحویل داده شده",
  cancelled: "لغو شده",
};

const STATUS_ORDER = ["received", "preparing", "ready", "delivered"];

function formatPrice(n: number) {
  return n.toLocaleString("fa-IR");
}

export default function TrackPage() {
  const [orderCode, setOrderCode] = useState("");
  const [phone, setPhone] = useState("");
  const [order, setOrder] = useState<StoredOrder | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setOrder(null);
    try {
      const res = await fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderCode, phone }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "خطا در پیگیری سفارش");
        return;
      }
      setOrder(data.order);
    } catch {
      setError("ارتباط با سرور برقرار نشد");
    } finally {
      setLoading(false);
    }
  };

  const currentStepIndex = order ? STATUS_ORDER.indexOf(order.status) : -1;

  return (
    <div className="max-w-2xl mx-auto px-5 pt-28 pb-24">
      <span className="text-xs tracking-[0.3em] text-[var(--color-ember-light)] uppercase">Track Order</span>
      <h1 className="text-4xl font-black mt-3 mb-3">پیگیری سفارش</h1>
      <p className="text-[var(--color-ash)] mb-10">
        کد پیگیری‌ای که هنگام ثبت سفارش دریافت کردید و شماره تماستان را وارد
        کنید.
      </p>

      <form onSubmit={handleSubmit} className="gorg-card rounded-2xl p-6 space-y-5 mb-8">
        <div>
          <label htmlFor="orderCode" className="block text-sm font-bold mb-2">
            کد پیگیری
          </label>
          <input
            id="orderCode"
            required
            dir="ltr"
            value={orderCode}
            onChange={(e) => setOrderCode(e.target.value)}
            placeholder="GORG-XXXXXX"
            className="w-full bg-[var(--color-charcoal)] border border-white/12 rounded-xl px-4 py-3 text-sm text-left focus:border-[var(--color-ember)] outline-none"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-bold mb-2">
            شماره تماس
          </label>
          <input
            id="phone"
            required
            dir="ltr"
            inputMode="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="09123456789"
            className="w-full bg-[var(--color-charcoal)] border border-white/12 rounded-xl px-4 py-3 text-sm text-left focus:border-[var(--color-ember)] outline-none"
          />
        </div>
        {error && <p className="text-sm text-[var(--color-ember-light)]">{error}</p>}
        <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
          {loading ? "در حال جستجو…" : "پیگیری سفارش"}
        </button>
      </form>

      {order && (
        <div className="gorg-card rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between">
            <span className="font-black text-lg" dir="ltr">{order.order_code}</span>
            <span className="tag-pill">{STATUS_LABELS[order.status] || order.status}</span>
          </div>

          {order.status !== "cancelled" && (
            <div className="flex items-center gap-1">
              {STATUS_ORDER.map((step, i) => (
                <div key={step} className="flex-1 flex items-center gap-1">
                  <div
                    className={`h-1.5 flex-1 rounded-full ${
                      i <= currentStepIndex ? "bg-[var(--color-ember)]" : "bg-white/10"
                    }`}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="space-y-2 text-sm text-[var(--color-ash)]">
            {order.lines.map((line) => (
              <div key={line.id} className="flex items-center justify-between">
                <span>
                  {line.qty}× {line.name}
                </span>
                <span>{formatPrice(line.price * line.qty)} تومان</span>
              </div>
            ))}
            <div className="border-t border-white/10 pt-2 flex items-center justify-between font-extrabold text-[var(--color-bone)]">
              <span>جمع کل</span>
              <span>{formatPrice(order.total)} تومان</span>
            </div>
          </div>

          <p className="text-xs text-[var(--color-ash)]">
            {order.order_type === "delivery" ? `آدرس: ${order.address}` : "تحویل حضوری"}
          </p>
        </div>
      )}
    </div>
  );
}
