"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function CTASection() {
  return (
    <section className="bg-slate-50 dark:bg-slate-900 transition-colors duration-300 pb-10">
      <div className="container mx-auto px-4 sm:px-8 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#f8f6f3] dark:bg-slate-800 rounded-[2.5rem] p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-sm"
        >
          <div className="flex-1 max-w-2xl text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 dark:text-white mb-4">
              Donnons vie à votre prochain projet.
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Échangeons ensemble afin de construire une solution adaptée aux besoins de votre organisation.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto shrink-0 justify-center">
            <Link href="/contact" className="px-8 py-4 bg-blue-950 text-white rounded-xl font-bold hover:bg-blue-900 transition-colors shadow-lg text-center">
              Demander un accompagnement
            </Link>
            <Link href="/contact" className="px-8 py-4 bg-gold-500 text-blue-950 rounded-xl font-bold hover:bg-gold-600 transition-colors shadow-lg shadow-gold-500/20 text-center">
              Nous contacter
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}