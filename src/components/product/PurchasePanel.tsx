"use client";

import { useState } from "react";
import Link from "next/link";
import { FileText } from "lucide-react";
import type { Product } from "@/data/products";
import { AddToCartButton } from "./AddToCartButton";
import { QuantitySelector } from "./QuantitySelector";

export function PurchasePanel({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);

  return (
    <div className="space-y-4">
      {product.prescriptionRequired && (
        <p className="flex gap-3 rounded-2xl bg-blush-50 p-4 text-navy-700 ring-1 ring-blush-100">
          <FileText aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-blush-600" />
          <span>
            This medicine needs a valid prescription.{" "}
            <Link href="/prescription" className="font-semibold text-navy-900 underline underline-offset-4">
              Upload it here
            </Link>{" "}
            and our pharmacist will verify it before dispatch.
          </span>
        </p>
      )}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <QuantitySelector value={qty} onChange={setQty} />
        <AddToCartButton
          productId={product.id}
          productName={product.name}
          quantity={qty}
          size="lg"
          className="flex-1"
        />
      </div>
    </div>
  );
}
