"use client";

import { motion } from "framer-motion";
import { FormationCard, Formation } from "./FormationsCard";

interface FormationsGridProps {
  formations: Formation[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export function FormationsGridSection({ formations }: FormationsGridProps) {
  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <div className="mx-auto max-w-357.5">
        {/* Conteneur arrondi avec fond dégradé */}
        <div className="relative overflow-hidden rounded-4xl sm:rounded-[40px] lg:rounded-[48px] bg-linear-to-br from-[#EFF2FB] via-[#ECEFFA] to-[#F4F1FA] border border-white/80 p-6 sm:p-10 md:p-12 lg:p-16 shadow-[0_20px_50px_rgba(11,31,77,0.05)]">
          
          {/* Halos lumineux d'arrière-plan */}
          <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-purple-400/10 blur-3xl" />

          <div className="relative z-10 w-full">
            
            {/* Header de la section */}
            <div className="mx-auto max-w-3xl text-center mb-10 sm:mb-14">
              <div className="inline-flex items-center rounded-full bg-[#C59B27] px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-[13px] font-bold uppercase tracking-wider text-white shadow-xs shadow-[#C59B27]/25 mb-3 sm:mb-4">
                NOS FORMATIONS
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-[#0B1F4D] mb-4 sm:mb-6">
                Développez vos compétences avec <span className="text-[#C59B27]">nos programmes</span>
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
                Découvrez nos formations conçues pour vous apporter des connaissances pratiques et immédiatement applicables dans votre domaine.
              </p>
            </div>

            {/* Grille dynamisée par vos props */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {formations.map((formation) => (
                <FormationCard key={formation.id} formation={formation} />
              ))}
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}