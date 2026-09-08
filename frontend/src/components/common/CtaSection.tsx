"use client"

import Link from "next/link"
import {motion} from "framer-motion"

export function CtaSection() {
  return (
    <div className="container mx-auto px-4 sm:px-8 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-[#f8f6f3] dark:bg-slate-800 rounded-[2.5rem] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-5 shadow-sm"
      >
        <div className="flex-1 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-950 dark:text-white mb-4">
            Vous avez un projet de transformation digitale ?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Nos experts sont à votre disposition pour analyser vos besoins et concevoir une stratégie sur-mesure pour propulser votre entreprise.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto shrink-0">
          <Link
            href="/contact"
            className="px-8 py-4 bg-blue-950 text-white rounded-xl font-bold hover:bg-blue-900 transition-colors shadow-lg text-center"
          >
            Demander un accompagnement
          </Link>
          <Link
            href="/contact"
            className="px-8 py-4 bg-gold-500 text-blue-950 rounded-xl font-bold hover:bg-gold-600 transition-colors shadow-lg shadow-gold-500/20 text-center"
          >
            Nous contacter
          </Link>
        </div>
      </motion.div>
    </div>
  );
}