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
    <section className="relative w-full px-4 sm:px-6 lg:px-8 py-2 sm:py-4">
      <div className="mx-auto max-w-357.5">
        {/* Container sombre avec coins arrondis et effets de lumière */}
        <div className="relative overflow-hidden rounded-4xl sm:rounded-[40px] lg:rounded-[48px] bg-[#05112B] text-white p-6 sm:p-10 md:p-12 lg:p-14 border border-white/10 shadow-2xl">
          
          {/* Halos lumineux d'arrière-plan */}
          <div className="pointer-events-none absolute -top-40 -left-40 h-125 w-125 rounded-full bg-blue-600/15 blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-40 -right-40 h-125 w-125 rounded-full bg-[#C59B27]/10 blur-[120px]" />

          <div className="relative z-10 w-full">
            
            {/* En-tête de section */}
            <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-8 sm:mb-10 lg:mb-12">
              <div className="inline-flex items-center rounded-full bg-[#C59B27]/20 border border-[#C59B27]/40 px-4 py-1.5 text-xs sm:text-sm font-bold tracking-widest text-[#C59B27] uppercase mb-3">
                NOTRE PROCESSUS
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-white tracking-tight leading-[1.2] mb-3">
                Notre <span className="text-[#C59B27]">Méthodologie</span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base md:text-[17px] leading-relaxed font-normal">
                Un processus structuré pour garantir l&apos;excellence opérationnelle de chaque intervention.
              </p>
            </div>

            {/* Timeline des 5 étapes */}
            <div className="relative">
              {/* Ligne horizontale de connexion (uniquement sur desktop) */}
              <div
                className="hidden md:block absolute top-9 left-10 right-10 h-0.5 bg-white/10 z-0"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 sm:gap-7 md:gap-4 lg:gap-8">
                {methodologySteps.map((step) => (
                  <div
                    key={step.number}
                    className="relative flex flex-row items-center gap-4 sm:gap-5 md:flex-col md:items-start text-left sr-stagger group z-10"
                  >
                    {/* Badge du numéro */}
                    <div className="relative z-10 shrink-0 flex items-center justify-center w-14 h-16 sm:w-16 sm:h-18 md:w-14 md:h-18 lg:w-16 lg:h-20 bg-white rounded-b-2xl rounded-t-sm shadow-lg shadow-black/20 md:mb-4 lg:mb-6 transition-transform duration-300 group-hover:-translate-y-1">
                      <span className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#C59B27] select-none">
                        {step.number}
                      </span>
                    </div>

                    {/* Titre et description */}
                    <div className="flex flex-col justify-center">
                      <h3 className="text-lg sm:text-xl md:text-lg lg:text-[22px] xl:text-[24px] font-bold text-white tracking-tight mb-1 md:mb-2 leading-snug group-hover:text-[#C59B27] transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="text-slate-300/85 text-xs sm:text-sm lg:text-[14px] font-normal leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}