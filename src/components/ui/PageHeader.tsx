import { Reveal } from "./Reveal";

/** Soft gradient banner used at the top of inner pages. */
export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-mint-50 via-cream to-blush-50" />
      <div className="container-page relative py-12 text-center sm:py-16">
        <Reveal>
          {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
          <h1 className="text-4xl font-semibold sm:text-5xl">{title}</h1>
          {description && <p className="mx-auto mt-4 max-w-2xl text-lg text-navy-500">{description}</p>}
        </Reveal>
      </div>
    </section>
  );
}
