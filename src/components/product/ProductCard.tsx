import Link from "next/link";
import { FileText } from "lucide-react";
import type { Product } from "@/data/products";
import { discountPercent, formatPrice } from "@/lib/utils";
import { Stars } from "@/components/ui/Stars";
import { AddToCartButton } from "./AddToCartButton";
import { ProductArt } from "./ProductArt";

export function ProductCard({ product }: { product: Product }) {
  const off = discountPercent(product.price, product.mrp);

  return (
    <article className="card group relative flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      <Link href={`/product/${product.slug}`} className="flex flex-1 flex-col rounded-[inherit]">
        <div className="relative aspect-square overflow-hidden">
          <ProductArt product={product} className="transition duration-500 group-hover:scale-105" />
          <div className="absolute top-3 left-3 flex flex-col items-start gap-1.5">
            {off > 0 && (
              <span className="rounded-full bg-navy-800 px-2.5 py-1 text-xs font-bold text-white">{off}% off</span>
            )}
            {product.isNew && (
              <span className="rounded-full bg-blush-500 px-2.5 py-1 text-xs font-bold text-white">New</span>
            )}
          </div>
          {product.prescriptionRequired && (
            <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-navy-800 ring-1 ring-navy-100">
              <FileText aria-hidden className="h-3.5 w-3.5" /> Rx
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-1.5 p-4 sm:p-5">
          <p className="text-xs font-semibold tracking-wider text-navy-400 uppercase">
            {product.brand} · <span className={product.category === "medicine" ? "text-mint-600" : "text-blush-600"}>{product.tag}</span>
          </p>
          <h3 className="font-sans text-base leading-snug font-semibold text-navy-900 sm:text-[1.05rem]">{product.name}</h3>
          <div className="flex items-center gap-2 text-sm text-navy-500">
            <Stars rating={product.rating} size={14} />
            <span aria-hidden>
              {product.rating} ({product.reviewCount.toLocaleString("en-BD")})
            </span>
            <span className="sr-only">{product.reviewCount.toLocaleString("en-BD")} reviews</span>
          </div>
        </div>
      </Link>

      <div className="flex items-center justify-between gap-3 px-4 pb-4 sm:px-5 sm:pb-5">
        <p className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-navy-900">{formatPrice(product.price)}</span>
          {off > 0 && (
            <span className="text-sm text-navy-400 line-through">
              <span className="sr-only">was </span>
              {formatPrice(product.mrp)}
            </span>
          )}
        </p>
        <AddToCartButton productId={product.id} productName={product.name} compact />
      </div>
    </article>
  );
}
