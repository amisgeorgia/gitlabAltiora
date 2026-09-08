"use client"

import Link from "next/link"
import { ArrowLeft, Clock, Users, Calendar } from "lucide-react"
import { FormationDetail } from "@/data/formationsSlug"

interface FormationHeaderProps {
  formation: FormationDetail;
}

export function FormationHeader({ formation }: FormationHeaderProps) {
  return (
    <div className="bg-[#0D1322] text-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300 py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-8 max-w-4xl">
        <Link 
          href="/formations" 
          className="inline-flex items-center text-slate-500 dark:text-slate-400 hover:text-blue-950 dark:hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Retour aux formations
        </Link>
        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-gold-100 text-gold-800 text-xs font-semibold rounded-full">
            {formation.category}
          </span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-blue-950 dark:text-white tracking-tight mb-6">
          {formation.title}
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
          {formation.summary}
        </p>
        
        <div className="flex-wrap items-center gap-6 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 transition-colors duration-300 inline-flex">
          <div className="flex items-center">
            <Clock className="mr-2 h-5 w-5 text-gold-500" />
            <div>
              <span className="block text-xs text-slate-400">Durée</span>
              {formation.duration}
            </div>
          </div>
          <div className="w-px h-8 bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>
          <div className="flex items-center">
            <Users className="mr-2 h-5 w-5 text-gold-500" />
            <div>
              <span className="block text-xs text-slate-400">Niveau</span>
              {formation.level}
            </div>
          </div>
          <div className="w-px h-8 bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>
          <div className="flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-gold-500" />
            <div>
              <span className="block text-xs text-slate-400">Prochaine session</span>
              Sur demande
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}