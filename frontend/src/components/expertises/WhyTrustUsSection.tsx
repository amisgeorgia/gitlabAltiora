"use client";

import React from "react";
import { Search, CheckCircle2, Lightbulb, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

const TRUST_REASONS = [
  { icon: Search, title: "Expertise multidisciplinaire", desc: "Une équipe réunissant plusieurs domaines de compétences complémentaires." },
  { icon: CheckCircle2, title: "Solutions personnalisées", desc: "Chaque solution est adaptée aux besoins spécifiques du client." },
  { icon: Lightbulb, title: "Innovation", desc: "Intégration des meilleures pratiques et des technologies récentes." },
  { icon: RefreshCw, title: "Accompagnement durable", desc: "Un suivi continu avant, pendant et après chaque projet." }
];

export function WhyTrustUsSection() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mx-auto max-w-350">
        {/* Conteneur fluide avec fond dégradé et coins arrondis généreux */}
        <div className="relative w-full overflow-hidden rounded-3xl sm:rounded-[36px] lg:rounded-[44px] bg-linear-to-br from-[#EFF2FB] via-[#ECEFFA] to-[#F4F1FA] border border-white/80 p-8 sm:p-12 lg:p-16 shadow-[0_20px_50px_rgba(11,31,77,0.05)]">
          
          {/* Halos d'ambiance */}
          <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-purple-400/10 blur-3xl" />

          <div className="relative z-10 w-full">
            {/* Header */}
            <div className="mx-auto max-w-3xl text-center mb-10 sm:mb-14">
              <div className="inline-flex items-center rounded-full bg-[#C59B27] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-xs shadow-[#C59B27]/25 mb-4">
                NOTRE ENGAGEMENT
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-[#0B1F4D] mb-4">
                Pourquoi faire confiance à <span className="text-[#C59B27]">Altiora Connect</span>
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                Nous accompagnons les entreprises, institutions et organisations dans leur transformation digitale.
              </p>
            </div>

            {/* Grille des cartes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {TRUST_REASONS.map((item, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group relative flex flex-col justify-between bg-white/95 backdrop-blur-xs p-7 lg:p-8 rounded-2xl border border-white/80 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden min-h-65"
                >
                  <div className="absolute bottom-0 left-0 w-full h-1.5 bg-[#C59B27] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  
                  <div>
                    <div className="w-13 h-13 rounded-xl bg-[#0B1F4D]/5 flex items-center justify-center mb-6 group-hover:bg-[#C59B27]/15 transition-colors duration-300">
                      <item.icon className="h-6 w-6 text-[#0B1F4D] group-hover:text-[#C59B27] transition-colors duration-300" />
                    </div>

                    <h3 className="text-lg lg:text-xl font-bold text-[#0B1F4D] mb-3 group-hover:text-[#C59B27] transition-colors duration-300">
                      {item.title}
                    </h3>
                    
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}