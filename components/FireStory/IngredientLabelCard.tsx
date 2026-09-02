"use client";

import { forwardRef } from "react";
import { IngredientLabel } from "@/lib/ingredientLabels";

const IngredientLabelCard = forwardRef<HTMLDivElement, { label: IngredientLabel }>(
  function IngredientLabelCard({ label }, ref) {
    const isRight = label.side === "right";

    return (
      <div
        ref={ref}
        className="absolute flex items-center gap-0"
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
        >
          <p className="text-white font-extrabold text-xs sm:text-sm leading-tight">{label.name}</p>
          <p className="text-white/70 text-[10px] sm:text-xs mt-0.5 leading-tight">{label.detail}</p>
        </div>

        {/* خط و فلش به‌سمت ماده‌ی مربوطه */}
        <svg
          width="46"
          height="16"
          viewBox="0 0 46 16"
          className="shrink-0"
          style={{ transform: isRight ? "scaleX(-1)" : undefined }}
        >
          <line x1="0" y1="8" x2="36" y2="8" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" />
          <path d="M36 2 L44 8 L36 14" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" />
        </svg>
      </div>
    );
  }
);

export default IngredientLabelCard;
