"use client";

import Link from "next/link";
import { useState } from "react";
import { api, fa, fmtLongDay, money, moneyShort } from "@/lib/adminClient";
import type { Report } from "@/lib/reports";
import type { StoredOrder } from "@/lib/orderMeta";
import type { InventoryItem } from "@/lib/inventory";
import type { ShiftState } from "@/lib/cash";
import { useFetch } from "@/components/admin/hooks";
import { BarChart, Card, dailyBars, Donut, Empty, ErrorBox, Loading, PageTitle, ShareBars, SOURCE_COLORS, Stat, Toggle, useToast } from "@/components/admin/ui";
import { OrderCard, OrderDetail } from "@/components/admin/OrderViews";

interface DashboardData {
  today: Report;
  week: Report;
  pulse: { received: number; preparing: number; ready: number };
  active: StoredOrder[];
  lowStock: InventoryItem[];
  lowStockCount: number;
  shift: ShiftState | null;
  menuItems: number;
}

export default function DashboardPage() {
  const toast = useToast();
  const { data, error, loading, reload } = useFetch<DashboardData>("/api/admin/dashboard", { refreshMs: 30000, refreshOnNewOrder: true });
  const settings = useFetch<{ settings: { ordersOpen: boolean } }>("/api/admin/settings");
  const [open, setOpen] = useState<StoredOrder | null>(null);
  const [toggling, setToggling] = useState(false);

  if (loading && !data) return <Loading />;
  if (error && !data) return <ErrorBox message={error} onRetry={() => reload()} />;
  if (!data) return null;

  const { today, week, pulse } = data;
  const ordersOpen = settings.data?.settings.ordersOpen ?? true;
  const inFlight = pulse.received + pulse.preparing + pulse.ready;
  const src = (k: "website" | "qr" | "pos") => today.bySource[k] ?? { orders: 0, revenue: 0 };
  const totalSrc = src("website").orders + src("qr").orders + src("pos").orders;

  async function toggleOpen(v: boolean) {
    setToggling(true);
    try {
      await api("/api/admin/settings", { method: "PUT", body: { ordersOpen: v } });
      settings.reload(true);
      toast(v ? "سفارش آنلاین باز شد" : "سفارش آنلاین بسته شد (سایت و QR)", v ? "ok" : "info");
    } catch (e) {
      toast(e instanceof Error ? e.message : "خطا", "error");
    } finally {
      setToggling(false);
    }
  }

  return (
    <>
      <PageTitle
        title="داشبورد"
        sub={fmtLongDay(new Date())}
        actions={
          <div className="flex items-center gap-3 panel-card px-4 py-2.5">
            <span className="text-sm font-bold">سفارش آنلاین سایت</span>
            <Toggle checked={ordersOpen} onChange={toggleOpen} disabled={toggling} label="باز یا بسته بودن سفارش آنلاین" />
            <span className={`text-xs font-bold ${ordersOpen ? "text-emerald-300" : "text-red-300"}`}>{ordersOpen ? "باز" : "بسته"}</span>
          </div>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <Stat label="سفارش‌های امروز" value={fa(today.totals.orders)} sub={today.totals.cancelled ? `${fa(today.totals.cancelled)} لغو شده` : "بدون لغو"} />
        <Stat label="درآمد امروز" value={moneyShort(today.totals.revenue)} sub={money(today.totals.revenue)} tone="good" />
        <Stat label="میانگین هر سفارش" value={moneyShort(today.totals.avgTicket)} sub={`${fa(today.totals.itemsSold)} پرس فروخته شد`} />
        <Stat
          label="در جریان (نیاز به اقدام)"
          value={fa(inFlight)}
          tone={pulse.received > 0 ? "warn" : "default"}
          sub={`${fa(pulse.received)} جدید · ${fa(pulse.preparing)} در آشپزخانه · ${fa(pulse.ready)} آماده`}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-5">
        <Card title="سایت یا حضوری؟ (امروز)" className="lg:col-span-1">
          <div className="flex items-center gap-5">
            <Donut
              parts={[
                { value: src("website").orders, color: SOURCE_COLORS.website, label: "سایت" },
                { value: src("qr").orders, color: SOURCE_COLORS.qr, label: "QR میز" },
                { value: src("pos").orders, color: SOURCE_COLORS.pos, label: "حضوری" },
              ]}
              center={
                <div>
                  <p className="text-xl font-black leading-none">{fa(totalSrc)}</p>
                  <p className="text-[10px] text-[var(--color-ash)] mt-1">سفارش</p>
                </div>
              }
            />
            <div className="flex-1 space-y-2.5 text-sm">
              {(
                [
                  ["website", "از طریق سایت"],
                  ["qr", "QR روی میز"],
                  ["pos", "حضوری (صندوق)"],
                ] as const
              ).map(([k, label]) => (
                <div key={k} className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: SOURCE_COLORS[k] }} />
                    {label}
                  </span>
                  <span className="font-bold">
                    {fa(src(k).orders)} <span className="text-[11px] text-[var(--color-ash)] font-normal">({moneyShort(src(k).revenue)})</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card title="درآمد ۷ روز اخیر" className="lg:col-span-2" action={<span className="text-xs text-[var(--color-ash)]">جمع: {moneyShort(week.totals.revenue)} تومان</span>}>
          <BarChart data={dailyBars(week.daily)} highlightLast />
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Card
            title="سفارش‌های در جریان"
            action={
              <Link href="/admin/orders" className="text-xs font-bold text-[var(--color-ember-light)] hover:underline">
                همه‌ی سفارش‌ها ←
              </Link>
            }
          >
            {data.active.length === 0 ? (
              <Empty text="فعلاً سفارش بازی وجود ندارد 🎉" />
            ) : (
              <div className="grid sm:grid-cols-2 gap-3">
                {data.active.map((o) => (
                  <OrderCard key={o.order_code} order={o} onOpen={setOpen} onChanged={() => reload(true)} />
                ))}
              </div>
            )}
          </Card>
        </div>

        <div className="space-y-4">
          <Card title="صندوق" action={<Link href="/admin/cash" className="text-xs font-bold text-[var(--color-ember-light)] hover:underline">مدیریت ←</Link>}>
            {data.shift ? (
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-[var(--color-ash)]">فروش نقد شیفت</span>
                  <span className="font-bold">{money(data.shift.cashSales)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-ash)]">موجودی مورد انتظار</span>
                  <span className="font-extrabold text-emerald-300">{money(data.shift.expectedCash)}</span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-[var(--color-ash)] leading-7">شیفت صندوق باز نیست. برای شروعِ کار از بخش صندوق یک شیفت باز کنید.</p>
            )}
          </Card>

          <Card title={`هشدار انبار${data.lowStockCount ? ` (${fa(data.lowStockCount)})` : ""}`} action={<Link href="/admin/inventory" className="text-xs font-bold text-[var(--color-ember-light)] hover:underline">انبار ←</Link>}>
            {data.lowStock.length === 0 ? (
              <Empty text="موجودی همه‌ی کالاها کافی است ✓" />
            ) : (
              <ul className="space-y-2.5 text-sm">
                {data.lowStock.map((i) => (
                  <li key={i.id} className="flex items-center justify-between gap-2">
                    <span>{i.name}</span>
                    <span className={`font-bold ${i.stock <= 0 ? "text-red-300" : "text-amber-300"}`}>
                      {i.stock <= 0 ? "تمام شده" : `${fa(i.stock)} ${i.unit}`}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card title="پرفروش‌ترین‌ها (۷ روز)">
            {week.products.length === 0 ? (
              <Empty text="هنوز فروشی ثبت نشده" />
            ) : (
              <ShareBars rows={week.products.slice(0, 5).map((p) => ({ label: p.name, value: p.qty, sub: `${fa(p.qty)} عدد` }))} />
            )}
          </Card>
        </div>
      </div>

      <OrderDetail order={open} onClose={() => setOpen(null)} onChanged={() => reload(true)} />
    </>
  );
}
