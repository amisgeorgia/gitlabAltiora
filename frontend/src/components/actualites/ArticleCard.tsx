"use client";

import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { Article } from "@/data/articles";
import { ImageSlider } from "../common/ImageSlider";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <motion.div
      variants={itemVariants}
      className="bg-white/90 backdrop-blur-xs rounded-3xl overflow-hidden border border-white/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1.5 h-full"
    >
      <Link href={`/actualites/${article.id}`} className="flex flex-col h-full">
        {/* Slider d'images en haut de la carte */}
        <div className="relative h-48 sm:h-52 overflow-hidden">
          <ImageSlider
            images={article.images}
            alt={article.title}
            interval={5000}
          />
        </div>

        {/* Contenu principal */}
        <div className="p-6 flex flex-col flex-1">
          {/* Métadonnées : Date & Temps de lecture */}
          <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 mb-3 font-medium">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-[#C59B27]" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-[#C59B27]" />
              <span>{article.readTime || "8 min"}</span>
            </div>
          </div>

          {/* Titre */}
          <h3 className="text-xl font-bold text-[#0B1F4D] mb-2 group-hover:text-[#C59B27] transition-colors line-clamp-2 leading-tight">
            {article.title}
          </h3>

          {/* Extrait de l'article */}
          <p className="text-slate-600 mb-6 text-sm leading-relaxed line-clamp-2 flex-1">
            {article.excerpt}
          </p>

          {/* Bouton style pilule identique à ExpertisesGridSection */}
          <div className="w-full py-3 text-sm bg-[#0B1F4D] text-white font-bold rounded-full text-center group-hover:bg-[#C59B27] transition-all duration-300 shadow-sm mt-auto">
            Lire l'article
          </div>
        </div>
      </Link>
    </motion.div>
  );
}