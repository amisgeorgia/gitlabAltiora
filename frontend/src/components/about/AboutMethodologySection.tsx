"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Info } from "lucide-react";

export function AboutMethodologySection() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      number: "01.",
      title: "AUDIT & DIAGNOSTIC",
      description:
        "Analyse profonde de votre infrastructure et processus.",
    },
    {
      number: "02.",
      title: "STRATÉGIE AGILE",
      description:
        "Conception de feuilles de route itératives et mesurables.",
    },
    {
      number: "03.",
      title: "DÉPLOIEMENT",
      description:
        "Mise en œuvre technique avec un focus sur le ROI.",
    },
    {
      number: "04.",
      title: "OPTIMISATION",
      description:
        "Accompagnement continu et amélioration des performances",
    },
  ];

  return (
    <section className="relative w-full bg-[#05112B] text-white py-14 sm:py-18 lg:py-24 overflow-hidden">
      {/* Subtle Background Glow Elements */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#C59B27]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-[1490px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 xl:gap-14 items-center">
          
          {/* Left Column: 4 Step Cards (2x2 Offset Grid) */}
          <div className="lg:col-span-7 xl:col-span-7 w-full sr-fade-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 items-start">
              
              {/* Left Sub-Column: Steps 01 & 02 (Offset downwards on tablet/desktop) */}
              <div className="flex flex-col gap-5 sm:gap-6 sm:mt-10 lg:mt-12">
                {[steps[0], steps[1]].map((step, idx) => {
                  const stepIndex = idx; // 0 or 1
                  const isSelected = activeStep === stepIndex;

                  return (
                    <div
                      key={step.number}
                      onClick={() => setActiveStep(stepIndex)}
                      onMouseEnter={() => setActiveStep(stepIndex)}
                      className={`cursor-pointer rounded-[24px] sm:rounded-[28px] p-6 sm:p-7 transition-all duration-300 font-[family-name:var(--font-bai-jamjuree)] ${
                        isSelected
                          ? "border-2 border-[#C59B27] bg-[#0A1C44] shadow-[0_0_30px_rgba(197,155,39,0.18)] scale-[1.02]"
                          : "border border-white/10 bg-[#08173A]/80 hover:border-[#C59B27]/50 hover:bg-[#0A1C44]/80"
                      }`}
                    >
                      {/* Number in Gold */}
                      <span className="block text-3xl sm:text-4xl font-extrabold text-[#C59B27] leading-none mb-3">
                        {step.number}
                      </span>

                      {/* Title */}
                      <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider mb-2">
                        {step.title}
                      </h4>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-300/85 leading-relaxed font-normal">
                        {step.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Right Sub-Column: Steps 03 & 04 */}
              <div className="flex flex-col gap-5 sm:gap-6">
                {[steps[2], steps[3]].map((step, idx) => {
                  const stepIndex = idx + 2; // 2 or 3
                  const isSelected = activeStep === stepIndex;

                  return (
                    <div
                      key={step.number}
                      onClick={() => setActiveStep(stepIndex)}
                      onMouseEnter={() => setActiveStep(stepIndex)}
                      className={`cursor-pointer rounded-[24px] sm:rounded-[28px] p-6 sm:p-7 transition-all duration-300 font-[family-name:var(--font-bai-jamjuree)] ${
                        isSelected
                          ? "border-2 border-[#C59B27] bg-[#0A1C44] shadow-[0_0_30px_rgba(197,155,39,0.18)] scale-[1.02]"
                          : "border border-white/10 bg-[#08173A]/80 hover:border-[#C59B27]/50 hover:bg-[#0A1C44]/80"
                      }`}
                    >
                      {/* Number in Gold */}
                      <span className="block text-3xl sm:text-4xl font-extrabold text-[#C59B27] leading-none mb-3">
                        {step.number}
                      </span>

                      {/* Title */}
                      <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider mb-2">
                        {step.title}
                      </h4>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-300/85 leading-relaxed font-normal">
                        {step.description}
                      </p>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

          {/* Right Column: Methodology Content & Action */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col items-start pl-0 lg:pl-4 xl:pl-8 sr-fade-right">
            {/* Tagline */}
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#C59B27] uppercase mb-4">
              MÉTHODOLOGIE PROPRE
            </span>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-extrabold text-white tracking-tight leading-[1.15] mb-6">
              Une approche{" "}
              <span className="text-[#C59B27]">centrée sur les résultats</span>
            </h2>

            {/* Description */}
            <p className="text-slate-300/90 text-sm sm:text-base lg:text-[16px] leading-relaxed font-normal mb-8 max-w-xl">
              Nous ne croyons pas aux solutions &quot;standard&quot;. Chaque entreprise possède
              son propre ADN, et notre méthodologie agile s&apos;adapte pour garantir une
              transformation fluide et pérenne.
            </p>

            {/* CTA Button with Info Icon */}
            <div>
              <Link
                href="/expertises"
                className="group inline-flex items-center gap-3 rounded-full border border-[#C59B27] bg-transparent hover:bg-[#C59B27]/15  px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-semibold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="text-[#C59B27]">En savoir plus sur notre approche</span>
                <Info
                  size={18}
                  className="text-[#C59B27] transition-transform duration-300 group-hover:rotate-12"
                />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
