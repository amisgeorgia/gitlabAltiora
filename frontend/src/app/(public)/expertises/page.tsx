"use client"


import { ExpertisesHeroSection } from "@/components/expertises/ExpertisesHeroSection";
import { ExpertisesGridSection } from "@/components/expertises/ExpertisesGridSection";
import { ExpertisesMethodologySection } from "@/components/expertises/ExpertisesMethodologySection";
import { WhyTrustUsSection } from "@/components/expertises/WhyTrustUsSection";
import { TestimonialsSection } from "@/components/expertises/TestimonialsSection";
import { CTASection } from "@/components/expertises/CTASection";


export default function ExpertisesPage() {
return (
    <main className="min-h-screen">
      <ExpertisesHeroSection />
      <ExpertisesGridSection />
      <ExpertisesMethodologySection />
      <section className="bg-slate-50 dark:bg-slate-900 py-12 px-4 transition-colors duration-300">
        <WhyTrustUsSection />
        <TestimonialsSection />
      </section>
      <CTASection />
    </main>
  );
}

