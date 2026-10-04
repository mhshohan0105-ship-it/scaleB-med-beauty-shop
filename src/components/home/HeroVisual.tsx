"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { useCan3D, useIdle, useInView } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { HeroFallback } from "./HeroFallback";

// The 3D bundle (three + r3f + drei) is only fetched in the browser, after first paint.
const HeroScene = dynamic(() => import("@/components/three/HeroScene"), { ssr: false });

export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const can3D = useCan3D();
  const idle = useIdle();
  const visible = useInView(ref, { rootMargin: "0px" });
  const [ready, setReady] = useState(false);

  return (
    <div ref={ref} className="relative mx-auto aspect-square w-full max-w-[560px]">
      {/* Decorative backdrop */}
      <div aria-hidden className="absolute inset-[8%] rounded-full bg-gradient-to-br from-mint-100 via-white to-blush-100" />
      <div aria-hidden className="absolute inset-[18%] rounded-full border border-white/80" />

      <HeroFallback
        className={cn("absolute inset-0 transition-opacity duration-700", ready ? "opacity-0" : "opacity-100")}
      />

      {can3D && idle && (
        <div className={cn("absolute inset-0 transition-opacity duration-700", ready ? "opacity-100" : "opacity-0")}>
          <HeroScene active={visible} onReady={() => setReady(true)} />
        </div>
      )}
    </div>
  );
}
