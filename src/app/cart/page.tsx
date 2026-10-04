import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = { title: "Your Cart" };

export default function CartPage() {
  return (
    <>
      <PageHeader eyebrow="Cart" title="Your cart" />
      <div className="pt-8">
        <CartView />
      </div>
    </>
  );
}
