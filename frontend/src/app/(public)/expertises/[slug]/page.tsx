import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { expertisesList, ExpertiseItem } from "@/data/expertises.data";
import { ScrollRevealInit } from "@/components/common/ScrollRevealInit";
import { ExpertiseDetailHero } from "@/components/expertises/detail/ExpertiseDetailHero";
import { ExpertiseDetailContent } from "@/components/expertises/detail/ExpertiseDetailContent";
import { ExpertiseContactCard } from "@/components/expertises/detail/ExpertiseContactCard";
import { ExpertiseBottomCta } from "@/components/expertises/detail/ExpertiseBottomCta";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return expertisesList.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const expertise = expertisesList.find((item) => item.slug === slug);

  if (!expertise) {
    return {
      title: "Expertise non trouvée - ALTIORA CONNECT",
    };
  }

  return {
    title: `${expertise.title} - ALTIORA CONNECT | Conseil & Solutions`,
    description: expertise.heroDescription || expertise.description,
  };
}

export default async function ExpertiseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const expertise: ExpertiseItem | undefined = expertisesList.find(
    (item) => item.slug === slug
  );

  if (!expertise) {
    notFound();
  }

  return (
    <div className="w-full min-h-screen bg-[#FBFCFE]">
      {/* Initialisation des animations au défilement */}
      <ScrollRevealInit />

      {/* 1. Hero Section avec bannière foncée, titre, bouton d'action et image */}
      <ExpertiseDetailHero expertise={expertise} />

      {/* 2. Section de contenu principale à 2 colonnes */}
      <main className="w-full py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1430px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-start">
            
            {/* Colonne Gauche : Présentation détaillée & Cartes complémentaires */}
            <div className="lg:col-span-7 xl:col-span-8">
              <ExpertiseDetailContent expertise={expertise} />
            </div>

            {/* Colonne Droite : Formulaire de contact interactif latéral (Sticky) */}
            <div className="lg:col-span-5 xl:col-span-4">
              <ExpertiseContactCard expertiseTitle={expertise.title} />
            </div>

          </div>
        </div>
      </main>

      {/* 3. Section d'appel à l'action inférieure */}
      <ExpertiseBottomCta />
    </div>
  );
}
