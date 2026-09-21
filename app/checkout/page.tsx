"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { maskMobile } from "@/lib/phone";
import { readTable, TableInfo } from "@/lib/tableSession";
import type { PickedLocation } from "@/components/AddressMapPicker";

// نقشه فقط وقتی کاربر بازش کند بارگذاری می‌شود (کتابخانه‌ی نقشه سنگین است)
const AddressMapPicker = dynamic(() => import("@/components/AddressMapPicker"), { ssr: false });

function formatPrice(n: number) {
  return n.toLocaleString("fa-IR");
}

type Status = "idle" | "sending" | "error";

export default function CheckoutPage() {
  const { lines, total } = useCart();
  const { phone, ready, openLogin } = useAuth();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [orderType, setOrderType] = useState<"delivery" | "pickup" | "dine_in">("delivery");
  // میزی که مشتری با QR اسکن کرده (اگر باشد، سفارش «سالن» هم گزینه است)
  const [table, setTable] = useState<TableInfo | null>(null);
  // تنظیماتی که مدیر از پنل می‌گذارد: باز/بسته بودن سفارش، حداقل مبلغ، هزینه‌ی ارسال
  const [cfg, setCfg] = useState<{ ordersOpen: boolean; closedMessage: string; minOrder: number; deliveryFee: number } | null>(null);
  const [form, setForm] = useState({ name: "", address: "", notes: "" });
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  // اگر مشتری آدرس را خودش تایپ/ویرایش کرده باشد، آدرسِ پیشنهادیِ نقشه رویش نوشته نمی‌شود
  const [addressEdited, setAddressEdited] = useState(false);

  useEffect(() => {
    const t = readTable();
    if (t) {
      setTable(t);
      setOrderType("dine_in");
    }
    fetch("/api/settings/public", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setCfg(d))
      .catch(() => {});
  }, []);

  // نام و آدرسِ ذخیره‌شده‌ی همین شماره‌ی موبایل (از سفارش قبلی) خودکار پر می‌شود
  useEffect(() => {
    if (!phone) return;
    let cancelled = false;
    fetch("/api/profile", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        const p = d?.profile;
        if (cancelled || !p) return;
        setForm((f) => ({ ...f, name: f.name || p.name || "", address: f.address || p.address || "" }));
        if (typeof p.lat === "number" && typeof p.lng === "number") {
          setLocation((cur) => cur ?? { lat: p.lat, lng: p.lng });
        }
        if (p.address) setAddressEdited(true);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [phone]);

  function handlePicked(loc: PickedLocation) {
    setLocation({ lat: loc.lat, lng: loc.lng });
    if (loc.text && (!form.address.trim() || !addressEdited)) {
      setForm((f) => ({ ...f, address: loc.text }));
      setAddressEdited(false);
    }
    setPickerOpen(false);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lines.length === 0 || status === "sending") return;

    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/checkout/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // فقط شناسه و تعداد؛ قیمت و شماره‌ی موبایل را خودِ سرور تعیین می‌کند
        body: JSON.stringify({
          lines: lines.map((l) => ({ id: l.id, qty: l.qty })),
          orderType,
          name: form.name,
          address: orderType === "delivery" ? form.address : "",
          notes: form.notes,
          lat: orderType === "delivery" ? location?.lat : undefined,
          lng: orderType === "delivery" ? location?.lng : undefined,
          tableNo: orderType === "dine_in" ? table?.code : undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.status === 401) {
        setStatus("idle");
        openLogin();
        return;
      }
      if (!res.ok || !data.redirectUrl) {
        setErrorMsg(data?.error || "شروع پرداخت با مشکل مواجه شد. لطفاً دوباره تلاش کنید.");
        setStatus("error");
        return;
      }

      // انتقال به صفحه‌ی پرداخت. سفارش «فقط» بعد از پرداخت موفق (در صفحه‌ی verify) ثبت می‌شود.
      window.location.href = data.redirectUrl;
    } catch {
      setErrorMsg("اتصال برقرار نشد. اینترنت خود را بررسی کنید و دوباره تلاش کنید.");
      setStatus("error");
    }
  };

  const fee = orderType === "delivery" ? cfg?.deliveryFee ?? 0 : 0;
  const payable = total + fee;
  const closed = cfg ? !cfg.ordersOpen : false;
  const belowMin = (cfg?.minOrder ?? 0) > total;

  if (lines.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-5 pt-32 pb-24 text-center">
        <h1 className="text-2xl font-extrabold mb-3">سبد سفارش خالی است</h1>
        <p className="text-[var(--color-ash)] mb-8">
          هنوز چیزی به سبد اضافه نکرده‌اید. سری به منو بزنید.
        </p>
        <Link href="/menu" className="btn-primary">
          مشاهده منو
        </Link>
      </div>
    );
  }

  if (!ready) {
    return <div className="max-w-2xl mx-auto px-5 pt-32 pb-24 text-center text-[var(--color-ash)]">در حال بارگذاری…</div>;
  }

  // ثبت سفارش فقط با شماره‌ی موبایلِ تأییدشده
  if (!phone) {
    return (
      <div className="max-w-2xl mx-auto px-5 pt-32 pb-24 text-center">
        <h1 className="text-2xl font-extrabold mb-3">برای ثبت سفارش وارد شوید</h1>
        <p className="text-[var(--color-ash)] mb-8 leading-7">
          سبد سفارش شما محفوظ است. با شماره موبایلتان وارد شوید تا سفارش را تکمیل کنید.
        </p>
        <button type="button" onClick={openLogin} className="btn-primary">
          ورود با شماره موبایل
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-5 pt-28 pb-24">
      <h1 className="text-3xl font-black mb-2">تکمیل سفارش</h1>
      <p className="text-sm text-[var(--color-ash)] mb-8">
        ثبت‌شده با شماره <span dir="ltr">{maskMobile(phone)}</span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-2 order-2 md:order-1">
          <h2 className="font-bold text-sm text-[var(--color-ash)] mb-4">خلاصه سفارش</h2>
          <div className="gorg-card rounded-2xl p-5 space-y-3">
            {lines.map((line) => (
              <div key={line.id} className="flex items-center justify-between text-sm">
                <span>
                  {line.qty}× {line.name}
                </span>
                <span className="text-[var(--color-ash)]">
                  {formatPrice(line.price * line.qty)} تومان
                </span>
              </div>
            ))}
            {fee > 0 && (
              <div className="flex items-center justify-between text-sm text-[var(--color-ash)]">
                <span>هزینه ارسال</span>
                <span>{formatPrice(fee)} تومان</span>
              </div>
            )}
            <div className="border-t border-white/10 pt-3 flex items-center justify-between font-extrabold">
              <span>جمع کل</span>
              <span>{formatPrice(payable)} تومان</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="md:col-span-3 order-1 md:order-2 space-y-5">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setOrderType("delivery")}
              className={`flex-1 py-3 rounded-xl text-sm font-bold border ${
                orderType === "delivery"
                  ? "bg-[var(--color-ember)] border-[var(--color-ember)] text-white"
                  : "border-white/12 text-[var(--color-ash)]"
              }`}
            >
              ارسال با پیک
            </button>
            <button
              type="button"
              onClick={() => setOrderType("pickup")}
              className={`flex-1 py-3 rounded-xl text-sm font-bold border ${
                orderType === "pickup"
                  ? "bg-[var(--color-ember)] border-[var(--color-ember)] text-white"
                  : "border-white/12 text-[var(--color-ash)]"
              }`}
            >
              تحویل حضوری
            </button>
            {table && (
              <button
                type="button"
                onClick={() => setOrderType("dine_in")}
                className={`flex-1 py-3 rounded-xl text-sm font-bold border ${
                  orderType === "dine_in"
                    ? "bg-[var(--color-ember)] border-[var(--color-ember)] text-white"
                    : "border-white/12 text-[var(--color-ash)]"
                }`}
              >
                سالن · میز {table.code}
              </button>
            )}
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-bold mb-2">
              نام و نام‌خانوادگی
            </label>
            <input
              id="name"
              required
              autoComplete="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-[var(--color-charcoal)] border border-white/12 rounded-xl px-4 py-3 text-sm focus:border-[var(--color-ember)] outline-none"
              placeholder="مثلاً علی محمدی"
            />
          </div>

          {orderType === "delivery" && (
            <div>
              <div className="flex items-center justify-between gap-3 mb-2">
                <label htmlFor="address" className="block text-sm font-bold">
                  آدرس دقیق
                </label>
                <button
                  type="button"
                  onClick={() => setPickerOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-ember-light)] border border-[var(--color-ember)]/50 rounded-full px-3.5 py-1.5 hover:bg-[var(--color-ember)]/10 transition-colors"
                >
                  <span aria-hidden="true">📍</span>
                  {location ? "تغییر موقعیت روی نقشه" : "انتخاب روی نقشه"}
                </button>
              </div>
              <textarea
                id="address"
                required
                autoComplete="street-address"
                rows={3}
                value={form.address}
                onChange={(e) => {
                  setForm({ ...form, address: e.target.value });
                  setAddressEdited(true);
                }}
                className="w-full bg-[var(--color-charcoal)] border border-white/12 rounded-xl px-4 py-3 text-sm focus:border-[var(--color-ember)] outline-none resize-none"
                placeholder="خیابان، کوچه، پلاک، واحد — یا «انتخاب روی نقشه» را بزنید"
              />
              {location ? (
                <p className="mt-2 flex items-center justify-between gap-3 text-xs text-emerald-400">
                  <span>✓ موقعیت شما روی نقشه ثبت شد؛ پلاک و واحد را در آدرس بنویسید.</span>
                  <button
                    type="button"
                    onClick={() => setLocation(null)}
                    className="shrink-0 text-[var(--color-ash)] hover:text-[var(--color-ember-light)]"
                  >
                    حذف
                  </button>
                </p>
              ) : (
                <p className="mt-2 text-xs text-[var(--color-ash)]">
                  آدرس را می‌توانید تایپ کنید یا روی نقشه انتخاب کنید (انتخاب روی نقشه دقیق‌تر و سریع‌تر است).
                </p>
              )}
            </div>
          )}

          <div>
            <label htmlFor="notes" className="block text-sm font-bold mb-2">
              توضیحات سفارش (اختیاری)
            </label>
            <textarea
              id="notes"
              rows={2}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="w-full bg-[var(--color-charcoal)] border border-white/12 rounded-xl px-4 py-3 text-sm focus:border-[var(--color-ember)] outline-none resize-none"
              placeholder="مثلاً بدون فلفل"
            />
          </div>

          {closed && (
            <p role="alert" className="text-sm text-amber-300 leading-7">
              {cfg?.closedMessage}
            </p>
          )}
          {!closed && belowMin && (
            <p role="alert" className="text-sm text-amber-300 leading-7">
              حداقل مبلغ سفارش {formatPrice(cfg?.minOrder ?? 0)} تومان است؛ چند آیتم دیگر به سبد اضافه کنید.
            </p>
          )}

          {status === "error" && (
            <p role="alert" className="text-sm text-[var(--color-ember-light)] leading-7">
              {errorMsg}
            </p>
          )}

          <button type="submit" disabled={status === "sending" || closed || belowMin} className="btn-primary w-full disabled:opacity-60">
            {status === "sending" ? "در حال انتقال به درگاه پرداخت…" : `پرداخت و ثبت سفارش · ${formatPrice(payable)} تومان`}
          </button>
          <p className="text-xs text-[var(--color-ash)] text-center leading-6">
            سفارش شما فقط بعد از پرداخت موفق ثبت و برای رستوران ارسال می‌شود.
          </p>
        </form>
      </div>

      {pickerOpen && (
        <AddressMapPicker initial={location} onConfirm={handlePicked} onClose={() => setPickerOpen(false)} />
      )}
    </div>
  );
}
