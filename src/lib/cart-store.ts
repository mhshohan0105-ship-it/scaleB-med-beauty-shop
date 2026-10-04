"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { products, type Product } from "@/data/products";

export interface CartLine {
  id: string;
  quantity: number;
}

interface CartState {
  lines: CartLine[];
  addItem: (id: string, quantity?: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
}

export const MAX_QTY = 10;

const clamp = (n: number) => Math.max(1, Math.min(MAX_QTY, Math.floor(n)));

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      addItem: (id, quantity = 1) =>
        set((state) => {
          const existing = state.lines.find((l) => l.id === id);
          if (existing) {
            return {
              lines: state.lines.map((l) => (l.id === id ? { ...l, quantity: clamp(l.quantity + quantity) } : l)),
            };
          }
          return { lines: [...state.lines, { id, quantity: clamp(quantity) }] };
        }),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          lines: state.lines.map((l) => (l.id === id ? { ...l, quantity: clamp(quantity) } : l)),
        })),
      removeItem: (id) => set((state) => ({ lines: state.lines.filter((l) => l.id !== id) })),
      clear: () => set({ lines: [] }),
    }),
    {
      name: "scaleb-cart",
      storage: createJSONStorage(() => localStorage),
      // Wait for useHydrated() before reading so server and client markup match
      skipHydration: true,
    },
  ),
);

/** Cart lines joined with product data (unknown ids are dropped). */
export function useCartItems(): { product: Product; quantity: number }[] {
  const lines = useCart((s) => s.lines);
  return lines.flatMap((l) => {
    const product = products.find((p) => p.id === l.id);
    return product ? [{ product, quantity: l.quantity }] : [];
  });
}

export function useCartCount() {
  return useCart((s) => s.lines.reduce((sum, l) => sum + l.quantity, 0));
}
