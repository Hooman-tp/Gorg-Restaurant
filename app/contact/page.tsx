import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";

const PHONE = process.env.NEXT_PUBLIC_PHONE_DISPLAY || "021-22240039";
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "989120000000";
const ADDRESS = "بلوار اندرزگو، اشکستان‌پور جنوبی، پلاک ۳";
// عبارت جستجو مخصوص نقشه: فرمت «تقاطع خیابان و خیابان» برای گوگل‌مپ خیلی
// دقیق‌تر از آدرس کامل با پلاک حل می‌شود (پلاک برای گوگل‌مپ در خیابان‌های
// فرعی معمولاً قابل تشخیص نیست و باعث نتیجه‌ی نادقیق می‌شود).
const MAPS_QUERY = "تقاطع بلوار اندرزگو و اشکستان‌پور جنوبی، تهران";
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAPS_QUERY)}`;

export const metadata: Metadata = {
  title: "تماس با ما",
  description: "آدرس، تلفن، ساعات کاری و فرم تماس رستوران گرگ.",
};

export default function ContactPage() {
  return (
    <div className="max-w-6xl mx-auto px-5 pt-28 pb-24">
      <span className="text-xs tracking-[0.3em] text-[var(--color-ember-light)] uppercase">Contact</span>
      <h1 className="text-4xl font-black mt-3 mb-3">تماس با گرگ</h1>
      <p className="text-[var(--color-ash)] max-w-xl mb-12">
        سؤالی دارید یا می‌خواهید میز رزرو کنید؟ از راه‌های زیر با ما در تماس
        باشید.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div className="space-y-8">
          <div className="gorg-card rounded-2xl p-6">
            <h2 className="font-bold mb-4">اطلاعات تماس</h2>
            <ul className="space-y-4 text-sm text-[var(--color-ash)]">
              <li className="flex items-start gap-3">
                <span aria-hidden="true">📍</span>
                <span>{ADDRESS}</span>
              </li>
              <li className="flex items-start gap-3">
                <span aria-hidden="true">📞</span>
                <a href={`tel:${PHONE.replace(/-/g, "")}`} className="hover:text-[var(--color-ember-light)]">
                  <span dir="ltr" className="inline-block">{PHONE}</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span aria-hidden="true">💬</span>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--color-ember-light)]"
                >
                  چت در واتساپ
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span aria-hidden="true">🕐</span>
                <span>هر روز هفته، ۱۲:۰۰ الی ۲۴:۰۰</span>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="font-bold mb-4">پیام بدهید</h2>
          <ContactForm />
        </div>
      </div>

      {/* ─────────────── سه‌گانه‌ی تماس، ساعات، لوکیشن ─────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="gorg-card rounded-2xl overflow-hidden">
          <div className="relative aspect-[1179/2059] w-full">
            <Image
              src="/images/gorg-phone.jpg"
              alt="تماس با گرگ - شماره ۰۲۱-۲۲۲۴۰۰۳۹"
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <a href={`tel:${PHONE.replace(/-/g, "")}`} className="btn-primary w-full text-sm">
              تماس بگیرید
            </a>
          </div>
        </div>

        <div className="gorg-card rounded-2xl overflow-hidden">
          <div className="relative aspect-[1179/2058] w-full">
            <Image
              src="/images/gorg-hours.jpg"
              alt="ساعات کاری گرگ - هر روز از ۱۲:۰۰ الی ۲۴:۰۰"
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <p className="text-center text-sm text-[var(--color-ash)]">هر روز هفته، ۱۲:۰۰ الی ۲۴:۰۰</p>
          </div>
        </div>

        <div className="gorg-card rounded-2xl overflow-hidden">
          <div className="relative aspect-[1179/1350] w-full">
            <Image
              src="/images/gorg-location.jpg"
              alt="نقشه‌ی لوکیشن رستوران گرگ - بلوار اندرزگو، اشکستان‌پور جنوبی"
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
          <div className="p-4 space-y-3">
            <p className="text-xs text-[var(--color-ash)] text-center">{ADDRESS}</p>
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="btn-primary w-full text-sm">
              مسیریابی روی نقشه
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
