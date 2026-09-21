"use client";

import { useEffect, useState } from "react";
import { api, fa } from "@/lib/adminClient";
import { useFetch } from "@/components/admin/hooks";
import { useAdmin } from "@/components/admin/AdminShell";
import { Badge, Card, Empty, ErrorBox, Field, Loading, PageTitle, Toggle, useToast } from "@/components/admin/ui";

interface Table {
  id: number;
  code: string;
  title: string;
  active: boolean;
}

export default function TablesPage() {
  const toast = useToast();
  const { businessName } = useAdmin();
  const { data, error, loading, reload } = useFetch<{ tables: Table[] }>("/api/admin/tables");
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [qr, setQr] = useState<Record<string, string>>({});
  const [origin, setOrigin] = useState("");

  const tables = data?.tables ?? [];
  const link = (c: string) => `${origin}/menu?table=${encodeURIComponent(c)}`;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrigin(window.location.origin);
  }, []);

  // ساختِ QR ها در مرورگر (بدون سرویس بیرونی)
  useEffect(() => {
    if (!origin || tables.length === 0) return;
    let cancelled = false;
    (async () => {
      const QRCode = (await import("qrcode")).default;
      const out: Record<string, string> = {};
      for (const t of tables) {
        out[t.code] = await QRCode.toDataURL(`${origin}/menu?table=${encodeURIComponent(t.code)}`, { margin: 1, width: 360, errorCorrectionLevel: "M" });
      }
      if (!cancelled) setQr(out);
    })().catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [origin, tables]);

  if (loading && !data) return <Loading />;
  if (error && !data) return <ErrorBox message={error} onRetry={() => reload()} />;

  async function post(body: Record<string, unknown>, okMsg?: string) {
    try {
      await api("/api/admin/tables", { body });
      if (okMsg) toast(okMsg);
      await reload(true);
      return true;
    } catch (e) {
      toast(e instanceof Error ? e.message : "خطا", "error");
      return false;
    }
  }

  function printAll() {
    const w = window.open("", "_blank");
    if (!w) return toast("پنجره‌ی چاپ مسدود شد؛ اجازه‌ی پاپ‌آپ بدهید", "error");
    const cards = tables
      .filter((t) => t.active && qr[t.code])
      .map(
        (t) => `<div class="c"><h2>${businessName}</h2><img src="${qr[t.code]}"><p class="n">میز ${t.code}</p><p>${t.title ? t.title + " — " : ""}برای دیدن منو و سفارش، اسکن کنید</p></div>`
      )
      .join("");
    w.document.write(`<!doctype html><html dir="rtl" lang="fa"><head><meta charset="utf-8"><title>QR میزها</title><style>
      body{font-family:Tahoma,sans-serif;margin:0;padding:10mm} .g{display:grid;grid-template-columns:repeat(3,1fr);gap:8mm}
      .c{border:1px dashed #000;padding:6mm;text-align:center;break-inside:avoid} img{width:100%;max-width:55mm} h2{margin:0 0 4mm;font-size:16px} .n{font-size:22px;font-weight:bold;margin:2mm 0} p{margin:1mm 0;font-size:12px}
    </style></head><body><div class="g">${cards}</div><script>window.onload=function(){window.print();}</script></body></html>`);
    w.document.close();
  }

  return (
    <>
      <PageTitle
        title="میز و QR"
        sub="برای هر میز یک QR بسازید؛ مشتری اسکن می‌کند، منو را می‌بیند و سفارش می‌دهد و سفارش با شماره‌ی میز به پنل می‌آید"
        actions={
          tables.length > 0 && (
            <button className="btn-outline btn-sm" onClick={printAll}>
              🖨️ چاپ همه‌ی QR ها
            </button>
          )
        }
      />

      <Card title="افزودن میز" className="mb-5">
        <div className="grid sm:grid-cols-3 gap-3 items-end">
          <Field label="شماره / کد میز" hint="مثلاً ۱ ، ۲ ، VIP-1 (بدون فاصله)">
            <input className="panel-input" value={code} onChange={(e) => setCode(e.target.value)} />
          </Field>
          <Field label="عنوان (اختیاری)">
            <input className="panel-input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="مثلاً کنار پنجره" />
          </Field>
          <button
            className="btn-primary disabled:opacity-60"
            disabled={!code.trim()}
            onClick={async () => {
              if (await post({ action: "add", code, title }, "میز اضافه شد")) {
                setCode("");
                setTitle("");
              }
            }}
          >
            افزودن میز
          </button>
        </div>
        <p className="text-xs text-[var(--color-ash)] leading-6 mt-3">
          سفارشِ QR هم مثل سفارش سایت فقط بعد از ورود با شماره موبایل و پرداختِ آنلاین ثبت می‌شود. برای سفارشِ نقدی/کارتی مشتریِ سرِ میز از «ثبت حضوری» استفاده کنید.
        </p>
      </Card>

      {tables.length === 0 ? (
        <Empty text="هنوز میزی ثبت نشده" />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tables.map((t) => (
            <div key={t.id} className={`panel-card p-4 text-center ${t.active ? "" : "opacity-55"}`}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xl font-black">میز {t.code}</p>
                {!t.active && <Badge className="border-white/15 text-[var(--color-ash)]">غیرفعال</Badge>}
              </div>
              {t.title && <p className="text-xs text-[var(--color-ash)] -mt-2 mb-3">{t.title}</p>}
              {qr[t.code] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={qr[t.code]} alt={`QR میز ${t.code}`} className="w-44 h-44 mx-auto rounded-xl bg-white p-2" />
              ) : (
                <div className="w-44 h-44 mx-auto rounded-xl bg-white/6 flex items-center justify-center text-xs text-[var(--color-ash)]">در حال ساخت QR…</div>
              )}
              <p className="text-[10px] text-[var(--color-ash)] mt-2 break-all" dir="ltr">
                {link(t.code)}
              </p>
              <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                <button
                  className="btn-outline btn-sm"
                  onClick={async () => {
                    await navigator.clipboard?.writeText(link(t.code));
                    toast("لینک کپی شد");
                  }}
                >
                  کپی لینک
                </button>
                {qr[t.code] && (
                  <a className="btn-outline btn-sm" href={qr[t.code]} download={`table-${t.code}.png`}>
                    دانلود QR
                  </a>
                )}
                <button
                  className="btn-danger"
                  onClick={async () => {
                    if (confirm(`میز ${t.code} حذف شود؟`)) await post({ action: "delete", id: t.id }, "حذف شد");
                  }}
                >
                  حذف
                </button>
              </div>
              <label className="flex items-center justify-center gap-2 text-xs text-[var(--color-ash)] mt-3">
                فعال
                <Toggle checked={t.active} label={`فعال بودن میز ${t.code}`} onChange={(v) => post({ action: "toggle", id: t.id, active: v })} />
              </label>
            </div>
          ))}
        </div>
      )}
      <p className="text-xs text-[var(--color-ash)] mt-5">{fa(tables.length)} میز تعریف شده</p>
    </>
  );
}
