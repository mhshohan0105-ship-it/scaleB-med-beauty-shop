"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { products, brands as allBrands, PRICE_MAX } from "@/data/products";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/Button";
import { defaultFilters, ShopFilters, type CategoryFilter, type Filters } from "./ShopFilters";

type Sort = "featured" | "price-asc" | "price-desc" | "rating";

function parseCategory(value: string | null): CategoryFilter {
  return value === "medicine" || value === "beauty" ? value : "all";
}

export function ShopView() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const [query, setQuery] = useState(params.get("q") ?? "");
  const [filters, setFilters] = useState<Filters>({ ...defaultFilters, category: parseCategory(params.get("category")) });
  const [sort, setSort] = useState<Sort>("featured");
  const [panelOpen, setPanelOpen] = useState(false);

  // Follow external URL changes (header search, category links), but ignore
  // the URL updates this component wrote itself so typing is never overwritten.
  const lastWritten = useRef<string | null>(null);
  const paramString = params.toString();
  useEffect(() => {
    if (paramString === lastWritten.current) return;
    const urlCategory = parseCategory(params.get("category"));
    setQuery(params.get("q") ?? "");
    setFilters((f) => (f.category === urlCategory ? f : { ...f, category: urlCategory, brands: [] }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramString]);

  // Keep shareable state (search + category) in the URL
  useEffect(() => {
    const next = new URLSearchParams();
    if (query.trim()) next.set("q", query.trim());
    if (filters.category !== "all") next.set("category", filters.category);
    const qs = next.toString();
    if (qs === paramString) return;
    const id = window.setTimeout(() => {
      lastWritten.current = qs;
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    }, 250);
    return () => window.clearTimeout(id);
  }, [query, filters.category, pathname, router, paramString]);

  const availableBrands = useMemo(
    () =>
      filters.category === "all"
        ? allBrands
        : Array.from(new Set(products.filter((p) => p.category === filters.category).map((p) => p.brand))).sort(),
    [filters.category],
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = products.filter((p) => {
      if (filters.category !== "all" && p.category !== filters.category) return false;
      if (p.price < filters.minPrice || p.price > filters.maxPrice) return false;
      if (filters.brands.length && !filters.brands.includes(p.brand)) return false;
      if (q) {
        const haystack = `${p.name} ${p.brand} ${p.tag} ${p.shortDescription}`.toLowerCase();
        return q.split(/\s+/).every((word) => haystack.includes(word));
      }
      return true;
    });
    switch (sort) {
      case "price-asc":
        return [...list].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...list].sort((a, b) => b.price - a.price);
      case "rating":
        return [...list].sort((a, b) => b.rating - a.rating);
      default:
        return [...list].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    }
  }, [filters, query, sort]);

  const activeCount =
    (filters.category !== "all" ? 1 : 0) +
    (filters.minPrice > 0 || filters.maxPrice < PRICE_MAX ? 1 : 0) +
    filters.brands.length;

  const update = (next: Partial<Filters>) => setFilters((f) => ({ ...f, ...next }));
  const reset = () => {
    setFilters(defaultFilters);
    setQuery("");
  };

  const filterPanel = (
    <ShopFilters filters={filters} onChange={update} availableBrands={availableBrands} onReset={reset} />
  );

  return (
    <div className="container-page pb-20">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div role="search" className="relative flex-1">
          <label htmlFor="shop-search" className="sr-only">
            Search products
          </label>
          <Search aria-hidden className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-navy-300" />
          <input
            id="shop-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by product, brand or concern…"
            className="field h-13 rounded-full pl-12"
          />
        </div>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            className="h-13 flex-1 lg:hidden"
            aria-expanded={panelOpen}
            aria-controls="mobile-filters"
            onClick={() => setPanelOpen((v) => !v)}
          >
            <SlidersHorizontal aria-hidden className="h-5 w-5" /> Filters
            {activeCount > 0 && (
              <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-mint-500 px-1.5 text-xs text-white">
                {activeCount}
              </span>
            )}
          </Button>
          <label htmlFor="sort" className="sr-only">
            Sort products
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="field h-13 flex-1 cursor-pointer rounded-full pr-10 sm:w-56 sm:flex-none"
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-asc">Price: Low to high</option>
            <option value="price-desc">Price: High to low</option>
            <option value="rating">Top rated</option>
          </select>
        </div>
      </div>

      <AnimatePresence>
        {panelOpen && (
          <motion.div
            id="mobile-filters"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden lg:hidden"
          >
            <div className="card mt-4 p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Filters</h2>
                <button
                  type="button"
                  onClick={() => setPanelOpen(false)}
                  className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-navy-50"
                  aria-label="Close filters"
                >
                  <X aria-hidden className="h-5 w-5" />
                </button>
              </div>
              {filterPanel}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 grid gap-10 lg:grid-cols-[16rem_1fr]">
        <aside aria-label="Product filters" className="hidden lg:block">
          <div className="card sticky top-24 p-6">{filterPanel}</div>
        </aside>

        <div>
          <p className="mb-5 text-navy-500" aria-live="polite">
            Showing <strong className="text-navy-900">{results.length}</strong> of {products.length} products
            {query.trim() && (
              <>
                {" "}
                for “<strong className="text-navy-900">{query.trim()}</strong>”
              </>
            )}
          </p>

          {results.length > 0 ? (
            <ProductGrid products={results} className="lg:grid-cols-3" />
          ) : (
            <div className="card flex flex-col items-center px-6 py-16 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-blush-100 text-blush-600">
                <Search aria-hidden className="h-7 w-7" />
              </span>
              <h2 className="mt-5 text-2xl font-semibold">No products found</h2>
              <p className="mt-2 max-w-sm text-navy-500">Try a different search term or loosen your filters.</p>
              <Button className="mt-6" onClick={reset}>
                Reset filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
