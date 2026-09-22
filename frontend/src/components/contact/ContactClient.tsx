"use client";

import { ContactHero } from "./ContactHero";
import { ContactInfo } from "./ContactInfo";
import { ContactForm } from "./ContactForm";

export function ContactClient() {
  return (
    <>
      <ContactHero />
      <section className="relative w-full px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
        {/* 1. Conteneur de largeur identique au Hero/Footer */}
        <div className="mx-auto max-w-357.5">
          {/* 2. Carte d'enveloppe globale avec la même couleur de fond, arrondis et bordures */}
          <div className="relative overflow-hidden rounded-4xl sm:rounded-[40px] lg:rounded-[48px] bg-slate-50 dark:bg-slate-900/50 p-6 sm:p-8 lg:p-10 border border-slate-200/80 dark:border-slate-800 shadow-xl transition-colors duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              <ContactInfo />
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}