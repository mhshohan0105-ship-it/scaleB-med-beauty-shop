import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/Logo";
import { Reveal } from "@/components/ui/Reveal";

const stats = [
  { value: "50k+", label: "Orders delivered" },
  { value: "100%", label: "Genuine guarantee" },
  { value: "12", label: "Licensed pharmacists" },
];

export function BrandPromise() {
  return (
    <section className="py-8 sm:py-12">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-navy-800 px-6 py-14 text-center text-white sm:px-12 lg:py-20">
            <div aria-hidden className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-mint-400/25 blur-3xl" />
            <div aria-hidden className="absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-blush-400/25 blur-3xl" />
            <div className="relative mx-auto max-w-3xl">
              <LogoMark className="mx-auto h-12 w-12" />
              <p className="eyebrow mt-5 text-mint-300">Our promise</p>
              <h2 className="mt-3 text-3xl font-semibold text-white sm:text-5xl">
                Real care, never compromised. Because wellness and beauty start with <em className="text-blush-300">trust</em>.
              </h2>
              <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
                {stats.map((s) => (
                  <div key={s.label} className="flex flex-col">
                    <dt className="order-2 text-sm text-navy-200">{s.label}</dt>
                    <dd className="font-serif text-3xl font-semibold text-white sm:text-4xl">{s.value}</dd>
                  </div>
                ))}
              </dl>
              <LinkButton href="/about" variant="secondary" size="lg" className="mt-10">
                Our story <ArrowRight aria-hidden className="h-5 w-5" />
              </LinkButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
