"use client";

import { FaLinkedinIn, FaTwitter, FaFacebookF } from "react-icons/fa";

export function ShareSidebar() {
  return (
    <div className="hidden md:flex flex-col items-center space-y-5 pt-4 sticky top-32 h-fit w-14 shrink-0">
      {/* Label vertical légèrement agrandi */}
      <span
        className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest rotate-180"
        style={{ writingMode: "vertical-rl" }}
      >
        Partager
      </span>

      {/* Ligne de séparation allongée */}
      <div className="w-px h-16 bg-slate-200 dark:bg-slate-700" />

      {/* Bouton LinkedIn */}
      <button
        aria-label="Partager sur LinkedIn"
        className="h-12 w-12 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-[#0B1F4D] dark:hover:text-white hover:border-[#0B1F4D] dark:hover:border-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200 hover:scale-110 shadow-sm"
      >
        <FaLinkedinIn className="h-5 w-5" />
      </button>

      {/* Bouton Twitter / X */}
      <button
        aria-label="Partager sur Twitter"
        className="h-12 w-12 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-[#0B1F4D] dark:hover:text-white hover:border-[#0B1F4D] dark:hover:border-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200 hover:scale-110 shadow-sm"
      >
        <FaTwitter className="h-5 w-5" />
      </button>

      {/* Bouton Facebook */}
      <button
        aria-label="Partager sur Facebook"
        className="h-12 w-12 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-[#0B1F4D] dark:hover:text-white hover:border-[#0B1F4D] dark:hover:border-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200 hover:scale-110 shadow-sm"
      >
        <FaFacebookF className="h-5 w-5" />
      </button>
    </div>
  );
}