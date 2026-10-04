import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { navLinks, site, telHref } from "@/data/site";
import { Logo } from "@/components/ui/Logo";
import { SocialIcons } from "@/components/ui/SocialIcons";

const shopLinks = [
  { href: "/shop?category=medicine", label: "Medicine" },
  { href: "/shop?category=beauty", label: "Beauty" },
  { href: "/prescription", label: "Upload Prescription" },
  { href: "/cart", label: "Your Cart" },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-navy-900 text-navy-100">
      <div className="container-page grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
        <div className="space-y-5">
          <Logo tone="light" />
          <p className="max-w-xs text-navy-200">{site.description}</p>
          <SocialIcons />
        </div>

        <nav aria-label="Quick links">
          <h2 className="mb-4 font-sans text-sm font-semibold tracking-widest text-white uppercase">Quick links</h2>
          <ul className="space-y-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-block py-1.5 text-navy-200 transition hover:text-mint-300">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Shop">
          <h2 className="mb-4 font-sans text-sm font-semibold tracking-widest text-white uppercase">Shop</h2>
          <ul className="space-y-1">
            {shopLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-block py-1.5 text-navy-200 transition hover:text-mint-300">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 font-sans text-sm font-semibold tracking-widest text-white uppercase">Contact</h2>
          <ul className="space-y-3 text-navy-200">
            <li className="flex gap-3">
              <MapPin aria-hidden className="mt-1 h-5 w-5 shrink-0 text-mint-300" />
              <address className="not-italic">
                {site.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </li>
            <li className="flex gap-3">
              <Phone aria-hidden className="mt-1 h-5 w-5 shrink-0 text-mint-300" />
              <a href={telHref(site.phone)} className="hover:text-mint-300">
                {site.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail aria-hidden className="mt-1 h-5 w-5 shrink-0 text-mint-300" />
              <a href={`mailto:${site.email}`} className="hover:text-mint-300">
                {site.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock aria-hidden className="mt-1 h-5 w-5 shrink-0 text-mint-300" />
              <span>{site.hours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-sm text-navy-300 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} scaleB Med &amp; Beauty Store. All rights reserved.</p>
          <p>Demo storefront · Always consult a doctor before taking medicines.</p>
        </div>
      </div>
    </footer>
  );
}
