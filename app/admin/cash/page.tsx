"use client";

import { useState } from "react";
import { api, fa, fmtDate, fmtDateTime, money } from "@/lib/adminClient";
import type { ClosedShift, ExpenseRow, ShiftState } from "@/lib/cash";
import { useFetch } from "@/components/admin/hooks";
import { Card, Chips, Empty, ErrorBox, Field, Loading, NumInput, PageTitle, Stat, useToast } from "@/components/admin/ui";

const CATEGORIES = ["مواد اولیه", "حقوق و دستمزد", "اجاره", "قبوض", "حمل و نقل", "تعمیرات", "تبلیغات", "سایر"];
const PAY_LABEL: Record<string, string> = { cash: "نقد", card: "کارت", other: "سایر" };

interface CashData {
  shift: ShiftState | null;
  history: ClosedShift[];
  expenses: ExpenseRow[];
  from: string;
  to: string;
}

export default function CashPage() {
  const toast = useToast();
  const { data, error, loading, reload } = useFetch<CashData>("/api/admin/cash", { refreshMs: 30000, refreshOnNewOrder: true });
  const [opening, setOpening] = useState(0);
  const [counted, setCounted] = useState(0);
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [exp, setExp] = useState({ title: "", category: CATEGORIES[0], amount: 0, payMethod: "cash", note: "" });

  if (loading && !data) return <Loading />;
  if (error && !data) return <ErrorBox message={error} onRetry={() => reload()} />;
  if (!data) return null;
  const { shift, history, expenses } = data;

  async function act(body: Record<string, unknown>, okMsg: string) {
    setBusy(true);
    try {
      await api("/api/admin/cash", { body });
      toast(okMsg);
      await reload(true);
      return true;
    } catch (e) {
      toast(e instanceof Error ? e.message : "خطا", "error");
      return false;
    } finally {
      setBusy(false);
    }
  }

  const diff = shift ? counted - shift.expectedCash : 0;
  const expTotal = expenses.reduce((s, e) => s + e.amount, 0);

  return (
    <>
      <PageTitle title="صندوق" sub="شیفت صندوق، پول نقدِ داخل کشو و هزینه‌ها" />

      {!shift ? (
        <Card title="شروع شیفت" className="mb-5">
          <div className="grid sm:grid-cols-3 gap-3 items-end">
            <Field label="موجودی نقدِ ابتدای شیفت (تومان)" className="sm:col-span-2">
              <NumInput value={opening} onChange={setOpening} placeholder="مثلاً ۲٬۰۰۰٬۰۰۰" />
            </Field>
            <button
              disabled={busy}
              className="btn-primary disabled:opacity-60"
              onClick={async () => {
                if (await act({ action: "openShift", openingCash: opening }, "شیفت باز شد")) setOpening(0);
              }}
            >
              باز کردن شیفت
            </button>
          </div>
          <p className="text-xs text-[var(--color-ash)] mt-3 leading-6">
            با باز کردن شیفت، فروشِ نقد و کارتِ همین لحظه به بعد حساب می‌شود؛ آخر شیفت پولِ داخل کشو را می‌شمارید و اختلاف (کسری/اضافه) خودکار محاسبه می‌شود.
          </p>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
            <Stat label="ابتدای شیفت" value={money(shift.openingCash)} sub={`از ${fmtDateTime(shift.openedAt)}`} />
            <Stat label="فروش نقد" value={money(shift.cashSales)} sub={`${fa(shift.cashOrders)} سفارش نقدی`} tone="good" />
            <Stat label="هزینه‌ی نقدی" value={money(shift.cashExpenses)} tone={shift.cashExpenses ? "warn" : "default"} />
            <Stat label="موجودی مورد انتظار کشو" value={money(shift.expectedCash)} tone="good" />
          </div>
          <div className="grid grid-cols-2 gap-3 mb-5">
            <Stat label="فروش با کارت‌خوان (این شیفت)" value={money(shift.cardSales)} />
            <Stat label="فروش آنلاین سایت (این شیفت)" value={money(shift.onlineSales)} sub="مستقیم به حساب درگاه واریز می‌شود" />
          </div>

          <Card title="بستن شیفت" className="mb-5">
            <div className="grid sm:grid-cols-3 gap-3 items-end">
              <Field label="پولِ نقدِ شمارش‌شده‌ی داخل کشو (تومان)">
                <NumInput value={counted} onChange={setCounted} />
              </Field>
              <Field label="یادداشت (اختیاری)">
                <input className="panel-input" value={note} onChange={(e) => setNote(e.target.value)} />
              </Field>
              <button
                disabled={busy}
                className="btn-primary disabled:opacity-60"
                onClick={async () => {
                  if (!confirm("شیفت بسته شود؟")) return;
                  if (await act({ action: "closeShift", countedCash: counted, note }, "شیفت بسته شد")) {
                    setCounted(0);
                    setNote("");
                  }
                }}
              >
                بستن شیفت
              </button>
            </div>
            <p className={`text-sm font-bold mt-3 ${diff === 0 ? "text-emerald-300" : diff < 0 ? "text-red-300" : "text-amber-300"}`}>
              {diff === 0 ? "حساب صندوق برابر است ✓" : diff < 0 ? `کسری صندوق: ${money(-diff)}` : `اضافه‌ی صندوق: ${money(diff)}`}
            </p>
          </Card>
        </>
      )}

      <div className="grid lg:grid-cols-2 gap-4">
        <Card title="ثبت هزینه / برداشت">
          <div className="space-y-3">
            <Field label="عنوان">
              <input className="panel-input" value={exp.title} onChange={(e) => setExp({ ...exp, title: e.target.value })} placeholder="مثلاً خرید گوشت" />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="دسته">
                <select className="panel-input" value={exp.category} onChange={(e) => setExp({ ...exp, category: e.target.value })}>
                  {CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </Field>
              <Field label="مبلغ (تومان)">
                <NumInput value={exp.amount} onChange={(n) => setExp({ ...exp, amount: n })} />
              </Field>
            </div>
            <div>
              <p className="text-xs font-bold text-[var(--color-ash)] mb-2">پرداخت از</p>
              <Chips value={exp.payMethod} onChange={(v) => setExp({ ...exp, payMethod: v })} options={[{ value: "cash", label: "کشوی صندوق (نقد)" }, { value: "card", label: "کارت / حساب" }]} />
            </div>
            <Field label="توضیحات (اختیاری)">
              <input className="panel-input" value={exp.note} onChange={(e) => setExp({ ...exp, note: e.target.value })} />
            </Field>
            <button
              disabled={busy}
              className="btn-primary btn-sm disabled:opacity-60"
              onClick={async () => {
                if (await act({ action: "addExpense", expense: exp }, "هزینه ثبت شد")) setExp({ ...exp, title: "", amount: 0, note: "" });
              }}
            >
              ثبت هزینه
            </button>
            <p className="text-xs text-[var(--color-ash)] leading-6">هزینه‌ی «نقد» از موجودی کشو کم می‌شود و در گزارش سود هم حساب می‌شود.</p>
          </div>
        </Card>

        <Card title="هزینه‌های ۳۰ روز اخیر" action={<span className="text-xs text-[var(--color-ash)]">جمع: {money(expTotal)}</span>}>
          {expenses.length === 0 ? (
            <Empty text="هزینه‌ای ثبت نشده" />
          ) : (
            <ul className="divide-y divide-white/8 max-h-[420px] overflow-y-auto">
              {expenses.map((e) => (
                <li key={e.id} className="py-2.5 flex items-center justify-between gap-3 text-sm">
                  <div className="min-w-0">
                    <p className="font-bold truncate">{e.title}</p>
                    <p className="text-[11px] text-[var(--color-ash)]">
                      {e.category} · {PAY_LABEL[e.payMethod] ?? e.payMethod} · {fmtDate(e.spentAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-bold">{money(e.amount)}</span>
                    <button
                      aria-label="حذف هزینه"
                      className="text-[var(--color-ash)] hover:text-red-300"
                      onClick={async () => {
                        if (confirm("این هزینه حذف شود؟")) await act({ action: "deleteExpense", id: e.id }, "حذف شد");
                      }}
                    >
                      ✕
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <Card title="تاریخچه‌ی شیفت‌ها" className="mt-4">
        {history.length === 0 ? (
          <Empty text="هنوز شیفتی بسته نشده" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[560px]">
              <thead className="text-xs text-[var(--color-ash)]">
                <tr className="text-right">
                  <th className="pb-2 font-bold">باز شد</th>
                  <th className="pb-2 font-bold">بسته شد</th>
                  <th className="pb-2 font-bold">مورد انتظار</th>
                  <th className="pb-2 font-bold">شمارش‌شده</th>
                  <th className="pb-2 font-bold">اختلاف</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/6">
                {history.map((h) => {
                  const d = h.countedCash - h.expectedCash;
                  return (
                    <tr key={h.id}>
                      <td className="py-2.5">{fmtDateTime(h.openedAt)}</td>
                      <td className="py-2.5">{fmtDateTime(h.closedAt)}</td>
                      <td className="py-2.5">{money(h.expectedCash)}</td>
                      <td className="py-2.5">{money(h.countedCash)}</td>
                      <td className={`py-2.5 font-bold ${d === 0 ? "text-emerald-300" : d < 0 ? "text-red-300" : "text-amber-300"}`}>{d === 0 ? "برابر" : d < 0 ? `کسری ${money(-d)}` : `اضافه ${money(d)}`}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </>
  );
}
