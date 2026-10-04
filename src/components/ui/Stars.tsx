import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Stars({ rating, className, size = 16 }: { rating: number; className?: string; size?: number }) {
  return (
    <span
      className={cn("inline-flex items-center gap-0.5", className)}
      role="img"
      aria-label={`Rated ${rating} out of 5`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden
          width={size}
          height={size}
          className={i < Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-navy-100 text-navy-100"}
        />
      ))}
    </span>
  );
}
