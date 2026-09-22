"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-357.5 flex justify-center items-center gap-2">
        <button className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-[#0B1F4D] dark:hover:text-white transition-colors">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button className="w-10 h-10 rounded-xl bg-[#0B1F4D] text-white font-bold flex items-center justify-center shadow-md">
          1
        </button>
        <button className="w-10 h-10 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold flex items-center justify-center transition-colors">
          2
        </button>
        <button className="w-10 h-10 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold flex items-center justify-center transition-colors">
          3
        </button>
        <button className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-[#0B1F4D] dark:hover:text-white transition-colors">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}