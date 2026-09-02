import Image from "next/image";
import { MenuItem } from "@/lib/types";
import AddToCartButton from "./AddToCartButton";

function formatPrice(n: number) {
  return n.toLocaleString("fa-IR");
}

export default function DishCard({ item }: { item: MenuItem }) {
  return (
    <div className="gorg-card rounded-2xl overflow-hidden flex flex-col">
      {item.image && (
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 90vw, 320px"
            className="object-cover"
          />
          {item.signature && (
            <span className="absolute top-3 right-3 tag-pill">پیشنهاد گرگ</span>
          )}
          {item.spicy && (
            <span className="absolute top-3 left-3 text-lg" title="تند" aria-label="تند">
              🌶️
            </span>
          )}
        </div>
      )}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-[15px] leading-6">{item.name}</h3>
        </div>
        <p className="text-xs text-[var(--color-ash)] leading-6 flex-1">{item.description}</p>
        <div className="flex items-center justify-between pt-1">
          <span className="font-extrabold text-sm">{formatPrice(item.price)} تومان</span>
          <AddToCartButton id={item.id} name={item.name} price={item.price} />
        </div>
      </div>
    </div>
  );
}
