"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowLeft } from "lucide-react";
import { ExpertiseItem } from "@/data/expertises.data";

interface ExpertiseDetailHeroProps {
  expertise: ExpertiseItem;
}

export function ExpertiseDetailHero({ expertise }: ExpertiseDetailHeroProps) {
  const scrollToContent = () => {
    const element = document.getElementById("presentation");
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full bg-[#08183A] text-white py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Halos lumineux d'ambiance */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-[450px] sm:w-[600px] h-[450px] rounded-full bg-[#DDA83A]/10 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 w-[400px] sm:w-[500px] h-[400px] rounded-full bg-[#0B3D7A]/25 blur-[120px]" />

      <div className="mx-auto max-w-[1430px] px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Colonne Gauche : Textes & Call to Action */}
          <div className="lg:col-span-7 flex flex-col items-start sr-fade-up">
            {/* Ligne Navigation Retour + Badge */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {/* Bouton retour avec icône */}
              <Link
                href="/expertises"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-[#DDA83A] text-slate-200 hover:text-[#09152E] border border-white/15 transition-all duration-300 text-xs sm:text-sm font-semibold group backdrop-blur-md"
              >
                <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
                <span>Retour aux expertises</span>
              </Link>

              {/* Badge pilule discret */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#DDA83A]" />
                <span className="text-xs font-bold tracking-widest uppercase text-slate-300">
                  {expertise.categoryBadge || "EXPERTISE"}
                </span>
              </div>
            </div>

            {/* Titre principal */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold text-white tracking-tight leading-[1.15] mb-6">
              {expertise.title}
            </h1>

            {/* Description d'accroche */}
            <p className="text-slate-300 text-base sm:text-lg md:text-[19px] leading-relaxed font-normal mb-8 max-w-2xl">
              {expertise.heroDescription || expertise.description}
            </p>

            {/* Bouton d'action doré sans shadow */}
            <button
              onClick={scrollToContent}
              type="button"
              className="group inline-flex items-center gap-3 rounded-full bg-[#DDA83A] hover:bg-[#c9952d] text-[#09152E] px-7 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>Découvrir notre approche</span>
              <ArrowDown className="w-4 h-4 stroke-[2.5] transition-transform duration-300 group-hover:translate-y-0.5" />
            </button>
          </div>

          {/* Colonne Droite : Visuel / Carte Image sans shadow */}
          <div className="lg:col-span-5 sr-fade-up">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-[#0D2452]/60 backdrop-blur-sm group">
              <Image
                src={expertise.image}
                alt={expertise.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay subtil avec lueur dorée douce */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#08183A]/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

