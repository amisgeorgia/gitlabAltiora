import React from "react";
import { Metadata } from "next";
import { ExpertisesHeroSection } from "@/components/expertises/ExpertisesHeroSection";
import { ExpertisesListSection } from "@/components/expertises/ExpertisesListSection";
import { ExpertisesMethodologySection } from "@/components/expertises/ExpertisesMethodologySection";
import { ExpertisesTrustSection } from "@/components/expertises/ExpertisesTrustSection";
import { CtaBanner } from "@/components/common/CtaBanner";
import { ScrollRevealInit } from "@/components/common/ScrollRevealInit";

export const metadata: Metadata = {
  title: "Nos Expertises - ALTIORA CONNECT | Conseil, Formation & Transformation Digitale",
  description:
    "ALTIORA CONNECT accompagne les entreprises, institutions et organisations grâce à une expertise multidisciplinaire combinant conseil stratégique, formation professionnelle, transformation digitale et solutions technologiques innovantes.",
};

export default function ExpertisesPage() {
  return (
    <div className="w-full min-h-screen bg-white">
      {/* Initialisation des animations ScrollReveal */}
      <ScrollRevealInit />

      <ExpertisesHeroSection />

      <ExpertisesListSection />

      <ExpertisesMethodologySection />

      <ExpertisesTrustSection />

      {/* Bannière (Réutilisable) */}
      <CtaBanner
        title="Donnons vie à votre prochain projet."
        description="Échangeons ensemble afin de construire une solution adaptée aux besoins de votre organisation."
        primaryButton={{
          label: "Demander un accompagnement",
          href: "/contact",
        }}
        secondaryButton={{
          label: "Nous contacter",
          href: "/contact",
        }}
      />
    </div>
  );
}

