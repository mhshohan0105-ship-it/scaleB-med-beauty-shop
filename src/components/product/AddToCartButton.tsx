"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function AddToCartButton({
  productId,
  productName,
  quantity = 1,
  size = "md",
  compact = false,
  className,
}: {
  productId: string;
  productName: string;
  quantity?: number;
  size?: "md" | "lg";
  compact?: boolean;
  className?: string;
}) {
  const addItem = useCart((s) => s.addItem);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const t = window.setTimeout(() => setAdded(false), 1600);
    return () => window.clearTimeout(t);
  }, [added]);

  return (
    <button
      type="button"
      onClick={() => {
        addItem(productId, quantity);
        setAdded(true);
      }}
      aria-label={compact ? `Add ${productName} to cart` : undefined}
      className={cn(
        buttonClasses(added ? "mint" : "primary", size),
        compact && "min-h-11 w-11 px-0 sm:w-auto sm:px-4",
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={added ? "added" : "add"}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.15 }}
          className="inline-flex items-center gap-2"
        >
          {added ? <Check aria-hidden className="h-5 w-5" /> : <ShoppingBag aria-hidden className="h-5 w-5" />}
          <span className={cn(compact && "sr-only sm:not-sr-only")}>{added ? "Added" : "Add to cart"}</span>
        </motion.span>
      </AnimatePresence>
      <span className="sr-only" aria-live="polite">
        {added ? `${productName} added to cart` : ""}
      </span>
    </button>
  );
}
