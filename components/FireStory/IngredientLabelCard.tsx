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
          [isRight ? "right" : "left"]: "3%",
          opacity: 0,
          transform: "translateY(-50%)",
          flexDirection: isRight ? "row-reverse" : "row",
        }}
      >
        {/* کادر شیشه‌ای */}
        <div
          className="rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 backdrop-blur-md bg-white/10 border border-white/25 shadow-lg"
          style={{ minWidth: "max-content" }}
          dir="rtl"
        >
          <p className="text-white font-extrabold text-xs sm:text-sm leading-tight">{label.name}</p>
          <p className="text-white/70 text-[10px] sm:text-xs mt-0.5 leading-tight">{label.detail}</p>
        </div>

        {/* خط نازک با یک نقطه‌ی کوچک روی ماده‌ی غذایی، به‌جای فلش شِوران قبلی */}
        <svg
          width="52"
          height="14"
          viewBox="0 0 52 14"
          className="shrink-0"
          style={{ transform: isRight ? "scaleX(-1)" : undefined }}
        >
          <line x1="0" y1="7" x2="44" y2="7" stroke="rgba(255,255,255,0.8)" strokeWidth="1.25" />
          <circle cx="47" cy="7" r="3" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.25" />
          <circle cx="47" cy="7" r="1.1" fill="rgba(255,255,255,0.9)" />
        </svg>
      </div>
    );
  }
);

export default IngredientLabelCard;
