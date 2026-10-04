import { ArrowRight } from "lucide-react";
import { getFeaturedProducts } from "@/data/products";
import { ProductGrid } from "@/components/product/ProductGrid";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FeaturedProducts() {
  return (
    <section className="section bg-paper">
      <div className="container-page">
        <Reveal className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow="Bestsellers"
            title="Featured products"
            description="Our customers’ favourites, from the medicine cabinet to the vanity."
            className="text-center sm:text-left"
          />
          <LinkButton href="/shop" variant="secondary" className="shrink-0">
            View all <ArrowRight aria-hidden className="h-4 w-4" />
          </LinkButton>
        </Reveal>
        <ProductGrid products={getFeaturedProducts()} className="mt-12" />
      </div>
    </section>
  );
}
