"use client";

import Link from "next/link";
import { Clock, BarChart2 } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { ImageSlider } from "@/components/common/ImageSlider";

export interface Formation {
  id: string;
  title: string;
  category: string;
  duration: string;
  level: string;
  summary: string;
  images: string[];
  price: string;
}

interface FormationCardProps {
  formation: Formation;
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export function FormationCard({ formation }: FormationCardProps) {
  return (
    <motion.div
      variants={itemVariants}
      className="bg-white/90 backdrop-blur-xs rounded-3xl overflow-hidden border border-white/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1.5 h-full"
    >
      <Link href={`/formations/${formation.id}`} className="flex flex-col h-full">
        {/* Slider d'images en haut de carte */}
        <div className="relative h-48 sm:h-52 overflow-hidden">
          <ImageSlider images={formation.images} alt={formation.title} interval={5000} />
        </div>

        {/* Contenu principal de la carte */}
        <div className="p-6 flex flex-col flex-1">
          {/* Métadonnées : Durée & Niveau */}
          <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 mb-3 font-medium">
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-[#C59B27]" />
              <span>{formation.duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BarChart2 className="h-4 w-4 text-[#C59B27]" />
              <span>{formation.level}</span>
            </div>
          </div>

          {/* Titre */}
          <h3 className="text-xl font-bold text-[#0B1F4D] mb-2 group-hover:text-[#C59B27] transition-colors line-clamp-2 leading-tight">
            {formation.title}
          </h3>

          {/* Résumé / Description */}
          <p className="text-slate-600 mb-5 text-sm leading-relaxed line-clamp-3 flex-1">
            {formation.summary}
          </p>

          {/* Footer de la carte : Prix + Bouton Action */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200/80 mt-auto gap-4">
            <span className="text-lg font-extrabold text-[#0B1F4D]">
              {formation.price}
            </span>
            <div className="px-5 py-2.5 text-sm bg-[#0B1F4D] text-white font-bold rounded-full group-hover:bg-[#C59B27] transition-all duration-300 shadow-sm shrink-0">
              Voir la formation
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}