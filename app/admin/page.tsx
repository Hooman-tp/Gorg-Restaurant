"use client";

import { useEffect, useState } from "react";
import { StoredOrder } from "@/lib/orders";

const STATUS_LABELS: Record<string, string> = {
  received: "ثبت شده",
  preparing: "در حال آماده‌سازی",
  ready: "آماده‌ی تحویل",
  delivered: "تحویل داده شده",
  cancelled: "لغو شده",
};

const STATUS_OPTIONS = Object.keys(STATUS_LABELS);

function formatPrice(n: number) {
  return n.toLocaleString("fa-IR");
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const [loadError, setLoadError] = useState("");
  const [loading, setLoading] = useState(false);

  const loadOrders = async () => {
    setLoading(true);
    setLoadError("");
    try {
      const res = await fetch("/api/admin/orders");
      if (res.status === 401) {
        setAuthed(false);
        return;
      }
      const data = await res.json();
      if (!res.ok) {
        setLoadError(data.error || "خطا در بارگذاری سفارش‌ها");
        return;
      }
      setOrders(data.orders);
      setAuthed(true);
    } catch {
      setLoadError("ارتباط با سرور برقرار نشد");
    } finally {
      setLoading(false);
    }
  };

  // بارگذاری سفارش‌ها هنگام mount شدن صفحه؛ خودِ setState ها داخل تابع
  // async و بعد از await اجرا می‌شوند (نه هم‌زمان با اجرای effect)، این
  // الگوی متداول «واکشی داده هنگام mount» است.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadOrders();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setLoginError(data.error || "ورود ناموفق بود");
        return;
      }
      setPassword("");
      loadOrders();
    } catch {
      setLoginError("ارتباط با سرور برقرار نشد");
    }
  };

  const handleStatusChange = async (orderCode: string, status: string) => {
    setOrders((prev) => prev.map((o) => (o.order_code === orderCode ? { ...o, status: status as StoredOrder["status"] } : o)));
    await fetch("/api/admin/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderCode, status }),
    });
  };

  if (!authed) {
    return (
      <div className="max-w-sm mx-auto px-5 pt-32 pb-24">
        <h1 className="text-2xl font-black mb-6 text-center">ورود مدیریت گرگ</h1>
        <form onSubmit={handleLogin} className="gorg-card rounded-2xl p-6 space-y-4">
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="رمز عبور"
            className="w-full bg-[var(--color-charcoal)] border border-white/12 rounded-xl px-4 py-3 text-sm focus:border-[var(--color-ember)] outline-none"
          />
          {loginError && <p className="text-sm text-[var(--color-ember-light)]">{loginError}</p>}
          <button type="submit" className="btn-primary w-full">
            ورود
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-5 pt-28 pb-24">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black">سفارش‌های گرگ</h1>
        <button onClick={loadOrders} className="btn-outline text-sm">
          به‌روزرسانی
        </button>
      </div>

      {loading && <p className="text-[var(--color-ash)]">در حال بارگذاری…</p>}
      {loadError && <p className="text-[var(--color-ember-light)]">{loadError}</p>}
      {!loading && orders.length === 0 && !loadError && (
        <p className="text-[var(--color-ash)]">هنوز سفارشی ثبت نشده.</p>
      )}

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.order_code} className="gorg-card rounded-2xl p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div>
                <span className="font-black" dir="ltr">{order.order_code}</span>
                <span className="text-xs text-[var(--color-ash)] mr-3">
                  {new Date(order.created_at).toLocaleString("fa-IR")}
                </span>
              </div>
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order.order_code, e.target.value)}
                className="bg-[var(--color-charcoal)] border border-white/12 rounded-lg px-3 py-1.5 text-sm outline-none"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {STATUS_LABELS[s]}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-sm text-[var(--color-ash)] space-y-1 mb-3">
              <p>
                <span className="font-bold text-[var(--color-bone)]">{order.name}</span> ·{" "}
                <span dir="ltr">{order.phone}</span>
              </p>
              <p>{order.order_type === "delivery" ? `ارسال: ${order.address}` : "تحویل حضوری"}</p>
              {order.order_type === "delivery" && order.lat != null && order.lng != null && (
                <p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${order.lat},${order.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-ember-light)] hover:underline"
                  >
                    📍 موقعیت روی نقشه
                  </a>
                </p>
              )}
              {order.notes && <p>توضیحات: {order.notes}</p>}
              {order.ref_id && <p>پیگیری بانکی: <span dir="ltr">{order.ref_id}</span></p>}
            </div>

            <div className="text-sm space-y-1 border-t border-white/10 pt-3">
              {order.lines.map((line) => (
                <div key={line.id} className="flex justify-between">
                  <span>{line.qty}× {line.name}</span>
                  <span className="text-[var(--color-ash)]">{formatPrice(line.price * line.qty)} تومان</span>
                </div>
              ))}
              <div className="flex justify-between font-extrabold pt-1">
                <span>جمع کل</span>
                <span>{formatPrice(order.total)} تومان</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
