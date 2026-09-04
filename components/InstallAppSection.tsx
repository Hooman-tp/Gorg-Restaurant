"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallAppSection() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIos, setIsIos] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [showIosHelp, setShowIosHelp] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // نصب سرویس‌ورکر شکست بخورد، مشکلی نیست؛ فقط دکمه‌ی نصب کار نمی‌کند
      });
    }

    // تشخیص iOS/حالت standalone فقط از API های مرورگری قابل‌خواندن است،
    // نه چیزی مشتق‌شده از state دیگر؛ پس این همگام‌سازیِ یک‌باره با محیط
    // مرورگر (نه یک anti-pattern derived-state) در effect لازم است.
    const ua = window.navigator.userAgent;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsIos(/iPad|iPhone|iPod/.test(ua) && !(window as unknown as { MSStream?: unknown }).MSStream);

    if (window.matchMedia("(display-mode: standalone)").matches) {
      setInstalled(true);
    }

    const onBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => setInstalled(true);

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (installed) return null;

  const handleClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      setDeferredPrompt(null);
      return;
    }
    if (isIos) {
      setShowIosHelp((v) => !v);
    }
  };

  return (
    <section className="max-w-3xl mx-auto px-5 py-20 text-center">
      <div className="claw-divider mx-auto mb-6" aria-hidden="true" />
      <h2 className="text-2xl font-extrabold mb-3">اپلیکیشن گرگ رو نصب کنید</h2>
      <p className="text-[var(--color-ash)] mb-6 max-w-lg mx-auto">
        بدون نیاز به مراجعه به فروشگاه اپلیکیشن، گرگ رو مثل یک اپ روی صفحه‌ی
        اصلی گوشیتون نصب کنید؛ سریع‌تر باز می‌شه و آیکون اختصاصی داره.
      </p>
      <button onClick={handleClick} className="btn-primary">
        نصب اپلیکیشن گرگ
      </button>

      {showIosHelp && (
        <div className="gorg-card rounded-2xl p-5 mt-6 max-w-sm mx-auto text-sm text-right">
          <p className="font-bold mb-2">نصب روی آیفون:</p>
          <ol className="space-y-1.5 text-[var(--color-ash)] list-decimal pr-5">
            <li>دکمه‌ی Share (مربع با فلش رو به بالا) را در سافاری بزنید</li>
            <li>گزینه‌ی «Add to Home Screen» را انتخاب کنید</li>
            <li>روی Add بزنید — آیکون گرگ روی صفحه‌ی اصلی گوشیتون اضافه می‌شود</li>
          </ol>
        </div>
      )}
    </section>
  );
}
