"use client";

import { FaLinkedinIn, FaTwitter, FaFacebookF } from "react-icons/fa";
// Ou FaXTwitter si vous préférez le nouveau logo de X

export function ShareSidebar() {
  return (
    <div className="hidden md:flex flex-col items-center space-y-4 pt-4 sticky top-32 h-fit w-12">
      <span
        className="text-xs font-semibold text-slate-400 uppercase tracking-widest rotate-180"
        style={{ writingMode: "vertical-rl" }}
      >
        Partager
      </span>
      <div className="w-px h-12 bg-slate-200 dark:bg-slate-700" />

      <button
        aria-label="Partager sur LinkedIn"
        className="h-10 w-10 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:text-blue-950 dark:hover:text-white hover:border-blue-950 dark:hover:border-white transition-all"
      >
        <FaLinkedinIn className="h-4 w-4" />
      </button>

      <button
        aria-label="Partager sur Twitter"
        className="h-10 w-10 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:text-blue-950 dark:hover:text-white hover:border-blue-950 dark:hover:border-white transition-all"
      >
        <FaTwitter className="h-4 w-4" />
      </button>

      <button
        aria-label="Partager sur Facebook"
        className="h-10 w-10 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:text-blue-950 dark:hover:text-white hover:border-blue-950 dark:hover:border-white transition-all"
      >
        <FaFacebookF className="h-4 w-4" />
      </button>
    </div>
  );
}