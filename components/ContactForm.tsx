"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      setForm({ name: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="gorg-card rounded-2xl p-8 text-center">
        <div className="text-3xl mb-3">✓</div>
        <p className="font-bold">پیام شما ارسال شد. به‌زودی با شما تماس می‌گیریم.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="c-name" className="block text-sm font-bold mb-2">
          نام شما
        </label>
        <input
          id="c-name"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full bg-[var(--color-charcoal)] border border-white/12 rounded-xl px-4 py-3 text-sm focus:border-[var(--color-ember)] outline-none"
        />
      </div>
      <div>
        <label htmlFor="c-phone" className="block text-sm font-bold mb-2">
          شماره تماس (اختیاری)
        </label>
        <input
          id="c-phone"
          inputMode="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full bg-[var(--color-charcoal)] border border-white/12 rounded-xl px-4 py-3 text-sm focus:border-[var(--color-ember)] outline-none"
        />
      </div>
      <div>
        <label htmlFor="c-message" className="block text-sm font-bold mb-2">
          پیام
        </label>
        <textarea
          id="c-message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full bg-[var(--color-charcoal)] border border-white/12 rounded-xl px-4 py-3 text-sm focus:border-[var(--color-ember)] outline-none resize-none"
        />
      </div>
      {status === "error" && (
        <p className="text-sm text-[var(--color-ember-light)]">
          ارسال پیام با مشکل مواجه شد. لطفاً دوباره تلاش کنید.
        </p>
      )}
      <button type="submit" disabled={status === "sending"} className="btn-primary w-full disabled:opacity-60">
        {status === "sending" ? "در حال ارسال…" : "ارسال پیام"}
      </button>
    </form>
  );
}
