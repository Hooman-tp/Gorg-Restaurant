import type { Metadata } from "next";

// این صفحه برای مشتری است و محتوای مستقلی برای گوگل ندارد
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
