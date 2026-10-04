import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "mint" | "blush";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-500";

const variants: Record<Variant, string> = {
  primary: "bg-navy-800 text-white shadow-soft hover:bg-navy-700 hover:shadow-lift",
  secondary: "bg-paper text-navy-800 ring-1 ring-navy-100 hover:ring-navy-300 hover:bg-navy-50",
  ghost: "text-navy-800 hover:bg-navy-50",
  mint: "bg-mint-100 text-mint-700 hover:bg-mint-200",
  blush: "bg-blush-100 text-blush-700 hover:bg-blush-200",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-5 py-2.5 text-[0.95rem]",
  lg: "min-h-13 px-7 py-3.5 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size };

export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, size, className)} {...props} />;
}

type LinkButtonProps = React.ComponentProps<typeof Link> & { variant?: Variant; size?: Size };

export function LinkButton({ variant, size, className, ...props }: LinkButtonProps) {
  return <Link className={buttonClasses(variant, size, className)} {...props} />;
}
