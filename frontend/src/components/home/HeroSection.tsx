import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    /* Conteneur externe avec pt-0 pour éviter tout double décalage */
    <section className="relative w-full px-4 sm:px-6 lg:px-8 pt-0 pb-12 sm:pb-16 lg:pb-20">
      <div className="mx-auto max-w-357.5">
        <div className="relative min-h-212.5 lg:min-h-230 w-full flex flex-col justify-between overflow-hidden bg-[#040D21] text-white rounded-4xl sm:rounded-[40px] lg:rounded-[48px] border border-white/10 shadow-2xl">
          
          {/* Image d'arrière-plan */}
          <div className="absolute inset-0 z-0 select-none">
            <Image
              src="/images/accueil.webp"
              alt="Altiora Prest - Espace Numérique et Solutions Digitales"
              fill
              priority
              quality={85}
              sizes="(max-width: 1400px) 100vw, 1400px"
              className="object-cover object-[70%_center] lg:object-center"
            />
            {/* Gradients de lisibilité */}
            <div className="absolute inset-0 bg-linear-to-r from-[#030a1c]/90 via-[#030a1c]/50 to-transparent lg:from-[#030a1c]/80 lg:via-transparent lg:to-transparent" />
            <div className="absolute inset-0 bg-linear-to-t from-[#030a1c]/80 via-transparent to-[#030a1c]/30 lg:hidden" />
          </div>

          {/* Contenu principal : suppression du pt-24/pt-32 interne redondant */}
          <div className="relative z-10 w-full p-6 sm:p-10 lg:p-14 flex-1 flex flex-col justify-between">
            
            {/* Section supérieure */}
            <div className="flex flex-col items-start gap-6 sm:gap-8 max-w-3xl mt-2 sm:mt-4 sr-fade-up">
              <div className="inline-flex items-center rounded-full border border-white/30 bg-slate-900/50 backdrop-blur-md px-8 sm:px-14 py-3 md:py-4 text-sm sm:text-base font-bold text-white tracking-wide shadow-xs hover:border-white/60 transition-colors">
                Agence numérique
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] xl:text-[72px] font-semibold tracking-tight text-white leading-[1.08]">
                Connecter, Structurer <br />
                Faire <span className="text-brand-gold">Avancer</span>
              </h1>
            </div>

            {/* Section inférieure 2 colonnes */}
            <div className="pt-6 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 md:gap-8 lg:gap-16">
              
              {/* Colonne gauche */}
              <div className="flex flex-col items-start gap-6 sm:gap-8 max-w-3xl md:max-w-105 lg:max-w-xl xl:max-w-3xl">
                <p className="text-base sm:text-xl text-slate-200/90 font-normal leading-relaxed">
                  Né de la vision d’un cabinet de conseil et de formation d’excellence, ALTIORA PREST incarne la synergie entre stratégie d’entreprise, performance opérationnelle et innovation technologique.
                </p>

                <Link
                  href="/a-propos"
                  className="group inline-flex w-auto sm:w-full md:w-auto items-center gap-3.5 rounded-full border border-white/30 bg-slate-950/40 backdrop-blur-md px-8 md:px-10 py-3.5 text-base font-medium text-white transition-all duration-200 hover:bg-white hover:text-slate-950 hover:border-white active:scale-[0.98] shadow-lg shadow-black/20"
                >
                  <span>Découvrir le cabinet</span>
                  <ArrowRight
                    size={22}
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Link>
              </div>

              {/* Colonne droite */}
              <div className="flex flex-col items-start md:items-end gap-6 sm:gap-8 w-full md:w-auto sr-fade-right">
                <Link
                  href="/expertises"
                  className="inline-flex w-full md:w-auto items-center justify-center rounded-full bg-brand-gold hover:bg-dark-gold px-8 sm:px-10 py-3.5 sm:py-4 text-base sm:text-lg font-semibold text-white shadow-xl shadow-brand-gold/25 transition-all duration-200 hover:shadow-brand-gold/40 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Découvrir nos services
                </Link>

                <div className="grid grid-cols-3 gap-6 sm:gap-10 md:gap-6 lg:gap-12 text-center w-full md:w-auto">
                  <div className="flex flex-col items-center sr-stagger">
                    <span className="text-3xl sm:text-4xl md:text-3xl lg:text-5xl font-extrabold text-white tracking-tight">+4</span>
                    <span className="mt-1 text-xs sm:text-sm md:text-xs lg:text-sm text-slate-300 font-normal">Filiales spécialisées</span>
                  </div>
                  <div className="flex flex-col items-center sr-stagger">
                    <span className="text-3xl sm:text-4xl md:text-3xl lg:text-5xl font-extrabold text-white tracking-tight">+50</span>
                    <span className="mt-1 text-xs sm:text-sm md:text-xs lg:text-sm text-slate-300 font-normal">Partenaires actifs</span>
                  </div>
                  <div className="flex flex-col items-center sr-stagger">
                    <span className="text-3xl sm:text-4xl md:text-3xl lg:text-5xl font-extrabold text-white tracking-tight">24/7</span>
                    <span className="mt-1 text-xs sm:text-sm md:text-xs lg:text-sm text-slate-300 font-normal">Support client</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}