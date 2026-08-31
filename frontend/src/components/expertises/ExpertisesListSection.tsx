"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Compass,
  Brain,
  Code2,
  Smartphone,
  Palette,
  BarChart3,
  Cloud,
  ShieldCheck,
  GraduationCap,
  Check,
} from "lucide-react";
import { expertisesList, ExpertiseItem } from "@/data/expertises.data";
import { Pagination } from "@/components/common/Pagination";

// Dictionnaire associant chaque nom d'icône à son composant Lucide adapté
const iconMap = {
  compass: Compass,
  brain: Brain,
  code: Code2,
  smartphone: Smartphone,
  palette: Palette,
  barChart: BarChart3,
  cloud: Cloud,
  shield: ShieldCheck,
  graduationCap: GraduationCap,
};

const ITEMS_PER_PAGE = 6;

export function ExpertisesListSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);

  const totalPages = Math.ceil(expertisesList.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentExpertises = expertisesList.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Défilement fluide vers le haut de la section lors du changement de page
    if (sectionRef.current) {
      const topOffset = sectionRef.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1430px] px-4 sm:px-6 lg:px-8">
        
        {/* En-tête de section */}
        <div className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto mb-12 sm:mb-16 lg:mb-20 sr-header">
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#0B1F4D] tracking-tight leading-[1.2] mb-5">
            Une expertise adaptée{" "}
            <span className="text-[#DDA83A]">à chaque organisation</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base md:text-[17px] leading-relaxed font-normal">
            Chaque projet est unique. Notre équipe mobilise des compétences
            complémentaires afin de proposer des solutions concrètes, innovantes
            et durables répondant aux défis spécifiques de chaque organisation.
          </p>
        </div>

        {/* Grille des 6 cartes d'expertises */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-14 sm:mb-16">
          {currentExpertises.map((item: ExpertiseItem) => {
            const IconComponent = iconMap[item.iconName] || Compass;

            return (
              <div
                key={item.id}
                className="group relative flex flex-col justify-between bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(11,31,77,0.08)] hover:border-slate-200 transition-all duration-300 sr-stagger"
              >
                {/* Image plein format en haut de la carte */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Badge icône adaptée avec cercle doré */}
                  <div className="absolute top-4 left-4 z-10 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#09152E]/90 backdrop-blur-md border border-[#DDA83A]/30 shadow-lg shadow-black/20 group-hover:scale-105 group-hover:border-[#DDA83A] transition-all duration-300">
                    <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[#DDA83A] text-[#09152E] shadow-sm">
                      <IconComponent className="w-4 h-4 stroke-[2.4]" />
                    </div>
                  </div>
                </div>

                {/* Corps de la carte */}
                <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                  <div>
                    {/* Titre de l'expertise */}
                    <h3 className="text-xl sm:text-[22px] font-bold text-[#0B1F4D] tracking-tight leading-snug mb-3">
                      {item.title}
                    </h3>

                    {/* Description courte */}
                    <p className="text-slate-600 text-sm leading-relaxed mb-6 font-normal">
                      {item.description}
                    </p>

                    {/* Liste des 3 points clés avec puce dorée */}
                    <ul className="flex flex-col gap-2.5 mb-8">
                      {item.points.map((point, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-3 text-sm text-slate-700 font-medium"
                        >
                          <div className="flex items-center justify-center w-4 h-4 rounded-full bg-[#DDA83A] text-white shrink-0 shadow-xs">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bouton d'action Découvrir plein arrondi */}
                  <div>
                    <Link
                      href={`/expertises/${item.slug}`}
                      className="w-full inline-flex items-center justify-center rounded-full bg-[#0B1F4D] hover:bg-[#06132F] py-3.5 px-6 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#0B1F4D]/25 active:scale-[0.98]"
                    >
                      Découvrir
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination réutilisable */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

      </div>
    </section>
  );
}
