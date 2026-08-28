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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Update scrolled state for subtle shadow
      setIsScrolled(currentScrollY > 20);

      // Keep header visible when mobile menu is open
      if (mobileMenuOpen) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Hide when scrolling down past 80px, show when scrolling up
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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full px-4 sm:px-6 lg:px-8 pt-3 sm:pt-6 pb-2 transition-all duration-300 ease-in-out ${
        isVisible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="mx-auto max-w-[1430px]">
        <div
          className={`relative flex items-center justify-between bg-white/95 backdrop-blur-md rounded-full border border-slate-100/90 px-4 sm:px-6 md:px-8 lg:px-10 py-2 sm:py-2.5 md:py-3.5 lg:py-2 transition-shadow duration-300 ${
            isScrolled ? "shadow-md shadow-slate-900/5" : "shadow-sm"
          }`}
        >
          {/* Logo ALTIORA PREST */}
          <Link
            href="/"
            className="flex items-center shrink-0 transition-opacity hover:opacity-90"
            aria-label="Accueil ALTIORA PREST"
          >
            <Image
              src="/images/logo.png"
              alt="ALTIORA PREST Logo"
              width={190}
              height={60}
              priority
              className="h-11 sm:h-12 md:h-11 lg:h-13 w-auto object-contain"
            />
          </Link>

          {/* Desktop & Tablet Navigation Links */}
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

          {/* Desktop & Tablet CTA Button */}
          <div className="hidden md:flex items-center shrink-0">
            <Link
              href="/connexion"
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 md:px-6 lg:px-10 xl:px-12 py-3 md:py-3 lg:py-3.5 text-xs md:text-sm lg:text-base font-semibold text-white transition-all duration-200 hover:bg-dark-bleu active:scale-[0.98] whitespace-nowrap"
            >
              Se connecter
            </Link>
          </div>

          {/* Mobile Hamburger Toggle Button avec animation de rotation fluide */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label="Menu principal"
              className="inline-flex items-center justify-center p-1.5 text-slate-800 hover:text-slate-950 focus:outline-none transition-transform duration-300 active:scale-90"
            >
              <div className={`transition-transform duration-300 ease-out ${mobileMenuOpen ? "rotate-90" : "rotate-0"}`}>
                {mobileMenuOpen ? (
                  <svg
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.2}
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg
                    className="h-8 w-8"
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

        {/* Mobile Navigation Dropdown Menu avec transition fluide dépliante */}
        <div
          className={`md:hidden transition-all duration-350 ease-out transform origin-top ${
            mobileMenuOpen
              ? "max-h-[500px] opacity-100 translate-y-0 scale-y-100 mt-3 pointer-events-auto"
              : "max-h-0 opacity-0 -translate-y-3 scale-y-95 pointer-events-none overflow-hidden"
          }`}
        >
          <div className="rounded-2xl bg-white/95 backdrop-blur-md p-5 border border-slate-100 shadow-2xl">
            <nav className="flex flex-col gap-2.5">
              {publicNavigation.map((item, idx) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ transitionDelay: `${idx * 30}ms` }}
                    className={`rounded-xl px-4 py-3 text-base font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-brand-gold/10 text-brand-gold font-semibold"
                        : "text-slate-800 hover:bg-slate-50 hover:text-brand-gold"
                    } ${mobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`}
                  >
                    {item.title}
                  </Link>
                );
              })}
              <div className="pt-3 border-t border-slate-100">
                <Link
                  href="/connexion"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center rounded-full bg-primary py-3.5 text-base font-medium text-white transition-all hover:bg-dark-bleu active:scale-[0.98] shadow-md shadow-primary/20"
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
