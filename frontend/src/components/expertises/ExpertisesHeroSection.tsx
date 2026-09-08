"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function ExpertisesHeroSection() {
  return (
    <section className="bg-[#0f172a] text-white pt-12 pb-10 px-4 transition-colors duration-300">
      <div className="container mx-auto max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">Nos Expertises</h1>
          <p className="text-slate-300 text-lg mb-10 leading-relaxed">
            ALTIORA CONNECT accompagne les entreprises, institutions et organisations 
            grâce à une expertise multidisciplinaire combinant conseil stratégique, 
            formation professionnelle, transformation digitale et solutions technologiques innovantes.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/formations" className="px-6 py-3.5 bg-gold-500 text-blue-950 font-bold rounded-xl hover:bg-gold-400 transition-colors shadow-lg">
              Découvrir nos formations
            </Link>
            <Link href="/contact" className="px-6 py-3.5 border-2 border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">
              Nous contacter
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}