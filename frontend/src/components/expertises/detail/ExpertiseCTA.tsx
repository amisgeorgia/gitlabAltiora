"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function ExpertiseCTA() {
  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <div className="mx-auto max-w-357.5">
        {/* Conteneur arrondi encadré avec fond dégradé clair */}
        <div className="relative overflow-hidden rounded-4xl sm:rounded-[40px] lg:rounded-[48px] bg-linear-to-br from-[#EFF2FB] via-[#ECEFFA] to-[#F4F1FA] border border-white/80 p-8 sm:p-12 lg:p-16 shadow-[0_20px_50px_rgba(11,31,77,0.05)] text-center">
          
          {/* Halos d'ambiance d'arrière-plan */}
          <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[#C59B27]/10 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-2xl flex flex-col items-center">
            
            {/* Badge d'en-tête */}
            <div className="inline-flex items-center rounded-full bg-[#C59B27] px-4 py-1.5 text-xs sm:text-[13px] font-bold uppercase tracking-wider text-white shadow-xs shadow-[#C59B27]/25 mb-4">
              PROCHAINE ÉTAPE
            </div>

            {/* Titre */}
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1F4D] tracking-tight mb-8">
              Besoin d&apos;accompagnement sur ce sujet ?
            </h3>

            {/* Bouton d'action */}
            <Link href="/contact" className="w-full sm:w-auto">
              <Button 
                variant="gold" 
                size="lg" 
                className="w-full sm:w-auto px-8 sm:px-10 h-14 text-base sm:text-lg font-bold bg-[#C59B27] hover:bg-[#b08a20] text-white rounded-xl shadow-lg shadow-[#C59B27]/20 transition-all duration-300"
              >
                Discutons de votre projet
              </Button>
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
}