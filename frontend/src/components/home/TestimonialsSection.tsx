"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";

interface TestimonialItem {
  id: string;
  name: string;
  rating: number;
  content: string;
}

const testimonialsData: TestimonialItem[] = [
  {
    id: "1",
    name: "Jean Rakoto",
    rating: 5,
    content:
      "ALTIORA CONNECT nous a permis de structurer notre transformation digitale avec une approche claire et un accompagnement de qualité.",
  },
  {
    id: "2",
    name: "Sarah Andriamiarisoa",
    rating: 5,
    content:
      "Les formations proposées sont concrètes, interactives et directement applicables dans notre activité quotidienne.",
  },
  {
    id: "3",
    name: "Michel stall",
    rating: 5,
    content:
      "L'équipe a parfaitement compris nos besoins et livré une solution adaptée à nos objectifs.",
  },
  {
    id: "4",
    name: "Michel Randria",
    rating: 5,
    content:
      "Grâce à la structuration de nos processus et aux formations dispensées, nos équipes ont gagné un temps précieux au quotidien.",
  },
  {
    id: "5",
    name: "Ted Burnett",
    rating: 5,
    content:
      "Des prestations de haut niveau et un suivi 24/7 irréprochable. Un partenaire de confiance sur le long terme.",
  },
];

export function TestimonialsSection() {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  // Duplication de la liste pour un défilement infini sans coupure
  const infiniteTestimonials = [...testimonialsData, ...testimonialsData, ...testimonialsData];

  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16 overflow-hidden">
      <style jsx>{`
        @keyframes marqueeScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }
        .testimonials-track {
          display: flex;
          gap: 1.5rem;
          width: max-content;
          animation: marqueeScroll 35s linear infinite;
          will-change: transform;
        }
        .testimonials-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="mx-auto max-w-357.5">
        {/* Container arrondi encadré aligné sur les autres sections */}
        <div className="relative overflow-hidden rounded-3xl sm:rounded-[40px] lg:rounded-[48px] bg-linear-to-br from-[#EFF2FB] via-[#ECEFFA] to-[#F4F1FA] border border-white/80 py-10 sm:py-12 lg:py-16 shadow-[0_20px_50px_rgba(11,31,77,0.05)]">
          
          {/* Subtle Ambient Glows */}
          <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-purple-400/10 blur-3xl" />

          <div className="relative z-10 w-full">
            {/* Section Header */}
            <div className="text-center mb-8 sm:mb-12 px-4 sr-header">
              <div className="inline-flex items-center rounded-full bg-[#C59B27] px-5 py-2 text-xs sm:text-[13px] font-bold uppercase tracking-wider text-white shadow-xs shadow-[#C59B27]/25 mb-3 sm:mb-4">
                TÉMOIGNAGES
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-[#0B1F4D]">
                Avis Clients
              </h2>
            </div>

            {/* Continuous Auto-Scrolling Container */}
            <div className="w-full overflow-hidden py-2 select-none">
              <div className="testimonials-track px-4">
                {infiniteTestimonials.map((item, index) => {
                  const isSelected = activeCardId === `${item.id}-${index}`;

                  return (
                    <div
                      key={`${item.id}-${index}`}
                      onClick={() => setActiveCardId(`${item.id}-${index}`)}
                      className={`group relative flex flex-col justify-between w-72.5 sm:w-[320px] lg:w-87.5 shrink-0 rounded-[22px] sm:rounded-[26px] p-6 sm:p-7 transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? "bg-white shadow-xl scale-[1.02] border-2 border-[#C59B27]"
                          : "bg-white/80 hover:bg-white hover:shadow-lg hover:scale-[1.01] border border-white/60"
                      }`}
                    >
                      <div>
                        {/* User Info: Circle Placeholder + Name + Stars */}
                        <div className="flex items-center gap-3.5 sm:gap-4 mb-4 sm:mb-5">
                          {/* Neutral Circle Avatar */}
                          <div className="h-12 w-12 sm:h-13 sm:w-13 rounded-full bg-[#E5E7EB] border-2 border-white shrink-0 shadow-xs" />

                          {/* Name & Stars */}
                          <div className="flex flex-col">
                            <h3 className="text-sm sm:text-base font-bold text-[#0B1F4D] tracking-tight leading-snug">
                              {item.name}
                            </h3>
                            <div className="flex items-center gap-1 mt-1">
                              {Array.from({ length: item.rating }).map((_, starIndex) => (
                                <Star
                                  key={starIndex}
                                  size={15}
                                  className="fill-[#C59B27] text-[#C59B27]"
                                />
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Review Text */}
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                          {item.content}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}