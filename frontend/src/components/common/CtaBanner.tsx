"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export interface CtaBannerProps {
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  primaryButton?: {
    label: string;
    href: string;
    onClick?: () => void;
  };
  secondaryButton?: {
    label: string;
    href: string;
    onClick?: () => void;
  };
  className?: string;
}

export function CtaBanner({
  title = "Prêt à transformer votre entreprise ?",
  description = "Contactez nos experts dès aujourd'hui pour un diagnostic gratuit de vos besoins en transformation digitale.",
  primaryButton = {
    label: "Prendre rendez-vous",
    href: "/contact",
  },
  secondaryButton = {
    label: "Voir nos expertises",
    href: "/expertises",
  },
  className = "",
}: CtaBannerProps) {
  return (
    <section className={`relative w-full px-4 sm:px-6 lg:px-8 py-14 sm:py-18 lg:py-24 ${className}`}>
      <div className="mx-auto max-w-[1430px]">
        {/* Large Rounded Card with increased height & courbe.webp background */}
        <div className="relative min-h-[460px] sm:min-h-[520px] md:min-h-[560px] lg:min-h-[600px] flex flex-col justify-center overflow-hidden rounded-[32px] sm:rounded-[44px] lg:rounded-[56px] bg-[#ECEFF4] border border-white/80 p-8 sm:p-14 md:p-18 lg:p-24 shadow-sm sr-fade-up">

          {/* Background Decorative courbe.webp Image with screen blend mode */}
          <div className="pointer-events-none absolute inset-0 select-none">
            <Image
              src="/images/courbe.webp"
              alt="Decorative curves pattern"
              fill
              quality={95}
              className="object-cover mix-blend-screen opacity-85"
              sizes="(max-width: 1430px) 100vw, 1430px"
              priority
            />
          </div>

          {/* Subtle Ambient Glows */}
          <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/50 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-white/30 blur-3xl" />

          {/* Content with Larger Typography */}
          <div className="relative z-10 max-w-6xl flex flex-col items-start">
            <div className="mb-14 md:mb-24">
              {/* Big Headline */}
              <h2 className="text-3xl sm:text-5xl md:text-[52px] lg:text-[60px] xl:text-[64px] font-semibold text-[#0B1F4D] tracking-tight leading-[1.12]">
                {title}
              </h2>

              {/* Large Description Text */}
              <p className="mt-5 sm:mt-7 md:mt-8 text-slate-700 text-base sm:text-xl md:text-[21px] lg:text-[23px] leading-relaxed font-normal max-w-3xl">
                {description}
              </p>

            </div>

            {/* Action Buttons */}
            {(primaryButton || secondaryButton) && (
              <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
                {/* Primary Button (Navy) */}
                {primaryButton && (
                  <Link
                    href={primaryButton.href}
                    onClick={primaryButton.onClick}
                    className="w-full sm:w-auto inline-flex items-center justify-center text-center rounded-full bg-[#0B1F4D] hover:bg-[#06132F] px-8 sm:px-11 py-4 sm:py-5 text-sm sm:text-base md:text-lg font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {primaryButton.label}
                  </Link>
                )}

                {/* Secondary Button (Gold) */}
                {secondaryButton && (
                  <Link
                    href={secondaryButton.href}
                    onClick={secondaryButton.onClick}
                    className="w-full sm:w-auto inline-flex items-center justify-center text-center rounded-full bg-[#C59B27] hover:bg-[#B68D1F] px-8 sm:px-11 py-4 sm:py-5 text-sm sm:text-base md:text-lg font-semibold text-white transition-all duration-300 shadow-lg shadow-[#C59B27]/25 hover:shadow-xl hover:shadow-[#C59B27]/40 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {secondaryButton.label}
                  </Link>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
