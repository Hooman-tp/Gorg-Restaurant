"use client";

import { useState } from "react";
import { api, fa, fmtDateTime, fmtTime, money, NEXT_STATUS, printOrder, STATUS_TONE, timeAgo } from "@/lib/adminClient";
import { ORDER_TYPE_LABELS, PAYMENT_LABELS, SOURCE_LABELS, STATUS_LABELS } from "@/lib/orderMeta";
import type { StoredOrder } from "@/lib/orderMeta";
import { Badge, Modal, useToast } from "./ui";
import { useAdmin } from "./AdminShell";

export const SOURCE_TONE: Record<string, string> = {
  website: "bg-[#dd4a34]/15 text-[#ff9b8a] border-[#dd4a34]/35",
  qr: "bg-amber-500/15 text-amber-300 border-amber-400/30",
  pos: "bg-sky-500/15 text-sky-300 border-sky-400/30",
};

function sourceLabel(o: StoredOrder) {
  return SOURCE_LABELS[o.source ?? "website"];
}

function typeLabel(o: StoredOrder) {
  return o.order_type === "dine_in" && o.table_no ? `سالن · میز ${o.table_no}` : ORDER_TYPE_LABELS[o.order_type];
}

/** کارتِ خلاصه‌ی سفارش با دکمه‌ی مرحله‌ی بعد */
export function OrderCard({ order, onOpen, onChanged }: { order: StoredOrder; onOpen: (o: StoredOrder) => void; onChanged: () => void }) {
  const toast = useToast();
  const [busy, setBusy] = useState(false);
  const next = NEXT_STATUS[order.status];
  const isNew = order.status === "received";

  async function advance(e: React.MouseEvent) {
    e.stopPropagation();
    if (!next) return;
    setBusy(true);
    try {
      await api("/api/admin/orders", { method: "PATCH", body: { orderCode: order.order_code, status: next.to } });
      onChanged();
    } catch (err) {
      toast(err instanceof Error ? err.message : "خطا", "error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onOpen(order)}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen(order)}
      className={`panel-card p-4 cursor-pointer text-right transition-colors hover:border-[var(--color-ember)]/40 ${isNew ? "border-amber-400/50" : ""}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-black text-[15px] tracking-wide" dir="ltr">
            {order.order_code}
          </p>
          <p className="text-xs text-[var(--color-ash)] mt-0.5">
            {fmtTime(order.created_at)} · {timeAgo(order.created_at)}
          </p>
        </div>
        <div className="flex flex-wrap justify-end gap-1.5">
          <Badge className={SOURCE_TONE[order.source ?? "website"]}>{sourceLabel(order)}</Badge>
          <Badge className={STATUS_TONE[order.status]}>{STATUS_LABELS[order.status]}</Badge>
        </div>
      </div>

      <p className="text-sm mt-3 leading-7">
        <span className="font-bold">{order.name}</span>
        <span className="text-[var(--color-ash)]"> · {typeLabel(order)}</span>
      </p>
      <p className="text-xs text-[var(--color-ash)] leading-6 mt-1 line-clamp-2">{order.lines.map((l) => `${fa(l.qty)}× ${l.name}`).join("، ")}</p>

      <div className="flex items-center justify-between gap-3 mt-3 pt-3 border-t border-white/8">
        <div>
          <p className="font-extrabold text-sm">{money(order.total)}</p>
          <p className="text-[11px] text-[var(--color-ash)]">{PAYMENT_LABELS[order.payment_method ?? "online"]}</p>
        </div>
        {next && (
          <button onClick={advance} disabled={busy} className="btn-primary btn-sm disabled:opacity-60">
            {busy ? "…" : next.label}
          </button>
        )}
      </div>
    </div>
  );
}

/** جزئیات کامل سفارش + تغییر وضعیت + لغو + چاپ */
export function OrderDetail({ order, onClose, onChanged }: { order: StoredOrder | null; onClose: () => void; onChanged: () => void }) {
  const toast = useToast();
  const { businessName } = useAdmin();
  const [busy, setBusy] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [reason, setReason] = useState("");

  if (!order) return null;
  const next = NEXT_STATUS[order.status];
  const mapUrl = order.lat != null && order.lng != null ? `https://www.google.com/maps/search/?api=1&query=${order.lat},${order.lng}` : null;

  async function setStatus(status: string, why?: string) {
    if (!order) return;
    setBusy(true);
    try {
      await api("/api/admin/orders", { method: "PATCH", body: { orderCode: order.order_code, status, reason: why } });
      toast(status === "cancelled" ? "سفارش لغو شد" : "وضعیت سفارش به‌روز شد");
      setCancelling(false);
      setReason("");
      onChanged();
      onClose();
    } catch (err) {
      toast(err instanceof Error ? err.message : "خطا", "error");
    } finally {
      setBusy(false);
    }
  }

  const steps: { label: string; at?: string | null }[] = [
    { label: "ثبت سفارش", at: order.created_at },
    { label: "شروع آماده‌سازی", at: order.preparing_at },
    { label: "آماده شد", at: order.ready_at },
    { label: "تحویل شد", at: order.delivered_at },
  ];

  return (
    <Modal open onClose={onClose} title={`سفارش ${order.order_code}`} wide>
      <div className="space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className={STATUS_TONE[order.status]}>{STATUS_LABELS[order.status]}</Badge>
          <Badge className={SOURCE_TONE[order.source ?? "website"]}>{sourceLabel(order)}</Badge>
          <Badge className="border-white/15 text-[var(--color-ash)]">{typeLabel(order)}</Badge>
          <Badge className="border-white/15 text-[var(--color-ash)]">{PAYMENT_LABELS[order.payment_method ?? "online"]}</Badge>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <div className="panel-card p-3.5">
            <p className="text-xs text-[var(--color-ash)] mb-1">مشتری</p>
            <p className="font-bold">{order.name}</p>
            {order.phone ? (
              <a href={`tel:${order.phone}`} className="text-[var(--color-ember-light)] font-bold" dir="ltr">
                {order.phone}
              </a>
            ) : (
              <p className="text-xs text-[var(--color-ash)]">شماره‌ای ثبت نشده</p>
            )}
          </div>
          <div className="panel-card p-3.5">
            <p className="text-xs text-[var(--color-ash)] mb-1">زمان ثبت</p>
            <p className="font-bold">{fmtDateTime(order.created_at)}</p>
            {order.ref_id && (
              <p className="text-xs text-[var(--color-ash)] mt-1">
                پیگیری بانکی: <span dir="ltr">{order.ref_id}</span>
              </p>
            )}
          </div>
        </div>

        {(order.address || mapUrl) && (
          <div className="panel-card p-3.5 text-sm">
            <p className="text-xs text-[var(--color-ash)] mb-1">آدرس</p>
            {order.address && <p className="leading-7">{order.address}</p>}
            {mapUrl && (
              <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-[var(--color-ember-light)] font-bold hover:underline">
                📍 باز کردن موقعیت روی نقشه
              </a>
            )}
          </div>
        )}
        {order.notes && (
          <div className="panel-card p-3.5 text-sm">
            <p className="text-xs text-[var(--color-ash)] mb-1">توضیحات مشتری</p>
            <p className="leading-7">{order.notes}</p>
          </div>
        )}

        <div className="panel-card p-4">
          <div className="space-y-2.5">
            {order.lines.map((l) => (
              <div key={l.id} className="flex items-center justify-between gap-3 text-sm">
                <span>
                  <span className="font-black text-[var(--color-ember-light)]">{fa(l.qty)}×</span> {l.name}
                </span>
                <span className="text-[var(--color-ash)] whitespace-nowrap">{money(l.price * l.qty)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 mt-3 pt-3 space-y-1.5 text-sm">
            {!!order.discount && (
              <div className="flex justify-between text-[var(--color-ash)]">
                <span>تخفیف</span>
                <span>− {money(order.discount)}</span>
              </div>
            )}
            {!!order.delivery_fee && (
              <div className="flex justify-between text-[var(--color-ash)]">
                <span>هزینه ارسال</span>
                <span>{money(order.delivery_fee)}</span>
              </div>
            )}
            <div className="flex justify-between font-extrabold text-base">
              <span>مبلغ نهایی</span>
              <span>{money(order.total)}</span>
            </div>
          </div>
        </div>

        {order.status === "cancelled" ? (
          <p className="text-sm text-red-300 leading-7">
            این سفارش لغو شده است{order.cancel_reason ? `: ${order.cancel_reason}` : "."} مصرف انبار برگشت داده شده. اگر مشتری آنلاین پرداخته، بازگشت وجه را خودتان از درگاه انجام دهید.
          </p>
        ) : (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--color-ash)]">
            {steps.map((s) => (
              <span key={s.label} className={s.at ? "text-[var(--color-bone)]" : ""}>
                {s.at ? "✓" : "○"} {s.label}
                {s.at ? ` (${fmtTime(s.at)})` : ""}
              </span>
            ))}
          </div>
        )}

        {cancelling ? (
          <div className="space-y-3">
            <input className="panel-input" placeholder="دلیل لغو (اختیاری)" value={reason} onChange={(e) => setReason(e.target.value)} autoFocus />
            <div className="flex gap-2">
              <button className="btn-danger" disabled={busy} onClick={() => setStatus("cancelled", reason)}>
                {busy ? "…" : "تأیید لغو سفارش"}
              </button>
              <button className="btn-outline btn-sm" onClick={() => setCancelling(false)}>
                انصراف
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 pt-1">
            {next && (
              <button className="btn-primary btn-sm" disabled={busy} onClick={() => setStatus(next.to)}>
                {next.label}
              </button>
            )}
            <button className="btn-outline btn-sm" onClick={() => printOrder(order, businessName)}>
              🖨️ چاپ فیش
            </button>
            {order.status !== "cancelled" && order.status !== "delivered" && (
              <button className="btn-danger" onClick={() => setCancelling(true)}>
                لغو سفارش
              </button>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}
