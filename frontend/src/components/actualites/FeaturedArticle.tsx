"use client";

import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Article } from "@/data/articles";
import { ImageSlider } from "../common/ImageSlider";

interface FeaturedArticleProps {
  article: Article;
}

export function FeaturedArticle({ article }: FeaturedArticleProps) {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-357.5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Link
            href={`/actualites/${article.id}`}
            className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xs rounded-3xl sm:rounded-[36px] lg:rounded-[44px] overflow-hidden border border-white/80 dark:border-slate-700/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col lg:flex-row group hover:-translate-y-1.5 h-full"
          >
            {/* Slider d'images */}
            <div className="relative w-full lg:w-1/2 h-64 sm:h-80 lg:h-auto min-h-70 overflow-hidden">
              <ImageSlider
                images={article.images}
                alt={article.title}
                interval={5000}
              />
            </div>

            {/* Contenu principal */}
            <div className="p-6 sm:p-8 lg:p-12 w-full lg:w-1/2 flex flex-col justify-between">
              <div>
                {/* Tag Catégorie + Métadonnées */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm font-medium mb-4">
                  <span className="inline-flex items-center rounded-full bg-[#C59B27] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-xs shadow-[#C59B27]/25">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                    <Calendar className="h-4 w-4 text-[#C59B27]" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                    <Clock className="h-4 w-4 text-[#C59B27]" />
                    <span>{article.readTime || "5 min"}</span>
                  </div>
                </div>

                {/* Titre principal */}
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1F4D] dark:text-white mb-4 group-hover:text-[#C59B27] transition-colors leading-tight">
                  {article.title}
                </h2>

                {/* Extrait */}
                <p className="text-slate-600 dark:text-slate-300 mb-6 text-sm sm:text-base leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
              </div>

              {/* Bouton pilule d'action */}
              <div className="pt-2">
                <span className="inline-flex items-center justify-center px-6 py-3 bg-[#0B1F4D] text-white text-sm font-bold rounded-full group-hover:bg-[#C59B27] transition-all duration-300 shadow-sm">
                  Lire l'article à la une
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}