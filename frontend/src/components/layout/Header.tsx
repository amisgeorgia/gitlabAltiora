"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { publicNavigation } from "@/config/navigation";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const headerRef = useRef<HTMLElement>(null);

  // Fermer le menu mobile lors d'un clic à l'extérieur
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

  // Gestion du comportement au défilement (scroll)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Ajouter une ombre subtile lors du défilement
      setIsScrolled(currentScrollY > 20);

      // Maintenir toujours le header visible quand le menu mobile est ouvert
      if (mobileMenuOpen) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Masquer lors du défilement vers le bas au-delà de 80px, réafficher en remontant
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
      <div className="mx-auto max-w-[1430px]">
        {/* Barre de navigation principale (capsule blanche) */}
        <div
          className={`relative flex items-center justify-between bg-white/95 backdrop-blur-md rounded-full border border-slate-100/90 px-4 sm:px-6 md:px-8 lg:px-10 py-2 sm:py-2.5 md:py-3.5 lg:py-2 transition-shadow duration-300 ${
            isScrolled ? "shadow-md shadow-slate-900/5" : "shadow-sm"
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
              className="h-11 sm:h-12 md:h-11 lg:h-13 w-auto object-contain"
            />
          </Link>

          {/* Liens de navigation pour bureau et tablette */}
          <nav className="hidden md:flex items-center gap-3.5 md:gap-4 lg:gap-8 xl:gap-10 ml-auto mr-4 md:mr-5 lg:mr-10">
            {publicNavigation.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[13.5px] md:text-[14px] lg:text-[16px] xl:text-[17px] font-medium transition-colors duration-200 whitespace-nowrap ${
                    isActive
                      ? "text-brand-gold font-semibold"
                      : "text-slate-800 hover:text-brand-gold"
                  }`}
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>

          {/* Bouton de connexion pour bureau et tablette */}
          <div className="hidden md:flex items-center shrink-0">
            <Link
              href="/connexion"
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 md:px-6 lg:px-10 xl:px-12 py-3 md:py-3 lg:py-3.5 text-xs md:text-sm lg:text-base font-semibold text-white transition-all duration-200 hover:bg-dark-bleu active:scale-[0.98] whitespace-nowrap"
            >
              Se connecter
            </Link>
          </div>

          {/* Bouton Hamburger pour mobile avec icône animée */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setMobileMenuOpen((prev) => !prev);
              }}
              aria-expanded={mobileMenuOpen}
              aria-label="Ouvrir le menu de navigation"
              className="inline-flex items-center justify-center p-2 rounded-full text-slate-800 hover:text-slate-950 hover:bg-slate-100/80 focus:outline-none touch-manipulation cursor-pointer transition-all duration-200"
            >
              <div className={`transition-transform duration-300 ease-out ${mobileMenuOpen ? "rotate-90" : "rotate-0"}`}>
                {mobileMenuOpen ? (
                  <svg
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.2}
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.2}
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Menu déroulant pour smartphone */}
        <div
          className={`md:hidden mt-2.5 transition-all duration-300 ease-out origin-top ${
            mobileMenuOpen
              ? "opacity-100 translate-y-0 pointer-events-auto block"
              : "opacity-0 -translate-y-2 pointer-events-none hidden"
          }`}
        >
          <div className="rounded-2xl bg-white/98 backdrop-blur-lg p-5 border border-slate-200/90 shadow-2xl shadow-slate-900/15">
            <nav className="flex flex-col gap-1.5">
              {publicNavigation.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`rounded-xl px-4 py-3 text-base font-medium transition-colors duration-150 touch-manipulation block ${
                      isActive
                        ? "bg-brand-gold/15 text-brand-gold font-bold"
                        : "text-slate-800 hover:bg-slate-50 hover:text-brand-gold active:bg-slate-100"
                    }`}
                  >
                    {item.title}
                  </Link>
                );
              })}

              {/* Bouton de connexion dans le menu mobile */}
              <div className="pt-3 mt-1.5 border-t border-slate-100">
                <Link
                  href="/connexion"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center rounded-full bg-primary py-3.5 text-base font-semibold text-white transition-colors hover:bg-dark-bleu active:bg-dark-bleu shadow-md shadow-primary/20 touch-manipulation"
                >
                  Se connecter
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
