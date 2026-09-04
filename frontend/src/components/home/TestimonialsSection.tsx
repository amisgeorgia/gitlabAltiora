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
    <section className="relative w-full bg-white py-14 sm:py-18 lg:py-24 overflow-hidden">
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
      <div className="w-full">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14 px-4">
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-primary">
            Avis Clients
          </h2>
        </div>

        {/* Continuous Auto-Scrolling Container with Hardware Acceleration */}
        <div className="w-full overflow-hidden py-4 select-none pl-4 sm:pl-8 lg:pl-12">
          <div className="testimonials-track">
            {infiniteTestimonials.map((item, index) => {
              const isSelected = activeCardId === `${item.id}-${index}`;

              return (
                <div
                  key={`${item.id}-${index}`}
                  onClick={() => setActiveCardId(`${item.id}-${index}`)}
                  className={`group relative flex flex-col justify-between w-[290px] sm:w-[320px] lg:w-[350px] shrink-0 rounded-[22px] sm:rounded-[26px] p-6 sm:p-7 transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "bg-[#ECEEF7] shadow-md scale-[1.02] border border-primary/20"
                      : "bg-[#F3F4F9] hover:bg-[#EBEDF7] hover:shadow-md hover:scale-[1.01] border border-transparent"
                  }`}
                >
                  <div>
                    {/* User Info: Circle Placeholder + Name + Stars */}
                    <div className="flex items-center gap-3.5 sm:gap-4 mb-4 sm:mb-5">
                      {/* Neutral Circle Avatar */}
                      <div className="h-12 w-12 sm:h-13 sm:w-13 rounded-full bg-[#E5E7EB] border-2 border-white shrink-0 shadow-xs" />

                      {/* Name & Stars */}
                      <div className="flex flex-col">
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-snug">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-1 mt-1">
                          {Array.from({ length: item.rating }).map((_, starIndex) => (
                            <Star
                              key={starIndex}
                              size={15}
                              className="fill-[#FF9900] text-[#FF9900]"
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Review Text */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {item.content}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
