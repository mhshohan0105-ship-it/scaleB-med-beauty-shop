import Link from "next/link";
import { ArrowRight, Pill, Sparkles } from "lucide-react";
import { products } from "@/data/products";
import { ProductArt } from "@/components/product/ProductArt";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";

const categories = [
  {
    key: "medicine" as const,
    title: "Medicine",
    text: "Everyday essentials, vitamins and prescription medicines, verified by licensed pharmacists.",
    icon: Pill,
    bg: "from-mint-100 via-mint-50 to-white",
    chip: "bg-mint-200/70 text-mint-700",
    art: ["m3", "m7"],
  },
  {
    key: "beauty" as const,
    title: "Beauty",
    text: "Dermatologist-loved skincare, serums and self-care rituals for your everyday glow.",
    icon: Sparkles,
    bg: "from-blush-100 via-blush-50 to-white",
    chip: "bg-blush-200/70 text-blush-700",
    art: ["b1", "b4"],
  },
];

export function CategoryCards() {
  return (
    <section className="section pt-4">
      <div className="container-page">
        <Reveal>
          <SectionHeading eyebrow="Shop by category" title="Care for body & skin" />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 md:gap-8">
          {categories.map((c, i) => {
            const count = products.filter((p) => p.category === c.key).length;
            const [a, b] = c.art.map((id) => products.find((p) => p.id === id)!);
            return (
              <Reveal key={c.key} delay={i * 0.1}>
                <TiltCard className="rounded-[2rem]">
                  <Link
                    href={`/shop?category=${c.key}`}
                    className={`relative flex min-h-[18rem] overflow-hidden rounded-[2rem] bg-gradient-to-br ${c.bg} p-7 shadow-soft ring-1 ring-navy-900/5 transition-shadow hover:shadow-lift sm:min-h-[22rem] sm:p-10`}
                  >
                    <div className="relative z-10 flex max-w-[64%] flex-col sm:max-w-[60%]">
                      <span className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${c.chip}`}>
                        <c.icon aria-hidden className="h-4 w-4" /> {count} products
                      </span>
                      <h3 className="mt-4 text-3xl font-semibold sm:mt-5 sm:text-5xl">{c.title}</h3>
                      <p className="mt-3 text-[0.95rem] leading-relaxed text-navy-500 sm:text-base">{c.text}</p>
                      <span className="mt-auto inline-flex items-center gap-2 pt-6 font-semibold text-navy-800">
                        Shop {c.title} <ArrowRight aria-hidden className="h-5 w-5 transition group-hover:translate-x-1" />
                      </span>
                    </div>
                    <div aria-hidden className="absolute -right-4 bottom-0 flex w-[50%] items-end sm:-right-2 sm:w-[52%]">
                      <div className="w-1/2 translate-x-6 translate-y-2">
                        <ProductArt product={a} background={false} />
                      </div>
                      <div className="w-[62%]">
                        <ProductArt product={b} background={false} />
                      </div>
                    </div>
                  </Link>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
