import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export interface AuthCardLayoutProps {
  leftTitle: string;
  leftSubtitle: string;
  rightTitle: string;
  rightSubtitle?: string;
  children: React.ReactNode;
}

export function AuthCardLayout({
  leftTitle,
  leftSubtitle,
  rightTitle,
  rightSubtitle,
  children,
}: AuthCardLayoutProps) {
  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-start gap-6">
      {/* Barre supérieure : Logo ALTIORA PREST + Bouton Retour au site */}
      <div className="w-full flex items-center justify-between gap-4 px-1">
        <Link
          href="/"
          className="inline-block transition-opacity hover:opacity-90 cursor-pointer"
          aria-label="Accueil ALTIORA PREST"
        >
          <div className="relative h-12 w-40 sm:h-14 sm:w-48 md:h-16 md:w-56">
            <Image
              src="/images/logo.webp"
              alt="Logo ALTIORA PREST"
              fill
              sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, 224px"
              priority
              className="object-contain object-left"
            />
          </div>
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0B1F4D] hover:text-[#D4AF37] transition-all duration-200 py-2.5 px-5 rounded-full bg-white border border-slate-200 hover:border-[#D4AF37] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour au site</span>
        </Link>
      </div>

      {/* Carte d'authentification principale */}
      <div className="w-full rounded-[28px] overflow-hidden bg-[#0B1F4D] border border-slate-200 flex flex-col md:flex-row md:min-h-[640px]">
        {/* Volet gauche : Bleu Nuit #0B1F4D */}
        <div className="w-full md:w-[42%] bg-[#0B1F4D] p-8 sm:p-10 md:p-14 flex flex-col justify-center text-left text-white relative overflow-hidden">
          {/* Effet d'accentuation subtil */}
          <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-[#D4AF37]/10 blur-2xl pointer-events-none" />
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#0B3D7A]/40 blur-2xl pointer-events-none" />

          <div className="relative z-10 space-y-3 sm:space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-[42px] font-extrabold tracking-tight text-white leading-tight font-bai">
              {leftTitle}
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-slate-200 font-normal leading-relaxed max-w-sm">
              {leftSubtitle}
            </p>
          </div>
        </div>

        {/* Volet droit : Carte Blanche avec coins arrondis qui englobe tout le bas sur mobile */}
        <div className="w-full md:w-[58%] bg-white rounded-t-[28px] rounded-b-[28px] md:rounded-[28px] flex-1 p-8 sm:p-12 md:p-14 flex flex-col justify-center">
          <div className="w-full max-w-md mx-auto space-y-8 sm:space-y-10">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1F4D] font-bai">
                {rightTitle}
              </h2>
              {rightSubtitle && (
                <p className="text-xs sm:text-sm text-slate-500 max-w-xs mx-auto">
                  {rightSubtitle}
                </p>
              )}
            </div>

            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
