"use client";

import { useState } from "react";
import { api, compressImage } from "@/lib/adminClient";
import type { AdminGalleryPhoto } from "@/lib/gallery";
import { useFetch } from "@/components/admin/hooks";
import { Card, Empty, ErrorBox, Field, Loading, Modal, PageTitle, Toggle, useToast } from "@/components/admin/ui";

interface GalleryData {
  photos: AdminGalleryPhoto[];
}

export default function GalleryPage() {
  const toast = useToast();
  const { data, error, loading, reload } = useFetch<GalleryData>("/api/admin/gallery");
  const [uploading, setUploading] = useState(false);
  const [adding, setAdding] = useState<{ src: string; width: number; height: number; alt: string } | null>(null);
  const [savingAlt, setSavingAlt] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  if (loading && !data) return <Loading />;
  if (error && !data) return <ErrorBox message={error} onRetry={() => reload()} />;
  if (!data) return null;

  async function post(body: Record<string, unknown>, okMsg?: string) {
    try {
      const r = await api("/api/admin/gallery", { body });
      if (okMsg) toast(okMsg);
      await reload(true);
      return r;
    } catch (e) {
      toast(e instanceof Error ? e.message : "خطا", "error");
      return null;
    }
  }

  async function uploadNew(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    try {
      const img = await compressImage(file);
      const r = await api<{ url: string }>("/api/admin/gallery/image", { body: img });
      setAdding({ src: r.url, width: img.width, height: img.height, alt: "" });
    } catch (e) {
      toast(e instanceof Error ? e.message : "آپلود عکس ناموفق بود", "error");
    } finally {
      setUploading(false);
    }
  }

  async function confirmAdd() {
    if (!adding) return;
    const r = await post({ action: "savePhoto", photo: adding }, "عکس به گالری اضافه شد");
    if (r) setAdding(null);
  }

  async function saveAlt(photo: AdminGalleryPhoto, alt: string) {
    setSavingAlt(photo.id);
    await post({ action: "savePhoto", photo: { ...photo, alt } });
    setSavingAlt(null);
  }

  async function toggleActive(photo: AdminGalleryPhoto) {
    setBusyId(photo.id);
    await post({ action: "toggleActive", id: photo.id, value: !photo.active });
    setBusyId(null);
  }

  async function move(photo: AdminGalleryPhoto, dir: -1 | 1) {
    setBusyId(photo.id);
    await post({ action: "move", id: photo.id, dir });
    setBusyId(null);
  }

  async function remove(photo: AdminGalleryPhoto) {
    if (!confirm("این عکس از گالری حذف شود؟")) return;
    setBusyId(photo.id);
    await post({ action: "delete", id: photo.id }, "عکس حذف شد");
    setBusyId(null);
  }

  return (
    <>
      <PageTitle
        title="گالری"
        sub="عکس‌هایی که در صفحه‌ی «گالری» سایت و تیزر صفحه‌ی اصلی نمایش داده می‌شوند"
        actions={
          <label className="btn-primary btn-sm cursor-pointer">
            {uploading ? "در حال آپلود…" : "+ افزودن عکس"}
            <input type="file" accept="image/*" className="hidden" disabled={uploading} onChange={(e) => uploadNew(e.target.files?.[0])} />
          </label>
        }
      />

      {data.photos.length === 0 ? (
        <Empty text="هنوز عکسی در گالری نیست؛ از دکمه‌ی «افزودن عکس» شروع کنید" />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {data.photos.map((p, idx) => (
            <Card key={p.id} className="p-3 space-y-2.5">
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.src} alt={p.alt} loading="lazy" className="w-full h-40 rounded-xl object-cover bg-white/5" />
                {!p.active && (
                  <span className="absolute top-2 right-2 bg-black/70 text-[11px] px-2 py-0.5 rounded-full text-[var(--color-ash)]">مخفی</span>
                )}
              </div>
              <input
                className="panel-input text-sm"
                placeholder="توضیح عکس (اختیاری، برای دسترسی‌پذیری/سئو)"
                defaultValue={p.alt}
                disabled={savingAlt === p.id}
                onBlur={(e) => {
                  if (e.target.value !== p.alt) saveAlt(p, e.target.value);
                }}
              />
              <div className="flex items-center justify-between gap-2">
                <label className="flex items-center gap-2 text-xs text-[var(--color-ash)]">
                  نمایش در سایت
                  <Toggle checked={p.active} onChange={() => toggleActive(p)} label="نمایش در سایت" />
                </label>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={idx === 0 || busyId === p.id}
                    onClick={() => move(p, -1)}
                    className="w-8 h-8 rounded-lg bg-white/6 border border-white/12 disabled:opacity-30"
                    aria-label="جابه‌جایی به بالا"
                    title="جابه‌جایی به بالا"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    disabled={idx === data.photos.length - 1 || busyId === p.id}
                    onClick={() => move(p, 1)}
                    className="w-8 h-8 rounded-lg bg-white/6 border border-white/12 disabled:opacity-30"
                    aria-label="جابه‌جایی به پایین"
                    title="جابه‌جایی به پایین"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    disabled={busyId === p.id}
                    onClick={() => remove(p)}
                    className="w-8 h-8 rounded-lg bg-white/6 border border-white/12 text-red-300 disabled:opacity-30"
                    aria-label="حذف عکس"
                    title="حذف عکس"
                  >
                    🗑
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal open={Boolean(adding)} onClose={() => setAdding(null)} title="افزودن عکس به گالری">
        {adding && (
          <div className="space-y-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={adding.src} alt="" className="w-full h-48 rounded-xl object-cover bg-white/5" />
            <Field label="توضیح عکس (اختیاری)">
              <input className="panel-input" autoFocus value={adding.alt} onChange={(e) => setAdding({ ...adding, alt: e.target.value })} />
            </Field>
            <div className="flex gap-2 pt-2">
              <button className="btn-primary btn-sm" onClick={confirmAdd}>
                افزودن به گالری
              </button>
              <button className="btn-outline btn-sm" onClick={() => setAdding(null)}>
                انصراف
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
