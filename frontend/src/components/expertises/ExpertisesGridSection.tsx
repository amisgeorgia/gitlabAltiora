"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
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

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export function ExpertisesGridSection() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 py-2 sm:py-4">
      <div className="mx-auto max-w-357.5">
        {/* Container arrondi encadré avec fond dégradé clair */}
        <div className="relative overflow-hidden rounded-4xl sm:rounded-[40px] lg:rounded-[48px] bg-linear-to-br from-[#EFF2FB] via-[#ECEFFA] to-[#F4F1FA] border border-white/80 p-6 sm:p-10 md:p-12 lg:p-14 shadow-[0_20px_50px_rgba(11,31,77,0.05)]">
          
          {/* Halos lumineux d'arrière-plan */}
          <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-purple-400/10 blur-3xl" />

          <div className="relative z-10 w-full">
            
            {/* Header de la section */}
            <div className="mx-auto max-w-3xl text-center mb-8 sm:mb-10">
              <div className="inline-flex items-center rounded-full bg-[#C59B27] px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-[13px] font-bold uppercase tracking-wider text-white shadow-xs shadow-[#C59B27]/25 mb-3 sm:mb-4">
                NOS DOMAINES
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-[#0B1F4D] mb-3 sm:mb-4">
                Une expertise adaptée <span className="text-[#C59B27]">à chaque organisation</span>
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
                Chaque projet est unique. Notre équipe mobilise des compétences complémentaires afin de proposer 
                des solutions concrètes, innovantes et durables répondant aux défis spécifiques de chaque 
                organisation.
              </p>
            </div>

            {/* Grille des expertises */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {EXPERTISES_DATA.map((expertise) => (
                <motion.div 
                  key={expertise.id} 
                  variants={itemVariants} 
                  className="bg-white/90 backdrop-blur-xs rounded-3xl overflow-hidden border border-white/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1.5"
                >
                  <Link href={`/expertises/${expertise.id}`} className="flex flex-col h-full">
                    <div className="relative h-48 sm:h-52 overflow-hidden">
                      <ImageSlider images={expertise.images} alt={t(expertise.titleKey as TranslationKey)} interval={5000} />
                    </div>
                    
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-xl font-bold text-[#0B1F4D] mb-2 group-hover:text-[#C59B27] transition-colors line-clamp-1">
                        {t(expertise.titleKey as TranslationKey)}
                      </h3>
                      <p className="text-slate-600 mb-5 text-sm leading-snug line-clamp-2">
                        {t(expertise.descKey as TranslationKey)}
                      </p>
                      
                      <ul className="space-y-2 mb-6 flex-1">
                        {expertise.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start text-sm font-medium text-slate-700">
                            <span className="h-2 w-2 rounded-full bg-[#C59B27] mt-1.5 mr-3 shrink-0"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      <div className="w-full py-3 text-sm bg-[#0B1F4D] text-white font-bold rounded-full text-center group-hover:bg-[#C59B27] transition-all duration-300 shadow-sm">
                        Découvrir
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}