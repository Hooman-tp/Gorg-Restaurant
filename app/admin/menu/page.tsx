"use client";

import { useState } from "react";
import { api, compressImage, effPrice, fa, money } from "@/lib/adminClient";
import type { AdminMenuCategory, AdminMenuItem } from "@/lib/menuStore";
import { useFetch } from "@/components/admin/hooks";
import { Badge, Card, Empty, ErrorBox, Field, Loading, Modal, NumInput, PageTitle, Toggle, useToast } from "@/components/admin/ui";

interface MenuData {
  categories: AdminMenuCategory[];
  items: AdminMenuItem[];
}

const blankItem = (category: string): AdminMenuItem => ({
  id: "",
  category,
  name: "",
  description: "",
  price: 0,
  discount: 0,
  image: "",
  spicy: false,
  signature: false,
  available: true,
  active: true,
  sortOrder: 0,
  cost: 0,
});

export default function MenuPage() {
  const toast = useToast();
  const { data, error, loading, reload } = useFetch<MenuData>("/api/admin/menu");
  const [editing, setEditing] = useState<AdminMenuItem | null>(null);
  const [catEdit, setCatEdit] = useState<{ id?: string; label: string; blurb: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [filter, setFilter] = useState("");

  if (loading && !data) return <Loading />;
  if (error && !data) return <ErrorBox message={error} onRetry={() => reload()} />;
  if (!data) return null;

  async function post(body: Record<string, unknown>, okMsg?: string) {
    try {
      const r = await api<{ id?: string }>("/api/admin/menu", { body });
      if (okMsg) toast(okMsg);
      await reload(true);
      return r;
    } catch (e) {
      toast(e instanceof Error ? e.message : "خطا", "error");
      return null;
    }
  }

  async function saveItem() {
    if (!editing) return;
    setBusy(true);
    const r = await post({ action: "saveItem", item: editing }, "آیتم ذخیره شد و روی سایت هم اعمال شد");
    setBusy(false);
    if (r) setEditing(null);
  }

  async function upload(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    try {
      const img = await compressImage(file);
      const r = await api<{ url: string }>("/api/admin/menu/image", { body: img });
      setEditing((cur) => (cur ? { ...cur, image: r.url } : cur));
      toast("عکس آپلود شد");
    } catch (e) {
      toast(e instanceof Error ? e.message : "آپلود عکس ناموفق بود", "error");
    } finally {
      setUploading(false);
    }
  }

  const catLabel = (id: string) => data.categories.find((c) => c.id === id)?.label ?? id;
  const q = filter.trim();

  return (
    <>
      <PageTitle
        title="مدیریت منو"
        sub="هر تغییر همین لحظه روی سایت اعمال می‌شود (قیمت، تخفیف، ناموجودی، عکس)"
        actions={
          <>
            <button className="btn-outline btn-sm" onClick={() => setCatEdit({ label: "", blurb: "" })}>
              + دسته‌ی جدید
            </button>
            <button className="btn-primary btn-sm" onClick={() => setEditing(blankItem(data.categories[0]?.id ?? ""))} disabled={data.categories.length === 0}>
              + افزودن آیتم
            </button>
          </>
        }
      />

      <input className="panel-input mb-5" placeholder="جستجو در آیتم‌های منو…" value={filter} onChange={(e) => setFilter(e.target.value)} />

      {data.categories.length === 0 && <Empty text="اول یک دسته بسازید" />}

      <div className="space-y-5">
        {data.categories.map((cat, ci) => {
          const items = data.items.filter((i) => i.category === cat.id && (!q || i.name.includes(q)));
          if (q && items.length === 0) return null;
          return (
            <Card
              key={cat.id}
              title={`${cat.label} (${fa(data.items.filter((i) => i.category === cat.id).length)})`}
              action={
                <div className="flex items-center gap-1.5">
                  {!cat.active && <Badge className="border-white/15 text-[var(--color-ash)]">مخفی</Badge>}
                  <button aria-label="بالا" disabled={ci === 0} onClick={() => post({ action: "move", kind: "category", id: cat.id, dir: -1 })} className="w-8 h-8 rounded-full bg-white/6 disabled:opacity-30">
                    ↑
                  </button>
                  <button aria-label="پایین" disabled={ci === data.categories.length - 1} onClick={() => post({ action: "move", kind: "category", id: cat.id, dir: 1 })} className="w-8 h-8 rounded-full bg-white/6 disabled:opacity-30">
                    ↓
                  </button>
                  <button className="btn-outline btn-sm" onClick={() => setCatEdit({ id: cat.id, label: cat.label, blurb: cat.blurb })}>
                    ویرایش
                  </button>
                </div>
              }
            >
              {items.length === 0 ? (
                <Empty text="این دسته آیتمی ندارد" />
              ) : (
                <ul className="divide-y divide-white/8">
                  {items.map((it, ii) => (
                    <li key={it.id} className={`py-3 flex flex-wrap items-center gap-3 ${it.active ? "" : "opacity-55"}`}>
                      {it.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={it.image} alt="" loading="lazy" className="w-14 h-14 rounded-xl object-cover shrink-0" />
                      ) : (
                        <div className="w-14 h-14 rounded-xl bg-white/6 shrink-0" />
                      )}
                      <div className="flex-1 min-w-[140px]">
                        <p className="font-bold text-sm">{it.name}</p>
                        <p className="text-xs text-[var(--color-ash)] mt-0.5">
                          {it.discount > 0 ? (
                            <>
                              <span className="line-through">{money(it.price)}</span> <span className="text-[var(--color-ember-light)] font-bold">{money(effPrice(it.price, it.discount))}</span>
                            </>
                          ) : (
                            money(it.price)
                          )}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                          {it.signature && <Badge className="border-amber-400/30 text-amber-300">پیشنهاد گرگ</Badge>}
                          {it.spicy && <Badge className="border-red-400/30 text-red-300">🌶️ تند</Badge>}
                          {!it.active && <Badge className="border-white/15 text-[var(--color-ash)]">مخفی از سایت</Badge>}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 shrink-0">
                        <label className="flex flex-col items-center gap-1 text-[11px] text-[var(--color-ash)]">
                          موجود
                          <Toggle checked={it.available} label={`موجود بودن ${it.name}`} onChange={(v) => post({ action: "flag", id: it.id, flag: "available", value: v }, v ? "موجود شد" : "ناموجود شد")} />
                        </label>
                        <label className="flex flex-col items-center gap-1 text-[11px] text-[var(--color-ash)]">
                          نمایش
                          <Toggle checked={it.active} label={`نمایش ${it.name} روی سایت`} onChange={(v) => post({ action: "flag", id: it.id, flag: "active", value: v }, v ? "روی سایت نمایش داده می‌شود" : "از سایت مخفی شد")} />
                        </label>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button aria-label="بالا" disabled={ii === 0} onClick={() => post({ action: "move", kind: "item", id: it.id, dir: -1 })} className="w-8 h-8 rounded-full bg-white/6 disabled:opacity-30">
                          ↑
                        </button>
                        <button aria-label="پایین" disabled={ii === items.length - 1} onClick={() => post({ action: "move", kind: "item", id: it.id, dir: 1 })} className="w-8 h-8 rounded-full bg-white/6 disabled:opacity-30">
                          ↓
                        </button>
                        <button className="btn-outline btn-sm" onClick={() => setEditing({ ...it })}>
                          ویرایش
                        </button>
                        <button
                          className="btn-danger"
                          onClick={async () => {
                            if (confirm(`«${it.name}» برای همیشه حذف شود؟ (اگر فقط می‌خواهید موقتاً نباشد، «ناموجود» یا «نمایش» را خاموش کنید)`)) await post({ action: "deleteItem", id: it.id }, "حذف شد");
                          }}
                        >
                          حذف
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          );
        })}
      </div>

      {/* ویرایش/افزودن آیتم */}
      <Modal open={Boolean(editing)} onClose={() => setEditing(null)} title={editing?.id ? "ویرایش آیتم" : "آیتم جدید"} wide>
        {editing && (
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-3">
              <Field label="نام آیتم">
                <input className="panel-input" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} autoFocus />
              </Field>
              <Field label="دسته">
                <select className="panel-input" value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })}>
                  {data.categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="قیمت (تومان)">
                <NumInput value={editing.price} onChange={(n) => setEditing({ ...editing, price: n })} />
              </Field>
              <Field label="تخفیف (٪)" hint={editing.discount > 0 ? `قیمت نهایی: ${money(effPrice(editing.price, editing.discount))}` : "۰ تا ۹۰"}>
                <NumInput value={editing.discount} onChange={(n) => setEditing({ ...editing, discount: Math.min(90, n) })} />
              </Field>
              <Field label="بهای تمام‌شده‌ی یک پرس (اختیاری)" hint="برای گزارش سود. اگر دستور مصرف انبار تعریف کنید، از همان حساب می‌شود.">
                <NumInput value={editing.cost} onChange={(n) => setEditing({ ...editing, cost: n })} />
              </Field>
            </div>
            <Field label="توضیحات">
              <textarea className="panel-input resize-none" rows={2} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
            </Field>

            <div>
              <p className="text-xs font-bold text-[var(--color-ash)] mb-1.5">عکس</p>
              <div className="flex items-center gap-3">
                {editing.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={editing.image} alt="" className="w-20 h-20 rounded-xl object-cover" />
                ) : (
                  <div className="w-20 h-20 rounded-xl bg-white/6 flex items-center justify-center text-2xl">📷</div>
                )}
                <div className="flex-1 space-y-2">
                  <label className="btn-outline btn-sm cursor-pointer">
                    {uploading ? "در حال آپلود…" : "انتخاب عکس از گوشی/کامپیوتر"}
                    <input type="file" accept="image/*" className="hidden" disabled={uploading} onChange={(e) => upload(e.target.files?.[0])} />
                  </label>
                  {editing.image && (
                    <button type="button" className="block text-xs text-[var(--color-ash)] hover:text-red-300" onClick={() => setEditing({ ...editing, image: "" })}>
                      حذف عکس
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
              {(
                [
                  ["available", "موجود است (قابل سفارش)"],
                  ["active", "روی سایت نمایش داده شود"],
                  ["signature", "«پیشنهاد گرگ» (نمایش در صفحه‌ی اصلی)"],
                  ["spicy", "تند است 🌶️"],
                ] as const
              ).map(([k, label]) => (
                <label key={k} className="flex items-center justify-between gap-3">
                  {label}
                  <Toggle checked={editing[k]} onChange={(v) => setEditing({ ...editing, [k]: v })} label={label} />
                </label>
              ))}
            </div>

            <div className="flex gap-2 pt-2">
              <button className="btn-primary btn-sm disabled:opacity-60" disabled={busy || uploading || !editing.name.trim()} onClick={saveItem}>
                {busy ? "در حال ذخیره…" : "ذخیره"}
              </button>
              <button className="btn-outline btn-sm" onClick={() => setEditing(null)}>
                انصراف
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* دسته */}
      <Modal open={Boolean(catEdit)} onClose={() => setCatEdit(null)} title={catEdit?.id ? `ویرایش دسته: ${catLabel(catEdit.id)}` : "دسته‌ی جدید"}>
        {catEdit && (
          <div className="space-y-4">
            <Field label="نام دسته">
              <input className="panel-input" value={catEdit.label} onChange={(e) => setCatEdit({ ...catEdit, label: e.target.value })} autoFocus />
            </Field>
            <Field label="توضیح کوتاه">
              <input className="panel-input" value={catEdit.blurb} onChange={(e) => setCatEdit({ ...catEdit, blurb: e.target.value })} />
            </Field>
            <div className="flex flex-wrap gap-2">
              <button
                className="btn-primary btn-sm disabled:opacity-60"
                disabled={!catEdit.label.trim()}
                onClick={async () => {
                  const r = await post({ action: "saveCategory", category: catEdit }, "دسته ذخیره شد");
                  if (r) setCatEdit(null);
                }}
              >
                ذخیره
              </button>
              {catEdit.id && (
                <button
                  className="btn-danger"
                  onClick={async () => {
                    if (!confirm("این دسته حذف شود؟")) return;
                    const r = await post({ action: "deleteCategory", id: catEdit.id }, "دسته حذف شد");
                    if (r) setCatEdit(null);
                  }}
                >
                  حذف دسته
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
