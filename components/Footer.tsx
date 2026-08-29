import Image from "next/image";
import Link from "next/link";

const PHONE = process.env.NEXT_PUBLIC_PHONE_DISPLAY || "021-91234567";

const LINKS = [
  { href: "/menu", label: "منو" },
  { href: "/gallery", label: "گالری" },
  { href: "/about", label: "درباره گرگ" },
  { href: "/contact", label: "تماس با ما" },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--color-charcoal)] border-t border-white/8 mt-20">
      <div className="max-w-6xl mx-auto px-5 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <Image src="/images/gorg-mark.png" alt="گرگ" width={40} height={40} className="rounded-full" />
            <span className="font-extrabold text-lg">گرگ</span>
          </div>
          <p className="text-sm text-[var(--color-ash)] leading-7">
            به غریزه‌ات اعتماد کن. گریل، فست‌فود، ایرانی و ایتالیایی، زیر یک سقف.
          </p>
        </div>

        <div>
          <h3 className="font-bold mb-4 text-sm text-[var(--color-bone)]">دسترسی سریع</h3>
          <ul className="space-y-2.5">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-[var(--color-ash)] hover:text-[var(--color-ember-light)]">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4 text-sm text-[var(--color-bone)]">تماس و ساعات کاری</h3>
          <p className="text-sm text-[var(--color-ash)] leading-7">
            تهران، خیابان ولیعصر، بالاتر از پارک وی
            <br />
            تلفن: {PHONE}
            <br />
            هر روز هفته، ۱۲:۰۰ ظهر تا ۰۰:۳۰ بامداد
          </p>
        </div>
      </div>

      <div className="border-t border-white/8 py-5 text-center text-xs text-[var(--color-ash)]">
        © {new Date().getFullYear()} رستوران گرگ. تمام حقوق محفوظ است.
      </div>
    </footer>
  );
}
