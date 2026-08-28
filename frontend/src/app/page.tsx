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
    <div className="flex min-h-screen flex-col bg-[#040D21]">
      {/* ScrollReveal Client Initializer */}
      <ScrollRevealInit />

      {/* Floating Header */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <Header />
      </div>

      {/* Main Content */}
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <WhyChooseUsSection />
        <FormationsSection />
        <ExpertisesSection />
        <TestimonialsSection />
        <FaqSection />
        <PartnersSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
