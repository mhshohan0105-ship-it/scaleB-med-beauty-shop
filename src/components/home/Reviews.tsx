import { Quote } from "lucide-react";
import { reviews } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stars } from "@/components/ui/Stars";

export function Reviews() {
  return (
    <section className="section">
      <div className="container-page">
        <Reveal>
          <SectionHeading eyebrow="Kind words" title="Loved by our customers" />
        </Reveal>
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal as="li" key={r.name} delay={i * 0.1} className="h-full">
              <div className="card flex h-full flex-col p-7">
                <Quote aria-hidden className="h-8 w-8 text-blush-300" />
                <Stars rating={r.rating} className="mt-4" />
                <blockquote className="mt-3 flex-1 text-lg text-navy-700">“{r.text}”</blockquote>
                <footer className="mt-6 flex items-center gap-3 border-t border-navy-50 pt-5">
                  <span
                    aria-hidden
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-mint-200 to-blush-200 font-serif text-lg font-semibold text-navy-800"
                  >
                    {r.name[0]}
                  </span>
                  <span>
                    <span className="block font-semibold text-navy-900">{r.name}</span>
                    <span className="block text-sm text-navy-400">
                      {r.location} · {r.product}
                    </span>
                  </span>
                </footer>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
