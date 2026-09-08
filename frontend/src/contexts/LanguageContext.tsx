'use client';

import React, { createContext, useContext, useSyncExternalStore, useCallback } from 'react';
import { translations, Language, TranslationKey } from '@/i18n/translations';

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (key: TranslationKey | string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'fr',
  toggleLang: () => {},
  t: (key) => key,
});

let langListeners: Array<() => void> = [];

function emitChange() {
  for (const listener of langListeners) {
    listener();
  }
}

function subscribe(listener: () => void) {
  langListeners.push(listener);
  return () => {
    langListeners = langListeners.filter((l) => l !== listener);
  };
}

function getStoredLang(): Language {
  try {
    const stored = localStorage.getItem('lang') as Language;
    if (stored === 'fr' || stored === 'en') return stored;
  } catch {
    // ignore
  }
  return 'fr';
}

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const lang = useSyncExternalStore(subscribe, getStoredLang, () => 'fr' as Language);

  // Basculer de langue et enregistrer proprement
  const toggleLang = useCallback(() => {
    const nextLang = lang === 'fr' ? 'en' : 'fr';
    try {
      localStorage.setItem('lang', nextLang);
    } catch {
      // ignore
    }
    emitChange();
  }, [lang]);

  // Fonction de traduction sécurisée (avec fallback)
  const t = useCallback(
    (key: TranslationKey | string): string => {
      const dictionary = translations[lang] || translations.fr;
      return (dictionary as Record<string, string>)[key] || key;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);