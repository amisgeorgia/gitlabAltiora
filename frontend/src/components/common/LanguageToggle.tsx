"use client"

import React from "react"
import { Globe } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      onClick={toggleLang}
      type="button"
      className="flex items-center text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-gold-600 dark:hover:text-gold-400 transition-colors px-2 py-1.5 rounded-lg hover:bg-transparent dark:hover:bg-slate-800 focus:outline-none"
      title={lang === "fr" ? "Switch to English" : "Passer en français"}
      aria-label={lang === "fr" ? "Switch to English" : "Passer en français"}
    >
      <Globe className="h-4 w-4 mr-1 text-gold-500" />
      <span className="uppercase">{lang}</span>
    </button>
  );
}