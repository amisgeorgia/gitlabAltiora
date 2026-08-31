"use client";

import React from "react";
import { Search, TrendingUp, Sparkles, Handshake } from "lucide-react";

interface TrustCardItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const trustFeatures: TrustCardItem[] = [
  {
    icon: (
      <Search
        size={26}
        strokeWidth={2.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    title: "Expertise multidisciplinaire",
    description:
      "Une équipe réunissant plusieurs domaines de compétences complémentaires.",
  },
  {
    icon: (
      <TrendingUp
        size={26}
        strokeWidth={2.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    title: "Solutions personnalisées",
    description:
      "Chaque solution est adaptée aux besoins spécifiques du client.",
  },
  {
    icon: (
      <Sparkles
        size={26}
        strokeWidth={2.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    title: "Innovation",
    description:
      "Intégration des meilleures pratiques et des technologies récentes.",
  },
  {
    icon: (
      <Handshake
        size={26}
        strokeWidth={2.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    title: "Accompagnement durable",
    description:
      "Un suivi continu avant, pendant et après chaque projet.",
  },
];

export function ExpertisesTrustSection() {
  return (
    <section className="relative w-full bg-gradient-to-br from-[#FAFBFF] via-[#F8FAFF] to-[#F1F4FD] py-20 sm:py-24 lg:py-28 overflow-hidden">
      <div className="mx-auto max-w-[1430px] px-4 sm:px-6 lg:px-8">
        
        {/* En-tête de section */}
        <div className="text-center max-w-4xl mx-auto mb-14 sm:mb-16 lg:mb-20 sr-header">
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-titres leading-tight">
            Pourquoi faire confiance à{" "}
            <span className="text-brand-gold">Altiora Connect</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-[17px] text-paragraphes font-normal leading-relaxed max-w-3xl mx-auto">
            Nous accompagnons les entreprises, institutions et organisations dans leur transformation digitale
          </p>
        </div>

        {/* Grille des 4 cartes d'atouts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-8">
          {trustFeatures.map((feature, index) => (
            <div
              key={index}
              className="group relative flex flex-col items-start bg-white rounded-2xl p-7 sm:p-8 border border-slate-100/90 hover:-rotate-2 hover:border-primary hover:shadow-lg hover:shadow-slate-900/5 cursor-pointer sr-stagger"
            >
              <div className="flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-[#EEF2F9] text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white shrink-0 mb-6 sm:mb-8">
                {feature.icon}
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-titres tracking-tight mb-3">
                {feature.title}
              </h3>

              <p className="text-sm text-paragraphes font-normal leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
