"use client";

import Link from "next/link";
import { Clock, BarChart2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export function FormationCard({ formation }: FormationCardProps) {
  return (
    <motion.div variants={itemVariants} className="h-full">
      <Link href={`/formations/${formation.id}`} className="group bg-transparent rounded-3xl overflow-hidden transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
        <div className="relative h-48 sm:h-52 overflow-hidden rounded-3xl mb-4 shadow-sm group-hover:shadow-lg transition-shadow">
          <ImageSlider images={formation.images} alt={formation.title} interval={4000 + Math.random() * 2000} />
        </div>

        <div className="flex-1 flex flex-col px-1">
          <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-3 font-medium">
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-slate-400" /> {formation.duration}
            </div>
            <div className="flex items-center gap-1.5">
              <BarChart2 className="h-4 w-4 text-slate-400" /> {formation.level}
            </div>
          </div>

          <h2 className="text-xl font-bold text-blue-950 dark:text-white mb-3 line-clamp-2 leading-tight group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
            {formation.title}
          </h2>

          <p className="text-slate-600 dark:text-slate-400 mb-6 flex-1 text-sm leading-relaxed line-clamp-3">
            {formation.summary}
          </p>

          <div className="flex items-center justify-between pt-5 border-t border-slate-200 dark:border-slate-800 mt-auto">
            <span className="text-lg font-bold text-slate-800 dark:text-slate-200">
              {formation.price}
            </span>
            <div className="w-10 h-10 rounded-lg bg-gold-500 text-white flex items-center justify-center group-hover:bg-gold-600 transition-colors shadow-md">
              <ArrowRight className="h-5 w-5" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}