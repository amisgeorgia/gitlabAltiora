"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Star } from "lucide-react";
import { motion } from "framer-motion";

export function FormationsHeroSection() {
  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 pt-0 pb-12 sm:pb-16 lg:pb-20">
      {/* Utilisation de max-w-[1400px] pour forcer la largeur maximale exacte */}
      <div className="mx-auto w-full max-w-350">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full overflow-hidden rounded-4xl sm:rounded-[40px] lg:rounded-[48px] bg-[#05112B] text-white p-8 sm:p-12 md:p-14 lg:p-16 border border-white/10 shadow-2xl flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-12"
        >
          {/* Halos lumineux d'arrière-plan */}
          <div className="pointer-events-none absolute -top-40 -left-40 h-125 w-125 rounded-full bg-blue-600/15 blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-40 -right-40 h-125 w-125 rounded-full bg-[#C59B27]/10 blur-[120px]" />

          {/* Colonne de gauche : Contenu textuel */}
          <div className="relative z-10 flex-1 text-center lg:text-left">
            <div className="inline-flex items-center rounded-full bg-[#C59B27]/10 border border-[#C59B27]/40 px-4 py-1.5 text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#C59B27] backdrop-blur-xs mb-6">
              NOS FORMATIONS
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold tracking-tight text-white leading-[1.15] mb-6">
              Développez les <br className="hidden sm:inline" />
              <span className="text-[#C59B27]">compétences de demain.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
              Des programmes certifiants conçus par des experts pour propulser votre carrière et structurer la croissance de votre organisation.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link 
                href="#catalogue" 
                className="w-full sm:w-auto px-8 py-3.5 bg-[#C59B27] hover:bg-[#b08a20] text-white rounded-xl font-bold transition-all duration-300 flex items-center justify-center shadow-lg shadow-[#C59B27]/20 active:scale-95"
              >
                Explorer le catalogue <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link 
                href="#tarifs" 
                className="w-full sm:w-auto px-8 py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/20 rounded-xl font-semibold backdrop-blur-xs transition-all duration-300 text-center active:scale-95"
              >
                Consulter nos tarifs
              </Link>
            </div>
          </div>

          {/* Colonne de droite : Média & Badges */}
          <div className="relative z-10 flex-1 w-full max-w-lg mx-auto">
            <div className="relative rounded-3xl overflow-hidden aspect-video lg:aspect-4/3 shadow-2xl border border-white/10">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
                alt="Formation en cours"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>

            <div 
              className="absolute -bottom-5 -left-4 sm:-bottom-6 sm:-left-6 bg-[#0B1F4D]/90 backdrop-blur-md border border-white/15 p-3 sm:p-4 rounded-2xl shadow-xl flex items-center gap-3 z-10 animate-bounce" 
              style={{ animationDuration: '3s' }}
            >
              <div className="bg-[#C59B27]/20 p-2 rounded-xl">
                <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-[#C59B27]" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-white">Certification</div>
              </div>
            </div>

            <div 
              className="absolute top-1/4 -right-4 sm:-right-6 bg-[#0B1F4D]/90 backdrop-blur-md border border-white/15 p-3 sm:p-4 rounded-2xl shadow-xl flex items-center gap-3 z-10 animate-bounce" 
              style={{ animationDuration: '4s', animationDelay: '1s' }}
            >
              <div className="w-8 h-8 rounded-xl bg-[#C59B27] flex items-center justify-center text-white shadow-xs">
                <Star className="h-4 w-4 fill-current" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-white">98% de satisfaction</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}