import React from "react";
import { Metadata } from "next";
import { AboutHeroSection } from "@/components/about/AboutHeroSection";
import { AboutIdentitySection } from "@/components/about/AboutIdentitySection";
import { AboutMethodologySection } from "@/components/about/AboutMethodologySection";
import { AboutTeamSection } from "@/components/about/AboutTeamSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CtaBanner } from "@/components/common/CtaBanner";
import { ScrollRevealInit } from "@/components/common/ScrollRevealInit";

export const metadata: Metadata = {
  title: "À propos - ALTIORA CONNECT | Cabinet de Conseil & Transformation Digitale",
  description:
    "Découvrez ALTIORA CONNECT, cabinet de conseil d'élite dédié à la transformation digitale, l'excellence opérationnelle et les solutions d'innovation technologique.",
};

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen bg-white">
      <ScrollRevealInit />

      <main className="flex flex-col gap-16 md:gap-24 pt-10 sm:pt-14 lg:pt-16 pb-16 md:pb-24">
        <AboutHeroSection />

        <AboutIdentitySection />

        <AboutMethodologySection />
        
        <AboutTeamSection />

        <TestimonialsSection />

        <CtaBanner
          title="Prêt à transformer votre entreprise ?"
          description="Contactez nos experts dès aujourd'hui pour un diagnostic gratuit de vos besoins en transformation digitale."
          primaryButton={{
            label: "Prendre rendez-vous",
            href: "/contact",
          }}
          secondaryButton={{
            label: "Voir nos expertises",
            href: "/expertises",
          }}
        />
      </main>
    </div>
  );
}


