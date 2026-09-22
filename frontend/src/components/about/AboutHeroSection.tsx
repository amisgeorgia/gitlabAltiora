"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AboutHeroSection() {
  const stats = [
    { value: "4+", label: "Filiales spécialisées" },
    { value: "50+", label: "Partenaires actifs" },
    { value: "200+", label: "Clients satisfaits" },
    { value: "24/7", label: "Support client" },
  ];

  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 pt-0">
      <div className="mx-auto max-w-357.5">
        {/* Large Rounded Hero Container with subtle blue-violet linear gradient */}
        <div className="relative overflow-hidden rounded-4xl sm:rounded-[40px] lg:rounded-[48px] bg-linear-to-br from-[#EFF2FB] via-[#ECEFFA] to-[#F4F1FA] border border-white/80 p-6 sm:p-10 md:p-12 lg:p-16 shadow-[0_20px_50px_rgba(11,31,77,0.05)] sr-fade-up">
          
          {/* Subtle Ambient Glows */}
          <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-purple-400/10 blur-3xl" />

          {/* Top 2 Columns Content */}
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
            
            {/* Left Column: Text & CTA */}
            <div className="lg:col-span-6 xl:col-span-7 flex flex-col items-start sr-fade-left">
              {/* Gold Pill Badge */}
              <div className="inline-flex items-center rounded-full bg-[#C59B27] px-4 sm:px-5 py-1.5 sm:py-4 text-xs sm:text-[13px] font-bold uppercase tracking-wider text-white shadow-sm shadow-[#C59B27]/25 mb-5 sm:mb-6">
                L&apos;EXCELLENCE OPÉRATIONNELLE
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] xl:text-[56px] font-extrabold text-[#0B1F4D] tracking-tight leading-[1.12] mb-5 sm:mb-6">
                Forger le futur de la{" "}
                <span className="block text-[#C59B27] mt-1 sm:mt-1.5">
                  Transformation Digitale
                </span>
              </h1>

              {/* Description */}
              <p className="text-slate-700 text-sm sm:text-base lg:text-[17px] leading-relaxed font-normal max-w-xl mb-7 sm:mb-9">
                ALTIORA CONNECT incarne la vision d&apos;un cabinet de conseil
                d&apos;élite, dédié à propulser les organisations vers de nouveaux
                sommets de performance et d&apos;innovation technologique.
              </p>

              {/* CTA Button */}
              <div>
                <Link
                  href="#vision"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#0B1F4D] hover:bg-[#06132F] px-7 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#0B1F4D]/25 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Découvrir notre vision</span>
                  <ArrowRight
                    size={18}
                    strokeWidth={2.2}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>

            {/* Right Column: Hero Image */}
            <div className="lg:col-span-6 xl:col-span-5 w-full sr-fade-right">
              <div className="relative w-full aspect-4/3 sm:aspect-16/11 lg:aspect-[1.3/1] rounded-3xl sm:rounded-4xl overflow-hidden shadow-2xl shadow-slate-900/10 border border-white/50">
                <Image
                  src="/images/apropos2.webp"
                  alt="Transformation Digitale - ALTIORA CONNECT"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>

          </div>

          {/* Bottom Row: 4 Statistics with dividers */}
          <div className="relative mt-12 sm:mt-16 lg:mt-20 pt-8 sm:pt-10 border-t border-slate-300/40">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 md:gap-0">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center justify-center text-center px-2 sm:px-4 md:px-6 lg:px-8 sr-stagger ${
                    index > 0 ? "md:border-l md:border-slate-300/50" : ""
                  }`}
                >
                  {/* Number */}
                  <span className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#0B1F4D] tracking-tight leading-none">
                    {stat.value}
                  </span>
                  {/* Label */}
                  <span className="mt-2.5 text-xs sm:text-sm text-slate-500 font-medium tracking-tight">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
