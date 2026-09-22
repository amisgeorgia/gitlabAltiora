"use client";

import { Mail } from "lucide-react";

export function NewsletterSection() {
  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mx-auto max-w-357.5">
        {/* Card sombre très meulée/arrondie inspirée du header */}
        <div className="relative overflow-hidden rounded-4xl sm:rounded-[40px] lg:rounded-[48px] bg-linear-to-br from-[#0B1528] via-[#0A111F] to-[#060B14] border border-slate-800 p-8 sm:p-12 md:p-16 text-center text-white shadow-2xl">
          
          {/* Halos lumineux en arrière-plan */}
          <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#C59B27]/10 blur-3xl" />

          <div className="relative z-10 max-w-3xl mx-auto">
            {/* Icône centrale */}
            <div className="w-16 h-16 bg-[#C59B27]/15 border border-[#C59B27]/30 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-md shadow-inner">
              <Mail className="h-8 w-8 text-[#C59B27]" />
            </div>

            {/* Titre */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
              Restez <span className="text-[#C59B27]">informé</span>
            </h2>

            {/* Description */}
            <p className="text-slate-300 mb-8 sm:mb-10 text-base sm:text-lg leading-relaxed font-normal">
              Recevez nos derniers articles, analyses et invitations à nos événements exclusifs directement dans votre boîte mail.
            </p>

            {/* Formulaire d'inscription */}
            <form
              className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Votre adresse email"
                required
                className="flex-1 px-6 py-4 rounded-full bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:border-[#C59B27] focus:ring-1 focus:ring-[#C59B27] transition-all text-sm font-medium"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-[#C59B27] text-[#0B1F4D] font-bold rounded-full hover:bg-[#b08a22] transition-colors shrink-0 shadow-lg shadow-[#C59B27]/20 text-sm"
              >
                S&apos;abonner
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}