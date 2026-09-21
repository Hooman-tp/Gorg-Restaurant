"use client";

import { useMemo, useState } from "react";
import { api, effPrice, fa, money, printOrder } from "@/lib/adminClient";
import type { AdminMenuCategory, AdminMenuItem } from "@/lib/menuStore";
import { useFetch } from "@/components/admin/hooks";
import { useAdmin } from "@/components/admin/AdminShell";
import { Chips, Empty, ErrorBox, Field, Loading, Modal, NumInput, PageTitle, useToast } from "@/components/admin/ui";

type OrderType = "dine_in" | "pickup" | "delivery";
type Pay = "cash" | "card" | "other";

interface Done {
  orderCode: string;
  total: number;
  print: Parameters<typeof printOrder>[0];
}

export default function PosPage() {
  const toast = useToast();
  const { businessName } = useAdmin();
  const menu = useFetch<{ categories: AdminMenuCategory[]; items: AdminMenuItem[] }>("/api/admin/menu");
  const tables = useFetch<{ tables: { id: number; code: string; title: string; active: boolean }[] }>("/api/admin/tables");
  const settings = useFetch<{ settings: { deliveryFee: number } }>("/api/admin/settings");

  const [cat, setCat] = useState("all");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [orderType, setOrderType] = useState<OrderType>("dine_in");
  const [tableNo, setTableNo] = useState("");
  const [pay, setPay] = useState<Pay>("cash");
  const [discount, setDiscount] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [delivered, setDelivered] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<Done | null>(null);

  const items = useMemo(() => (menu.data?.items ?? []).filter((i) => i.active), [menu.data]);
  const cats = useMemo(() => (menu.data?.categories ?? []).filter((c) => c.active), [menu.data]);
  const byId = useMemo(() => new Map(items.map((i) => [i.id, i])), [items]);

  const shown = items.filter((i) => (cat === "all" || i.category === cat) && (!search.trim() || i.name.includes(search.trim())));

  const lines = Object.entries(cart)
    .map(([id, qty]) => ({ item: byId.get(id), qty }))
    .filter((l): l is { item: AdminMenuItem; qty: number } => Boolean(l.item) && l.qty > 0);
  const subtotal = lines.reduce((s, l) => s + effPrice(l.item.price, l.item.discount) * l.qty, 0);
  const disc = Math.min(subtotal, discount);
  const fee = orderType === "delivery" ? settings.data?.settings.deliveryFee ?? 0 : 0;
  const total = subtotal - disc + fee;
  const count = lines.reduce((s, l) => s + l.qty, 0);

  const add = (id: string, d = 1) =>
    setCart((c) => {
      const next = (c[id] ?? 0) + d;
      const copy = { ...c };
      if (next <= 0) delete copy[id];
      else copy[id] = Math.min(99, next);
      return copy;
    });

  function reset() {
    setCart({});
    setDiscount(0);
    setName("");
    setPhone("");
    setAddress("");
    setNotes("");
    setDelivered(false);
    setTableNo("");
  }

  async function submit() {
    if (lines.length === 0) return toast("سبد خالی است", "error");
    if (orderType === "dine_in" && (tables.data?.tables.length ?? 0) > 0 && !tableNo) return toast("شماره‌ی میز را انتخاب کنید", "error");
    setBusy(true);
    try {
      const r = await api<{ orderCode: string; total: number }>("/api/admin/pos", {
        body: {
          lines: lines.map((l) => ({ id: l.item.id, qty: l.qty })),
          orderType,
          tableNo,
          paymentMethod: pay,
          discount: disc,
          name,
          phone,
          address,
          notes,
          delivered,
        },
      });
      setDone({
        orderCode: r.orderCode,
        total: r.total,
        print: {
          order_code: r.orderCode,
          name: name || "مشتری حضوری",
          phone,
          address: orderType === "delivery" ? address : null,
          order_type: orderType,
          notes: notes || null,
          lines: lines.map((l) => ({ id: l.item.id, name: l.item.name, price: effPrice(l.item.price, l.item.discount), qty: l.qty })),
          total: r.total,
          created_at: new Date().toISOString(),
          table_no: tableNo || null,
          discount: disc,
          delivery_fee: fee,
          payment_method: pay,
          source: "pos",
        },
      });
      reset();
      menu.reload(true);
    } catch (e) {
      toast(e instanceof Error ? e.message : "ثبت سفارش انجام نشد", "error");
    } finally {
      setBusy(false);
    }
  }

  if (menu.loading && !menu.data) return <Loading />;
  if (menu.error && !menu.data) return <ErrorBox message={menu.error} onRetry={() => menu.reload()} />;

  const activeTables = (tables.data?.tables ?? []).filter((t) => t.active);

  return (
    <>
      <PageTitle title="ثبت سفارش حضوری" sub="سفارشِ مشتریِ داخل رستوران یا تلفنی را همین‌جا ثبت کنید؛ مستقیم به آشپزخانه و حساب‌ها می‌رود." />

      <div className="grid lg:grid-cols-5 gap-5">
        {/* منو */}
        <div className="lg:col-span-3">
          <div className="panel-card p-4 mb-4 space-y-3">
            <input className="panel-input" placeholder="جستجوی آیتم…" value={search} onChange={(e) => setSearch(e.target.value)} />
            <Chips value={cat} onChange={setCat} options={[{ value: "all", label: "همه" }, ...cats.map((c) => ({ value: c.id, label: c.label }))]} />
          </div>
          {shown.length === 0 ? (
            <Empty text="آیتمی پیدا نشد" />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {shown.map((it) => {
                const price = effPrice(it.price, it.discount);
                const qty = cart[it.id] ?? 0;
                return (
                  <button
                    key={it.id}
                    type="button"
                    disabled={!it.available}
                    onClick={() => add(it.id)}
                    className={`panel-card text-right overflow-hidden relative transition-colors ${
                      it.available ? "hover:border-[var(--color-ember)]/50 active:scale-[0.98]" : "opacity-45 cursor-not-allowed"
                    } ${qty ? "border-[var(--color-ember)]/70" : ""}`}
                  >
                    {it.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={it.image} alt="" loading="lazy" className="w-full aspect-[4/3] object-cover" />
                    )}
                    <div className="p-3">
                      <p className="font-bold text-[13px] leading-6">{it.name}</p>
                      <p className="text-xs text-[var(--color-ash)] mt-0.5">
                        {it.available ? money(price) : "ناموجود"}
                        {it.discount > 0 && it.available && <span className="text-[var(--color-ember-light)]"> ({fa(it.discount)}٪ تخفیف)</span>}
                      </p>
                    </div>
                    {qty > 0 && (
                      <span className="absolute top-2 right-2 min-w-7 h-7 px-2 rounded-full bg-[var(--color-ember)] text-white text-xs font-black flex items-center justify-center shadow-lg">
                        {fa(qty)}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* سبد */}
        <div className="lg:col-span-2" id="pos-cart">
          <div className="panel-card p-4 space-y-4 lg:sticky lg:top-4">
            <h2 className="font-extrabold">سفارش جاری {count > 0 && <span className="text-[var(--color-ash)] text-sm font-normal">({fa(count)} پرس)</span>}</h2>

            {lines.length === 0 ? (
              <Empty text="آیتم‌ها را از منو انتخاب کنید" />
            ) : (
              <div className="space-y-2.5">
                {lines.map(({ item, qty }) => (
                  <div key={item.id} className="flex items-center justify-between gap-2 text-sm">
                    <span className="min-w-0 truncate">{item.name}</span>
                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={() => add(item.id, -1)} className="w-7 h-7 rounded-full bg-white/8 hover:bg-white/15 font-black" aria-label="کم کردن">
                        −
                      </button>
                      <span className="w-6 text-center font-black">{fa(qty)}</span>
                      <button onClick={() => add(item.id, 1)} className="w-7 h-7 rounded-full bg-[var(--color-ember)] font-black" aria-label="زیاد کردن">
                        +
                      </button>
                      <span className="w-24 text-left text-xs text-[var(--color-ash)]">{money(effPrice(item.price, item.discount) * qty)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <Chips<OrderType>
              value={orderType}
              onChange={setOrderType}
              options={[
                { value: "dine_in", label: "سالن" },
                { value: "pickup", label: "بیرون‌بر" },
                { value: "delivery", label: "پیک / تلفنی" },
              ]}
            />

            {orderType === "dine_in" &&
              (activeTables.length > 0 ? (
                <Chips value={tableNo} onChange={setTableNo} options={activeTables.map((t) => ({ value: t.code, label: `میز ${t.code}` }))} />
              ) : (
                <Field label="شماره‌ی میز (اختیاری)" hint="برای تعریف میزها به بخش «میز و QR» بروید">
                  <input className="panel-input" value={tableNo} onChange={(e) => setTableNo(e.target.value)} />
                </Field>
              ))}

            {orderType === "delivery" && (
              <Field label="آدرس">
                <textarea className="panel-input resize-none" rows={2} value={address} onChange={(e) => setAddress(e.target.value)} />
              </Field>
            )}

            <div className="grid grid-cols-2 gap-2">
              <Field label="نام مشتری (اختیاری)">
                <input className="panel-input" value={name} onChange={(e) => setName(e.target.value)} />
              </Field>
              <Field label="تلفن (اختیاری)">
                <input className="panel-input" dir="ltr" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </Field>
            </div>
            <Field label="توضیحات">
              <input className="panel-input" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="مثلاً بدون پیاز" />
            </Field>

            <div>
              <p className="text-xs font-bold text-[var(--color-ash)] mb-2">روش پرداخت</p>
              <Chips<Pay>
                value={pay}
                onChange={setPay}
                options={[
                  { value: "cash", label: "💵 نقد" },
                  { value: "card", label: "💳 کارت‌خوان" },
                  { value: "other", label: "سایر" },
                ]}
              />
            </div>

            <Field label="تخفیف (تومان)">
              <NumInput value={discount} onChange={setDiscount} placeholder="۰" />
            </Field>

            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={delivered} onChange={(e) => setDelivered(e.target.checked)} className="w-4 h-4 accent-[var(--color-ember)]" />
              همان لحظه تحویل داده شد (بدون رفتن به آشپزخانه)
            </label>

            <div className="border-t border-white/10 pt-3 space-y-1.5 text-sm">
              <div className="flex justify-between text-[var(--color-ash)]">
                <span>جمع اقلام</span>
                <span>{money(subtotal)}</span>
              </div>
              {disc > 0 && (
                <div className="flex justify-between text-[var(--color-ash)]">
                  <span>تخفیف</span>
                  <span>− {money(disc)}</span>
                </div>
              )}
              {fee > 0 && (
                <div className="flex justify-between text-[var(--color-ash)]">
                  <span>هزینه ارسال</span>
                  <span>{money(fee)}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-black pt-1">
                <span>قابل پرداخت</span>
                <span>{money(total)}</span>
              </div>
            </div>

            <button onClick={submit} disabled={busy || lines.length === 0} className="btn-primary w-full disabled:opacity-50">
              {busy ? "در حال ثبت…" : "ثبت سفارش و ارسال به آشپزخانه"}
            </button>
          </div>
        </div>
      </div>

      {/* نوار شناور موبایل */}
      {count > 0 && (
        <a href="#pos-cart" className="lg:hidden fixed bottom-4 inset-x-4 z-40 btn-primary justify-between shadow-2xl">
          <span>{fa(count)} پرس</span>
          <span>{money(total)}</span>
          <span>مشاهده سبد ↓</span>
        </a>
      )}

      <Modal open={Boolean(done)} onClose={() => setDone(null)} title="سفارش ثبت شد ✓">
        {done && (
          <div className="space-y-4 text-center">
            <p className="text-3xl font-black tracking-wider" dir="ltr">
              {done.orderCode}
            </p>
            <p className="text-sm text-[var(--color-ash)]">مبلغ دریافتی: {money(done.total)}</p>
            <div className="flex flex-wrap justify-center gap-2">
              <button className="btn-primary btn-sm" onClick={() => printOrder(done.print, businessName)}>
                🖨️ چاپ فیش
              </button>
              <button className="btn-outline btn-sm" onClick={() => setDone(null)}>
                سفارش جدید
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
