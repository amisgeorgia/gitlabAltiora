"use client"

import Link from "next/link"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import {motion} from "framer-motion"
import { Article } from "@/data/articles"
import { ImageSlider } from "../common/ImageSlider"

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <motion.div variants={itemVariants} className="h-full">
      <Link
        href={`/actualites/${article.id}`}
        className="group bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:-translate-y-1"
      >
        <div className="relative h-48 overflow-hidden">
          <ImageSlider
            images={article.images}
            alt={article.title}
            interval={5000}
          />
        </div>

        <div className="p-5 flex-1 flex flex-col">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">
            <div className="flex items-center">
              <Calendar className="h-3.5 w-3.5 mr-1.5" /> {article.date}
            </div>
            <div className="flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1.5" /> {article.readTime || "8 min"}
            </div>
          </div>

          <h2 className="text-lg font-bold text-blue-950 dark:text-white mb-2 line-clamp-2 leading-tight group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
            {article.title}
          </h2>

          <p className="text-slate-600 dark:text-slate-400 mb-4 flex-1 text-sm leading-snug line-clamp-2">
            {article.excerpt}
          </p>

          <div className="mt-auto">
            <span className="inline-flex items-center px-5 py-2.5 bg-gold-500 text-blue-950 text-sm font-bold rounded-lg group-hover:bg-gold-600 transition-colors">
              Lire l&apos;article{" "}
              <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}