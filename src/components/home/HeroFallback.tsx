import { ProductArt } from "@/components/product/ProductArt";
import { cn } from "@/lib/utils";

/**
 * Static stand-in for the 3D hero: shown while the canvas loads,
 * and permanently on low-power devices or with reduced motion.
 */
export function HeroFallback({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none", className)} role="img" aria-label="A medicine bottle and a cosmetic jar from scaleB">
      <div className="absolute top-[12%] left-[10%] w-[52%] motion-safe:animate-float">
        <ProductArt
          background={false}
          product={{ id: "hero-bottle", name: "Medicine bottle", brand: "scaleB", category: "medicine", shape: "bottle", color: "#ffffff", accent: "#3ba57e" }}
        />
      </div>
      <div className="absolute right-[6%] bottom-[10%] w-[50%] motion-safe:animate-float [animation-delay:-3s]">
        <ProductArt
          background={false}
          product={{ id: "hero-jar", name: "Cosmetic jar", brand: "scaleB", category: "beauty", shape: "jar", color: "#f6cfd2", accent: "#e9d7b8" }}
        />
      </div>
    </div>
  );
}
