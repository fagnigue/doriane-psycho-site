import { Hero } from "@/components/sections/hero";
import { Concerns } from "@/components/sections/concerns";
import { About } from "@/components/sections/about";
import { HowItWorks } from "@/components/sections/how-it-works";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCta } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <main>
      <Hero />
      <Concerns />
      <About />
      <HowItWorks />
      <FaqSection />
      <FinalCta />
    </main>
  );
}
