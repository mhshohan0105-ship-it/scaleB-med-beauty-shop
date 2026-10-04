import Link from "next/link";
import { cn } from "@/lib/utils";

/** Leaf-in-a-drop mark — mint for health, blush for beauty. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("h-8 w-8", className)}>
      <path
        d="M16 2.5c-4.6 6-10 11.6-10 17.4C6 25.5 10.5 30 16 30s10-4.5 10-10.1C26 14.1 20.6 8.5 16 2.5Z"
        fill="var(--color-mint-400)"
      />
      <path d="M16 27c-.4-4.9 1.7-9.5 6.3-12.6-.7 5.6-3.5 9.6-6.3 12.6Z" fill="var(--color-blush-300)" />
      <path
        d="M16 27c0-4.2.6-8.3 3.4-11.8"
        stroke="var(--color-navy-800)"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function Logo({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <Link
      href="/"
      aria-label="scaleB Med & Beauty Store, home"
      className={cn("group inline-flex items-center gap-2 rounded-lg", className)}
    >
      <LogoMark className="transition-transform duration-500 group-hover:-rotate-8" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-serif text-2xl font-semibold tracking-tight",
            tone === "dark" ? "text-navy-900" : "text-white",
          )}
        >
          scale<span className="text-mint-500">B</span>
        </span>
        <span
          className={cn(
            "mt-0.5 text-[0.62rem] font-semibold tracking-[0.2em] uppercase",
            tone === "dark" ? "text-navy-400" : "text-navy-200",
          )}
        >
          Med &amp; Beauty
        </span>
      </span>
    </Link>
  );
}
