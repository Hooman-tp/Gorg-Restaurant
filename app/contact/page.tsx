import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

const PHONE = process.env.NEXT_PUBLIC_PHONE_DISPLAY || "021-91234567";
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "989120000000";
const ADDRESS = "تهران، خیابان ولیعصر، بالاتر از پارک وی، کوچه‌ی بیستم، پلاک ۴";

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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
                  {PHONE}
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
                <span>هر روز هفته، ۱۲:۰۰ ظهر تا ۰۰:۳۰ بامداد</span>
              </li>
            </ul>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline w-full mt-6 text-sm"
            >
              مسیریابی روی نقشه
            </a>
          </div>
        </div>

        <div>
          <h2 className="font-bold mb-4">پیام بدهید</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
