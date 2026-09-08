"use client";

import { Search } from "lucide-react";

export function FormationsFilterSection() {
  return (
    <div id="catalogue" className="flex flex-col md:flex-row items-center gap-4 mb-10 bg-[#f8f6f3] dark:bg-slate-800 p-2 rounded-2xl md:rounded-full">
      <div className="relative flex-1 w-full">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        <input
          type="text"
          placeholder="Recherche une formation (IA, ...)"
          className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-700 border-none rounded-xl md:rounded-l-full focus:ring-2 focus:ring-gold-500 text-slate-700 dark:text-slate-200 shadow-sm"
        />
      </div>
      <div className="flex flex-wrap items-center gap-2 p-2 w-full md:w-auto">
        <button className="px-5 py-2.5 bg-blue-950 text-white rounded-full text-sm font-semibold shadow-md">Tous</button>
        <button className="px-5 py-2.5 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-full text-sm font-semibold transition-colors">Technologie</button>
        <button className="px-5 py-2.5 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-full text-sm font-semibold transition-colors">Management</button>
        <button className="px-5 py-2.5 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-full text-sm font-semibold transition-colors">Design</button>
      </div>
    </div>
  );
}