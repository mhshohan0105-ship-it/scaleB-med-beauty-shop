import { LinkButton } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <section className="container-page flex flex-col items-center py-24 text-center">
      <LogoMark className="h-16 w-16" />
      <p className="eyebrow mt-6">404</p>
      <h1 className="mt-2 text-4xl font-semibold sm:text-5xl">We couldn’t find that page</h1>
      <p className="mt-4 max-w-md text-lg text-navy-500">It may have moved, or the link might be mistyped.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <LinkButton href="/" size="lg">
          Back to home
        </LinkButton>
        <LinkButton href="/shop" size="lg" variant="secondary">
          Browse the shop
        </LinkButton>
      </div>
    </section>
  );
}
