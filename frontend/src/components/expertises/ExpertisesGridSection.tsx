"use client";


import Link from "next/link";
import {motion, Variants} from "framer-motion"
import { ImageSlider } from "../common/ImageSlider";
import { useLanguage } from "@/contexts/LanguageContext";
import { TranslationKey } from "@/i18n/translations";
import { EXPERTISES_DATA } from "@/data/expertises.data";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants:Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export function ExpertisesGridSection() {
const { t } = useLanguage();

  return (
    <section className="bg-slate-50 dark:bg-slate-900 py-10 px-4 transition-colors duration-300">
      <div className="container mx-auto max-w-4xl text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-950 dark:text-white mb-6">
          Une expertise adaptée <span className="text-gold-500">à chaque organisation</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
          Chaque projet est unique. Notre équipe mobilise des compétences complémentaires afin de proposer 
          des solutions concrètes, innovantes et durables répondant aux défis spécifiques de chaque 
          organisation.
        </p>
      </div>

      <div className="container mx-auto max-w-7xl">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {EXPERTISES_DATA.map((expertise) => (
            <motion.div 
              key={expertise.id} 
              variants={itemVariants} 
              className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
            >
              <Link href={`/expertises/${expertise.id}`} className="flex flex-col h-full">
                <div className="relative h-48 overflow-hidden">
                  <ImageSlider images={expertise.images} alt={t(expertise.titleKey as TranslationKey)} interval={4000 + Math.random() * 2000} />
                </div>
                
                <div className="p-5 md:p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-blue-950 dark:text-white mb-2 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors line-clamp-1">
                    {t(expertise.titleKey as TranslationKey)}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm leading-snug line-clamp-2">
                    {t(expertise.descKey as TranslationKey)}
                  </p>
                  
                  <ul className="space-y-1.5 mb-5 flex-1">
                    {expertise.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm font-medium text-slate-700 dark:text-slate-300">
                        <span className="h-2 w-2 rounded-full bg-gold-500 mt-1.5 mr-3 shrink-0"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="w-full py-2.5 text-sm bg-blue-950 dark:bg-slate-700 text-white font-bold rounded-xl text-center group-hover:bg-blue-900 dark:group-hover:bg-slate-600 transition-colors">
                    Découvrir
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
