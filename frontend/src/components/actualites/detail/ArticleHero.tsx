"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar } from "lucide-react";
import { Article } from "@/data/articles";

interface ArticleHeroProps {
  article: Article;
}

export function ArticleHero({ article }: ArticleHeroProps) {
  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 pt-0 pb-8 sm:pb-12">
      <div className="mx-auto max-w-357.5">
        {/* Conteneur principal avec coins arrondis et ombre */}
        <div className="relative overflow-hidden rounded-4xl sm:rounded-[40px] lg:rounded-[48px] h-[50vh] min-h-105 md:h-112 shadow-2xl border border-slate-800/40">
          
          {/* Image de fond avec dégradé subtil pour préserver les couleurs */}
          <div className="absolute inset-0">
            <Image
              src={article.images[0]}
              alt={article.title}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1430px"
              className="object-cover object-center"
            />
            {/* Dégradé doux : sombre en bas à gauche sous le texte, transparent en haut et à droite */}
            <div className="absolute inset-0 bg-linear-to-t from-[#0B1528]/90 via-[#0B1528]/40 to-transparent" />
          </div>

          {/* Contenu textuel positionné en bas avec ombre de texte */}
          <div className="relative h-full p-6 sm:p-10 md:p-12 lg:p-14 flex flex-col justify-end z-10">
            <div className="max-w-4xl">
              
              {/* Bouton retour */}
              <Link
                href="/actualites"
                className="inline-flex items-center text-white hover:text-[#C59B27] font-semibold text-sm transition-colors mb-4 sm:mb-6 [text-shadow:0_1px_4px_rgba(0,0,0,0.8)]"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Retour aux actualités
              </Link>

              {/* Badge et Date */}
              <div className="mb-4 flex flex-wrap items-center gap-3 sm:gap-4">
                <span className="px-4 py-1.5 bg-[#C59B27] text-[#0B1F4D] text-xs sm:text-sm font-bold rounded-full uppercase tracking-wider shadow-md">
                  {article.category}
                </span>
                <span className="text-white flex items-center text-xs sm:text-sm font-medium [text-shadow:0_1px_4px_rgba(0,0,0,0.8)]">
                  <Calendar className="h-4 w-4 mr-2 text-[#C59B27]" /> {article.date}
                </span>
              </div>

              {/* Titre avec lisibilité garantie sur l'image */}
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight [text-shadow:0_2px_10px_rgba(0,0,0,0.8)]">
                {article.title}
              </h1>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}