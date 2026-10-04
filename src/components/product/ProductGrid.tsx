"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";
import { ProductCard } from "./ProductCard";

export function ProductGrid({ products, className }: { products: Product[]; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <ul className={cn("grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4", className)}>
      <AnimatePresence initial={false} mode="popLayout">
        {products.map((p, i) => (
          <motion.li
            key={p.id}
            layout={!reduce}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: (i % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProductCard product={p} />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
