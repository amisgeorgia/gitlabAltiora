"use client"

import { Search } from "lucide-react"

export function FilterBar() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 mb-8 bg-white dark:bg-slate-800 p-2 rounded-2xl md:rounded-full shadow-sm border border-slate-100 dark:border-slate-700">
      <div className="relative flex-1 w-full">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        <input
          type="text"
          placeholder="Rechercher un article..."
          className="w-full pl-11 pr-4 py-3 bg-transparent border-none focus:ring-0 text-slate-700 dark:text-slate-200 outline-none"
        />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2 p-2 w-full md:w-auto">
        <button className="px-5 py-2.5 bg-blue-950 text-white rounded-full text-sm font-semibold shadow-md">
          Tous
        </button>
        <button className="px-5 py-2.5 bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full text-sm font-semibold transition-colors">
          Intelligence Artificielle
        </button>
        <button className="px-5 py-2.5 bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full text-sm font-semibold transition-colors">
          Transformation Digitale
        </button>
        <button className="px-5 py-2.5 bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full text-sm font-semibold transition-colors">
          Formation
        </button>
      </div>
    </div>
  );
}