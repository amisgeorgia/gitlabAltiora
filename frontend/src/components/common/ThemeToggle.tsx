"use client"

import React, { useSyncExternalStore } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"

const emptySubscribe = () => () => {};

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

// Affichage d'un placeholder pendant l'hydratation côté client pour éviter le clignotement
  if (!mounted) {
    return (
      <button
        type="button"
        className="p-2 rounded-full text-slate-400 opacity-50"
        aria-label="Chargement du thème"
        disabled
      >
        <div className="h-5 w-5 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse" />
      </button>
    );
  }

  const isDark = theme === "dark";

return (
    <button
      onClick={toggleTheme}
      type="button"
      className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
      title={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
      aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-amber-400 transition-transform duration-200 rotate-0 hover:rotate-45" />
      ) : (
        <Moon className="h-5 w-5 text-slate-700 transition-transform duration-200 rotate-0 hover:-rotate-12" />
      )}
    </button>
  );
}