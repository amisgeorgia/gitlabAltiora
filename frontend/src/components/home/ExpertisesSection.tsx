"use client";

import React, { useState } from "react";

interface ExpertiseItem {
  number: string;
  title: string;
}

const expertisesData: ExpertiseItem[] = [
  { number: "01", title: "CONSEIL STRATÉGIQUE" },
  { number: "02", title: "INTELLIGENCE ARTIFICIELLE" },
  { number: "03", title: "DÉVELOPPEMENT WEB" },
  { number: "04", title: "DÉVELOPPEMENT MOBILE" },
  { number: "05", title: "UI/UX DESIGN" },
  { number: "06", title: "BUSINESS INTELLIGENCE" },
  { number: "07", title: "CLOUD" },
  { number: "08", title: "CYBERSÉCURITÉ" },
  { number: "09", title: "FORMATION" },
];

export function ExpertisesSection() {
  // Par défaut, l'élément 05 (index 4) est sélectionné
  const [activeItem, setActiveItem] = useState<number>(4);

  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16 overflow-hidden">
      {/* Conteneur aligné sur la largeur globale max-w-357.5 */}
      <div className="mx-auto max-w-357.5">
        
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center mb-10 sm:mb-14 sr-header">
          {/* Badge "Nos expertises" */}
          <div className="inline-flex items-center rounded-full bg-[#F3F5F9] px-6 py-2 text-sm font-semibold text-slate-800 mb-5 shadow-xs">
            Nos expertises
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-bold tracking-tight text-primary leading-[1.18] max-w-3xl">
            Des expertises pensées pour <br />
            <span>structurer</span>{" "}
            <span className="text-slate-500 font-medium">
              et accélérer la croissance
            </span>
          </h2>
        </div>

        {/* 3x3 Grid */}
        <div className="border-t border-b border-slate-200 grid grid-cols-1 md:grid-cols-3">
          {expertisesData.map((item, index) => {
            const isLastItemMobile = index === expertisesData.length - 1;
            const isLastRowDesktop = index >= 6;
            const isLastColDesktop = (index + 1) % 3 === 0;
            const isSelected = activeItem === index;

            return (
              <div
                key={item.number}
                onMouseEnter={() => setActiveItem(index)}
                className={`group relative flex flex-col justify-between items-center text-center p-8 sm:p-10 lg:p-12 cursor-pointer transition-all duration-300 sr-stagger ${
                  isSelected
                    ? "bg-[#F6F0E4]"
                    : "bg-white hover:bg-[#F6F0E4]/60"
                } ${
                  /* En mobile : bordure sous tous les éléments sauf le dernier */
                  !isLastItemMobile ? "border-b border-slate-200" : ""
                } ${
                  /* En desktop : pas de bordure sous la 3ème rangée */
                  isLastRowDesktop ? "md:border-b-0" : "md:border-b md:border-slate-200"
                } ${
                  /* En desktop : bordure verticale à droite sauf sur la 3ème colonne */
                  !isLastColDesktop ? "md:border-r md:border-slate-200" : "md:border-r-0"
                }`}
              >
                {/* Number */}
                <span className="text-3xl sm:text-4xl lg:text-4xl lg:text-[40px] font-semibold text-slate-900 tracking-tight mb-6 sm:mb-8 select-none">
                  {item.number}
                </span>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-primary tracking-wide uppercase leading-snug">
                  {item.title}
                </h3>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}