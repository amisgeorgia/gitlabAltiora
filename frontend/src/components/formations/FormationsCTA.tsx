"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function FormationsCTA() {
  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 overflow-hidden">
      {/* Conteneur aligné sur la largeur globale max-w-357.5 */}
      <div className="mx-auto max-w-357.5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#f8f6f3] dark:bg-slate-800 rounded-3xl sm:rounded-[2.5rem] p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-200/60 dark:border-slate-700/50 shadow-xs"
        >
          <div className="flex-1 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 dark:text-white mb-4">
              Une formation sur mesure ?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Nous adaptons nos contenus à vos besoins spécifiques et aux enjeux de votre secteur. Contactez nos conseillers pédagogiques pour un devis personnalisé.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto shrink-0">
            <Link
              href="/contact"
              className="px-6 py-4 bg-blue-950 text-white rounded-xl font-semibold hover:bg-blue-900 transition-colors shadow-lg text-center"
            >
              Demander un accompagnement
            </Link>
            <Link
              href="/contact"
              className="px-6 py-4 bg-gold-500 text-blue-950 rounded-xl font-semibold hover:bg-gold-600 transition-colors shadow-lg text-center"
            >
              Prendre rendez-vous
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}