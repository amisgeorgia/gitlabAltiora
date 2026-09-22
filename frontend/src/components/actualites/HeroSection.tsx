"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 pt-0 pb-8 sm:pb-12">
      <div className="mx-auto max-w-357.5">
        {/* Conteneur principal arrondi */}
        <div className="relative overflow-hidden rounded-4xl sm:rounded-[40px] lg:rounded-[48px] h-87.5 md:h-112 shadow-2xl border border-slate-800/40">
          
          {/* Image de fond très claire & visible */}
          <div className="absolute inset-0">
            <Image
              src="/images/ressource.avif"
              alt="Actualités"
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1430px"
              className="object-cover object-center transition-transform duration-700 hover:scale-105"
            />
            {/* Dégradé très léger uniquement sous le texte à gauche */}
            <div className="absolute inset-0 bg-linear-to-r from-[#0B1528]/75 via-[#0B1528]/35 to-transparent" />
          </div>

          {/* Contenu textuel avec ombre portante */}
          <div className="relative h-full p-6 sm:p-10 md:p-14 lg:p-16 flex flex-col justify-center z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="max-w-3xl"
            >
              {/* Badge */}
              <div className="mb-4 sm:mb-6">
                <span className="inline-flex items-center rounded-full border border-[#C59B27]/60 bg-[#0B1528]/80 backdrop-blur-md px-4 py-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#C59B27] shadow-md">
                  ACTUALITÉS
                </span>
              </div>

              {/* Titre avec ombre de texte renforcée */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4 sm:mb-6 [text-shadow:0_2px_10px_rgba(0,0,0,0.7)]">
                Actualités & <span className="text-[#C59B27]">Ressources</span>
              </h1>

              {/* Paragraphe avec ombre de texte */}
              <p className="text-slate-100 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl font-medium [text-shadow:0_1px_6px_rgba(0,0,0,0.8)]">
                Plongez au cœur des tendances en matière de transformation digitale, d&apos;intelligence artificielle et d&apos;innovation d&apos;entreprise. Des aperçus pointus pour guider votre stratégie.
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}