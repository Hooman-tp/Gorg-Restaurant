"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

/** بخش‌های ظاهریِ سایت (هدر، فوتر، واتساپ و…) داخل پنل مدیریت (/admin) نمایش داده نمی‌شوند */
export default function PublicOnly({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <>{children}</>;
}
