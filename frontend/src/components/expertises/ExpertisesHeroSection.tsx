"use client";

import React from "react";
import Link from "next/link";

export function ExpertisesHeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#09152E] -mt-20 sm:-mt-24 md:-mt-26 pt-32 sm:pt-40 md:pt-44 pb-20 sm:pb-24 lg:pb-32">
      {/* Effets de halo lumineux */}
      <div 
        className="pointer-events-none absolute top-1/4 right-0 w-[500px] sm:w-[700px] h-[450px] rounded-full bg-[#DDA83A]/10 blur-[130px]"
        aria-hidden="true" 
      />
      <div 
        className="pointer-events-none absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-blue-600/10 blur-[100px]" 
        aria-hidden="true" 
      />

      {/* Contenu */}
      <div className="relative mx-auto max-w-[1430px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl flex flex-col items-start sr-fade-up">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-extrabold text-white tracking-tight leading-[1.12] mb-6 sm:mb-7">
            Nos <span className="text-[#DDA83A]">Expertises</span>
          </h1>

          <p className="text-slate-200/90 text-sm sm:text-base md:text-[17px] lg:text-[18px] leading-relaxed font-normal mb-16 md:mb-32 max-w-3xl">
            ALTIORA CONNECT accompagne les entreprises, institutions et organisations
            grâce à une expertise multidisciplinaire combinant conseil stratégique,
            formation professionnelle, transformation digitale et solutions
            technologiques innovantes.
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-5">
            <Link
              href="/formations"
              className="inline-flex items-center justify-center rounded-full bg-[#DDA83A] hover:bg-[#c9952d] px-7 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-semibold text-white shadow-lg shadow-[#DDA83A]/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Découvrir nos formations
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/40 hover:border-white bg-[#0D1E3F]/60 hover:bg-white/10 px-7 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-semibold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
