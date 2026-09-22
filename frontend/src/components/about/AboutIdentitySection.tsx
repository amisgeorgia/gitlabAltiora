"use client";

import React from "react";
import { Target, Rocket, Check } from "lucide-react";

export function AboutIdentitySection() {
  const values = [
    {
      title: "Innovation",
      description:
        "L'audace de repenser les modèles établis pour créer le futur.",
    },
    {
      title: "Intégrité",
      description:
        "Une éthique de travail rigoureuse au service de la transparence.",
    },
    {
      title: "Proximité",
      description:
        "Un accompagnement humain et réactif pour chaque projet.",
    },
  ];

  return (
    <section id="vision" className="relative w-full px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <div className="mx-auto max-w-357.5">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 lg:mb-16 sr-fade-up">
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0B1F4D] tracking-tight">
            Notre <span className="text-[#C59B27]">Identité</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-[17px] text-slate-600 font-normal leading-relaxed">
            Plus qu&apos;un prestataire, un partenaire stratégique engagé dans votre succès à long terme.
          </p>
        </div>

        {/* 2 Main Cards: Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          
          {/* Card 1: Notre Mission (Light Background) */}
          <div className="flex flex-col justify-between rounded-[28px] sm:rounded-[36px] bg-white border border-slate-100/90 p-7 sm:p-10 lg:p-12 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(11,31,77,0.08)] sr-fade-left">
            <div>
              {/* Mission Icon Badge */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-100/80 flex items-center justify-center text-slate-700 ">
                <Target size={32} strokeWidth={2.2} />
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl lg:text-[36px] font-bold text-[#0B1F4D] tracking-tight mt-6 sm:mt-8">
                Notre mission
              </h3>

              {/* Description */}
              <p className="mt-4 sm:mt-5 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                Accélérer la croissance de nos clients en fusionnant expertise métier et innovation technologique. Nous transformons les défis complexes en opportunités stratégiques mesurables grâce à une approche personnalisée et des solutions scalables.
              </p>
            </div>

            {/* Bottom Highlight with Gold Checkmark */}
            <div className="mt-8 sm:mt-12 pt-4 flex items-center gap-2.5 text-[#C59B27] font-semibold text-sm sm:text-[15px]">
              <span>Impact & Excellence</span>
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#C59B27] text-white">
                <Check size={12} strokeWidth={3} />
              </span>
            </div>
          </div>

          {/* Card 2: Notre Vision (Deep Navy Background) */}
          <div className="flex flex-col justify-between rounded-[28px] sm:rounded-[36px] bg-[#071638]  p-7 sm:p-10 lg:p-12 text-white transition-all duration-300 hover:shadow-[#0B1F4D]/25 sr-fade-right">
            <div>
              {/* Vision Icon Badge */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white flex items-center justify-center text-[#071638]">
                <Rocket size={28} strokeWidth={2.2} className="text-[#071638] -rotate-12" />
              </div>

              {/* Title with Gold Accent */}
              <h3 className="text-2xl sm:text-3xl lg:text-[36px] font-bold text-[#C59B27] tracking-tight mt-6 sm:mt-8">
                Notre vision
              </h3>

              {/* Description */}
              <p className="mt-4 sm:mt-5 text-sm sm:text-base text-slate-200/90 leading-relaxed font-normal">
                Devenir le leader africain incontournable de la transformation digitale, reconnu pour son agilité, son intégrité et sa capacité à créer de la valeur durable pour les entreprises et les institutions.
              </p>
            </div>

            {/* Empty spacer / balanced bottom alignment */}
            <div className="mt-8 sm:mt-12" />
          </div>

        </div>

        {/* 3 Value Cards: Innovation, Intégrité, Proximité */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 mt-6 sm:mt-8">
          {values.map((val, idx) => (
            <div
              key={idx}
              className="rounded-[20px] sm:rounded-3xl bg-[#EDF2F9] p-6 sm:p-8 transition-all duration-300 hover:bg-[#E6EEF8] hover:-translate-y-1 sr-stagger"
            >
              <h4 className="text-xl sm:text-2xl font-bold text-[#0B1F4D] tracking-tight">
                {val.title}
              </h4>
              <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {val.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
