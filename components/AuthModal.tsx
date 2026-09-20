"use client";

import Image from "next/image";
import { ClipboardEvent, FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { maskMobile, mobileError, normalizeDigits, normalizeMobile } from "@/lib/phone";

const CODE_LENGTH = 6;
const RING_R = 15;
const RING_C = 2 * Math.PI * RING_R;

const fa = (n: number) => n.toLocaleString("fa-IR");

function formatTimer(seconds: number) {
  return `${fa(Math.floor(seconds / 60))}:${(seconds % 60).toLocaleString("fa-IR", { minimumIntegerDigits: 2 })}`;
}

/* ───────────── آیکون‌ها ───────────── */
function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="6.5" y="2.8" width="11" height="18.4" rx="2.8" stroke="currentColor" strokeWidth="1.7" />
      <path d="M10.5 18h3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M19 12H5m0 0 6-6m-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function Spinner() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="animate-spin">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
function Tick({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** پنجره‌ی ورود: ۱) شماره موبایل  ۲) رمز یکبار مصرفِ پیامک‌شده  ۳) خوش‌آمد */
export default function AuthModal() {
  const { isOpen } = useAuth();
  // با بسته‌شدن، کل کامپوننت برداشته می‌شود تا دفعه‌ی بعد همه‌چیز از نو شروع شود
  return isOpen ? <LoginDialog /> : null;
}

function LoginDialog() {
  const { closeLogin, onLoggedIn } = useAuth();
  const [step, setStep] = useState<"phone" | "code" | "done">("phone");
  const [phoneInput, setPhoneInput] = useState("");
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [digits, setDigits] = useState<string[]>(() => Array(CODE_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [resendLeft, setResendLeft] = useState(0);
  const [resendTotal, setResendTotal] = useState(120);
  const phoneRef = useRef<HTMLInputElement>(null);
  const boxRefs = useRef<(HTMLInputElement | null)[]>([]);
  const doneTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const phone = normalizeMobile(phoneInput);
  const digitCount = normalizeDigits(phoneInput).length;
  const liveError = phoneTouched || digitCount >= 11 ? mobileError(phoneInput) : "";
  const phoneInvalid = Boolean(liveError || (error && step === "phone"));
  const code = digits.join("");

  // فوکوس روی فیلدِ هر مرحله
  useEffect(() => {
    if (step === "phone") phoneRef.current?.focus();
    if (step === "code") boxRefs.current[0]?.focus();
  }, [step]);

  // بستن با Escape و جلوگیری از اسکرولِ صفحه‌ی زیرِ پنجره
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape" && step !== "done") closeLogin();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [closeLogin, step]);

  // شمارنده‌ی «ارسال مجدد»
  useEffect(() => {
    if (resendLeft <= 0) return;
    const t = setInterval(() => setResendLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [resendLeft > 0]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => {
    if (doneTimer.current) clearTimeout(doneTimer.current);
  }, []);

  function failShake() {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  }

  async function requestCode() {
    if (loading) return;
    setPhoneTouched(true);
    if (!phone) {
      setError(mobileError(phoneInput));
      failShake();
      return;
    }
    setLoading(true);
    setError("");
    setInfo("");
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok || (res.status === 429 && data.reason === "cooldown")) {
        const wait = Number(res.ok ? data.resendAfter : data.retryAfter) || 120;
        setStep("code");
        setDigits(Array(CODE_LENGTH).fill(""));
        setResendTotal(res.ok ? wait : 120);
        setResendLeft(wait);
        setInfo(res.ok ? "کد ۶ رقمی برای شما پیامک شد." : "کد همین چند لحظه پیش برای شما پیامک شده؛ همان را وارد کنید.");
      } else {
        setError(data.error || "خطایی رخ داد. دوباره تلاش کنید.");
        failShake();
      }
    } catch {
      setError("اتصال برقرار نشد. اینترنت خود را بررسی کنید.");
      failShake();
    } finally {
      setLoading(false);
    }
  }

  async function verify(value: string) {
    if (loading || !phone) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code: value }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.phone) {
        setStep("done");
        doneTimer.current = setTimeout(() => onLoggedIn(data.phone), 1400);
        return;
      }
      setError(data.error || "کد اشتباه است.");
      if (data.reason === "expired") setResendLeft(0);
      setDigits(Array(CODE_LENGTH).fill(""));
      failShake();
      boxRefs.current[0]?.focus();
    } catch {
      setError("اتصال برقرار نشد. اینترنت خود را بررسی کنید.");
      failShake();
    } finally {
      setLoading(false);
    }
  }

  // ورودیِ یک خانه (تایپ، چسباندن یا پُرشدنِ خودکار از پیامک)
  function onBoxChange(index: number, raw: string) {
    const clean = normalizeDigits(raw).replace(/\D/g, "");
    if (error) setError("");
    if (!clean) {
      setDigits((d) => d.map((v, i) => (i === index ? "" : v)));
      return;
    }
    const next = [...digits];
    if (clean.length === 2 && digits[index]) {
      // روی خانه‌ی پُر تایپ شده: فقط رقمِ تازه را بگیر
      next[index] = clean.replace(digits[index], "").slice(-1) || clean.slice(-1);
      setDigits(next);
      boxRefs.current[Math.min(index + 1, CODE_LENGTH - 1)]?.focus();
    } else {
      clean
        .slice(0, CODE_LENGTH - index)
        .split("")
        .forEach((ch, i) => (next[index + i] = ch));
      setDigits(next);
      boxRefs.current[Math.min(index + clean.length, CODE_LENGTH - 1)]?.focus();
    }
    if (next.every(Boolean)) verify(next.join(""));
  }

  function onBoxKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      e.preventDefault();
      setDigits((d) => d.map((v, i) => (i === index - 1 ? "" : v)));
      boxRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      boxRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < CODE_LENGTH - 1) {
      boxRefs.current[index + 1]?.focus();
    }
  }

  function onBoxPaste(index: number, e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    onBoxChange(index, e.clipboardData.getData("text"));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (step === "phone") requestCode();
    else if (step === "code" && code.length === CODE_LENGTH) verify(code);
  }

  const canSubmit = step === "phone" ? Boolean(phone) : code.length === CODE_LENGTH;

  return (
    <div className="fixed inset-0 z-[160] flex items-end sm:items-center justify-center sm:p-6">
      <div
        className="auth-fade absolute inset-0 bg-black/75"
        onClick={() => step !== "done" && closeLogin()}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-title"
        data-lenis-prevent
        className="auth-rise relative w-full sm:max-w-[880px] sm:grid sm:grid-cols-[1.05fr_1fr] overflow-hidden bg-[var(--color-charcoal)] border border-white/10 rounded-t-[28px] sm:rounded-[28px] shadow-[0_30px_120px_rgba(0,0,0,0.75)] max-h-[100svh] overflow-y-auto"
      >
        {step !== "done" && (
          <button
            type="button"
            onClick={closeLogin}
            aria-label="بستن"
            className="absolute top-3.5 left-3.5 z-20 w-9 h-9 rounded-full bg-black/40 border border-white/15 flex items-center justify-center text-sm hover:bg-black/60 transition-colors"
          >
            ✕
          </button>
        )}

        {/* ═══ پنلِ برند (موبایل: نوار بالا · دسکتاپ: ستونِ کناری) ═══ */}
        <div className="order-1 sm:order-2 relative h-36 sm:h-auto sm:min-h-[580px] overflow-hidden bg-[var(--color-blood-dark)]">
          <Image
            src="/images/texture-red-clean.jpg"
            alt=""
            fill
            sizes="(min-width: 640px) 440px, 100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/25" />
          {/* محوشدن به رنگِ کارت */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-charcoal)] sm:hidden" />
          <div className="absolute inset-0 hidden sm:block bg-gradient-to-r from-black/10 via-transparent to-[var(--color-charcoal)]/95" />
          <div className="auth-glow absolute -top-10 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-[var(--color-ember)]/30 blur-3xl pointer-events-none" />

          <div className="relative h-full flex sm:flex-col items-center justify-center sm:justify-between gap-4 sm:gap-0 sm:py-12 sm:px-8 text-center">
            <div className="sm:mt-6">
              <Image
                src="/images/gorg-claw.png"
                alt=""
                width={197}
                height={240}
                className="w-14 sm:w-24 h-auto drop-shadow-[0_0_22px_rgba(241,106,79,0.55)]"
                priority
              />
            </div>

            <div className="hidden sm:block">
              <p className="text-[11px] tracking-[0.45em] text-[var(--color-ember-light)]">TRUST YOUR INSTINCT</p>
              <p className="mt-3 text-3xl font-extrabold leading-snug">
                به غریزه‌ات
                <br />
                اعتماد کن
              </p>
              <ul className="mt-8 space-y-3 text-sm text-[var(--color-bone)]/90 text-right inline-block">
                {["بدون رمز عبور؛ فقط یک پیامک", "کد یک‌بارمصرف، امن و سریع"].map((t) => (
                  <li key={t} className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[var(--color-ember)]/25 border border-[var(--color-ember)]/50 flex items-center justify-center text-[var(--color-ember-light)]">
                      <Tick />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ═══ ستونِ فرم ═══ */}
        <div className="order-2 sm:order-1 px-6 sm:px-10 pt-1 sm:pt-12 pb-8 sm:pb-12 flex flex-col justify-center min-h-[380px]">
          {step === "done" ? (
            <div className="text-center py-6" role="status">
              <div className="auth-pop mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-[var(--color-ember)] to-[var(--color-blood)] shadow-[0_0_60px_rgba(221,74,52,0.5)] flex items-center justify-center">
                <svg width="46" height="46" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="m5 12.5 4.5 4.5L19 7.5"
                    stroke="#fff"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="auth-draw"
                    style={{ strokeDasharray: 24, strokeDashoffset: 24 }}
                  />
                </svg>
              </div>
              <h2 id="login-title" className="mt-6 text-2xl font-extrabold">
                خوش آمدی!
              </h2>
              <p dir="ltr" className="mt-2 text-[var(--color-ash)] text-sm">
                {phone ? maskMobile(phone) : ""}
              </p>
              <p className="mt-1 text-xs text-[var(--color-ash)]">ورود با موفقیت انجام شد…</p>
            </div>
          ) : (
            <>
              {/* نوار مراحل */}
              <div className="flex items-center gap-2 mb-6" aria-hidden="true">
                <span className="h-1 flex-1 rounded-full bg-[var(--color-ember)]" />
                <span
                  className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                    step === "code" ? "bg-[var(--color-ember)]" : "bg-white/12"
                  }`}
                />
              </div>

              <div key={step} className="auth-step">
                <h2 id="login-title" className="font-extrabold text-2xl leading-tight">
                  {step === "phone" ? "ورود به گرگ" : "کد تأیید را وارد کن"}
                </h2>
                <p className="text-sm text-[var(--color-ash)] mt-2.5 leading-7">
                  {step === "phone" ? (
                    "شماره موبایلت را وارد کن؛ یک رمز یکبار مصرف برایت پیامک می‌کنیم."
                  ) : (
                    <>
                      کد ۶ رقمی به <span dir="ltr" className="font-bold text-[var(--color-bone)]">{phone}</span> پیامک شد.
                    </>
                  )}
                </p>

                <form onSubmit={onSubmit} className="mt-6" noValidate>
                  {step === "phone" ? (
                    <div className={shake ? "auth-shake" : ""}>
                      <div className="flex items-center justify-between mb-2">
                        <label htmlFor="login-phone" className="text-sm font-bold">
                          شماره موبایل
                        </label>
                        <span className="text-xs text-[var(--color-ash)]" aria-hidden="true">
                          {fa(Math.min(digitCount, 11))} از {fa(11)}
                        </span>
                      </div>
                      <div
                        dir="ltr"
                        className={`flex items-center gap-3 rounded-2xl border bg-white/[0.04] px-4 transition-all ${
                          phoneInvalid
                            ? "border-red-500/70 shadow-[0_0_0_4px_rgba(239,68,68,0.12)]"
                            : "border-white/12 focus-within:border-[var(--color-ember)] focus-within:shadow-[0_0_0_4px_rgba(221,74,52,0.16)]"
                        }`}
                      >
                        <span className="text-[var(--color-ash)]">
                          <PhoneIcon />
                        </span>
                        <input
                          ref={phoneRef}
                          id="login-phone"
                          type="tel"
                          inputMode="numeric"
                          autoComplete="tel-national"
                          maxLength={14}
                          value={phoneInput}
                          onChange={(e) => {
                            setPhoneInput(e.target.value.replace(/[^0-9۰-۹٠-٩+]/g, ""));
                            if (error) setError("");
                          }}
                          onBlur={() => phoneInput && setPhoneTouched(true)}
                          aria-invalid={phoneInvalid}
                          aria-describedby="login-phone-help"
                          placeholder="09123456789"
                          className="flex-1 min-w-0 bg-transparent py-4 text-lg font-semibold tracking-[0.12em] text-left outline-none placeholder:text-white/20 placeholder:font-normal placeholder:tracking-[0.08em]"
                        />
                        {phone && (
                          <span className="auth-pop w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                            <Tick />
                          </span>
                        )}
                      </div>
                      <p
                        id="login-phone-help"
                        role={phoneInvalid ? "alert" : undefined}
                        className={`text-xs mt-2.5 ${phoneInvalid ? "text-red-400" : "text-[var(--color-ash)]"}`}
                      >
                        {error || liveError || "شماره موبایل باید ۱۱ رقم باشد و با ۰۹ شروع شود."}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div
                        dir="ltr"
                        role="group"
                        aria-label="کد ۶ رقمی"
                        className={`flex justify-center gap-2 sm:gap-2.5 transition-opacity ${loading ? "opacity-60" : ""} ${
                          shake ? "auth-shake" : ""
                        }`}
                      >
                        {digits.map((d, i) => (
                          <input
                            key={i}
                            ref={(el) => {
                              boxRefs.current[i] = el;
                            }}
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            autoComplete="one-time-code"
                            value={d}
                            readOnly={loading}
                            onChange={(e) => onBoxChange(i, e.target.value)}
                            onKeyDown={(e) => onBoxKeyDown(i, e)}
                            onPaste={(e) => onBoxPaste(i, e)}
                            onFocus={(e) => e.target.select()}
                            aria-label={`رقم ${fa(i + 1)}`}
                            aria-invalid={Boolean(error)}
                            className={`w-11 h-14 sm:w-12 sm:h-[60px] text-center text-2xl font-bold rounded-xl border outline-none transition-all ${
                              error
                                ? "border-red-500/70 bg-red-500/5"
                                : d
                                ? "border-[var(--color-ember)]/70 bg-[var(--color-ember)]/10"
                                : "border-white/12 bg-white/[0.04] focus:border-[var(--color-ember)] focus:shadow-[0_0_0_4px_rgba(221,74,52,0.16)]"
                            }`}
                          />
                        ))}
                      </div>

                      <p
                        role="status"
                        className={`text-xs mt-4 text-center min-h-[1.25rem] ${error ? "text-red-400" : "text-[var(--color-ash)]"}`}
                      >
                        {error || info}
                      </p>

                      <div className="flex items-center justify-between mt-4 text-sm">
                        <button
                          type="button"
                          onClick={() => {
                            setStep("phone");
                            setDigits(Array(CODE_LENGTH).fill(""));
                            setError("");
                            setInfo("");
                          }}
                          className="text-[var(--color-ash)] hover:text-[var(--color-ember-light)] transition-colors"
                        >
                          ویرایش شماره
                        </button>

                        {resendLeft > 0 ? (
                          <span className="flex items-center gap-2 text-[var(--color-ash)]">
                            <span className="relative w-9 h-9 flex items-center justify-center text-[10px] text-[var(--color-bone)]">
                              <svg width="36" height="36" viewBox="0 0 36 36" className="absolute inset-0 -rotate-90" aria-hidden="true">
                                <circle cx="18" cy="18" r={RING_R} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2.5" />
                                <circle
                                  cx="18"
                                  cy="18"
                                  r={RING_R}
                                  fill="none"
                                  stroke="var(--color-ember)"
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                  strokeDasharray={RING_C}
                                  strokeDashoffset={RING_C * (1 - resendLeft / resendTotal)}
                                  style={{ transition: "stroke-dashoffset 1s linear" }}
                                />
                              </svg>
                              {formatTimer(resendLeft)}
                            </span>
                            ارسال مجدد
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={requestCode}
                            disabled={loading}
                            className="text-[var(--color-ember-light)] font-bold disabled:opacity-50"
                          >
                            ارسال مجدد کد
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading || !canSubmit}
                    className="btn-primary w-full !py-3.5 mt-6 disabled:opacity-40 disabled:pointer-events-none"
                  >
                    {loading ? (
                      <>
                        <Spinner /> کمی صبر کن…
                      </>
                    ) : step === "phone" ? (
                      <>
                        دریافت کد ورود <ArrowIcon />
                      </>
                    ) : (
                      "ورود"
                    )}
                  </button>
                </form>

                <p className="text-[11px] text-[var(--color-ash)] mt-5 leading-6 text-center">
                  کد ورود را در اختیار هیچ‌کس قرار نده؛ ما هرگز آن را از تو نمی‌پرسیم.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
