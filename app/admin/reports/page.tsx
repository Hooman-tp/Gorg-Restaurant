"use client";

import { useMemo, useState } from "react";
import { addDaysKey, fa, money, moneyShort, todayKey } from "@/lib/adminClient";
import type { Report } from "@/lib/reports";
import type { AdminMenuCategory } from "@/lib/menuStore";
import { useFetch } from "@/components/admin/hooks";
import { BarChart, Card, Chips, dailyBars, Donut, Empty, ErrorBox, Loading, PageTitle, ShareBars, SOURCE_COLORS, Stat } from "@/components/admin/ui";

type Preset = "today" | "yesterday" | "7" | "month" | "30" | "custom";

function rangeFor(p: Preset): { from: string; to: string } {
  const today = todayKey();
  switch (p) {
    case "today":
      return { from: today, to: today };
    case "yesterday": {
      const y = addDaysKey(today, -1);
      return { from: y, to: y };
    }
    case "7":
      return { from: addDaysKey(today, -6), to: today };
    case "month":
      return { from: `${today.slice(0, 8)}01`, to: today };
    default:
      return { from: addDaysKey(today, -29), to: today };
  }
}

const PAY_LABEL: Record<string, string> = { online: "آنلاین (درگاه)", cash: "نقد", card: "کارت‌خوان", other: "سایر" };
const TYPE_LABEL: Record<string, string> = { delivery: "ارسال با پیک", pickup: "بیرون‌بر", dine_in: "سالن" };

export default function ReportsPage() {
  const [preset, setPreset] = useState<Preset>("7");
  const [custom, setCustom] = useState(rangeFor("30"));
  const { from, to } = preset === "custom" ? custom : rangeFor(preset);

  const { data, error, loading, reload } = useFetch<Report>(`/api/admin/reports?from=${from}&to=${to}`);
  const menu = useFetch<{ categories: AdminMenuCategory[] }>("/api/admin/menu");
  const catName = useMemo(() => {
    const m = new Map((menu.data?.categories ?? []).map((c) => [c.id, c.label]));
    return (id: string) => m.get(id) ?? "سایر";
  }, [menu.data]);

  const r = data;
  const totalOrders = r ? r.bySource.website.orders + r.bySource.qr.orders + r.bySource.pos.orders : 0;
  const hourlyMax = r ? Math.max(...r.hourly) : 0;

  return (
    <>
      <PageTitle
        title="گزارش‌ها"
        sub="فروش، درآمد، سود، سایت در برابر حضوری و پرفروش‌ها"
        actions={
          <a className="btn-outline btn-sm" href={`/api/admin/reports?from=${from}&to=${to}&format=csv`}>
            ⬇ خروجی اکسل (CSV)
          </a>
        }
      />

      <div className="panel-card p-4 mb-5 space-y-3">
        <Chips<Preset>
          value={preset}
          onChange={setPreset}
          options={[
            { value: "today", label: "امروز" },
            { value: "yesterday", label: "دیروز" },
            { value: "7", label: "۷ روز اخیر" },
            { value: "month", label: "این ماه" },
            { value: "30", label: "۳۰ روز اخیر" },
            { value: "custom", label: "بازه‌ی دلخواه" },
          ]}
        />
        {preset === "custom" && (
          <div className="grid grid-cols-2 gap-2 max-w-md">
            <input type="date" className="panel-input" value={custom.from} onChange={(e) => setCustom({ ...custom, from: e.target.value })} aria-label="از تاریخ" />
            <input type="date" className="panel-input" value={custom.to} onChange={(e) => setCustom({ ...custom, to: e.target.value })} aria-label="تا تاریخ" />
          </div>
        )}
      </div>

      {loading && !r ? (
        <Loading />
      ) : error && !r ? (
        <ErrorBox message={error} onRetry={() => reload()} />
      ) : !r ? null : (
        <div className="space-y-5">
          {r.truncated && <p className="text-xs text-amber-300">تعداد سفارش‌های این بازه خیلی زیاد است و فقط ۳۰٬۰۰۰ سفارش آخر حساب شد؛ بازه را کوتاه‌تر کنید.</p>}

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <Stat label="درآمد (فروش)" value={moneyShort(r.totals.revenue)} sub={money(r.totals.revenue)} tone="good" />
            <Stat label="تعداد سفارش" value={fa(r.totals.orders)} sub={`میانگین ${money(r.totals.avgTicket)}`} />
            <Stat
              label="سود خالص (تخمینی)"
              value={moneyShort(r.totals.netProfit)}
              tone={r.totals.netProfit >= 0 ? "good" : "bad"}
              sub={`سود ناخالص ${moneyShort(r.totals.grossProfit)} − هزینه‌ها ${moneyShort(r.totals.expenses)}`}
            />
            <Stat label="پرس‌های فروخته‌شده" value={fa(r.totals.itemsSold)} sub={`${fa(r.totals.cancelled)} سفارش لغو (${moneyShort(r.totals.cancelledAmount)})`} />
          </div>
          {r.totals.cogs === 0 && r.totals.revenue > 0 && (
            <p className="text-xs text-[var(--color-ash)] leading-6">
              💡 بهای تمام‌شده‌ی آیتم‌ها ثبت نشده، پس «سود ناخالص» برابر کل فروش است. برای سودِ دقیق، در بخش انبار «دستور مصرف» یا در بخش منو «بهای تمام‌شده» را وارد کنید.
            </p>
          )}

          <div className="grid lg:grid-cols-2 gap-4">
            <Card title="سایت یا حضوری؟">
              <div className="flex items-center gap-5">
                <Donut
                  parts={[
                    { value: r.bySource.website.orders, color: SOURCE_COLORS.website, label: "سایت" },
                    { value: r.bySource.qr.orders, color: SOURCE_COLORS.qr, label: "QR" },
                    { value: r.bySource.pos.orders, color: SOURCE_COLORS.pos, label: "حضوری" },
                  ]}
                  center={
                    <div>
                      <p className="text-xl font-black leading-none">{fa(totalOrders)}</p>
                      <p className="text-[10px] text-[var(--color-ash)] mt-1">سفارش</p>
                    </div>
                  }
                />
                <div className="flex-1 space-y-3 text-sm">
                  {(
                    [
                      ["website", "از طریق سایت"],
                      ["qr", "QR روی میز"],
                      ["pos", "حضوری (صندوق)"],
                    ] as const
                  ).map(([k, label]) => (
                    <div key={k}>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 font-bold">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ background: SOURCE_COLORS[k] }} />
                          {label}
                        </span>
                        <span>
                          {fa(r.bySource[k].orders)} سفارش{" "}
                          <span className="text-[11px] text-[var(--color-ash)]">({totalOrders ? fa(Math.round((r.bySource[k].orders / totalOrders) * 100)) : fa(0)}٪)</span>
                        </span>
                      </div>
                      <p className="text-[11px] text-[var(--color-ash)] mt-0.5 mr-[18px]">درآمد: {money(r.bySource[k].revenue)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card title="روش پرداخت و نوع سفارش">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <p className="text-xs text-[var(--color-ash)] mb-3">روش پرداخت</p>
                  <ShareBars rows={Object.entries(r.byPayment).filter(([, v]) => v.orders > 0).map(([k, v]) => ({ label: PAY_LABEL[k] ?? k, value: v.revenue, sub: `${fa(v.orders)} سفارش` }))} />
                </div>
                <div>
                  <p className="text-xs text-[var(--color-ash)] mb-3">نوع سفارش</p>
                  <ShareBars
                    rows={Object.entries(r.byType).filter(([, v]) => v.orders > 0).map(([k, v]) => ({ label: TYPE_LABEL[k] ?? k, value: v.orders, sub: `${fa(v.orders)} سفارش`, color: "#4aa3df" }))}
                  />
                </div>
              </div>
              {r.totals.orders === 0 && <Empty text="در این بازه سفارشی نیست" />}
            </Card>
          </div>

          <Card title="درآمد روزانه" action={<span className="text-xs text-[var(--color-ash)]">{fa(r.daily.length)} روز</span>}>
            <div className="overflow-x-auto">
              <div style={{ minWidth: Math.max(320, r.daily.length * 34) }}>
                <BarChart data={dailyBars(r.daily)} highlightLast />
              </div>
            </div>
          </Card>

          <div className="grid lg:grid-cols-2 gap-4">
            <Card title="ساعت‌های شلوغی (تعداد سفارش)">
              <BarChart
                height={110}
                format={(n) => fa(n)}
                data={r.hourly.map((v, h) => ({ label: fa(h), value: v })).filter((_, h) => h >= 8 || r.hourly[h] > 0)}
              />
              {hourlyMax === 0 && <Empty text="داده‌ای نیست" />}
            </Card>

            <Card title="فروش بر اساس دسته">
              {r.categories.length === 0 ? <Empty text="داده‌ای نیست" /> : <ShareBars rows={r.categories.map((c) => ({ label: catName(c.id), value: c.revenue, sub: `${fa(c.qty)} عدد` }))} />}
            </Card>
          </div>

          <Card title="فروش به تفکیک محصول">
            {r.products.length === 0 ? (
              <Empty text="فروشی در این بازه نیست" />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[480px]">
                  <thead className="text-xs text-[var(--color-ash)]">
                    <tr className="text-right">
                      <th className="pb-2 font-bold">محصول</th>
                      <th className="pb-2 font-bold">تعداد</th>
                      <th className="pb-2 font-bold">فروش</th>
                      <th className="pb-2 font-bold">میانگین قیمت</th>
                      <th className="pb-2 font-bold">سود ناخالص</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/6">
                    {r.products.slice(0, 40).map((p) => (
                      <tr key={p.id}>
                        <td className="py-2.5 font-bold">{p.name}</td>
                        <td className="py-2.5">{fa(p.qty)}</td>
                        <td className="py-2.5">{money(p.revenue)}</td>
                        <td className="py-2.5 text-[var(--color-ash)]">{money(p.qty ? p.revenue / p.qty : 0)}</td>
                        <td className={`py-2.5 ${p.revenue - p.cogs >= 0 ? "text-emerald-300" : "text-red-300"}`}>{money(p.revenue - p.cogs)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>

          <div className="grid lg:grid-cols-2 gap-4">
            <Card title="هزینه‌ها به تفکیک دسته">
              {r.expensesByCategory.length === 0 ? (
                <Empty text="هزینه‌ای ثبت نشده (از بخش صندوق ثبت کنید)" />
              ) : (
                <ShareBars rows={r.expensesByCategory.map((e) => ({ label: e.category, value: e.amount, sub: money(e.amount), color: "#e9a23b" }))} />
              )}
            </Card>
            <Card title="خلاصه‌ی مالی">
              <dl className="space-y-2.5 text-sm">
                {(
                  [
                    ["درآمد (شامل هزینه ارسال)", r.totals.revenue],
                    ["بهای تمام‌شده‌ی اقلام فروخته‌شده", -r.totals.cogs],
                    ["سود ناخالص", r.totals.grossProfit],
                    ["هزینه‌های ثبت‌شده", -r.totals.expenses],
                    ["سود خالص", r.totals.netProfit],
                  ] as const
                ).map(([label, v], i) => (
                  <div key={label} className={`flex justify-between ${i === 2 || i === 4 ? "font-extrabold border-t border-white/10 pt-2.5" : "text-[var(--color-ash)]"}`}>
                    <dt>{label}</dt>
                    <dd className={v < 0 && i === 4 ? "text-red-300" : ""}>{v < 0 ? `− ${money(-v)}` : money(v)}</dd>
                  </div>
                ))}
                <div className="flex justify-between text-[var(--color-ash)] text-xs pt-1">
                  <dt>تخفیف‌های داده‌شده (حضوری)</dt>
                  <dd>{money(r.totals.discounts)}</dd>
                </div>
              </dl>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}
