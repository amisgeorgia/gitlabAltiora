"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AboutSection() {
  const stats = [
    { prefix: "+", value: "4", label: "Filiales spécialisées" },
    { prefix: "+", value: "50", label: "Partenaires actifs" },
    { prefix: "+", value: "3", label: "Pays d'opération" },
    { prefix: "", value: "24/7", label: "Support client" },
  ];

  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
      {/* Wrapper aligné sur la même largeur max-w-357.5 */}
      <div className="mx-auto max-w-357.5">
        
        {/* Top 2-Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-center">
          
          {/* Left Column: Image Card */}
          <div className="lg:col-span-6 w-full sr-fade-left">
            <div className="relative w-full aspect-4/3 lg:h-125 rounded-3xl sm:rounded-4xl overflow-hidden shadow-xl shadow-slate-900/5 bg-slate-950">
              <Image
                src="/images/apropos.webp"
                alt="À propos de nous - Altiora Connect"
                fill
                quality={85}
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="lg:col-span-6 flex flex-col items-start sr-fade-right">
            {/* Badge "A propos de nous" */}
            <div className="inline-flex items-center rounded-full bg-[#F3F5F9] px-6 py-2 text-sm font-semibold text-slate-800 mb-5 sm:mb-6">
              A propos de nous
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-primary leading-[1.15] mb-6 sm:mb-8">
              Un cabinet engagé pour <br className="hidden sm:inline" />
              <span className="text-slate-500 font-medium">
                accélérer votre transformation digitale
              </span>
            </h2>

            {/* CTA Button "En savoir plus sur le cabinet" */}
            <div className="mb-6 sm:mb-8">
              <Link
                href="/a-propos"
                className="inline-flex items-center gap-2.5 rounded-full bg-brand-gold hover:bg-dark-gold px-7 sm:px-8 py-3.5 text-sm sm:text-base font-semibold text-white shadow-lg shadow-brand-gold/25 transition-all duration-200 hover:shadow-brand-gold/40 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>En savoir plus sur le cabinet</span>
                <ArrowRight size={18} strokeWidth={2.5} />
              </Link>
            </div>

            {/* Paragraphs */}
            <div className="space-y-4 text-slate-600 text-sm sm:text-[15px] lg:text-base leading-relaxed font-normal max-w-2xl">
              <p>
                ALTIORA CONNECT est la plateforme digitale d&apos;ALTIORA PREST.
                Nous accompagnons les entreprises, les institutions publiques et
                les organisations dans leur développement grâce à des
                prestations de conseil, des formations professionnelles et des
                solutions numériques innovantes.
              </p>
              <p>
                Notre ambition est de mettre la technologie au service de la
                performance, de l&apos;innovation et de la création de valeur.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Row: 4 Key Metrics / Statistics */}
        <div className="mt-16 sm:mt-20 lg:mt-24 pt-10 sm:pt-14 border-t border-slate-100/80">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 lg:gap-0 items-center justify-center">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`flex flex-col items-center justify-center text-center relative px-4 sr-stagger ${
                  index !== 0 ? "lg:border-l lg:border-slate-200/80" : ""
                }`}
              >
                {/* Number with grey prefix */}
                <div className="text-5xl sm:text-6xl lg:text-[72px] font-black tracking-tight text-slate-950 leading-none select-none flex items-center justify-center">
                  {stat.prefix && (
                    <span className="text-slate-400 font-extrabold mr-1">
                      {stat.prefix}
                    </span>
                  )}
                  <span>{stat.value}</span>
                </div>

                {/* Description Label */}
                <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-900 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}