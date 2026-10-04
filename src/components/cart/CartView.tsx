"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CircleCheck, FileText, Lock, ShoppingBag, Trash2 } from "lucide-react";
import { site } from "@/data/site";
import { useCart, useCartItems } from "@/lib/cart-store";
import { useHydrated } from "@/lib/hooks";
import { formatPrice } from "@/lib/utils";
import { ProductArt } from "@/components/product/ProductArt";
import { QuantitySelector } from "@/components/product/QuantitySelector";
import { Button, LinkButton } from "@/components/ui/Button";

/** Demo promo code (UI only). */
const PROMO = { code: "GLOW10", percent: 10 };

export function CartView() {
  const hydrated = useHydrated();
  const items = useCartItems();
  const updateQuantity = useCart((s) => s.updateQuantity);
  const removeItem = useCart((s) => s.removeItem);
  const clear = useCart((s) => s.clear);

  const [promoInput, setPromoInput] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [placed, setPlaced] = useState(false);

  if (!hydrated) {
    return <div className="container-page h-96" aria-busy="true" />;
  }

  if (placed) {
    return (
      <div className="container-page pb-20">
        <div className="card mx-auto flex max-w-xl flex-col items-center px-6 py-16 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-mint-100 text-mint-600">
            <CircleCheck aria-hidden className="h-8 w-8" />
          </span>
          <h2 className="mt-5 text-3xl font-semibold">Thank you!</h2>
          <p className="mt-2 text-navy-500">
            This is a demo storefront, so no order was placed and no payment was taken.
          </p>
          <LinkButton href="/shop" className="mt-8">
            Continue shopping
          </LinkButton>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-page pb-20">
        <div className="card mx-auto flex max-w-xl flex-col items-center px-6 py-16 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-blush-100 text-blush-600">
            <ShoppingBag aria-hidden className="h-8 w-8" />
          </span>
          <h2 className="mt-5 text-3xl font-semibold">Your cart is empty</h2>
          <p className="mt-2 text-navy-500">Discover genuine medicines and skincare you’ll love.</p>
          <LinkButton href="/shop" size="lg" className="mt-8">
            Start shopping <ArrowRight aria-hidden className="h-5 w-5" />
          </LinkButton>
        </div>
      </div>
    );
  }

  const itemCount = items.reduce((n, i) => n + i.quantity, 0);
  const subtotal = items.reduce((sum, { product, quantity }) => sum + product.price * quantity, 0);
  const mrpTotal = items.reduce((sum, { product, quantity }) => sum + product.mrp * quantity, 0);
  const savings = mrpTotal - subtotal;
  const promoDiscount = promoApplied ? Math.round((subtotal * PROMO.percent) / 100) : 0;
  const shipping = subtotal >= site.freeShippingThreshold ? 0 : site.shippingFee;
  const total = subtotal - promoDiscount + shipping;
  const needsRx = items.some(({ product }) => product.prescriptionRequired);
  const toFreeShipping = site.freeShippingThreshold - subtotal;

  function applyPromo(e: React.FormEvent) {
    e.preventDefault();
    if (promoInput.trim().toUpperCase() === PROMO.code) {
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoError("That code isn’t valid.");
    }
  }

  return (
    <div className="container-page grid gap-8 pb-20 lg:grid-cols-[1fr_24rem] lg:items-start">
      <section aria-labelledby="cart-items-heading">
        <div className="mb-4 flex items-center justify-between">
          <h2 id="cart-items-heading" className="font-sans text-lg font-semibold">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </h2>
          <button type="button" onClick={clear} className="min-h-11 text-sm font-semibold text-navy-500 hover:text-blush-600">
            Clear cart
          </button>
        </div>

        <ul className="space-y-4">
          <AnimatePresence initial={false}>
            {items.map(({ product, quantity }) => (
              <motion.li
                key={product.id}
                layout
                exit={{ opacity: 0, x: -40, transition: { duration: 0.2 } }}
                className="card flex gap-4 p-4 sm:gap-6 sm:p-5"
              >
                <Link
                  href={`/product/${product.slug}`}
                  className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl sm:h-28 sm:w-28"
                  tabIndex={-1}
                  aria-hidden
                >
                  <ProductArt product={product} />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold tracking-wider text-navy-400 uppercase">{product.brand}</p>
                    <h3 className="font-sans text-base font-semibold">
                      <Link href={`/product/${product.slug}`} className="hover:text-mint-700">
                        {product.name}
                      </Link>
                    </h3>
                    <p className="text-sm text-navy-500">
                      {product.size} · {formatPrice(product.price)} each
                    </p>
                    {product.prescriptionRequired && (
                      <p className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-blush-600">
                        <FileText aria-hidden className="h-3.5 w-3.5" /> Prescription required
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-4 sm:justify-end">
                    <QuantitySelector
                      size="sm"
                      label={`Quantity of ${product.name}`}
                      value={quantity}
                      onChange={(q) => updateQuantity(product.id, q)}
                    />
                    <p className="w-20 text-right font-bold">{formatPrice(product.price * quantity)}</p>
                    <button
                      type="button"
                      onClick={() => removeItem(product.id)}
                      aria-label={`Remove ${product.name} from cart`}
                      className="flex h-11 w-11 items-center justify-center rounded-full text-navy-400 transition hover:bg-blush-50 hover:text-blush-600"
                    >
                      <Trash2 aria-hidden className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </section>

      <aside aria-labelledby="summary-heading" className="card space-y-5 p-6 lg:sticky lg:top-24">
        <h2 id="summary-heading" className="text-2xl font-semibold">
          Order summary
        </h2>

        {toFreeShipping > 0 && (
          <div className="rounded-2xl bg-mint-50 p-4 text-sm text-mint-700">
            Add <strong>{formatPrice(toFreeShipping)}</strong> more for free delivery.
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-mint-100" aria-hidden>
              <div
                className="h-full rounded-full bg-mint-500 transition-all"
                style={{ width: `${Math.min(100, (subtotal / site.freeShippingThreshold) * 100)}%` }}
              />
            </div>
          </div>
        )}

        <dl className="space-y-3 text-navy-600">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd className="font-semibold text-navy-900">{formatPrice(subtotal)}</dd>
          </div>
          {savings > 0 && (
            <div className="flex justify-between text-mint-700">
              <dt>You save on MRP</dt>
              <dd>−{formatPrice(savings)}</dd>
            </div>
          )}
          {promoApplied && (
            <div className="flex justify-between text-mint-700">
              <dt>Promo ({PROMO.code})</dt>
              <dd>−{formatPrice(promoDiscount)}</dd>
            </div>
          )}
          <div className="flex justify-between">
            <dt>Delivery</dt>
            <dd className="font-semibold text-navy-900">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
          </div>
          <div className="flex justify-between border-t border-navy-100 pt-3 text-lg">
            <dt className="font-semibold text-navy-900">Total</dt>
            <dd className="font-serif text-2xl font-semibold text-navy-900">{formatPrice(total)}</dd>
          </div>
        </dl>

        {!promoApplied && (
          <form onSubmit={applyPromo} className="space-y-1">
            <label htmlFor="promo" className="label">
              Promo code
            </label>
            <div className="flex gap-2">
              <input
                id="promo"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                placeholder={`Try ${PROMO.code}`}
                className="field"
                aria-invalid={!!promoError}
                aria-describedby={promoError ? "promo-error" : undefined}
              />
              <Button type="submit" variant="secondary">
                Apply
              </Button>
            </div>
            {promoError && (
              <p id="promo-error" role="alert" className="text-sm text-blush-600">
                {promoError}
              </p>
            )}
          </form>
        )}

        {needsRx && (
          <p className="flex gap-2 rounded-2xl bg-blush-50 p-4 text-sm text-navy-700">
            <FileText aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-blush-600" />
            <span>
              Your cart has prescription medicines.{" "}
              <Link href="/prescription" className="font-semibold underline underline-offset-4">
                Upload prescription
              </Link>
            </span>
          </p>
        )}

        <Button size="lg" className="w-full" onClick={() => setPlaced(true)}>
          <Lock aria-hidden className="h-4 w-4" /> Proceed to checkout
        </Button>
        <p className="text-center text-xs text-navy-400">Demo store: checkout is not connected to payments.</p>
      </aside>
    </div>
  );
}
