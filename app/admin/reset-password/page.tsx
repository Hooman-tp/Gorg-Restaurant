"use client";

import { Suspense, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "@/lib/adminClient";

function ResetForm() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token") ?? "";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await api("/api/admin/reset-password", { body: { token, username, password, confirmPassword } });
      setDone(true);
      setTimeout(() => router.push("/admin"), 1800);
    } catch (err) {
      setError(err instanceof Error ? err.message : "بازیابی ناموفق بود");
    } finally {
      setBusy(false);
    }
  }

  if (!token) {
    return (
      <div className="panel-card p-6 text-center leading-8">
        <p className="font-extrabold mb-2">لینک نامعتبر است</p>
        <p className="text-sm text-[var(--color-ash)]">این صفحه فقط از طریق لینکِ ارسال‌شده به ایمیلِ بازیابی باز می‌شود.</p>
      </div>
    );
  }

  if (done) {
    return (
      <div className="panel-card p-6 text-center leading-8">
        <p className="font-extrabold mb-2">✅ انجام شد</p>
        <p className="text-sm text-[var(--color-ash)]">نام کاربری و رمز عبور جدید ثبت شد؛ در حال انتقال به پنل…</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="panel-card p-6 space-y-4">
      <p className="text-sm text-[var(--color-ash)] leading-7">یک نام کاربری و رمز عبور جدید برای پنل مدیریت تعیین کنید.</p>
      <input
        type="text"
        required
        autoFocus
        autoComplete="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="نام کاربری جدید"
        className="panel-input"
      />
      <input
        type="password"
        required
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="رمز عبور جدید (حداقل ۸ کاراکتر)"
        className="panel-input"
      />
      <input
        type="password"
        required
        autoComplete="new-password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="تکرار رمز عبور جدید"
        className="panel-input"
      />
      {error && <p className="text-sm text-[var(--color-ember-light)]">{error}</p>}
      <button type="submit" disabled={busy} className="btn-primary w-full disabled:opacity-60">
        {busy ? "در حال ثبت…" : "ثبت و ورود"}
      </button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen brand-texture-soft flex items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-6">
          <Image src="/images/gorg-mark.png" alt="گرگ" width={64} height={64} className="rounded-full mb-3" priority />
          <h1 className="text-2xl font-black">تعیین رمز عبور جدید</h1>
        </div>
        <Suspense fallback={<div className="panel-card p-6 text-center text-sm text-[var(--color-ash)]">در حال بارگذاری…</div>}>
          <ResetForm />
        </Suspense>
      </div>
    </div>
  );
}
