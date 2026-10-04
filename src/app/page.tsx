import { Hero } from "@/components/home/Hero";
import { CategoryCards } from "@/components/home/CategoryCards";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { BrandPromise } from "@/components/home/BrandPromise";
import { Reviews } from "@/components/home/Reviews";
import { Newsletter } from "@/components/home/Newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryCards />
      <FeaturedProducts />
      <WhyChooseUs />
      <BrandPromise />
      <Reviews />
      <Newsletter />
    </>
  );
}
