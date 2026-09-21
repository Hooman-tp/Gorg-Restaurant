"use client";

import { useMemo, useState } from "react";
import { api, fa, fmtDateTime, money } from "@/lib/adminClient";
import type { InventoryItem, InventoryMove, RecipeRow } from "@/lib/inventory";
import type { AdminMenuItem } from "@/lib/menuStore";
import { useFetch } from "@/components/admin/hooks";
import { Badge, Card, Chips, Empty, ErrorBox, Field, Loading, Modal, NumInput, PageTitle, Stat, useToast } from "@/components/admin/ui";

interface InvData {
  items: InventoryItem[];
  moves: InventoryMove[];
  recipes: RecipeRow[];
}

const UNITS = ["گرم", "کیلوگرم", "عدد", "لیتر", "میلی‌لیتر", "بسته", "کارتن"];
const KIND_LABEL: Record<string, string> = { in: "ورود", out: "خروج", waste: "ضایعات", adjust: "شمارش/اصلاح", sale: "مصرف سفارش", restore: "بازگشت (لغو)" };

type Tab = "stock" | "recipes" | "moves";

export default function InventoryPage() {
  const toast = useToast();
  const { data, error, loading, reload } = useFetch<InvData>("/api/admin/inventory", { refreshMs: 45000, refreshOnNewOrder: true });
  const menu = useFetch<{ items: AdminMenuItem[] }>("/api/admin/menu");
  const [tab, setTab] = useState<Tab>("stock");
  const [edit, setEdit] = useState<{ id?: number; name: string; unit: string; stock: number; minStock: number; unitCost: number } | null>(null);
  const [move, setMove] = useState<{ item: InventoryItem; kind: "in" | "out" | "waste" | "adjust"; qty: number; note: string } | null>(null);
  const [recipeFor, setRecipeFor] = useState("");
  const [rows, setRows] = useState<{ inventoryItemId: number; qty: number }[]>([]);
  const [busy, setBusy] = useState(false);

  const items = data?.items ?? [];
  const value = useMemo(() => items.reduce((s, i) => s + i.stock * i.unitCost, 0), [items]);
  const low = items.filter((i) => i.stock <= i.minStock);

  if (loading && !data) return <Loading />;
  if (error && !data) return <ErrorBox message={error} onRetry={() => reload()} />;
  if (!data) return null;

  async function post(body: Record<string, unknown>, okMsg: string) {
    setBusy(true);
    try {
      await api("/api/admin/inventory", { body });
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

  function openRecipe(menuItemId: string) {
    setRecipeFor(menuItemId);
    setRows((data?.recipes ?? []).filter((r) => r.menuItemId === menuItemId).map((r) => ({ inventoryItemId: r.inventoryItemId, qty: r.qty })));
  }

  const menuItems = menu.data?.items ?? [];
  const itemName = (id: number) => items.find((i) => i.id === id)?.name ?? "—";

  return (
    <>
      <PageTitle
        title="انبار"
        sub="موجودی مواد اولیه؛ با هر سفارش، مصرف خودکار از انبار کم می‌شود"
        actions={
          <button className="btn-primary btn-sm" onClick={() => setEdit({ name: "", unit: "گرم", stock: 0, minStock: 0, unitCost: 0 })}>
            + کالای جدید
          </button>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <Stat label="تعداد اقلام انبار" value={fa(items.length)} />
        <Stat label="ارزش موجودی" value={money(value)} />
        <Stat label="کمبود / تمام‌شده" value={fa(low.length)} tone={low.length ? "bad" : "good"} sub={low.length ? low.slice(0, 2).map((l) => l.name).join("، ") : "همه چیز کافی است"} />
        <Stat label="آیتم‌های دارای دستور مصرف" value={fa(new Set(data.recipes.map((r) => r.menuItemId)).size)} sub="فقط این‌ها از انبار کم می‌کنند" />
      </div>

      <Chips<Tab>
        className="mb-4"
        value={tab}
        onChange={setTab}
        options={[
          { value: "stock", label: "موجودی" },
          { value: "recipes", label: "دستور مصرف (کم شدن خودکار)" },
          { value: "moves", label: "گردش انبار" },
        ]}
      />

      {tab === "stock" &&
        (items.length === 0 ? (
          <Card>
            <Empty text="هنوز کالایی تعریف نشده. مثلاً «گوشت برگر» با واحد گرم بسازید." />
          </Card>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {items.map((i) => {
              const out = i.stock <= 0;
              const isLow = i.stock <= i.minStock;
              return (
                <div key={i.id} className={`panel-card p-4 ${out ? "border-red-400/50" : isLow ? "border-amber-400/50" : ""}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-bold">{i.name}</p>
                      <p className="text-[11px] text-[var(--color-ash)] mt-0.5">
                        حداقل: {fa(i.minStock)} {i.unit} · هر {i.unit}: {money(i.unitCost)}
                      </p>
                    </div>
                    {out ? <Badge className="border-red-400/40 text-red-300">تمام شده</Badge> : isLow ? <Badge className="border-amber-400/40 text-amber-300">کمبود</Badge> : null}
                  </div>
                  <p className="text-2xl font-black mt-3">
                    {fa(i.stock)} <span className="text-sm font-normal text-[var(--color-ash)]">{i.unit}</span>
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    <button className="btn-primary btn-sm" onClick={() => setMove({ item: i, kind: "in", qty: 0, note: "" })}>
                      + ورود
                    </button>
                    <button className="btn-outline btn-sm" onClick={() => setMove({ item: i, kind: "out", qty: 0, note: "" })}>
                      خروج
                    </button>
                    <button className="btn-outline btn-sm" onClick={() => setMove({ item: i, kind: "waste", qty: 0, note: "" })}>
                      ضایعات
                    </button>
                    <button className="btn-outline btn-sm" onClick={() => setMove({ item: i, kind: "adjust", qty: i.stock, note: "" })}>
                      شمارش
                    </button>
                    <button className="btn-outline btn-sm" onClick={() => setEdit({ id: i.id, name: i.name, unit: i.unit, stock: i.stock, minStock: i.minStock, unitCost: i.unitCost })}>
                      ویرایش
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ))}

      {tab === "recipes" && (
        <Card title="دستور مصرف هر آیتم منو">
          <p className="text-sm text-[var(--color-ash)] leading-7 mb-4">
            مشخص کنید «یک پرس» از هر آیتم چه مقدار از کدام کالا مصرف می‌کند (مثلاً چیزبرگر: ۱۵۰ گرم گوشت + ۱ عدد نان). از این به بعد با هر سفارش (سایت یا حضوری) همین مقدار خودکار از انبار کم می‌شود، با لغو سفارش برمی‌گردد و بهای تمام‌شده‌ی آیتم هم برای گزارش سود از همین حساب می‌شود.
          </p>
          {items.length === 0 ? (
            <Empty text="اول در تب «موجودی» چند کالا تعریف کنید" />
          ) : (
            <div className="space-y-4">
              <select className="panel-input" value={recipeFor} onChange={(e) => openRecipe(e.target.value)}>
                <option value="">— یک آیتم منو انتخاب کنید —</option>
                {menuItems.map((m) => {
                  const has = data.recipes.some((r) => r.menuItemId === m.id);
                  return (
                    <option key={m.id} value={m.id}>
                      {m.name}
                      {has ? " ✓" : ""}
                    </option>
                  );
                })}
              </select>

              {recipeFor && (
                <div className="space-y-3">
                  {rows.map((r, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <select className="panel-input flex-1" value={r.inventoryItemId} onChange={(e) => setRows(rows.map((x, i) => (i === idx ? { ...x, inventoryItemId: Number(e.target.value) } : x)))}>
                        <option value={0}>— کالا —</option>
                        {items.map((i) => (
                          <option key={i.id} value={i.id}>
                            {i.name} ({i.unit})
                          </option>
                        ))}
                      </select>
                      <div className="w-28">
                        <NumInput decimals value={r.qty} onChange={(n) => setRows(rows.map((x, i) => (i === idx ? { ...x, qty: n } : x)))} placeholder="مقدار" />
                      </div>
                      <button aria-label="حذف ردیف" className="text-[var(--color-ash)] hover:text-red-300 px-1" onClick={() => setRows(rows.filter((_, i) => i !== idx))}>
                        ✕
                      </button>
                    </div>
                  ))}
                  <div className="flex flex-wrap gap-2 items-center">
                    <button className="btn-outline btn-sm" onClick={() => setRows([...rows, { inventoryItemId: 0, qty: 0 }])}>
                      + افزودن ماده
                    </button>
                    <button className="btn-primary btn-sm disabled:opacity-60" disabled={busy} onClick={() => post({ action: "setRecipe", menuItemId: recipeFor, rows }, "دستور مصرف ذخیره شد")}>
                      ذخیره
                    </button>
                    <span className="text-xs text-[var(--color-ash)]">
                      بهای تمام‌شده‌ی هر پرس: {money(rows.reduce((s, r) => s + r.qty * (items.find((i) => i.id === r.inventoryItemId)?.unitCost ?? 0), 0))}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </Card>
      )}

      {tab === "moves" && (
        <Card title="آخرین گردش‌های انبار">
          {data.moves.length === 0 ? (
            <Empty text="هنوز گردشی ثبت نشده" />
          ) : (
            <ul className="divide-y divide-white/8">
              {data.moves.map((m) => (
                <li key={m.id} className="py-2.5 flex items-center justify-between gap-3 text-sm">
                  <div className="min-w-0">
                    <p className="font-bold">
                      {m.itemName} <span className="text-[var(--color-ash)] font-normal">· {KIND_LABEL[m.kind] ?? m.kind}</span>
                    </p>
                    <p className="text-[11px] text-[var(--color-ash)]">
                      {fmtDateTime(m.createdAt)}
                      {m.orderCode ? ` · ${m.orderCode}` : ""}
                      {m.note ? ` · ${m.note}` : ""}
                    </p>
                  </div>
                  <span className={`font-black whitespace-nowrap ${m.delta >= 0 ? "text-emerald-300" : "text-red-300"}`} dir="ltr">
                    {m.delta >= 0 ? "+" : "−"}
                    {fa(Math.abs(m.delta))} {m.unit}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      )}

      {/* کالا */}
      <Modal open={Boolean(edit)} onClose={() => setEdit(null)} title={edit?.id ? "ویرایش کالا" : "کالای جدید"}>
        {edit && (
          <div className="space-y-4">
            <Field label="نام کالا">
              <input className="panel-input" value={edit.name} onChange={(e) => setEdit({ ...edit, name: e.target.value })} autoFocus />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="واحد">
                <select className="panel-input" value={edit.unit} onChange={(e) => setEdit({ ...edit, unit: e.target.value })}>
                  {(UNITS.includes(edit.unit) ? UNITS : [edit.unit, ...UNITS]).map((u) => (
                    <option key={u}>{u}</option>
                  ))}
                </select>
              </Field>
              {!edit.id && (
                <Field label="موجودی اولیه">
                  <NumInput decimals value={edit.stock} onChange={(n) => setEdit({ ...edit, stock: n })} />
                </Field>
              )}
              <Field label="حداقل موجودی (هشدار)">
                <NumInput decimals value={edit.minStock} onChange={(n) => setEdit({ ...edit, minStock: n })} />
              </Field>
              <Field label={`قیمت هر ${edit.unit} (تومان)`}>
                <NumInput value={edit.unitCost} onChange={(n) => setEdit({ ...edit, unitCost: n })} />
              </Field>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                className="btn-primary btn-sm disabled:opacity-60"
                disabled={busy || !edit.name.trim()}
                onClick={async () => {
                  if (await post({ action: "saveItem", item: edit }, "کالا ذخیره شد")) setEdit(null);
                }}
              >
                ذخیره
              </button>
              {edit.id && (
                <button
                  className="btn-danger"
                  onClick={async () => {
                    if (confirm(`«${edit.name}» از انبار حذف شود؟`) && (await post({ action: "deleteItem", id: edit.id }, "حذف شد"))) setEdit(null);
                  }}
                >
                  حذف کالا
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* ورود/خروج/شمارش */}
      <Modal
        open={Boolean(move)}
        onClose={() => setMove(null)}
        title={move ? `${move.kind === "in" ? "ورود به انبار" : move.kind === "out" ? "خروج از انبار" : move.kind === "waste" ? "ثبت ضایعات" : "شمارش موجودی"}: ${move.item.name}` : ""}
      >
        {move && (
          <div className="space-y-4">
            <Field
              label={move.kind === "adjust" ? `موجودیِ شمارش‌شده (${move.item.unit})` : `مقدار (${move.item.unit})`}
              hint={move.kind === "adjust" ? `موجودی فعلی در سیستم: ${fa(move.item.stock)}` : `موجودی فعلی: ${fa(move.item.stock)} ${move.item.unit}`}
            >
              <NumInput decimals value={move.qty} onChange={(n) => setMove({ ...move, qty: n })} />
            </Field>
            <Field label="توضیح (اختیاری)">
              <input className="panel-input" value={move.note} onChange={(e) => setMove({ ...move, note: e.target.value })} placeholder={move.kind === "in" ? "مثلاً خرید از فلان تأمین‌کننده" : ""} />
            </Field>
            <button
              className="btn-primary btn-sm disabled:opacity-60"
              disabled={busy}
              onClick={async () => {
                if (await post({ action: "move", id: move.item.id, kind: move.kind, qty: move.qty, note: move.note }, "ثبت شد")) setMove(null);
              }}
            >
              ثبت
            </button>
          </div>
        )}
      </Modal>
    </>
  );
}
