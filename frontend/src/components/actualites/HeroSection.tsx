"use client"

import Image from "next/image"
import {motion} from "framer-motion"

export function HeroSection() {
  return (
    <div className="relative w-full h-87.5 md:h-100 mb-8">
      <div className="absolute inset-0">
        <Image
          src="/images/ressource.avif"
          alt="Actualités"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-blue-950/90 to-blue-950/70" />
      </div>

      <div className="relative h-full container mx-auto px-4 sm:px-8 max-w-7xl flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-white/30 text-white font-bold text-xs tracking-wider uppercase mb-6 backdrop-blur-sm">
            ACTUALITÉS
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            Actualités & <span className="text-gold-500">Ressources</span>
          </h1>
          <p className="text-lg text-slate-200 leading-relaxed max-w-2xl">
            Plongez au cœur des tendances en matière de transformation digitale, d&apos;intelligence artificielle et d&apos;innovation d&apos;entreprise. Des insights pointus pour guider votre stratégie.
          </p>
        </motion.div>
      </div>
    </div>
  );
}