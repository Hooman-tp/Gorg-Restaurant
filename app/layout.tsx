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
import AuthModal from "@/components/AuthModal";
import PublicOnly from "@/components/PublicOnly";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://gorg-restaurant.ir"),
  title: {
    default: "گرگ | GORG — رستوران برگر، بریسکت و نشویل",
    template: "%s | گرگ",
  },
  description:
    "رستوران گرگ: برگر، ساندویچ بریسکت، مرغ سوخاری نشویل، بال و سیب‌زمینی. سفارش آنلاین، رزرو و دلیوری در تهران.",
  keywords: ["رستوران گرگ", "گرگ رستوران", "GORG", "سفارش آنلاین غذا", "برگر تهران", "بریسکت", "نشویل"],
  openGraph: {
    title: "گرگ | GORG",
    description: "به غریزه‌ات اعتماد کن. برگر، بریسکت، نشویل و بال زیر یک سقف.",
    locale: "fa_IR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="film-grain min-h-screen flex flex-col">
        <PublicOnly>
          <StructuredData />
          <SmoothScroll />
          <ScrollProgress />
          <SkipToContent />
        </PublicOnly>
        <AuthProvider>
          <CartProvider>
            <PublicOnly>
              <Header />
              <CartDrawer />
              <AuthModal />
            </PublicOnly>
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <PublicOnly>
              <Footer />
            </PublicOnly>
          </CartProvider>
        </AuthProvider>
        <PublicOnly>
          <WhatsAppButton />
          <BackToTop />
        </PublicOnly>
      </body>
    </html>
  );
}
