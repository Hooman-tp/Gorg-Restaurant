"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/adminClient";
import type { Settings } from "@/lib/settings";
import { useFetch } from "@/components/admin/hooks";
import { Card, ErrorBox, Field, Loading, NumInput, PageTitle, PasswordField, Toggle, useToast } from "@/components/admin/ui";

interface Data {
  settings: Settings;
  system: { payment: boolean; sms: boolean; email: boolean; ownerEmail: boolean };
}

export default function SettingsPage() {
  const toast = useToast();
  const { data, error, loading, reload } = useFetch<Data>("/api/admin/settings");
  const [form, setForm] = useState<Settings | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (data && !form) setForm(data.settings);
  }, [data, form]);

  if (loading && !data) return <Loading />;
  if (error && !data) return <ErrorBox message={error} onRetry={() => reload()} />;
  if (!data || !form) return null;

  async function save() {
    setBusy(true);
    try {
      await api("/api/admin/settings", { method: "PUT", body: form });
      toast("تنظیمات ذخیره شد و روی سایت اعمال شد");
      await reload(true);
    } catch (e) {
      toast(e instanceof Error ? e.message : "خطا", "error");
    } finally {
      setBusy(false);
    }
  }

  const sys = data.system;
  const rows: [string, boolean, string][] = [
    ["درگاه پرداخت (زرین‌پال)", sys.payment, "بدون آن سفارش آنلاین ثبت نمی‌شود — ZARINPAL_MERCHANT_ID"],
    ["پیامک مشتری (کاوه‌نگار)", sys.sms, "KAVENEGAR_API_KEY"],
    ["ایمیل سفارش به مدیر (Resend)", sys.email && sys.ownerEmail, "RESEND_API_KEY و ORDER_RECIPIENT_EMAIL"],
  ];

  return (
    <>
      <PageTitle title="تنظیمات" sub="این تنظیمات همین لحظه روی سایت هم اعمال می‌شود" />

      <div className="grid lg:grid-cols-2 gap-4">
        <Card title="سفارش آنلاین">
          <div className="space-y-4">
            <label className="flex items-center justify-between gap-3">
              <span>
                <span className="block font-bold text-sm">پذیرش سفارش آنلاین (سایت و QR)</span>
                <span className="block text-xs text-[var(--color-ash)] mt-0.5">با بستن آن، مشتری پیام «بسته است» می‌بیند و نمی‌تواند سفارش بدهد</span>
              </span>
              <Toggle checked={form.ordersOpen} onChange={(v) => setForm({ ...form, ordersOpen: v })} label="پذیرش سفارش آنلاین" />
            </label>
            <Field label="پیام هنگام بسته بودن">
              <input className="panel-input" value={form.closedMessage} onChange={(e) => setForm({ ...form, closedMessage: e.target.value })} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="حداقل مبلغ سفارش (تومان)" hint="۰ = بدون حداقل">
                <NumInput value={form.minOrder} onChange={(n) => setForm({ ...form, minOrder: n })} />
              </Field>
              <Field label="هزینه‌ی ارسال با پیک (تومان)" hint="۰ = رایگان">
                <NumInput value={form.deliveryFee} onChange={(n) => setForm({ ...form, deliveryFee: n })} />
              </Field>
            </div>
          </div>
        </Card>

        <Card title="عمومی و اعلان‌ها">
          <div className="space-y-4">
            <Field label="نام کسب‌وکار (روی فیش و پنل)">
              <input className="panel-input" value={form.businessName} onChange={(e) => setForm({ ...form, businessName: e.target.value })} />
            </Field>
            <label className="flex items-center justify-between gap-3">
              <span>
                <span className="block font-bold text-sm">پیامک «سفارش آماده است» به مشتری</span>
                <span className="block text-xs text-[var(--color-ash)] mt-0.5">وقتی وضعیتِ سفارشِ سایت را «آماده» می‌کنید (هزینه‌ی پیامک دارد)</span>
              </span>
              <Toggle checked={form.smsOnReady} onChange={(v) => setForm({ ...form, smsOnReady: v })} label="پیامک آماده بودن سفارش" />
            </label>
          </div>
        </Card>
      </div>

      <div className="mt-5">
        <button className="btn-primary disabled:opacity-60" disabled={busy} onClick={save}>
          {busy ? "در حال ذخیره…" : "ذخیره‌ی تنظیمات"}
        </button>
      </div>

      <Card title="وضعیت اتصال سرویس‌ها" className="mt-5">
        <ul className="space-y-3 text-sm">
          {rows.map(([label, ok, env]) => (
            <li key={label} className="flex items-start gap-3">
              <span className={`mt-0.5 ${ok ? "text-emerald-300" : "text-amber-300"}`}>{ok ? "●" : "○"}</span>
              <div>
                <p className="font-bold">
                  {label} <span className={`text-xs font-normal ${ok ? "text-emerald-300" : "text-amber-300"}`}>{ok ? "وصل است" : "وصل نیست"}</span>
                </p>
                {!ok && (
                  <p className="text-xs text-[var(--color-ash)] mt-0.5" dir="ltr">
                    {env}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </Card>

      <AccountCard />
    </>
  );
}

function AccountCard() {
  const toast = useToast();
  const { data, error, loading, reload } = useFetch<{ username: string; recoveryEmail: string }>("/api/admin/account");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (data && !touched) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setNewUsername(data.username);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRecoveryEmail(data.recoveryEmail);
    }
  }, [data, touched]);

  if (loading && !data) return <Loading />;
  if (error && !data) return <ErrorBox message={error} onRetry={() => reload()} />;
  if (!data) return null;

  async function save() {
    setBusy(true);
    try {
      await api("/api/admin/account", {
        body: { currentPassword, newUsername, newPassword, confirmPassword, recoveryEmail },
      });
      toast("حساب کاربری به‌روزرسانی شد");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTouched(false);
      await reload(true);
    } catch (e) {
      toast(e instanceof Error ? e.message : "خطا", "error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card title="حساب کاربری پنل مدیریت" className="mt-5">
      <div className="space-y-4">
        <p className="text-xs text-[var(--color-ash)] leading-6">
          نام کاربری و رمز عبورِ ورود به این پنل، و ایمیلِ بازیابی — اگر روزی رمز یا نام کاربری را فراموش کردید، لینکِ بازیابی به همین ایمیل ارسال
          می‌شود؛ پس بهتر است ایمیلی بزنید که همیشه در دسترستان باشد.
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="نام کاربری">
            <input
              className="panel-input"
              value={newUsername}
              onChange={(e) => {
                setTouched(true);
                setNewUsername(e.target.value);
              }}
            />
          </Field>
          <Field label="ایمیل بازیابی" hint="برای «رمز را فراموش کرده‌ام»">
            <input
              type="email"
              dir="ltr"
              className="panel-input text-left"
              value={recoveryEmail}
              onChange={(e) => {
                setTouched(true);
                setRecoveryEmail(e.target.value);
              }}
            />
          </Field>
          <Field label="رمز عبور جدید" hint="برای تغییر ندادنِ رمز، خالی بگذارید">
            <PasswordField value={newPassword} onChange={setNewPassword} placeholder="" autoComplete="new-password" />
          </Field>
          <Field label="تکرار رمز عبور جدید">
            <PasswordField value={confirmPassword} onChange={setConfirmPassword} placeholder="" autoComplete="new-password" />
          </Field>
        </div>
        <Field label="رمز عبور فعلی" hint="برای تأیید هر تغییری در این بخش لازم است">
          <PasswordField value={currentPassword} onChange={setCurrentPassword} placeholder="" autoComplete="current-password" required />
        </Field>
        <button className="btn-primary btn-sm disabled:opacity-60" disabled={busy || !currentPassword} onClick={save}>
          {busy ? "در حال ذخیره…" : "ذخیره‌ی حساب کاربری"}
        </button>
      </div>
    </Card>
  );
}
