"use client";

import React from "react";

interface StepItem {
  number: string;
  title: string;
  description: string;
}

const methodologySteps: StepItem[] = [
  {
    number: "1",
    title: "Analyse",
    description: "Analyse approfondie des besoins et enjeux.",
  },
  {
    number: "2",
    title: "Diagnostic",
    description: "Diagnostic précis & Conseil stratégique.",
  },
  {
    number: "3",
    title: "Conception",
    description: "Modélisation de la solution sur-mesure.",
  },
  {
    number: "4",
    title: "Déploiement",
    description: "Mise en œuvre technique et pilotage.",
  },
  {
    number: "5",
    title: "Suivi",
    description: "Optimisation & Amélioration continue.",
  },
];

export function ExpertisesMethodologySection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#09152E] py-20 sm:py-24 lg:py-28">
      {/* Effet de lueur d'ambiance en arrière-plan */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-[#DDA83A]/5 blur-[150px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1430px] px-4 sm:px-6 lg:px-8">
        
        {/* En-tête de section (Typographie Manrope) */}
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-16 sm:mb-20 lg:mb-24 sr-header">
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight leading-[1.2] mb-4 font-sans">
            Notre <span className="text-[#DDA83A]">Méthodologie</span>
          </h2>
          <p className="text-slate-200/90 text-sm sm:text-base md:text-[17px] leading-relaxed font-normal font-sans">
            Un processus structuré pour garantir l&apos;excellence opérationnelle de chaque intervention.
          </p>
        </div>

        {/* Timeline des 5 étapes */}
        <div className="relative">
          <div
            className="hidden md:block absolute top-0 left-0 right-0 h-[2px] bg-slate-600/50 z-0"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 sm:gap-7 md:gap-4 lg:gap-8">
            {methodologySteps.map((step) => (
              <div
                key={step.number}
                className="relative flex flex-row items-center gap-4 sm:gap-5 md:flex-col md:items-start text-left sr-stagger group"
              >
                <div className="relative z-10 shrink-0 flex items-center justify-center w-14 h-16 sm:w-16 sm:h-18 md:w-14 md:h-18 lg:w-16 lg:h-20 bg-white rounded-b-2xl rounded-t-sm shadow-lg shadow-black/20 md:mb-6 lg:mb-8 transition-transform duration-300 group-hover:-translate-y-1">
                  <span className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#DDA83A] font-bai select-none">
                    {step.number}
                  </span>
                </div>

                <div className="flex flex-col justify-center">
                  <h3 className="text-lg sm:text-xl md:text-lg lg:text-[22px] xl:text-[24px] font-bold text-white font-bai tracking-tight mb-1 md:mb-2.5 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm lg:text-[14px] font-normal font-bai leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
