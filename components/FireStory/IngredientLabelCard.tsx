"use client";

import { forwardRef } from "react";
import { IngredientLabel } from "@/lib/ingredientLabels";

const IngredientLabelCard = forwardRef<HTMLDivElement, { label: IngredientLabel }>(
  function IngredientLabelCard({ label }, ref) {
    const isRight = label.side === "right";

    return (
      // dir="ltr" عمداً اینجاست: چون صفحه‌ی سایت RTL است، flex-direction:row
      // در حالت عادی از راست‌به‌چپ می‌چیند (برعکس چیزی که اینجا لازم داریم)،
      // پس این کارت را از جهت کلی صفحه ایزوله می‌کنیم تا چیدمان چپ‌به‌راست
      // همیشه قابل‌پیش‌بینی باشد و فلش‌ها دقیقاً به‌سمت ماده‌ی غذایی اشاره کنند.
      <div
        ref={ref}
        dir="ltr"
        className="absolute flex items-center"
        style={{
          top: `${label.topPercent}%`,
          [isRight ? "right" : "left"]: "2%",
          opacity: 0,
          transform: "translateY(-50%)",
          flexDirection: isRight ? "row-reverse" : "row",
        }}
      >
        {/* کادر شیشه‌ای، بزرگ‌تر و خواناتر */}
        <div
          className="rounded-2xl px-4 py-3 sm:px-6 sm:py-4 backdrop-blur-md bg-white/10 border border-white/25 shadow-lg"
          style={{ minWidth: "max-content" }}
          dir="rtl"
        >
          <p className="text-white font-extrabold text-sm sm:text-lg leading-tight">{label.name}</p>
          <p className="text-white/70 text-xs sm:text-sm mt-1 leading-tight">{label.detail}</p>
        </div>

        {/* خط بلندتر با یک نقطه‌ی کوچک روی ماده‌ی غذایی */}
        <svg
          width="110"
          height="16"
          viewBox="0 0 110 16"
          className="shrink-0"
          style={{ transform: isRight ? "scaleX(-1)" : undefined }}
        >
          <line x1="0" y1="8" x2="100" y2="8" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" />
          <circle cx="104" cy="8" r="3.5" fill="none" stroke="rgba(255,255,255,0.95)" strokeWidth="1.5" />
          <circle cx="104" cy="8" r="1.3" fill="rgba(255,255,255,0.95)" />
        </svg>
      </div>
    );
  }
);

export default IngredientLabelCard;
