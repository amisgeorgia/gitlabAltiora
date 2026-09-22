"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";

interface FormationItem {
  id: string;
  title: string;
  description: string;
  image: string;
  slug: string;
}

const formationsData: FormationItem[] = [
  {
    id: "ia",
    title: "Intelligence Artificielle",
    description:
      "Comprendre, utiliser et intégrer les outils d'IA dans votre activité.",
    image: "/images/ia.webp",
    slug: "intelligence-artificielle",
  },
  {
    id: "dev-web",
    title: "Développement Web",
    description:
      "Concevoir des applications web modernes avec les technologies actuelles.",
    image: "/images/devweb.webp",
    slug: "developpement-web",
  },
  {
    id: "cyber",
    title: "Cybersécurité",
    description:
      "Sensibiliser vos équipes aux bonnes pratiques et protéger vos systèmes d'information.",
    image: "/images/cybe.webp",
    slug: "cybersecurite",
  },
  {
    id: "gestion-projet",
    title: "Gestion de projet",
    description:
      "Planifier, piloter et réussir vos projets grâce aux méthodologies agiles et de gestion.",
    image: "/images/gestion.webp",
    slug: "gestion-de-projet",
  },
  {
    id: "data-science",
    title: "Data & Décisionnel",
    description:
      "Exploiter et valoriser la donnée pour orienter vos prises de décision stratégiques.",
    image: "/images/data.webp",
    slug: "data-decisionnel",
  },
  {
    id: "cloud",
    title: "Cloud & Infrastructure",
    description:
      "Maîtriser les architectures modernes et sécurisées dans le Cloud.",
    image: "/images/cloud.webp",
    slug: "cloud-infrastructure",
  },
];

export function FormationsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;

      if (direction === "right") {
        // Si on atteint la fin, retour au début
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
      } else {
        // Si on est au début, aller à la fin
        if (scrollLeft <= 0) {
          scrollContainerRef.current.scrollTo({ left: scrollWidth, behavior: "smooth" });
        } else {
          scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        }
      }
    }
  };

  // Défilement automatique
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      handleScroll("right");
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16 overflow-hidden">
      <div className="mx-auto max-w-357.5">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-8 sm:mb-10 sr-header">
          <div className="flex flex-col items-start gap-3 sm:gap-4 max-w-3xl">
            <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-6 py-2 text-base sm:text-lg font-semibold text-slate-800 shadow-sm">
              Nos formations
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-primary leading-[1.15]">
              Des formations conçues <br />
              pour{" "}
              <span className="text-slate-500 font-medium">
                développer vos compétences
              </span>
            </h2>
          </div>

          {/* Navigation Slider Buttons */}
          <div className="hidden md:flex items-center gap-3 self-end">
            <button
              type="button"
              onClick={() => handleScroll("left")}
              aria-label="Formations précédentes"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-50 hover:border-slate-300 active:scale-95 cursor-pointer"
            >
              <ChevronLeft size={24} strokeWidth={2.5} />
            </button>

            <button
              type="button"
              onClick={() => handleScroll("right")}
              aria-label="Formations suivantes"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-md transition-all duration-200 hover:bg-dark-bleu active:scale-95 cursor-pointer"
            >
              <ChevronRight size={24} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Carousel avec événements de survol pour pause */}
        <div
          ref={scrollContainerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="flex gap-6 sm:gap-8 overflow-x-auto pb-6 pt-2 scroll-smooth snap-x snap-mandatory scrollbar-none"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {formationsData.map((formation) => (
            <div
              key={formation.id}
              className="group relative h-95 sm:h-105 lg:h-112.5 w-70 sm:w-85 lg:w-105 shrink-0 overflow-hidden rounded-3xl sm:rounded-[30px] bg-slate-900 select-none snap-start shadow-lg transition-transform duration-300 hover:scale-[1.01]"
            >
              <Image
                src={formation.image}
                alt={formation.title}
                fill
                quality={85}
                sizes="(max-width: 640px) 280px, (max-width: 1024px) 340px, 420px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-linear-to-b from-black/70 via-transparent to-black/90" />

              <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-8">
                <h3 className="text-2xl sm:text-[26px] font-bold text-white tracking-tight leading-snug">
                  {formation.title}
                </h3>

                <p className="text-sm sm:text-base text-slate-100/95 font-normal leading-relaxed">
                  {formation.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="mt-8 sm:mt-10 flex justify-start">
          <Link
            href="/formations"
            className="inline-flex items-center gap-2.5 rounded-full bg-brand-gold hover:bg-dark-gold px-8 sm:px-10 py-3.5 sm:py-4 text-base font-semibold text-white shadow-xl shadow-brand-gold/20 transition-all duration-200 hover:shadow-brand-gold/35 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>En savoir plus</span>
            <Info size={20} strokeWidth={2.5} />
          </Link>
        </div>

      </div>
    </section>
  );
}