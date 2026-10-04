import { RotateCcw, ShieldCheck, Stethoscope, Truck } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Genuine Products",
    text: "Sourced directly from brands and licensed distributors. Sealed, authentic and always within expiry.",
    tone: "bg-mint-100 text-mint-700",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    text: "Same-day delivery inside Dhaka and 1–3 days across Bangladesh, with careful, temperature-safe packaging.",
    tone: "bg-blush-100 text-blush-700",
  },
  {
    icon: Stethoscope,
    title: "Licensed Pharmacist",
    text: "Every prescription is reviewed by a registered pharmacist who’s happy to answer your questions.",
    tone: "bg-navy-50 text-navy-700",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    text: "Changed your mind on an unopened item? Return it within 7 days, no fuss.",
    tone: "bg-mint-100 text-mint-700",
  },
];

export function WhyChooseUs() {
  return (
    <section className="section">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Why scaleB"
            title="Care you can count on"
            description="Pharmacy-grade trust with a beauty-boutique experience."
          />
        </Reveal>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r, i) => (
            <Reveal as="li" key={r.title} delay={i * 0.08} className="h-full">
              <div className="card h-full p-7 transition duration-300 hover:-translate-y-1 hover:shadow-lift">
                <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${r.tone}`}>
                  <r.icon aria-hidden className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-xl font-semibold">{r.title}</h3>
                <p className="mt-2 text-navy-500">{r.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
