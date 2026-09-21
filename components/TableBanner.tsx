"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { clearTable, saveTable, TableInfo } from "@/lib/tableSession";

/** نوار «شما سرِ میز … هستید» بعد از اسکن QR میز. سرور اعتبارِ میز را قبلاً تأیید کرده است. */
export default function TableBanner({ table }: { table: TableInfo }) {
  const [active, setActive] = useState(true);

  useEffect(() => {
    saveTable(table);
  }, [table]);

  if (!active) return null;
  return (
    <div className="mb-8 rounded-2xl border border-[var(--color-ember)]/40 bg-[var(--color-ember)]/10 px-5 py-4 flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm leading-7">
        <span aria-hidden="true">🍽️ </span>
        شما سرِ <b>میز {table.code}</b>
        {table.title ? ` (${table.title})` : ""} هستید. سفارشتان همین‌جا سرو می‌شود؛ آیتم‌ها را به سبد اضافه کنید و پرداخت را انجام دهید.
      </p>
      <Link
        href="/menu"
        onClick={() => {
          clearTable();
          setActive(false);
        }}
        className="text-xs font-bold text-[var(--color-ash)] hover:text-[var(--color-ember-light)] underline"
      >
        این میز من نیست
      </Link>
    </div>
  );
}
