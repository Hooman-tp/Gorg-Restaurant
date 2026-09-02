import type { Metadata } from "next";
import "@fontsource-variable/vazirmatn/wght.css";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import SkipToContent from "@/components/SkipToContent";
import WhatsAppButton from "@/components/WhatsAppButton";
import StructuredData from "@/components/StructuredData";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://gorg-restaurant.ir"),
  title: {
    default: "گرگ | GORG — رستوران گریل، فست‌فود، ایرانی و ایتالیایی",
    template: "%s | گرگ",
  },
  description:
    "رستوران گرگ: گریل و استیک، فست‌فود، غذای ایرانی و ایتالیایی زیر یک سقف. سفارش آنلاین، رزرو و دلیوری در تهران.",
  keywords: ["رستوران گرگ", "گرگ رستوران", "GORG", "سفارش آنلاین غذا", "رستوران گریل تهران"],
  openGraph: {
    title: "گرگ | GORG",
    description: "به غریزه‌ات اعتماد کن. گریل، فست‌فود، ایرانی و ایتالیایی زیر یک سقف.",
    locale: "fa_IR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="film-grain min-h-screen flex flex-col">
        <StructuredData />
        <SmoothScroll />
        <ScrollProgress />
        <SkipToContent />
        <CartProvider>
          <Header />
          <CartDrawer />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </CartProvider>
        <WhatsAppButton />
        <BackToTop />
      </body>
    </html>
  );
}
