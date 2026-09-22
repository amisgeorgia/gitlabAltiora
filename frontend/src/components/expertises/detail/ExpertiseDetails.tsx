"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";

interface ExpertiseDetailsProps {
  details: string[];
}

export function ExpertiseDetails({ details }: ExpertiseDetailsProps) {
  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <div className="mx-auto max-w-357.5">
        {/* Conteneur fluide clair avec coins arrondis et bordure douce */}
        <div className="relative h-auto w-full overflow-hidden rounded-4xl sm:rounded-[40px] lg:rounded-[48px] bg-linear-to-br from-[#EFF2FB] via-[#ECEFFA] to-[#F4F1FA] border border-white/80 p-6 sm:p-10 md:p-12 lg:p-16 shadow-[0_20px_50px_rgba(11,31,77,0.05)]">
          
          {/* Halos lumineux d'arrière-plan */}
          <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-purple-400/10 blur-3xl" />

          <div className="relative z-10 w-full">
            {/* Header */}
            <div className="mb-8 sm:mb-10">
              <div className="inline-flex items-center rounded-full bg-[#C59B27] px-4 py-1.5 text-xs sm:text-[13px] font-bold uppercase tracking-wider text-white shadow-xs shadow-[#C59B27]/25 mb-3">
                NOTRE CHAMP D&apos;ACTION
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1F4D] tracking-tight">
                Nos domaines d&apos;intervention
              </h2>
            </div>

            {/* Liste des prestations */}
            <div className="grid grid-cols-1 gap-4 sm:gap-5">
              {details.map((detail, index) => (
                <div 
                  key={index} 
                  className="group flex items-start bg-white/90 backdrop-blur-xs p-5 sm:p-6 rounded-2xl border border-white/80 shadow-xs hover:shadow-md transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#C59B27]/10 flex items-center justify-center mr-4 shrink-0 group-hover:bg-[#C59B27] transition-colors duration-300">
                    <CheckCircle2 className="h-5 w-5 text-[#C59B27] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <p className="text-base sm:text-lg font-medium text-slate-700 group-hover:text-[#0B1F4D] leading-relaxed transition-colors duration-300 pt-1">
                    {detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}