"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function AddToCartButton({
  id,
  name,
  price,
  className = "",
}: {
  id: string;
  name: string;
  price: number;
  className?: string;
}) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleClick = () => {
    addItem({ id, name, price });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-1.5 text-xs font-bold rounded-full px-4 py-2 transition-colors ${
        justAdded
          ? "bg-[var(--color-ember)] text-white"
          : "bg-white/8 text-[var(--color-bone)] hover:bg-[var(--color-ember)] hover:text-white"
      } ${className}`}
    >
      {justAdded ? "افزوده شد ✓" : "افزودن به سبد"}
    </button>
  );
}
