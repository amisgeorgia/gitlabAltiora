'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Language>('fr');

  // 1. Initialisation unique au montage client
  useEffect(() => {
    try {
      const stored = localStorage.getItem('lang') as Language;
      if (stored && (stored === 'fr' || stored === 'en')) {
        setLang(stored);
      }
    } catch (e) {
      // Sécurité si localStorage n'est pas accessible
    }
  }, []);

  // 2. Basculer de langue et enregistrer proprement
  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const nextLang = prev === 'fr' ? 'en' : 'fr';
      try {
        localStorage.setItem('lang', nextLang);
      } catch (e) {}
      return nextLang;
    });
  }, []);

  // 3. Fonction de traduction sécurisée (avec fallback)
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