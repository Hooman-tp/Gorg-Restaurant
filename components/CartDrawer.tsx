"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

function formatPrice(n: number) {
  return n.toLocaleString("fa-IR");
}

export default function CartDrawer() {
  const { lines, total, isOpen, closeCart, incrementItem, decrementItem, removeItem } = useCart();

  return (
    <>
      {/* پس‌زمینه‌ی تیره */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 bg-black/70 z-[140] transition-opacity ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* پنل سبد */}
      <aside
        role="dialog"
        aria-label="سبد سفارش"
        className={`fixed top-0 bottom-0 left-0 z-[150] w-full max-w-sm bg-[var(--color-charcoal)] border-l border-white/10 flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <h2 className="font-extrabold text-lg">سبد سفارش شما</h2>
          <button
            onClick={closeCart}
            aria-label="بستن سبد"
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/5"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {lines.length === 0 ? (
            <p className="text-[var(--color-ash)] text-sm mt-10 text-center">
              سبد سفارش شما خالی است. از منو چیزی اضافه کنید.
            </p>
          ) : (
            lines.map((line) => (
              <div key={line.id} className="flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm truncate">{line.name}</p>
                  <p className="text-xs text-[var(--color-ash)] mt-0.5">
                    {formatPrice(line.price)} تومان
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => decrementItem(line.id)}
                    aria-label="کم کردن"
                    className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center text-sm hover:border-[var(--color-ember)]"
                  >
                    −
                  </button>
                  <span className="w-5 text-center text-sm">{line.qty}</span>
                  <button
                    onClick={() => incrementItem(line.id)}
                    aria-label="زیاد کردن"
                    className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center text-sm hover:border-[var(--color-ember)]"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeItem(line.id)}
                  aria-label="حذف از سبد"
                  className="text-[var(--color-ash)] hover:text-[var(--color-ember)] text-xs shrink-0"
                >
                  حذف
                </button>
              </div>
            ))
          )}
        </div>

        {lines.length > 0 && (
          <div className="px-5 py-4 border-t border-white/10 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--color-ash)]">جمع کل</span>
              <span className="font-extrabold text-base">{formatPrice(total)} تومان</span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="btn-primary w-full text-sm"
            >
              ادامه و ثبت سفارش
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
