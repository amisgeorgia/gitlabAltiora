// "use client"


import { ExpertisesHeroSection } from "@/components/expertises/ExpertisesHeroSection";
import { ExpertisesGridSection } from "@/components/expertises/ExpertisesGridSection";
import { ExpertisesMethodologySection } from "@/components/expertises/ExpertisesMethodologySection";
import { WhyTrustUsSection } from "@/components/expertises/WhyTrustUsSection";
import { TestimonialsSection } from "@/components/expertises/TestimonialsSection";
import { CTASection } from "@/components/expertises/CTASection";


export default function ExpertisesPage() {
return (
    <main className="w-full pt-10 sm:pt-14 lg:pt-16 pb-12 sm:pb-16 space-y-4 sm:space-y-6 lg:space-y-8 min-h-screen">
      <ExpertisesHeroSection />
      <ExpertisesGridSection />
      <ExpertisesMethodologySection />
      <section className="dark:bg-slate-900 py-6 sm:py-8 px-4 transition-colors duration-300">
        <WhyTrustUsSection />
        <TestimonialsSection />
      </section>
      <CTASection />
    </main>
  );
}

