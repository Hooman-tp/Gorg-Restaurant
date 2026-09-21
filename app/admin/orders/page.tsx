"use client";

import { useMemo, useState } from "react";
import { fa } from "@/lib/adminClient";
import type { StoredOrder } from "@/lib/orderMeta";
import { useFetch } from "@/components/admin/hooks";
import { useAdmin } from "@/components/admin/AdminShell";
import { Chips, Empty, ErrorBox, Loading, PageTitle } from "@/components/admin/ui";
import { OrderCard, OrderDetail } from "@/components/admin/OrderViews";

type StatusFilter = "active" | "received" | "preparing" | "ready" | "delivered" | "cancelled" | "all";
type SourceFilter = "all" | "website" | "qr" | "pos";

export default function OrdersPage() {
  const { pulse } = useAdmin();
  const [status, setStatus] = useState<StatusFilter>("active");
  const [source, setSource] = useState<SourceFilter>("all");
  const [q, setQ] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [open, setOpen] = useState<StoredOrder | null>(null);

  const url = useMemo(() => {
    const p = new URLSearchParams({ status, source, limit: "150" });
    if (q.trim()) p.set("q", q.trim());
    if (from) p.set("from", from);
    if (to) p.set("to", to);
    return `/api/admin/orders?${p.toString()}`;
  }, [status, source, q, from, to]);

  const { data, error, loading, reload } = useFetch<{ orders: StoredOrder[] }>(url, { refreshMs: 20000, refreshOnNewOrder: true });
  const orders = data?.orders ?? [];

  return (
    <>
      <PageTitle title="سفارش‌ها" sub="سفارش‌های سایت، QR میز و ثبت حضوری؛ همه یک‌جا" />

      <div className="panel-card p-4 mb-5 space-y-3">
        <Chips<StatusFilter>
          value={status}
          onChange={setStatus}
          options={[
            { value: "active", label: `در جریان (${fa(pulse.received + pulse.preparing + pulse.ready)})` },
            { value: "received", label: `جدید (${fa(pulse.received)})` },
            { value: "preparing", label: `آماده‌سازی (${fa(pulse.preparing)})` },
            { value: "ready", label: `آماده (${fa(pulse.ready)})` },
            { value: "delivered", label: "تحویل‌شده" },
            { value: "cancelled", label: "لغو شده" },
            { value: "all", label: "همه" },
          ]}
        />
        <div className="flex flex-wrap items-center gap-2">
          <Chips<SourceFilter>
            value={source}
            onChange={setSource}
            options={[
              { value: "all", label: "همه‌ی منبع‌ها" },
              { value: "website", label: "سایت" },
              { value: "qr", label: "QR میز" },
              { value: "pos", label: "حضوری" },
            ]}
          />
        </div>
        <div className="grid sm:grid-cols-4 gap-2">
          <input className="panel-input sm:col-span-2" placeholder="جستجو: کد سفارش، نام، تلفن یا میز" value={q} onChange={(e) => setQ(e.target.value)} />
          <input type="date" className="panel-input" value={from} onChange={(e) => setFrom(e.target.value)} aria-label="از تاریخ" />
          <input type="date" className="panel-input" value={to} onChange={(e) => setTo(e.target.value)} aria-label="تا تاریخ" />
        </div>
      </div>

      {loading && !data ? (
        <Loading />
      ) : error && !data ? (
        <ErrorBox message={error} onRetry={() => reload()} />
      ) : orders.length === 0 ? (
        <Empty text="سفارشی با این فیلتر پیدا نشد" />
      ) : (
        <>
          <p className="text-xs text-[var(--color-ash)] mb-3">{fa(orders.length)} سفارش</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {orders.map((o) => (
              <OrderCard key={o.order_code} order={o} onOpen={setOpen} onChanged={() => reload(true)} />
            ))}
          </div>
        </>
      )}

      <OrderDetail order={open} onClose={() => setOpen(null)} onChanged={() => reload(true)} />
    </>
  );
}
