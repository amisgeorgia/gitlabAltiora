"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { ContactTooltips } from "./ContactTooltips";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t-4 border-gold-500 py-4 md:py-6 bg-[#0D1322] dark:bg-slate-950 text-slate-300 dark:border-slate-800 transition-colors duration-300 relative">
      <div className="container mx-auto px-4 sm:px-8 flex flex-col items-center">
        {/* Slogans */}
        <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-1 sm:mb-2 text-gold-400 font-bold tracking-[0.2em] text-xs sm:text-sm">
          <span>INNOVER</span>
          <span className="text-gold-500">•</span>
          <span>OPTIMISER</span>
          <span className="text-gold-500">•</span>
          <span>RÉUSSIR</span>
        </div>

        <h2 className="text-white text-sm sm:text-lg md:text-xl font-bold tracking-wide uppercase text-center mb-2 sm:mb-4">
          ENSEMBLE, TRANSFORMONS VOS AMBITIONS EN <span className="text-gold-500">RÉSULTATS CONCRETS</span>
        </h2>

        {/* Grille 3 Colonnes */}
        <div className="w-full max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-3 gap-4 mb-2 sm:mb-4 border-t border-slate-700/50 pt-2 sm:pt-4">
          {/* Colonne 1: Navigation */}
          <div className="flex flex-col items-start text-left">
            <h3 className="text-gold-500 font-bold mb-2 uppercase tracking-wider text-sm">Navigation</h3>
            <ul className="space-y-1 sm:space-y-1.5 text-xs sm:text-sm text-slate-300">
              <li><Link href="/" className="hover:text-white hover:translate-x-1 inline-block transition-transform">{t("nav.home") || "Accueil"}</Link></li>
              <li><Link href="/a-propos" className="hover:text-white hover:translate-x-1 inline-block transition-transform">{t("nav.about")}</Link></li>
              <li><Link href="/expertises" className="hover:text-white hover:translate-x-1 inline-block transition-transform">{t("nav.expertises")}</Link></li>
              <li><Link href="/formations" className="hover:text-white hover:translate-x-1 inline-block transition-transform">{t("nav.formations")}</Link></li>
              <li><Link href="/actualites" className="hover:text-white hover:translate-x-1 inline-block transition-transform">{t("nav.news")}</Link></li>
              <li><Link href="/contact" className="hover:text-white hover:translate-x-1 inline-block transition-transform">{t("nav.contact")}</Link></li>
            </ul>
          </div>

          {/* Colonne 2: Expertises & Formations */}
          <div className="flex flex-col items-start text-left">
            <h3 className="text-gold-500 font-bold mb-2 uppercase tracking-wider text-sm">Expertises & Formations</h3>
            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-slate-300">
              <div>
                <Link href="/expertises" className="font-semibold text-white hover:text-gold-400 mb-1 block">{t("expertises.title") || "Nos Expertises"}</Link>
                <ul className="space-y-0.5 sm:space-y-1 text-slate-400 md:pl-3 md:border-l-2 md:border-gold-500/30">
                  <li><Link href="/expertises" className="hover:text-white transition-colors">{t("footer.expertise.1")}</Link></li>
                  <li><Link href="/expertises" className="hover:text-white transition-colors">{t("footer.expertise.2")}</Link></li>
                  <li><Link href="/expertises" className="hover:text-white transition-colors">{t("footer.expertise.3")}</Link></li>
                </ul>
              </div>
              <div>
                <Link href="/formations" className="font-semibold text-white hover:text-gold-400 mb-1 block">{t("formations.title") || "Nos Formations"}</Link>
                <ul className="space-y-0.5 sm:space-y-1 text-slate-400 md:pl-3 md:border-l-2 md:border-gold-500/30">
                  <li><Link href="/formations" className="hover:text-white transition-colors">Intelligence Artificielle</Link></li>
                  <li><Link href="/formations" className="hover:text-white transition-colors">Management & Stratégie</Link></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Colonne 3: Contact & Légal */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left col-span-2 lg:col-span-1 pt-2 lg:pt-0 border-t border-slate-700/50 lg:border-0">
            <h3 className="text-gold-500 font-bold mb-2 uppercase tracking-wider text-sm">Contactez-nous</h3>
            <ContactTooltips />

            <h3 className="text-gold-500 font-bold mb-2 uppercase tracking-wider text-sm">Informations Légales</h3>
            <div className="flex flex-row flex-wrap justify-center lg:justify-start gap-x-4 gap-y-1 sm:gap-y-2 text-xs sm:text-sm text-slate-300">
              <Link href="/mentions-legales" className="hover:text-white flex items-center transition-colors">
                <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-gold-500 mr-2" />
                {t("footer.terms")}
              </Link>
              <Link href="/politique-de-confidentialite" className="hover:text-white flex items-center transition-colors">
                <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-gold-500 mr-2" />
                {t("footer.privacy_policy")}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="w-full max-w-5xl mx-auto pt-1 sm:pt-3 border-t border-slate-700/50 flex flex-col items-center">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mb-1 sm:mb-2 text-[8px] sm:text-xs md:text-sm font-bold tracking-widest text-slate-300">
            <div className="flex items-center"><span className="mr-2">👥</span> PROFESSIONNALISME</div>
            <span className="text-gold-500 hidden sm:inline">•</span>
            <div className="flex items-center"><span className="mr-2">🤝</span> ENGAGEMENT</div>
            <span className="text-gold-500 hidden sm:inline">•</span>
            <div className="flex items-center"><span className="mr-2">📈</span> PERFORMANCE</div>
          </div>
          <p className="text-center text-[9px] sm:text-xs text-slate-500">
            © {new Date().getFullYear()} ALTIORA PREST. {t("footer.all_rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}