import Image from "next/image";
import Link from "next/link";
import InstagramIcon from "./InstagramIcon";
import DesignerCredit from "./DesignerCredit";
import { ADDRESS, INSTAGRAM_ID, INSTAGRAM_URL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/contact";

const LINKS = [
  { href: "/menu", label: "منو" },
  { href: "/gallery", label: "گالری" },
  { href: "/about", label: "درباره گرگ" },
  { href: "/contact", label: "تماس با ما" },
];

export default function Footer() {
  return (
    <footer className="brand-texture-footer border-t border-white/8 mt-20">
      <div className="max-w-6xl mx-auto px-5 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <Image src="/images/gorg-mark.png" alt="گرگ" width={40} height={40} className="rounded-full" />
            <span className="font-extrabold text-lg">گرگ</span>
          </div>
          <p className="text-sm text-[var(--color-ash)] leading-7">
            به غریزه‌ات اعتماد کن. برگر، بریسکت، نشویل و بال، زیر یک سقف.
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
            {ADDRESS}
            <br />
            تلفن:{" "}
            <a href={PHONE_TEL} dir="ltr" className="inline-block hover:text-[var(--color-ember-light)]">
              {PHONE_DISPLAY}
            </a>
            <br />
            هر روز هفته، ۱۲:۰۰ الی ۲۴:۰۰
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`اینستاگرام گرگ، ${INSTAGRAM_ID}`}
            className="mt-4 inline-flex items-center gap-2.5 text-sm text-[var(--color-ash)] hover:text-[var(--color-ember-light)] transition-colors"
          >
            <span className="w-9 h-9 rounded-full border border-white/12 flex items-center justify-center">
              <InstagramIcon size={18} />
            </span>
            <span dir="ltr">@{INSTAGRAM_ID}</span>
          </a>
        </div>
      </div>

      <div className="border-t border-white/8 py-5 flex flex-col items-center gap-1.5 text-center text-xs text-[var(--color-ash)]">
        <span>© {new Date().getFullYear()} رستوران گرگ. تمام حقوق محفوظ است.</span>
        <DesignerCredit />
      </div>
    </footer>
  );
}
