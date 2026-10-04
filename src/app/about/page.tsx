import type { Metadata } from "next";
import { ArrowRight, HeartPulse, Leaf, ShieldCheck, Sparkles, Stethoscope, type LucideIcon } from "lucide-react";
import { leadership, telHref } from "@/data/site";
import { LinkButton } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/Logo";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "About",
  description: "The story behind scaleB Med & Beauty Store: a pharmacy you can trust with a beauty boutique’s care.",
};

const values = [
  { icon: ShieldCheck, title: "Trust first", text: "Every product is sourced from authorised distributors and checked before it ships." },
  { icon: HeartPulse, title: "Health, made simple", text: "Clear information, honest prices and pharmacists who actually pick up the phone." },
  { icon: Sparkles, title: "Beauty with care", text: "A curated edit of skincare that is effective, gentle and dermatologist-approved." },
  { icon: Leaf, title: "Mindful packaging", text: "Recyclable boxes and plastic-free fillers, because healthy people need a healthy planet." },
];

const team: {
  name: string;
  role: string;
  text: string;
  initials?: string;
  icon?: LucideIcon;
  phone?: string;
}[] = [
  {
    name: leadership.name,
    role: leadership.role,
    text: "Leads operations, sourcing and delivery across Bangladesh.",
    initials: "MR",
    phone: leadership.phone,
  },
  {
    name: "Our Pharmacists",
    role: "Registered Pharmacists",
    text: "Review every prescription and answer your medicine questions.",
    icon: Stethoscope,
  },
  {
    name: "Skincare Experts",
    role: "Consulting Dermatologists",
    text: "Help curate a beauty shelf that is effective and gentle.",
    icon: Sparkles,
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="Pharmacy trust. Boutique care."
        description="scaleB was founded on a simple idea: looking after your health and your skin should feel calm, honest and a little bit lovely."
      />

      <section className="section">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[2rem] bg-gradient-to-br from-mint-100 via-white to-blush-100 shadow-soft">
              <LogoMark className="h-40 w-40 drop-shadow-xl motion-safe:animate-float" />
              <span className="absolute bottom-6 left-6 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-navy-800 shadow-soft">
                Since 2019 · Banani, Dhaka
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading align="left" eyebrow="Our story" title="Where wellness meets glow" />
            <div className="mt-6 space-y-4 text-lg text-navy-600">
              <p>
                We started as a small neighbourhood pharmacy, and noticed our customers picking up vitamins in one shop and
                skincare in another, never quite sure what was genuine online.
              </p>
              <p>
                So we built scaleB: one trusted place for medicines and beauty, with licensed pharmacists behind every
                order and a dermatologist helping curate our skincare shelf.
              </p>
            </div>
            <LinkButton href="/shop" size="lg" className="mt-8">
              Explore the store <ArrowRight aria-hidden className="h-5 w-5" />
            </LinkButton>
          </Reveal>
        </div>
      </section>

      <section className="section bg-paper">
        <div className="container-page">
          <Reveal>
            <SectionHeading eyebrow="What we stand for" title="Our values" />
          </Reveal>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={i * 0.08} className="card p-7">
                <v.icon aria-hidden className="h-8 w-8 text-mint-600" />
                <h3 className="mt-4 text-xl font-semibold">{v.title}</h3>
                <p className="mt-2 text-navy-500">{v.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <Reveal>
            <SectionHeading eyebrow="The people" title="Meet the team" description="Real professionals, real care." />
          </Reveal>
          <ul className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-3">
            {team.map((t, i) => (
              <Reveal as="li" key={t.name} delay={i * 0.08} className="card p-7 text-center">
                <span
                  aria-hidden
                  className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-mint-200 to-blush-200 font-serif text-2xl font-semibold text-navy-800"
                >
                  {t.icon ? <t.icon className="h-9 w-9" /> : t.initials}
                </span>
                <h3 className="mt-4 text-xl font-semibold">{t.name}</h3>
                <p className="mt-1 text-sm font-semibold tracking-wider text-mint-700 uppercase">{t.role}</p>
                <p className="mt-2 text-navy-500">{t.text}</p>
                {t.phone && (
                  <a href={telHref(t.phone)} className="mt-3 inline-block font-semibold text-navy-800 hover:text-mint-700">
                    {t.phone}
                  </a>
                )}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
