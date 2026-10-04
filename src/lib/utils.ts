import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Bangladeshi Taka, e.g. ৳1,250 (South Asian digit grouping, no decimals). */
export function formatPrice(value: number) {
  return `৳${Math.round(value).toLocaleString("en-IN")}`;
}

export function discountPercent(price: number, mrp: number) {
  if (mrp <= price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}
