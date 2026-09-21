"use client";

import { useMemo, useState } from "react";
import { fa, fmtDate, money, timeAgo } from "@/lib/adminClient";
import { useFetch } from "@/components/admin/hooks";
import { Badge, Chips, Empty, ErrorBox, Loading, PageTitle, Stat } from "@/components/admin/ui";

interface Customer {
  phone: string;
  name: string;
  orders: number;
  spent: number;
  posOrders: number;
  firstOrder: string;
  lastOrder: string;
}

type Sort = "recent" | "spent" | "orders";

export default function CustomersPage() {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<Sort>("recent");
  const { data, error, loading, reload } = useFetch<{ customers: Customer[]; registeredUsers: number; customersWithOrders: number }>(
    `/api/admin/customers${q.trim() ? `?q=${encodeURIComponent(q.trim())}` : ""}`
  );

  const list = useMemo(() => {
    const c = [...(data?.customers ?? [])];
    if (sort === "spent") c.sort((a, b) => b.spent - a.spent);
    else if (sort === "orders") c.sort((a, b) => b.orders - a.orders);
    return c;
  }, [data, sort]);

  return (
    <>
      <PageTitle title="مشتریان" sub="از روی شماره‌ی تماسِ سفارش‌ها؛ مشتریان وفادار را بشناسید" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <Stat label="ثبت‌نام‌شده‌ها در سایت" value={fa(data?.registeredUsers ?? 0)} sub="با شماره موبایل وارد شده‌اند" />
        <Stat label="مشتریانِ دارای سفارش" value={fa(data?.customersWithOrders ?? 0)} />
        <Stat label="مشتریان تکراری" value={fa((data?.customers ?? []).filter((c) => c.orders >= 2).length)} sub="حداقل ۲ سفارش" tone="good" />
        <Stat label="مشتریان وفادار" value={fa((data?.customers ?? []).filter((c) => c.orders >= 5).length)} sub="۵ سفارش یا بیشتر" tone="good" />
      </div>

      <div className="panel-card p-4 mb-5 space-y-3">
        <input className="panel-input" placeholder="جستجو با نام یا شماره" value={q} onChange={(e) => setQ(e.target.value)} />
        <Chips<Sort>
          value={sort}
          onChange={setSort}
          options={[
            { value: "recent", label: "آخرین سفارش" },
            { value: "spent", label: "بیشترین خرید" },
            { value: "orders", label: "بیشترین تعداد سفارش" },
          ]}
        />
      </div>

      {loading && !data ? (
        <Loading />
      ) : error && !data ? (
        <ErrorBox message={error} onRetry={() => reload()} />
      ) : list.length === 0 ? (
        <Empty text="مشتری‌ای پیدا نشد" />
      ) : (
        <div className="panel-card overflow-x-auto">
          <table className="w-full text-sm min-w-[620px]">
            <thead className="text-xs text-[var(--color-ash)]">
              <tr className="text-right border-b border-white/8">
                <th className="p-3 font-bold">مشتری</th>
                <th className="p-3 font-bold">سفارش‌ها</th>
                <th className="p-3 font-bold">جمع خرید</th>
                <th className="p-3 font-bold">آخرین سفارش</th>
                <th className="p-3 font-bold">تماس</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/6">
              {list.map((c) => (
                <tr key={c.phone}>
                  <td className="p-3">
                    <p className="font-bold">{c.name || "—"}</p>
                    <p className="text-[11px] text-[var(--color-ash)]" dir="ltr">
                      {c.phone}
                    </p>
                  </td>
                  <td className="p-3">
                    {fa(c.orders)}{" "}
                    {c.orders >= 5 ? (
                      <Badge className="border-amber-400/40 text-amber-300">وفادار</Badge>
                    ) : c.orders === 1 ? (
                      <Badge className="border-sky-400/40 text-sky-300">جدید</Badge>
                    ) : null}
                  </td>
                  <td className="p-3 font-bold">{money(c.spent)}</td>
                  <td className="p-3 text-[var(--color-ash)]">
                    {timeAgo(c.lastOrder)}
                    <span className="block text-[11px]">اولین: {fmtDate(c.firstOrder)}</span>
                  </td>
                  <td className="p-3">
                    <a href={`tel:${c.phone}`} className="text-[var(--color-ember-light)] font-bold hover:underline">
                      تماس
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
