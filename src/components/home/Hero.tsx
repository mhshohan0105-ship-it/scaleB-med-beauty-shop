import { ArrowRight, BadgeCheck, Star, Truck } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { HeroVisual } from "./HeroVisual";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -top-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-mint-100/70 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 h-[26rem] w-[26rem] rounded-full bg-blush-100/70 blur-3xl" />

      <div className="container-page relative grid items-center gap-6 pt-10 pb-16 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pt-16 lg:pb-24">
        <div className="text-center lg:text-left">
          <div className="fade-up">
            <p className="inline-flex items-center gap-2 rounded-full bg-paper px-4 py-2 text-sm font-semibold text-mint-700 shadow-soft ring-1 ring-mint-100">
              <BadgeCheck aria-hidden className="h-4 w-4" /> Trusted online pharmacy &amp; beauty store in Bangladesh
            </p>
          </div>
          <div className="fade-up [--d:080ms]">
            <h1 className="mt-6 text-5xl font-semibold sm:text-6xl lg:text-7xl">
              Your Health.
              <br />
              <span className="italic text-blush-500">Your Glow.</span>
            </h1>
          </div>
          <div className="fade-up [--d:160ms]">
            <p className="mx-auto mt-6 max-w-xl text-lg text-navy-500 sm:text-xl lg:mx-0">
              Genuine medicines and thoughtfully chosen skincare in one calm, trusted place. Checked by pharmacists,
              delivered to your door.
            </p>
          </div>
          <div className="fade-up [--d:240ms]">
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <LinkButton href="/shop" size="lg" className="w-full sm:w-auto">
                Shop Now <ArrowRight aria-hidden className="h-5 w-5" />
              </LinkButton>
              <LinkButton href="/prescription" size="lg" variant="secondary" className="w-full sm:w-auto">
                Upload Prescription
              </LinkButton>
            </div>
          </div>
          <div className="fade-up [--d:320ms]">
            <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-navy-500 lg:justify-start">
              <li className="flex items-center gap-2">
                <Star aria-hidden className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span>
                  <strong className="text-navy-900">4.8/5</strong> from 12k+ shoppers
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Truck aria-hidden className="h-4 w-4 text-mint-600" />
                <span>
                  <strong className="text-navy-900">24 hr</strong> delivery inside Dhaka
                </span>
              </li>
            </ul>
          </div>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}
