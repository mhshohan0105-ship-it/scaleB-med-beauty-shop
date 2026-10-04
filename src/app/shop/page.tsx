import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopView } from "@/components/shop/ShopView";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse genuine medicines, vitamins and premium skincare at scaleB.",
};

export default function ShopPage() {
  return (
    <>
      <PageHeader
        eyebrow="Shop"
        title="Everything for your health & glow"
        description="Filter by category, price or brand, or simply search for what you need."
      />
      <div className="pt-8">
        <Suspense fallback={<div className="container-page h-96" aria-busy="true" />}>
          <ShopView />
        </Suspense>
      </div>
    </>
  );
}
