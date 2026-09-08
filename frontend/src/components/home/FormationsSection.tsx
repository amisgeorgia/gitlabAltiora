"use client";

import React, { useRef } from "react";
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

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 450;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative w-full bg-white py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Top Header: Badge, Title and Navigation Buttons */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-10 sm:mb-12 sr-header">
          <div className="flex flex-col items-start gap-3 sm:gap-4 max-w-3xl">
            {/* Badge "Nos formations" */}
            <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-8 py-3 text-base sm:text-lg font-semibold text-slate-800 shadow-sm">
              Nos formations
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-primary leading-[1.15]">
              Des formations conçues <br />
              pour{" "}
              <span className="text-slate-500 font-medium">
                développer vos compétences
              </span>
            </h2>
          </div>

          {/* Navigation Slider Buttons (Desktop/Tablette) */}
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

        {/* Carousel / Cards Horizontal Scroll Container */}
        {/* La gauche reste strictement alignée dans le conteneur, la droite s'étend jusqu'au bord exact de l'écran */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 sm:gap-8 overflow-x-auto pb-6 pt-2 scroll-smooth snap-x snap-mandatory scrollbar-none mr-[calc(50%-50vw)] pr-[max(1.5rem,calc(50vw-50%))]"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {formationsData.map((formation) => (
            <div
              key={formation.id}
              className="group relative h-[380px] sm:h-[420px] lg:h-[450px] w-[280px] sm:w-[340px] lg:w-[420px] shrink-0 overflow-hidden rounded-[24px] sm:rounded-[30px] bg-slate-900 select-none snap-start shadow-lg transition-transform duration-300 hover:scale-[1.01]"
            >
              {/* Background Image */}
              <Image
                src={formation.image}
                alt={formation.title}
                fill
                quality={85}
                sizes="(max-width: 640px) 280px, (max-width: 1024px) 340px, 420px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Gradient Overlays for optimal readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-transparent to-black/85" />

              {/* Card Content (Top Title + Bottom Description) */}
              <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-8">
                {/* Title */}
                <h3 className="text-2xl sm:text-[26px] font-bold text-white tracking-tight leading-snug">
                  {formation.title}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base text-slate-100/95 font-normal leading-relaxed">
                  {formation.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Button "En savoir plus" */}
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
