"use client"

import {motion} from "framer-motion"

export function ContactHero() {
  return (
    <div className="bg-[#0f172a] text-white pt-24 pb-32 px-4 transition-colors duration-300">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
            Construisons ensemble votre<br />
            <span className="text-gold-500">avenir numérique.</span>
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed">
            ALTIORA CONNECT accompagne les entreprises, institutions et organisations
            grâce à une expertise multidisciplinaire combinant conseil stratégique,
            formation professionnelle, transformation digitale et solutions technologiques innovantes.
          </p>
        </motion.div>
      </div>
    </div>
  );
}