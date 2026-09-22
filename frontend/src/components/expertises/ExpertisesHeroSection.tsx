"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function ExpertisesHeroSection() {
  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 pt-0 pb-4 sm:pb-6">
      <div className="mx-auto max-w-357.5">
        {/* Container sombre avec coins arrondis et effets de lumière */}
        <div className="relative overflow-hidden rounded-4xl sm:rounded-[40px] lg:rounded-[48px] bg-[#05112B] text-white p-6 sm:p-10 md:p-14 lg:p-16 border border-white/10 shadow-2xl">
          
          {/* Halos lumineux d'arrière-plan */}
          <div className="pointer-events-none absolute -top-40 -left-40 h-125 w-125 rounded-full bg-blue-600/15 blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-40 -right-40 h-125 w-125 rounded-full bg-[#C59B27]/10 blur-[120px]" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 max-w-3xl"
          >
            <div className="inline-flex items-center rounded-full bg-[#C59B27]/20 border border-[#C59B27]/40 px-4 py-1.5 text-xs sm:text-sm font-bold tracking-widest text-[#C59B27] uppercase mb-4 sm:mb-6">
              EXPERTISES & SOLUTIONS
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-4 sm:mb-6">
              Nos <span className="text-[#C59B27]">Expertises</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 leading-relaxed font-normal">
              ALTIORA CONNECT accompagne les entreprises, institutions et organisations 
              grâce à une expertise multidisciplinaire combinant conseil stratégique, 
              formation professionnelle, transformation digitale et solutions technologiques innovantes.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/formations"
                className="inline-flex items-center justify-center px-7 py-3.5 sm:py-4 bg-[#C59B27] text-[#05112B] font-bold rounded-full hover:bg-[#b08920] transition-all duration-300 shadow-lg shadow-[#C59B27]/20 hover:scale-[1.02] active:scale-[0.98]"
              >
                Découvrir nos formations
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-7 py-3.5 sm:py-4 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 hover:border-white/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                Nous contacter
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}