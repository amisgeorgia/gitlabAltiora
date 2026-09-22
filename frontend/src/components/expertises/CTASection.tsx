"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export function CTASection() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mx-auto max-w-350">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-linear-to-br from-[#EFF2FB] via-[#ECEFFA] to-[#F4F1FA] border border-white/80 rounded-3xl sm:rounded-[36px] lg:rounded-[44px] p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xs"
        >
          {/* Halos d'ambiance */}
          <div className="pointer-events-none absolute -top-20 -left-20 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-[#C59B27]/10 blur-3xl" />

          <div className="relative z-10 flex-1 max-w-2xl text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#0B1F4D] tracking-tight mb-4">
              Donnons vie à votre prochain projet.
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Échangeons ensemble afin de construire une solution adaptée aux besoins de votre organisation.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full lg:w-auto shrink-0 justify-center">
            <Link 
              href="/contact" 
              className="px-8 py-4 bg-[#0B1F4D] text-white rounded-xl font-bold hover:bg-[#071433] transition-colors shadow-md text-center"
            >
              Demander un accompagnement
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-4 bg-[#C59B27] text-white rounded-xl font-bold hover:bg-[#b08a20] transition-colors shadow-md shadow-[#C59B27]/20 text-center"
            >
              Nous contacter
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}