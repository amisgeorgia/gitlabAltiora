"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#081B42] text-white pt-14 sm:pt-16 lg:pt-20 pb-8 overflow-hidden">
      <div className="mx-auto max-w-[1430px] px-4 sm:px-6 lg:px-12">
        
        {/* 4-Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 pb-14 sm:pb-16">
          
          {/* Column 1: ALTIORA CONNECT */}
          <div className="lg:col-span-3 sr-stagger">
            <h4 className="text-base sm:text-lg font-bold text-brand-gold mb-5 sm:mb-6 tracking-wide">
              ALTIORA CONNECT
            </h4>
            <ul className="space-y-3 sm:space-y-3.5 text-sm sm:text-[15px] text-slate-300/90 font-normal">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="transition-colors hover:text-white">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/expertises" className="transition-colors hover:text-white">
                  Nos expertises
                </Link>
              </li>
              <li>
                <Link href="/formations" className="transition-colors hover:text-white">
                  Formations
                </Link>
              </li>
              <li>
                <Link href="/actualites" className="transition-colors hover:text-white">
                  Actualités
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Expertises */}
          <div className="lg:col-span-3 sr-stagger">
            <h4 className="text-base sm:text-lg font-bold text-brand-gold mb-5 sm:mb-6 tracking-wide">
              Expertises
            </h4>
            <ul className="space-y-3 sm:space-y-3.5 text-sm sm:text-[15px] text-slate-300/90 font-normal">
              <li>
                <Link href="/expertises/conseil-strategique" className="transition-colors hover:text-white">
                  Conseil stratégique
                </Link>
              </li>
              <li>
                <Link href="/expertises/intelligence-artificielle" className="transition-colors hover:text-white">
                  Intelligence Artificielle
                </Link>
              </li>
              <li>
                <Link href="/expertises/developpement-web" className="transition-colors hover:text-white">
                  Développement Web
                </Link>
              </li>
              <li>
                <Link href="/expertises/developpement-mobile" className="transition-colors hover:text-white">
                  Développement Mobile
                </Link>
              </li>
              <li>
                <Link href="/expertises/ui-ux-design" className="transition-colors hover:text-white">
                  UI/UX Design
                </Link>
              </li>
              <li>
                <Link href="/expertises/business-intelligence" className="transition-colors hover:text-white">
                  Business Intelligence
                </Link>
              </li>
              <li>
                <Link href="/expertises/cloud" className="transition-colors hover:text-white">
                  Cloud
                </Link>
              </li>
              <li>
                <Link href="/expertises/cybersecurite" className="transition-colors hover:text-white">
                  Cybersécurité
                </Link>
              </li>
              <li>
                <Link href="/expertises/formation" className="transition-colors hover:text-white">
                  Formation
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Ressources */}
          <div className="lg:col-span-3 sr-stagger">
            <h4 className="text-base sm:text-lg font-bold text-brand-gold mb-5 sm:mb-6 tracking-wide">
              Ressources
            </h4>
            <ul className="space-y-3 sm:space-y-3.5 text-sm sm:text-[15px] text-slate-300/90 font-normal">
              <li>
                <Link href="/faq" className="transition-colors hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/blog" className="transition-colors hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/politique-de-confidentialite" className="transition-colors hover:text-white">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="/conditions-d-utilisation" className="transition-colors hover:text-white">
                  Conditions d&apos;utilisation
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="lg:col-span-3 sr-stagger">
            <h4 className="text-base sm:text-lg font-bold text-brand-gold mb-5 sm:mb-6 tracking-wide">
              Contact
            </h4>
            <ul className="space-y-3.5 text-sm sm:text-[15px] text-slate-300/90 font-normal">
              <li className="flex items-center gap-3">
                <MapPin size={18} className="text-slate-300 shrink-0" />
                <span>Antananarivo, Madagascar</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-slate-300 shrink-0" />
                <a href="tel:+261340710633" className="transition-colors hover:text-white">
                  034 07 106 33
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-slate-300 shrink-0" />
                <a href="mailto:contact@altioraconnect.mg" className="transition-colors hover:text-white">
                  contact@altioraconnect.mg
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-8 sm:pt-10 border-t border-white/10 text-center sr-fade-up">
          <p className="text-xs sm:text-sm text-slate-400 font-normal">
            &copy; {currentYear} ALTIORA CONNECT | Droits réservés
          </p>
        </div>

      </div>
    </footer>
  );
}
