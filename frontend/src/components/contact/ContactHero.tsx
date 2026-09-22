"use client";

import { motion } from "framer-motion";

export function ContactHero() {
  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 pt-0 pb-12 sm:pb-16 lg:pb-20">
      {/* Conteneur de référence aligné avec max-w-357.5 */}
      <div className="mx-auto max-w-357.5">
        {/* Container sombre avec coins arrondis et effets de lumière */}
        <div className="relative overflow-hidden rounded-4xl sm:rounded-[40px] lg:rounded-[48px] bg-[#05112B] text-white p-8 sm:p-12 md:p-16 lg:p-20 border border-white/10 shadow-2xl">

          {/* Halos lumineux d'arrière-plan */}
          <div className="pointer-events-none absolute -top-40 -left-40 h-125 w-125 rounded-full bg-blue-600/15 blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-40 -right-40 h-125 w-125 rounded-full bg-[#C59B27]/10 blur-[120px]" />

          {/* Carte encapsulée avec coins arrondis, dégradé et ombre de l'image */}
          <div className="mx-auto w-full max-w-350">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative z-10 max-w-3xl"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
                Construisons ensemble votre<br />
                <span className="text-[#C59B27]">avenir numérique.</span>
              </h1>
              <p className="ttext-slate-300 text-base sm:text-lg lg:text-xl mb-10 leading-relaxed font-normal">
                ALTIORA CONNECT accompagne les entreprises, institutions et organisations
                grâce à une expertise multidisciplinaire combinant conseil stratégique,
                formation professionnelle, transformation digitale et solutions technologiques innovantes.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}