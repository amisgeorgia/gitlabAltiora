"use client";

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
    <div className="container mx-auto max-w-7xl mb-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-950 dark:text-white mb-4">
          Pourquoi faire confiance à <span className="text-gold-500">Altiora Connect</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-lg">
          Nous accompagnons les entreprises, institutions et organisations dans leur transformation digitale.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {TRUST_REASONS.map((item, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            whileHover={{ y: -5 }}
            className="group relative bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gold-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-700 flex items-center justify-center mb-6 group-hover:bg-gold-50 dark:group-hover:bg-slate-700 transition-colors">
              <item.icon className="h-7 w-7 text-blue-950 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-blue-950 dark:text-white mb-3">{item.title}</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}