"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "989120000000";

type State = "checking" | "success" | "failed";

function VerifyContent() {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const [state, setState] = useState<State>("checking");
  const [orderCode, setOrderCode] = useState("");
  const [refId, setRefId] = useState<number | undefined>();
  const [errorMessage, setErrorMessage] = useState("");

  const authority = searchParams.get("Authority");
  const paymentStatus = searchParams.get("Status");
  const orderParam = searchParams.get("order");
  // مقدارهای نامعتبر در URL یعنی پرداخت اصلاً انجام یا کامل نشده؛ این یک
  // مقدار مشتق‌شده از props/params است، نه چیزی که نیاز به effect داشته باشد
  const paramsInvalid = paymentStatus !== "OK" || !authority || !orderParam;

  useEffect(() => {
    if (paramsInvalid) return;

    fetch("/api/checkout/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ authority, order: orderParam }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOrderCode(data.orderCode);
          setRefId(data.refId);
          setState("success");
          clearCart();
        } else {
          setErrorMessage(data.error || "");
          setState("failed");
        }
      })
      .catch(() => setState("failed"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramsInvalid, authority, orderParam]);

  if (paramsInvalid) {
    return (
      <div className="max-w-2xl mx-auto px-5 pt-32 pb-24 text-center">
        <h1 className="text-2xl font-extrabold mb-3">پرداخت انجام نشد</h1>
        <p className="text-[var(--color-ash)] mb-8">
          پرداخت لغو شد یا ناتمام ماند. سبد سفارش شما همچنان محفوظ است.
        </p>
        <Link href="/checkout" className="btn-primary">
          بازگشت و تلاش دوباره
        </Link>
      </div>
    );
  }

  if (state === "checking") {
    return (
      <div className="max-w-2xl mx-auto px-5 pt-32 pb-24 text-center">
        <p className="text-[var(--color-ash)]">در حال بررسی نتیجه‌ی پرداخت…</p>
      </div>
    );
  }

  if (state === "failed") {
    return (
      <div className="max-w-2xl mx-auto px-5 pt-32 pb-24 text-center">
        <h1 className="text-2xl font-extrabold mb-3">تأیید پرداخت ناموفق بود</h1>
        <p className="text-[var(--color-ash)] mb-4">
          {errorMessage || "مشکلی در تأیید پرداخت پیش آمد."}
        </p>
        <p className="text-sm text-[var(--color-ash)] mb-8">
          اگر مبلغی از حسابتان کسر شده، لطفاً با گرگ تماس بگیرید تا پیگیری شود.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            تماس در واتساپ
          </a>
          <Link href="/checkout" className="btn-outline">
            بازگشت به سبد
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-5 pt-32 pb-24 text-center">
      <div className="w-16 h-16 rounded-full bg-[var(--color-ember)]/15 border border-[var(--color-ember)]/40 flex items-center justify-center mx-auto mb-6 text-3xl">
        ✓
      </div>
      <h1 className="text-2xl font-extrabold mb-3">پرداخت موفق بود، سفارش شما ثبت شد</h1>

      <div className="inline-block gorg-card rounded-2xl px-6 py-4 mb-6">
        <p className="text-xs text-[var(--color-ash)] mb-1">کد پیگیری سفارش</p>
        <p className="text-2xl font-black tracking-wider" dir="ltr">{orderCode}</p>
        {refId && (
          <p className="text-xs text-[var(--color-ash)] mt-2">
            شماره پیگیری بانکی: <span dir="ltr">{refId}</span>
          </p>
        )}
      </div>

      <p className="text-[var(--color-ash)] mb-8 leading-7">
        گرگ سفارشتان را دریافت کرد. این کد را نگه دارید؛ برای پیگیری می‌توانید
        همین کد را در واتساپ یا تلفن به ما بگویید.
      </p>

      <Link href="/menu" className="btn-outline">
        بازگشت به منو
      </Link>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="max-w-2xl mx-auto px-5 pt-32 pb-24 text-center text-[var(--color-ash)]">در حال بارگذاری…</div>}>
      <VerifyContent />
    </Suspense>
  );
}
