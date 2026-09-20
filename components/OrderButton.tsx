"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";

/**
 * کلید «سفارش آنلاین»: تا وقتی کاربر با شماره موبایل وارد نشده اصلاً نشان داده
 * نمی‌شود (به‌جایش کلید ورود می‌آید)؛ بعد از ورود فعال و نمایان می‌شود.
 */
export default function OrderButton({
  className = "btn-primary",
  loginClassName = "btn-outline",
  children,
}: {
  className?: string;
  loginClassName?: string;
  children: ReactNode;
}) {
  const { phone, ready, openLogin } = useAuth();
  if (!ready) return null;
  if (phone) {
    return (
      <Link href="/menu" className={className}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" onClick={openLogin} className={loginClassName}>
      ورود برای سفارش آنلاین
    </button>
  );
}
