"use client";

import Link from "next/link";
import { ArrowLeft, Clock, Users, Calendar } from "lucide-react";
import { FormationDetail } from "@/data/formationsSlug";

interface FormationHeaderProps {
  formation: FormationDetail;
}

export function FormationHeader({ formation }: FormationHeaderProps) {
  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 pt-0 pb-12 sm:pb-16 lg:pb-20">
      <div className="mx-auto max-w-357.5">
        {/* Conteneur sombre très arrondi */}
        <div className="relative overflow-hidden rounded-4xl sm:rounded-[40px] lg:rounded-[48px] bg-linear-to-br from-[#0B1528] via-[#0A111F] to-[#060B14] border border-slate-800 p-6 sm:p-10 md:p-12 lg:p-16 text-white shadow-2xl">
          
          {/* Halos lumineux d'arrière-plan */}
          <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#C59B27]/10 blur-3xl" />

          <div className="relative z-10 w-full">
            {/* Bouton retour */}
            <Link
              href="/formations"
              className="inline-flex items-center text-slate-400 hover:text-[#C59B27] transition-colors mb-6 sm:mb-8 text-sm font-medium"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Retour aux formations
            </Link>

            {/* Badge de catégorie */}
            <div className="mb-4 sm:mb-6">
              <span className="inline-flex items-center rounded-full border border-[#C59B27]/40 bg-[#C59B27]/10 px-4 py-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#C59B27]">
                {formation.category}
              </span>
            </div>

            {/* Titre */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#C59B27] mb-6 leading-tight">
              {formation.title}
            </h1>

            {/* Description */}
            <p className="text-slate-300 text-base sm:text-lg md:text-xl leading-relaxed font-normal max-w-3xl mb-8 sm:mb-10">
              {formation.summary}
            </p>

            {/* Bloc d'informations secondaires ajusté en largeur (w-fit) avec bordure or */}
            <div className="inline-flex flex-wrap items-center gap-6 sm:gap-8 text-sm font-medium text-slate-200 bg-white/5 backdrop-blur-md px-6 py-4 rounded-2xl border border-[#C59B27]/40 shadow-lg shadow-[#C59B27]/5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#C59B27]/20 text-[#C59B27]">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs text-slate-400 font-normal">Durée</span>
                  <span className="font-semibold text-white">{formation.duration}</span>
                </div>
              </div>

              <div className="hidden sm:block w-px h-8 bg-slate-700/60"></div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#C59B27]/20 text-[#C59B27]">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs text-slate-400 font-normal">Niveau</span>
                  <span className="font-semibold text-white">{formation.level}</span>
                </div>
              </div>

              <div className="hidden sm:block w-px h-8 bg-slate-700/60"></div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#C59B27]/20 text-[#C59B27]">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs text-slate-400 font-normal">Prochaine session</span>
                  <span className="font-semibold text-white">Sur demande</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}