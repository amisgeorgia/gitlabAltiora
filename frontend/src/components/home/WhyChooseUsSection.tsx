import React from "react";
import { Search, ChartNoAxesCombined, MessagesSquare } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: FeatureCardProps[] = [
  {
    icon: (
      <Search
        size={28}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    title: "Conseil stratégique",
    description:
      "Nous analysons vos besoins, identifions les opportunités et élaborons des stratégies adaptées à vos objectifs afin d'assurer une croissance durable.",
  },
  {
    icon: (
      <ChartNoAxesCombined
        size={28}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    title: "Solutions sur mesure",
    description:
      "Chaque organisation est unique. Nous concevons des solutions numériques personnalisées répondant à vos défis opérationnels et métiers.",
  },
  {
    icon: (
      <MessagesSquare
        size={28}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    title: "Accompagnement continu",
    description:
      "De l'analyse à la mise en œuvre, notre équipe reste à vos côtés pour assurer le succès de vos projets et le développement de vos compétences.",
  },
];

export function WhyChooseUsSection() {
  return (
    /* La section externe reste transparente sans le dégradé pleined largeur */
    <section className="relative w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
      
      {/* Le dégradé et le fond sont déplacés ICI sur le conteneur limité */}
      <div className="mx-auto max-w-357.5 bg-linear-to-br from-[#FAFBFF] via-[#F8FAFF] to-[#F1F4FD] rounded-4xl sm:rounded-[40px] lg:rounded-[48px] p-6 sm:p-10 lg:p-14 border border-slate-200/60 shadow-xs">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14 lg:mb-16 sr-header">
          <h2 className="text-2xl sm:text-4xl lg:text-[46px] font-bold tracking-tight text-titres leading-tight">
            Pourquoi choisir <span className="text-brand-gold">Altiora Connect</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-paragraphes font-normal leading-relaxed">
            Nous accompagnons les entreprises, institutions et organisations dans leur transformation digitale
          </p>
        </div>

        {/* Features 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-8 xl:gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative flex flex-col items-start bg-white rounded-[20px] p-8 sm:p-10 border border-slate-100/90 shadow-none transition-all duration-300 ease-out hover:-rotate-2 hover:border-primary hover:shadow-none cursor-pointer sr-stagger"
            >
              {/* Icon Container with rounded corners */}
              <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-[#EEF2F9] text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white shrink-0 mb-6 sm:mb-8">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold text-titres tracking-tight mb-3">
                {feature.title}
              </h3>

              {/* Description Paragraph */}
              <p className="text-sm sm:text-base text-paragraphes font-normal leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}