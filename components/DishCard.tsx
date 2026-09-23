import Image from "next/image";
import { MenuItem } from "@/lib/types";
import AddToCartButton from "./AddToCartButton";
import FxTilt from "./FxTilt";

function formatPrice(n: number) {
  return n.toLocaleString("fa-IR");
}

// جرقه‌های آتشینی که موقع هاور از پایینِ عکس بالا می‌روند (موقعیت‌ها ثابت‌اند تا SSR و کلاینت یکی باشند)
const EMBERS = [
  { l: "10%", s: 4, d: "0s", t: "2.1s", x: "14px" },
  { l: "24%", s: 3, d: ".5s", t: "2.6s", x: "-10px" },
  { l: "38%", s: 5, d: ".2s", t: "2.3s", x: "18px" },
  { l: "54%", s: 3, d: ".9s", t: "2.8s", x: "-16px" },
  { l: "68%", s: 4, d: ".35s", t: "2.2s", x: "12px" },
  { l: "82%", s: 3, d: ".7s", t: "2.5s", x: "-12px" },
  { l: "92%", s: 4, d: "1.1s", t: "2.4s", x: "8px" },
];

export default function DishCard({ item }: { item: MenuItem }) {
  return (
    // لایه‌ی بیرونی: فقط برای انیمیشن‌های اسکرول صفحه‌ی اصلی (GSAP)
    // لایه‌ی داخلی (FxTilt): تیلت و افکت‌های هاور. جدا هستند تا transform ها با هم دعوا نکنند.
    <div data-fx-dish className="h-full">
      <FxTilt
        max={6}
        className={`dish-card gorg-card rounded-2xl overflow-hidden flex flex-col h-full ${item.available === false ? "opacity-60" : ""}`}
      >
        {item.image && (
          <div className="dish-media relative aspect-[4/3] w-full overflow-hidden">
            <div className="dish-parallax absolute inset-0">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width: 768px) 90vw, 320px"
                className="dish-img object-cover"
              />
            </div>
            <span className="dish-shade" aria-hidden="true" />
            <span className="dish-shine" aria-hidden="true" />
            <span className="dish-embers" aria-hidden="true">
              {EMBERS.map((e, i) => (
                <i
                  key={i}
                  style={{ "--l": e.l, "--s": `${e.s}px`, "--d": e.d, "--t": e.t, "--x": e.x } as React.CSSProperties}
                />
              ))}
            </span>
            {item.signature && (
              <span className="absolute top-3 right-3 tag-pill z-10">پیشنهاد گرگ</span>
            )}
            {!!item.discount && item.discount > 0 && (
              <span className="absolute bottom-3 right-3 tag-pill z-10">{item.discount.toLocaleString("fa-IR")}٪ تخفیف</span>
            )}
            {item.spicy && (
              <span className="dish-chili absolute top-3 left-3 text-lg z-10" title="تند" aria-label="تند">
                🌶️
              </span>
            )}
          </div>
        )}
        <div className="dish-body relative z-[3] p-4 flex flex-col gap-2 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="dish-title font-bold text-[15px] leading-6">{item.name}</h3>
          </div>
          {item.description && (
            <p className="text-xs text-[var(--color-ash)] leading-6">{item.description}</p>
          )}
          <div className="flex items-center justify-between pt-1 mt-auto">
            <span className="flex flex-col">
              {item.basePrice && item.basePrice > item.price && (
                <span className="text-[11px] text-[var(--color-ash)] line-through leading-4">{formatPrice(item.basePrice)}</span>
              )}
              <span className="dish-price font-extrabold text-sm">{formatPrice(item.price)} تومان</span>
            </span>
            <AddToCartButton id={item.id} name={item.name} price={item.price} className="dish-add" disabled={item.available === false} />
          </div>
        </div>
      </FxTilt>
    </div>
  );
}
