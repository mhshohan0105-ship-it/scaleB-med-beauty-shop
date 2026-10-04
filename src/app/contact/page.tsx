import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone, UserRound } from "lucide-react";
import { leadership, site, telHref } from "@/data/site";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the scaleB care team and our licensed pharmacists.",
};

const details = [
  { icon: Phone, label: "Call us", value: site.phone, href: telHref(site.phone) },
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
  { icon: MapPin, label: "Visit", value: site.address },
  { icon: Clock, label: "Hours", value: site.hours },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="We’re here to help"
        description="Questions about an order, a prescription or the right serum? Our team and pharmacists are a message away."
      />
      <div className="container-page grid gap-10 py-12 lg:grid-cols-[22rem_1fr] lg:items-start">
        <Reveal as="div" className="space-y-4">
          <ul className="space-y-4">
            {details.map((d) => (
              <li key={d.label} className="card flex gap-4 p-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-mint-100 text-mint-700">
                  <d.icon aria-hidden className="h-6 w-6" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-navy-400">{d.label}</span>
                  {d.href ? (
                    <a href={d.href} className="font-semibold text-navy-900 hover:text-mint-700">
                      {d.value}
                    </a>
                  ) : (
                    <span className="font-semibold text-navy-900">{d.value}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
          <div className="card bg-navy-800 p-6 text-navy-100 ring-0">
            <p className="flex items-center gap-2 text-sm font-semibold tracking-widest text-mint-300 uppercase">
              <UserRound aria-hidden className="h-4 w-4" /> Management
            </p>
            <p className="mt-3 font-serif text-xl font-semibold text-white">{leadership.name}</p>
            <p className="text-sm font-semibold tracking-wider text-navy-200 uppercase">{leadership.role}</p>
            <a href={telHref(leadership.phone)} className="mt-3 inline-flex items-center gap-2 font-semibold text-white hover:text-mint-300">
              <Phone aria-hidden className="h-4 w-4 text-mint-300" /> {leadership.phone}
            </a>
            <address className="mt-3 text-sm text-navy-200 not-italic">
              {site.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>
          {/* Stylised map placeholder (no third-party embed, keeps the page fast) */}
          <div
            role="img"
            aria-label={`Map showing our store at ${site.address}`}
            className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-mint-50 shadow-soft ring-1 ring-navy-900/5"
          >
            <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <rect width="400" height="300" fill="#effaf5" />
              <path d="M0 210 C120 180 160 260 400 200" stroke="#b4e7d2" strokeWidth="40" fill="none" />
              <path d="M60 0 L140 300 M0 90 L400 130 M260 0 L300 300" stroke="#fff" strokeWidth="14" fill="none" />
              <path d="M0 40 L400 60 M200 0 L180 300" stroke="#fff" strokeWidth="6" fill="none" />
            </svg>
            <span className="absolute top-[38%] left-[52%] flex -translate-x-1/2 -translate-y-full flex-col items-center">
              <span className="rounded-full bg-navy-800 px-3 py-1 text-xs font-bold text-white shadow-lift">scaleB</span>
              <MapPin aria-hidden className="h-8 w-8 fill-blush-400 text-navy-800" />
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </>
  );
}
