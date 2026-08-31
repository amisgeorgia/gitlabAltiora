"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function ExpertiseBottomCta() {
  return (
    <section className="relative w-full bg-[#F4F6FC]/60 border-t border-slate-200/60 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1430px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto sr-fade-up">
          
          {/* Titre */}
          <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-bold text-[#0B1F4D] tracking-tight leading-tight mb-4">
            Besoin d&apos;une expertise spécifique ?
          </h2>

          {/* Description */}
          <p className="text-slate-600 text-sm sm:text-base md:text-[17px] leading-relaxed font-normal mb-8 max-w-2xl">
            Nos consultants sont à votre disposition pour vous accompagner et définir avec vous la meilleure approche pour vos projets.
          </p>

          {/* Bouton Nous contacter */}
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2.5 rounded-full bg-[#0B1F4D] hover:bg-[#06132F] px-8 py-3.5 sm:py-4 text-sm sm:text-base font-semibold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Nous contacter</span>
            <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

        </div>
      </div>
    </section>
  );
}

