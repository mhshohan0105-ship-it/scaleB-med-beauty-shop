"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { Box, Image as ImageIcon, Rotate3d } from "lucide-react";
import type { Product } from "@/data/products";
import { useCan3D, useInView } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { ProductArt } from "./ProductArt";

const ProductScene = dynamic(() => import("@/components/three/ProductScene"), { ssr: false });

/** Product image with an optional, lazily loaded 3D view the shopper can rotate. */
export function ProductPreview({ product }: { product: Product }) {
  const ref = useRef<HTMLDivElement>(null);
  const can3D = useCan3D();
  const near = useInView(ref, { once: true });
  const [mode, setMode] = useState<"3d" | "image">("3d");
  const [ready, setReady] = useState(false);
  const show3D = can3D && near && mode === "3d";

  const tint = product.category === "medicine" ? "from-mint-50 to-mint-100" : "from-blush-50 to-blush-100";

  return (
    <div className="space-y-3">
      <div ref={ref} className={cn("card relative aspect-square overflow-hidden bg-gradient-to-br", tint)}>
        <ProductArt
          product={product}
          className={cn("absolute inset-0 transition-opacity duration-500", show3D && ready ? "opacity-0" : "opacity-100")}
        />
        {show3D && (
          <div
            className={cn(
              "absolute inset-0 cursor-grab bg-gradient-to-br transition-opacity duration-500 active:cursor-grabbing",
              tint,
              ready ? "opacity-100" : "opacity-0",
            )}
          >
            <ProductScene
              shape={product.shape}
              color={product.color}
              accent={product.accent}
              brand={product.brand}
              onReady={() => setReady(true)}
            />
          </div>
        )}
        {show3D && ready && (
          <p className="pointer-events-none absolute bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-white/85 px-3 py-1.5 text-sm font-medium text-navy-700 shadow-soft backdrop-blur">
            <Rotate3d aria-hidden className="h-4 w-4" /> Drag to rotate
          </p>
        )}
      </div>

      {can3D && (
        <div role="group" aria-label="Preview mode" className="flex justify-center gap-2">
          {(
            [
              { id: "3d", label: "3D view", icon: Box },
              { id: "image", label: "Image", icon: ImageIcon },
            ] as const
          ).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              aria-pressed={mode === id}
              onClick={() => {
                if (id !== mode) setReady(false);
                setMode(id);
              }}
              className={cn(
                "inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold transition",
                mode === id ? "bg-navy-800 text-white" : "bg-paper text-navy-700 ring-1 ring-navy-100 hover:bg-navy-50",
              )}
            >
              <Icon aria-hidden className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
