import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { WhyChooseUsSection } from "@/components/home/WhyChooseUsSection";
import { FormationsSection } from "@/components/home/FormationsSection";
import { ExpertisesSection } from "@/components/home/ExpertisesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FaqSection } from "@/components/home/FaqSection";
import { PartnersSection } from "@/components/home/PartnersSection";
import { ScrollRevealInit } from "@/components/common/ScrollRevealInit";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-slate-900 transition-colors duration-300">
      <ScrollRevealInit />
      <Header />

      <main className="flex-1 w-full pt-31 sm:pt-40 lg:pt-42.5">
        <HeroSection />

        <div className="w-full">
          <AboutSection />
          <WhyChooseUsSection />
          <FormationsSection />
          <ExpertisesSection />
          <TestimonialsSection />
          <FaqSection />
          <PartnersSection />
        </div>
      </main>

      <Footer />
    </div>
  );
}