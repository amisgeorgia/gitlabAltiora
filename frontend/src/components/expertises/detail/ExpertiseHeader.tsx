"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface ExpertiseHeaderProps {
  title: string;
  description: string;
}

export function ExpertiseHeader({ title, description }: ExpertiseHeaderProps) {
  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 pt-0 py-4 sm:py-6 lg:py-8">
      <div className="mx-auto max-w-357.5">
        {/* Conteneur sombre aux coins arrondis harmonisé avec le reste du site */}
        <div className="relative overflow-hidden rounded-4xl sm:rounded-[40px] lg:rounded-[48px] bg-[#05112B] text-white p-8 sm:p-12 md:p-16 lg:p-20 border border-white/10 shadow-2xl">
          
          {/* Halos lumineux d'arrière-plan */}
          <div className="pointer-events-none absolute -top-40 -left-40 h-125 w-125 rounded-full bg-blue-600/15 blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-40 -right-40 h-125 w-125 rounded-full bg-[#C59B27]/10 blur-[120px]" />

          <div className="relative z-10 mx-auto max-w-4xl text-center flex flex-col items-center">
            
            {/* Bouton retour */}
            <Link 
              href="/expertises" 
              className="inline-flex items-center rounded-full bg-white/5 border border-white/10 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-[#C59B27] hover:border-[#C59B27]/40 hover:bg-[#C59B27]/10 transition-all duration-300 mb-8 backdrop-blur-xs"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Retour aux expertises
            </Link>

            {/* Titre principal */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold tracking-tight text-[#C59B27] mb-6 leading-[1.15]">
              {title}
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl font-normal">
              {description}
            </p>

          </div>
        </div>
      </div>
    </section>
  );
}