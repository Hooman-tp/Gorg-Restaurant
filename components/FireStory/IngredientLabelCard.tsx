"use client";

import { forwardRef } from "react";

export interface ResolvedLabel {
  id: string;
  name: string;
  detail: string;
  topPercent: number;
  side: "left" | "right";
}

const IngredientLabelCard = forwardRef<HTMLDivElement, { label: ResolvedLabel; reachPercent: number }>(
  function IngredientLabelCard({ label, reachPercent }, ref) {
    const isRight = label.side === "right";

    return (
      // dir="ltr" عمداً اینجاست: چون صفحه‌ی سایت RTL است، flex-direction:row
      // در حالت عادی از راست‌به‌چپ می‌چیند (برعکس چیزی که اینجا لازم داریم).
      //
      // چرا خط با flex:1 به‌جای عرض ثابت؟ چون با عرض ثابت (مثلاً ۱۱۰px)،
      // روی صفحه‌ی پهن دسکتاپ فاصله‌ی واقعی تا خودِ همبرگر خیلی بیشتر از
      // ۱۱۰px می‌شود و خط وسط هوا قطع می‌شود؛ با flex:1 داخل یک ظرف با
      // عرضِ نسبت‌به‌ویوپورت (reachPercent%)، خط همیشه دقیقاً تا لبه‌ی
      // همبرگر کشیده می‌شود، چه روی موبایل چه دسکتاپ.
      <div
        ref={ref}
        dir="ltr"
        className="absolute flex items-center"
        style={{
          top: `${label.topPercent}%`,
          [isRight ? "right" : "left"]: "2%",
          width: `${reachPercent}%`,
          opacity: 0,
          transform: "translateY(-50%)",
          flexDirection: isRight ? "row-reverse" : "row",
        }}
      >
        {/* کادر شیشه‌ای */}
        <div
          className="rounded-2xl px-4 py-3 sm:px-6 sm:py-4 backdrop-blur-md bg-white/10 border border-white/25 shadow-lg shrink-0"
          style={{ maxWidth: "min(78vw, 260px)" }}
          dir="rtl"
        >
          <p className="text-white font-extrabold text-sm sm:text-lg leading-tight">{label.name}</p>
          <p className="text-white/70 text-xs sm:text-sm mt-1 leading-tight">{label.detail}</p>
        </div>

        {/* خط کِشدار تا نزدیک خودِ ماده، با یک نقطه‌ی کوچک روی آن */}
        <div className="flex-1 h-[1.5px] bg-white/85 min-w-[10px]" />
        <span className="shrink-0 w-[9px] h-[9px] rounded-full border-[1.5px] border-white/95 relative">
          <span className="absolute inset-[2.5px] rounded-full bg-white/95" />
        </span>
      </div>
    );
  }
);

export default IngredientLabelCard;
