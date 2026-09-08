"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export function FormationsPagination() {
  return (
    <div className="flex justify-center items-center gap-2 mb-20">
      <button className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-blue-950 dark:hover:text-white transition-colors">
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button className="w-10 h-10 rounded-xl bg-blue-950 text-white font-bold flex items-center justify-center shadow-md">
        1
      </button>
      <button className="w-10 h-10 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold flex items-center justify-center transition-colors">
        2
      </button>
      <button className="w-10 h-10 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold flex items-center justify-center transition-colors">
        3
      </button>
      <button className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-blue-950 dark:hover:text-white transition-colors">
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}