import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ChevronRight, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { getProductBySlug, getRelatedProducts, products } from "@/data/products";
import { ProductPreview } from "@/components/product/ProductPreview";
import { PurchasePanel } from "@/components/product/PurchasePanel";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stars } from "@/components/ui/Stars";
import { discountPercent, formatPrice } from "@/lib/utils";

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const product = getProductBySlug((await params).slug);
  if (!product) return {};
  return { title: product.name, description: product.shortDescription };
}

export default async function ProductPage({ params }: { params: Params }) {
  const product = getProductBySlug((await params).slug);
  if (!product) notFound();

  const off = discountPercent(product.price, product.mrp);
  const related = getRelatedProducts(product);
  const categoryLabel = product.category === "medicine" ? "Medicine" : "Beauty";

  return (
    <>
      <div className="container-page pt-6 sm:pt-10">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-navy-400">
            <li className="flex items-center gap-1">
              <Link href="/" className="hover:text-navy-800">
                Home
              </Link>
              <ChevronRight aria-hidden className="h-4 w-4" />
            </li>
            <li className="flex items-center gap-1">
              <Link href={`/shop?category=${product.category}`} className="hover:text-navy-800">
                {categoryLabel}
              </Link>
              <ChevronRight aria-hidden className="h-4 w-4" />
            </li>
            <li aria-current="page" className="font-medium text-navy-700">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <ProductPreview product={product} />
          </Reveal>

          <Reveal delay={0.1} className="lg:py-4">
            <p className="eyebrow">
              {product.brand} · <span className={product.category === "medicine" ? "" : "text-blush-600"}>{product.tag}</span>
            </p>
            <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">{product.name}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-navy-500">
              <Stars rating={product.rating} />
              <span>
                {product.rating} · {product.reviewCount.toLocaleString("en-BD")} reviews
              </span>
              <span aria-hidden>·</span>
              <span>{product.size}</span>
            </div>

            <p className="mt-6 flex flex-wrap items-baseline gap-3">
              <span className="font-serif text-4xl font-semibold text-navy-900">{formatPrice(product.price)}</span>
              {off > 0 && (
                <>
                  <span className="text-lg text-navy-400 line-through">
                    <span className="sr-only">MRP </span>
                    {formatPrice(product.mrp)}
                  </span>
                  <span className="rounded-full bg-mint-100 px-3 py-1 text-sm font-bold text-mint-700">Save {off}%</span>
                </>
              )}
            </p>
            <p className="mt-1 text-sm text-navy-400">Inclusive of all taxes</p>

            <p className="mt-6 text-lg text-navy-600">{product.description}</p>

            <ul className="mt-6 space-y-2">
              {product.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mint-100 text-mint-700">
                    <Check aria-hidden className="h-3.5 w-3.5" />
                  </span>
                  {h}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <PurchasePanel product={product} />
            </div>

            <ul className="mt-8 grid gap-3 border-t border-navy-100 pt-6 text-sm text-navy-600 sm:grid-cols-3">
              <li className="flex items-center gap-2">
                <ShieldCheck aria-hidden className="h-5 w-5 text-mint-600" /> 100% genuine
              </li>
              <li className="flex items-center gap-2">
                <Truck aria-hidden className="h-5 w-5 text-mint-600" /> Fast delivery
              </li>
              <li className="flex items-center gap-2">
                <RotateCcw aria-hidden className="h-5 w-5 text-mint-600" /> 7-day returns
              </li>
            </ul>

            <details className="card group mt-8 p-5 open:pb-6">
              <summary className="flex min-h-8 cursor-pointer list-none items-center justify-between font-semibold text-navy-900">
                How to use
                <ChevronRight aria-hidden className="h-5 w-5 transition group-open:rotate-90" />
              </summary>
              <p className="mt-3 text-navy-600">{product.usage}</p>
            </details>
          </Reveal>
        </div>
      </div>

      {related.length > 0 && (
        <section className="section">
          <div className="container-page">
            <SectionHeading align="left" eyebrow="You may also like" title="Related products" />
            <ProductGrid products={related} className="mt-10" />
          </div>
        </section>
      )}
    </>
  );
}
