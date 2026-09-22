"use client";

import React from "react";
import { Search } from "lucide-react";

export function FormationsFilterSection() {
  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 py-4">
      {/* Wrapper aligné sur max-w-357.5 (~1430px) */}
      <div className="mx-auto w-full max-w-357.5">
        <div
          id="catalogue"
          className="flex flex-col lg:flex-row items-center gap-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md p-3 sm:p-3.5 rounded-3xl lg:rounded-full shadow-xs border border-slate-200/80 dark:border-slate-700/80"
        >
          {/* Champ de recherche */}
          <div className="relative flex-1 w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher une formation (IA, ...)"
              className="w-full pl-11 pr-4 py-2.5 bg-transparent border-none focus:ring-0 text-slate-700 dark:text-slate-200 text-sm font-medium outline-none placeholder:text-slate-400"
            />
          </div>

          {/* Filtres de catégorie (scroll horizontal sur petit écran) */}
          <div className="flex items-center gap-2 p-1 w-full lg:w-auto overflow-x-auto no-scrollbar scroll-smooth pb-1 lg:pb-0">
            <button className="whitespace-nowrap shrink-0 px-5 py-2.5 bg-[#0B1F4D] text-white rounded-full text-xs sm:text-sm font-bold shadow-xs hover:bg-[#C59B27] transition-colors">
              Tous
            </button>
            <button className="whitespace-nowrap shrink-0 px-5 py-2.5 bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60 rounded-full text-xs sm:text-sm font-medium transition-colors">
              Technologie
            </button>
            <button className="whitespace-nowrap shrink-0 px-5 py-2.5 bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60 rounded-full text-xs sm:text-sm font-medium transition-colors">
              Management
            </button>
            <button className="whitespace-nowrap shrink-0 px-5 py-2.5 bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60 rounded-full text-xs sm:text-sm font-medium transition-colors">
              Design
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}