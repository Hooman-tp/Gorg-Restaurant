"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { isValidIranianPhone } from "@/lib/validation";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "989120000000";
const REMEMBER_KEY = "gorg-checkout-info-v1";

function formatPrice(n: number) {
  return n.toLocaleString("fa-IR");
}

type Status = "idle" | "sending" | "success" | "error";

export default function CheckoutPage() {
  const { lines, total, clearCart } = useCart();
  const [status, setStatus] = useState<Status>("idle");
  const [orderType, setOrderType] = useState<"delivery" | "pickup">("delivery");
  const [form, setForm] = useState({ name: "", phone: "", address: "", notes: "" });
  const [phoneError, setPhoneError] = useState("");
  const [orderCode, setOrderCode] = useState("");

  // پر کردن خودکار فرم از اطلاعات ذخیره‌شده‌ی سفارش قبلی (در همین مرورگر).
  // این effect برای همگام‌سازی state با localStorage (یک سیستم خارجی) است،
  // نه مشتق‌شده از state دیگر، پس اجرای setState یک‌بار در mount لازم است.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(REMEMBER_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setForm((f) => ({ ...f, name: parsed.name || "", phone: parsed.phone || "", address: parsed.address || "" }));
      }
    } catch {
      // نادیده گرفته می‌شود
    }
  }, []);

  const whatsappText = encodeURIComponent(
    `سلام گرگ، سفارش من (کد ${orderCode}):\n${lines.map((l) => `${l.qty}× ${l.name}`).join("\n")}\n\nجمع: ${formatPrice(
      total
    )} تومان\nنام: ${form.name || "-"}\nتلفن: ${form.phone || "-"}\n${
      orderType === "delivery" ? "آدرس: " + (form.address || "-") : "تحویل حضوری"
    }`
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lines.length === 0) return;

    if (!isValidIranianPhone(form.phone)) {
      setPhoneError("شماره موبایل یا تلفن ثابت را درست وارد کنید (مثلاً 09123456789)");
      return;
    }
    setPhoneError("");

    setStatus("sending");
    try {
      const res = await fetch("/api/checkout/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines, total, orderType, ...form }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "failed");

      // اگر درگاه پرداخت فعال باشد، کاربر به صفحه‌ی پرداخت زرین‌پال منتقل می‌شود
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
        return;
      }

      // در غیر این صورت (هنوز درگاه پرداخت وصل نشده)، سفارش مستقیم ثبت شده است
      setOrderCode(data.orderCode);
      setStatus("success");
      clearCart();
      try {
        window.localStorage.setItem(
          REMEMBER_KEY,
          JSON.stringify({ name: form.name, phone: form.phone, address: form.address })
        );
      } catch {
        // ذخیره‌سازی ممکن است در حالت خصوصی مرورگر ناموفق باشد؛ بی‌اهمیت است
      }
    } catch {
      setStatus("error");
    }
  };

  if (lines.length === 0 && status !== "success") {
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

  if (status === "success") {
    return (
      <div className="max-w-2xl mx-auto px-5 pt-32 pb-24 text-center">
        <div className="w-16 h-16 rounded-full bg-[var(--color-ember)]/15 border border-[var(--color-ember)]/40 flex items-center justify-center mx-auto mb-6 text-3xl">
          ✓
        </div>
        <h1 className="text-2xl font-extrabold mb-3">سفارش شما ثبت شد</h1>

        <div className="inline-block gorg-card rounded-2xl px-6 py-4 mb-6">
          <p className="text-xs text-[var(--color-ash)] mb-1">کد پیگیری سفارش</p>
          <p className="text-2xl font-black tracking-wider" dir="ltr">{orderCode}</p>
        </div>

        <p className="text-[var(--color-ash)] mb-4 leading-7">
          گرگ سفارشتان را دریافت کرد و به‌زودی برای تأیید نهایی با شما تماس
          می‌گیریم. این کد را نگه دارید؛ برای پیگیری سفارش می‌توانید همین کد
          را در واتساپ یا تلفن به ما بگویید.
        </p>
        <p className="text-sm text-[var(--color-ember-light)] font-bold mb-8">
          {orderType === "delivery" ? "زمان تقریبی ارسال: ۴۵ تا ۶۰ دقیقه" : "زمان تقریبی آماده‌سازی: ۲۵ تا ۳۵ دقیقه"}
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            ارسال در واتساپ
          </a>
          <Link href="/menu" className="btn-outline">
            بازگشت به منو
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-5 pt-28 pb-24">
      <h1 className="text-3xl font-black mb-8">تکمیل سفارش</h1>

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
            <div className="border-t border-white/10 pt-3 flex items-center justify-between font-extrabold">
              <span>جمع کل</span>
              <span>{formatPrice(total)} تومان</span>
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
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-bold mb-2">
              نام و نام‌خانوادگی
            </label>
            <input
              id="name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-[var(--color-charcoal)] border border-white/12 rounded-xl px-4 py-3 text-sm focus:border-[var(--color-ember)] outline-none"
              placeholder="مثلاً علی محمدی"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-bold mb-2">
              شماره تماس
            </label>
            <input
              id="phone"
              required
              inputMode="tel"
              dir="ltr"
              value={form.phone}
              onChange={(e) => {
                setForm({ ...form, phone: e.target.value });
                if (phoneError) setPhoneError("");
              }}
              onBlur={() => {
                if (form.phone && !isValidIranianPhone(form.phone)) {
                  setPhoneError("شماره موبایل یا تلفن ثابت را درست وارد کنید (مثلاً 09123456789)");
                }
              }}
              className={`w-full bg-[var(--color-charcoal)] border rounded-xl px-4 py-3 text-sm outline-none text-left ${
                phoneError ? "border-red-500" : "border-white/12 focus:border-[var(--color-ember)]"
              }`}
              placeholder="09123456789"
            />
            {phoneError && <p className="text-xs text-red-400 mt-2">{phoneError}</p>}
          </div>

          {orderType === "delivery" && (
            <div>
              <label htmlFor="address" className="block text-sm font-bold mb-2">
                آدرس دقیق
              </label>
              <textarea
                id="address"
                required
                rows={3}
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full bg-[var(--color-charcoal)] border border-white/12 rounded-xl px-4 py-3 text-sm focus:border-[var(--color-ember)] outline-none resize-none"
                placeholder="خیابان، کوچه، پلاک، واحد"
              />
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

          {status === "error" && (
            <p className="text-sm text-[var(--color-ember-light)]">
              ثبت سفارش با مشکل مواجه شد. لطفاً دوباره تلاش کنید یا مستقیم در
              واتساپ پیام بدهید.
            </p>
          )}

          <button type="submit" disabled={status === "sending"} className="btn-primary w-full disabled:opacity-60">
            {status === "sending" ? "در حال ثبت…" : `ثبت نهایی سفارش · ${formatPrice(total)} تومان`}
          </button>
        </form>
      </div>
    </div>
  );
}
