"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { navLinks, site, telHref } from "@/data/site";
import { useCartCount } from "@/lib/cart-store";
import { useHydrated } from "@/lib/hooks";
import { cn, formatPrice } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";

const iconBtn =
  "relative flex h-11 w-11 items-center justify-center rounded-full text-navy-800 transition hover:bg-navy-50";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchInput = useRef<HTMLInputElement>(null);
  const hydrated = useHydrated();
  const count = useCartCount();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close overlays on navigation
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (searchOpen) searchInput.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
    setSearchOpen(false);
  }

  return (
    <>
      <div className="bg-navy-800 px-4 py-2 text-center text-sm text-navy-50">
        Free delivery on orders over {formatPrice(site.freeShippingThreshold)} · 100% genuine products
      </div>

      <header
        className={cn(
          "sticky top-0 z-40 transition-all duration-300",
          scrolled || menuOpen ? "bg-cream/90 shadow-soft backdrop-blur-lg" : "bg-cream",
        )}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-full focus:bg-navy-800 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <div className="container-page flex h-18 items-center justify-between gap-4">
          <Logo />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-[0.95rem] font-medium transition",
                      isActive(link.href) ? "text-navy-900" : "text-navy-500 hover:text-navy-900",
                    )}
                  >
                    {isActive(link.href) && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-mint-100"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            <button
              type="button"
              className={iconBtn}
              aria-label="Search products"
              aria-expanded={searchOpen}
              aria-controls="site-search"
              onClick={() => setSearchOpen((v) => !v)}
            >
              {searchOpen ? <X aria-hidden className="h-5 w-5" /> : <Search aria-hidden className="h-5 w-5" />}
            </button>
            <Link href="/cart" className={iconBtn} aria-label={`Cart, ${hydrated ? count : 0} items`}>
              <ShoppingBag aria-hidden className="h-5 w-5" />
              <AnimatePresence>
                {hydrated && count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.4, opacity: 0 }}
                    className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-blush-500 px-1 text-[0.7rem] font-bold text-white"
                  >
                    {count > 99 ? "99+" : count}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
            <button
              type="button"
              className={cn(iconBtn, "lg:hidden")}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X aria-hidden className="h-6 w-6" /> : <Menu aria-hidden className="h-6 w-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {searchOpen && (
            <motion.div
              id="site-search"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden border-t border-navy-900/5"
            >
              <form role="search" onSubmit={submitSearch} className="container-page flex gap-2 py-4">
                <label htmlFor="header-search" className="sr-only">
                  Search medicines and beauty products
                </label>
                <div className="relative flex-1">
                  <Search aria-hidden className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-navy-300" />
                  <input
                    ref={searchInput}
                    id="header-search"
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search paracetamol, serum, sunscreen…"
                    className="field pl-12"
                  />
                </div>
                <button type="submit" className="rounded-2xl bg-navy-800 px-5 font-semibold text-white hover:bg-navy-700">
                  Search
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              id="mobile-menu"
              aria-label="Mobile"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-navy-900/5 bg-cream lg:hidden"
            >
              <ul className="container-page flex flex-col gap-1 py-6">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={isActive(link.href) ? "page" : undefined}
                      className={cn(
                        "block rounded-2xl px-4 py-4 font-serif text-2xl transition",
                        isActive(link.href) ? "bg-mint-100 text-navy-900" : "text-navy-700 hover:bg-navy-50",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li className="mt-4 px-4 text-navy-500">
                  Need help? Call <a className="font-semibold text-navy-800" href={telHref(site.phone)}>{site.phone}</a>
                </li>
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
