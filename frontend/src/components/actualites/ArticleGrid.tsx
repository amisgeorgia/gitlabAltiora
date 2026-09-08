"use client"

import {motion} from "framer-motion"
import { Article } from "@/data/articles"
import { ArticleCard } from "./ArticleCard"

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

interface ArticleGridProps {
  articles: Article[];
}

export function ArticleGrid({ articles }: ArticleGridProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10"
    >
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </motion.div>
  );
}