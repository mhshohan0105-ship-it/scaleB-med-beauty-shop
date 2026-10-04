"use client";

import { useEffect, useState } from "react";
import { useCart } from "./cart-store";

/** True once the persisted cart has been rehydrated from localStorage on the client. */
export function useHydrated() {
  // `persist` only exists in the browser (no storage on the server), so read it in effects only.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    const unsub = useCart.persist.onFinishHydration(() => setHydrated(true));
    if (!useCart.persist.hasHydrated()) {
      void useCart.persist.rehydrate();
    } else {
      setHydrated(true);
    }
    return unsub;
  }, []);
  return hydrated;
}

/**
 * Decides whether the device can comfortably render WebGL.
 * Falls back to a static illustration for reduced-motion users,
 * low-memory / low-core devices, data-saver mode, or missing WebGL.
 */
export function useCan3D() {
  const [can3D, setCan3D] = useState<boolean | null>(null);
  useEffect(() => {
    setCan3D(detect3DSupport());
  }, []);
  return can3D;
}

function detect3DSupport() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;

  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean; effectiveType?: string };
  };
  if (nav.connection?.saveData) return false;
  if (nav.connection?.effectiveType && /(^|-)2g$/.test(nav.connection.effectiveType)) return false;
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory < 4) return false;
  if (typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency < 4) return false;

  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    return !!gl;
  } catch {
    return false;
  }
}

/** Tracks whether the referenced element is near the viewport. */
export function useInView<T extends Element>(
  ref: React.RefObject<T | null>,
  { rootMargin = "200px", once = false }: { rootMargin?: string; once?: boolean } = {},
) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (once && entry.isIntersecting) io.disconnect();
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin, once]);
  return inView;
}

/** True once the browser is idle (or after `timeout` ms), so heavy work doesn't compete with first paint. */
export function useIdle(timeout = 1200) {
  const [idle, setIdle] = useState(false);
  useEffect(() => {
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setIdle(true), { timeout });
      return () => w.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(() => setIdle(true), 300);
    return () => window.clearTimeout(id);
  }, [timeout]);
  return idle;
}
