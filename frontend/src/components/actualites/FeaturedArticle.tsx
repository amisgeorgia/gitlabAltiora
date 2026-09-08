"use client"

import Link from "next/link"
import { Calendar, ArrowRight, Clock } from "lucide-react"
import {motion} from "framer-motion"
import { Article } from "@/data/articles"
import { ImageSlider } from "../common/ImageSlider"

interface FeaturedArticleProps {
  article: Article;
}

export function FeaturedArticle({ article }: FeaturedArticleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-10"
    >
      <Link
        href={`/actualites/${article.id}`}
        className="group bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 dark:border-slate-700 transition-all duration-300 flex flex-col lg:flex-row h-full"
      >
        <div className="relative w-full lg:w-1/2 h-56 lg:h-auto overflow-hidden">
          <ImageSlider images={article.images} alt={article.title} interval={5000} />
        </div>
        <div className="p-6 lg:p-8 w-full lg:w-1/2 flex flex-col justify-center">
          <div className="flex flex-wrap items-center gap-4 text-sm font-medium mb-6">
            <span className="text-gold-500 uppercase tracking-wider font-bold">
              {article.category}
            </span>
            <span className="text-slate-400 flex items-center">
              <Calendar className="h-4 w-4 mr-1.5" /> {article.date}
            </span>
            <span className="text-slate-400 flex items-center">
              <Clock className="h-4 w-4 mr-1.5" /> {article.readTime || "5 min"}
            </span>
          </div>
          <h2 className="text-xl lg:text-3xl font-extrabold text-blue-950 dark:text-white mb-6 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors leading-tight">
            {article.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-5 text-base leading-relaxed line-clamp-3">
            {article.excerpt}
          </p>
          <div>
            <span className="inline-flex items-center px-6 py-3 bg-gold-500 text-blue-950 font-bold rounded-xl group-hover:bg-gold-600 transition-colors">
              Lire l'article <ArrowRight className="ml-2 h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}