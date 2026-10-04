"use client";

import { PRICE_MAX } from "@/data/products";
import { cn, formatPrice } from "@/lib/utils";

export type CategoryFilter = "all" | "medicine" | "beauty";

export interface Filters {
  category: CategoryFilter;
  minPrice: number;
  maxPrice: number;
  brands: string[];
}

export const defaultFilters: Filters = { category: "all", minPrice: 0, maxPrice: PRICE_MAX, brands: [] };

const categoryOptions: { value: CategoryFilter; label: string }[] = [
  { value: "all", label: "All products" },
  { value: "medicine", label: "Medicine" },
  { value: "beauty", label: "Beauty" },
];

export function ShopFilters({
  filters,
  onChange,
  availableBrands,
  onReset,
}: {
  filters: Filters;
  onChange: (next: Partial<Filters>) => void;
  availableBrands: string[];
  onReset: () => void;
}) {
  const step = 50;

  return (
    <div className="space-y-8">
      <fieldset>
        <legend className="mb-3 font-serif text-lg font-semibold">Category</legend>
        <div className="flex flex-wrap gap-2 lg:flex-col">
          {categoryOptions.map((o) => (
            <label
              key={o.value}
              className={cn(
                "flex min-h-11 cursor-pointer items-center gap-3 rounded-2xl px-4 py-2 font-medium ring-1 transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-mint-400",
                filters.category === o.value
                  ? "bg-navy-800 text-white ring-navy-800"
                  : "bg-paper text-navy-700 ring-navy-100 hover:bg-navy-50",
              )}
            >
              <input
                type="radio"
                name="category"
                value={o.value}
                checked={filters.category === o.value}
                onChange={() => onChange({ category: o.value, brands: [] })}
                className="sr-only"
              />
              {o.label}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 font-serif text-lg font-semibold">Price range</legend>
        <p className="mb-4 font-semibold text-navy-800" aria-live="polite">
          {formatPrice(filters.minPrice)} – {formatPrice(filters.maxPrice)}
        </p>
        <div className="space-y-4">
          <div>
            <label htmlFor="min-price" className="mb-1 block text-sm text-navy-500">
              Minimum price
            </label>
            <input
              id="min-price"
              type="range"
              min={0}
              max={PRICE_MAX}
              step={step}
              value={filters.minPrice}
              onChange={(e) => onChange({ minPrice: Math.min(Number(e.target.value), filters.maxPrice - step) })}
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="max-price" className="mb-1 block text-sm text-navy-500">
              Maximum price
            </label>
            <input
              id="max-price"
              type="range"
              min={0}
              max={PRICE_MAX}
              step={step}
              value={filters.maxPrice}
              onChange={(e) => onChange({ maxPrice: Math.max(Number(e.target.value), filters.minPrice + step) })}
              className="w-full"
            />
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 font-serif text-lg font-semibold">Brand</legend>
        <ul className="grid grid-cols-2 gap-1 lg:grid-cols-1">
          {availableBrands.map((brand) => {
            const checked = filters.brands.includes(brand);
            return (
              <li key={brand}>
                <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl px-2 text-navy-700 hover:bg-navy-50">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() =>
                      onChange({ brands: checked ? filters.brands.filter((b) => b !== brand) : [...filters.brands, brand] })
                    }
                    className="h-5 w-5 rounded"
                  />
                  {brand}
                </label>
              </li>
            );
          })}
        </ul>
      </fieldset>

      <button
        type="button"
        onClick={onReset}
        className="min-h-11 font-semibold text-navy-700 underline decoration-mint-400 decoration-2 underline-offset-4 hover:text-navy-900"
      >
        Clear all filters
      </button>
    </div>
  );
}
