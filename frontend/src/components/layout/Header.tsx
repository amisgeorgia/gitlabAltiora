"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { ThemeToggle } from "../common/ThemeToggle";
import { LanguageToggle } from "../common/LanguageToggle";
import { Button } from "../ui/Button";


export function Header() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const headerRef = useRef<HTMLElement>(null);

  // Configuration des liens de navigation avec traduction dynamiques
  const navLinks = [
    { href: "/a-propos", label: t("nav.about") },
    { href: "/expertises", label: t("nav.expertises") },
    { href: "/formations", label: t("nav.formations") },
    { href: "/actualites", label: t("nav.news") },
    { href: "/contact", label: t("nav.contact") },
  ];

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  // 2. Fermer le menu mobile lors d'un clic à l'extérieur du header
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        mobileMenuOpen &&
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside, { passive: true });

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // 3. Gestion du masquage/affichage au scroll (Auto-hide)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Détecter si on a défilé vers le bas
      setIsScrolled(currentScrollY > 20);

      // Si le menu mobile est ouvert, on garde le header toujours visible
      if (mobileMenuOpen) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Masquer au scroll vers le bas, réafficher au scroll vers le haut
      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen]);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 w-full px-4 sm:px-6 lg:px-8 pt-3 sm:pt-6 pb-2 transition-all duration-300 ease-in-out ${
        isVisible || mobileMenuOpen
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="mx-auto max-w-7xl">
        {/* Navigation principale en Capsule */}
        <div
          className={`relative flex items-center justify-between bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-full border border-slate-100/90 dark:border-slate-800/80 px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 transition-all duration-300 ${
            isScrolled
              ? "shadow-md shadow-slate-900/5 dark:shadow-slate-950/50"
              : "shadow-sm"
          }`}
        >
          {/* Logo ALTIORA PREST */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center shrink-0 transition-opacity hover:opacity-90 touch-manipulation"
            aria-label="Accueil ALTIORA PREST"
          >
            <Image
              src="/images/logo.png"
              alt="Logo ALTIORA PREST"
              width={190}
              height={60}
              priority
              className="h-10 sm:h-11 md:h-12 w-auto object-contain"
            />
          </Link>

          {/* Nav Links Desktop */}
          <nav className="hidden md:flex items-center gap-3 lg:gap-6 xl:gap-8 ml-auto mr-4">
            {navLinks.map((item) => {
              const isActive = pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm lg:text-base font-medium transition-colors duration-200 whitespace-nowrap px-2 py-1 rounded-md ${
                    isActive
                      ? "text-gold-600 dark:text-gold-400 font-semibold"
                      : "text-slate-800 dark:text-slate-200 hover:text-gold-600 dark:hover:text-gold-400"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Commandes Droite : Changement de langue, Thème Dark/Light & Bouton de connexion */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <LanguageToggle />
            <ThemeToggle />

            {/* Bouton Connexion Desktop */}
            <Link href="/connexion" className="hidden md:inline-flex ml-2">
              <Button
                variant="outline"
                className="rounded-full text-blue-950 dark:text-white border-slate-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-slate-800 font-semibold shadow-sm"
              >
                {t("nav.login")}
              </Button>
            </Link>

            {/* Bouton Menu Hamburger Mobile */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setMobileMenuOpen((prev) => !prev);
              }}
              aria-expanded={mobileMenuOpen}
              aria-label="Ouvrir le menu de navigation"
              className="inline-flex md:hidden items-center justify-center p-2 rounded-full text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800 focus:outline-none transition-all duration-200 ml-1"
            >
              <div
                className={`transition-transform duration-300 ease-out ${
                  mobileMenuOpen ? "rotate-90" : "rotate-0"
                }`}
              >
                {mobileMenuOpen ? (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Menu Déroulant Mobile */}
        <div
          className={`md:hidden mt-2.5 transition-all duration-300 ease-out origin-top ${
            mobileMenuOpen
              ? "opacity-100 translate-y-0 pointer-events-auto block"
              : "opacity-0 -translate-y-2 pointer-events-none hidden"
          }`}
        >
          <div className="rounded-2xl bg-white/98 dark:bg-slate-900/98 backdrop-blur-lg p-5 border border-slate-200/90 dark:border-slate-800 shadow-2xl shadow-slate-900/15">
            <nav className="flex flex-col gap-1.5">
              {navLinks.map((item) => {
                const isActive = pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`rounded-xl px-4 py-3 text-base font-medium transition-colors duration-150 block ${
                      isActive
                        ? "bg-slate-100 dark:bg-slate-800 text-gold-600 dark:text-gold-400 font-bold"
                        : "text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-gold-600 dark:hover:text-gold-400"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <div className="pt-3 mt-1.5 border-t border-slate-100 dark:border-slate-800">
                <Link
                  href="/connexion"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full"
                >
                  <Button
                    variant="gold"
                    className="w-full justify-center rounded-full text-blue-950 dark:text-white dark:border-slate-700 py-3 font-semibold"
                  >
                    {t("nav.login")}
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
