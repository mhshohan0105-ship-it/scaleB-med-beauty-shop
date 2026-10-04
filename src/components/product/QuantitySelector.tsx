"use client";

import { Minus, Plus } from "lucide-react";
import { MAX_QTY } from "@/lib/cart-store";
import { cn } from "@/lib/utils";

export function QuantitySelector({
  value,
  onChange,
  label = "Quantity",
  size = "md",
}: {
  value: number;
  onChange: (value: number) => void;
  label?: string;
  size?: "sm" | "md";
}) {
  const btn = cn(
    "flex items-center justify-center rounded-full text-navy-800 transition hover:bg-navy-50 disabled:opacity-35 disabled:hover:bg-transparent",
    size === "md" ? "h-11 w-11" : "h-9 w-9",
  );
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex items-center gap-1 rounded-full bg-paper p-1 ring-1 ring-navy-100"
    >
      <button type="button" className={btn} onClick={() => onChange(value - 1)} disabled={value <= 1} aria-label="Decrease quantity">
        <Minus aria-hidden className="h-4 w-4" />
      </button>
      <output aria-live="polite" className={cn("text-center font-semibold tabular-nums", size === "md" ? "w-8 text-lg" : "w-6")}>
        {value}
      </output>
      <button
        type="button"
        className={btn}
        onClick={() => onChange(value + 1)}
        disabled={value >= MAX_QTY}
        aria-label="Increase quantity"
      >
        <Plus aria-hidden className="h-4 w-4" />
      </button>
    </div>
  );
}
