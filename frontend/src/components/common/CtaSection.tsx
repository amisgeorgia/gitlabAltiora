"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function CtaSection() {
  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mx-auto max-w-357.5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative overflow-hidden rounded-4xl sm:rounded-[40px] lg:rounded-[48px] bg-linear-to-br from-[#EFF2FB] via-[#ECEFFA] to-[#F4F1FA] border border-white/80 p-8 sm:p-12 md:p-14 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xs"
        >
          {/* Halos d'ambiance */}
          <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#C59B27]/10 blur-3xl" />

          {/* Contenu textuel */}
          <div className="relative z-10 flex-1 max-w-3xl text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B1F4D] mb-4 leading-tight">
              Vous avez un projet de <span className="text-[#C59B27]">transformation digitale</span> ?
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
              Nos experts sont à votre disposition pour analyser vos besoins et concevoir une stratégie sur-mesure pour propulser votre entreprise.
            </p>
          </div>

          {/* Boutons d'action */}
          <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full lg:w-auto shrink-0 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-[#0B1F4D] text-white rounded-xl font-bold hover:bg-[#071433] transition-colors shadow-md text-center text-sm"
            >
              Demander un accompagnement
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-[#C59B27] text-white rounded-xl font-bold hover:bg-[#b08a20] transition-colors shadow-md shadow-[#C59B27]/20 text-center text-sm"
            >
              Nous contacter
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}