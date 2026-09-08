"use client";

import React from "react";
import {
  Check,
  Target,
  Zap,
  ShieldCheck,
  TrendingUp,
  Layers,
  Cpu,
  Code2,
  Users,
  Sparkles,
  CheckCircle2,
  Award,
  Settings,
  LucideIcon,
} from "lucide-react";
import { ExpertiseItem } from "@/data/expertises.data";

interface ExpertiseDetailContentProps {
  expertise: ExpertiseItem;
}

const complementaryIconMap: Record<string, LucideIcon> = {
  target: Target,
  zap: Zap,
  shield: ShieldCheck,
  trending: TrendingUp,
  layers: Layers,
  cpu: Cpu,
  code: Code2,
  users: Users,
  sparkles: Sparkles,
  checkCircle: CheckCircle2,
  award: Award,
  settings: Settings,
};

export function ExpertiseDetailContent({ expertise }: ExpertiseDetailContentProps) {
  return (
    <div id="presentation" className="flex flex-col gap-12 sm:gap-14 lg:gap-16">
      
      {/* 1. Présentation principale */}
      <section className="sr-fade-up">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-6 sm:w-8 h-1 bg-[#DDA83A] rounded-full inline-block shrink-0" />
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#0B1F4D] tracking-tight">
            Présentation de l&apos;expertise
          </h2>
        </div>

        <div className="flex flex-col gap-4 text-slate-600 text-base sm:text-[17px] leading-relaxed font-normal mb-8">
          {expertise.presentationParagraphs?.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          )) || (
            <>
              <p>
                {expertise.description} Notre équipe met à votre disposition un savoir-faire approfondi et des méthodologies éprouvées pour garantir la réussite de vos projets.
              </p>
              <p>
                En associant rigueur opérationnelle et innovation, nous concevons des solutions pérennes alignées avec vos objectifs stratégiques.
              </p>
            </>
          )}
        </div>

        <div className="space-y-4 pt-2">
          {expertise.keyBenefits && expertise.keyBenefits.length > 0 ? (
            expertise.keyBenefits.map((benefit, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-xl bg-[#F8FAFC] border border-slate-200/70 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#DDA83A] text-white shrink-0 mt-0.5">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <div className="text-sm sm:text-[15px] leading-relaxed">
                  <span className="font-bold text-[#0B1F4D]">{benefit.title} : </span>
                  <span className="text-slate-600">{benefit.description}</span>
                </div>
              </div>
            ))
          ) : (
            expertise.points?.map((point, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#F8FAFC] border border-slate-200/70"
              >
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#DDA83A] text-white shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span className="text-sm sm:text-base font-semibold text-[#0B1F4D]">
                  {point}
                </span>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="sr-fade-up pt-4">
        <h3 className="text-xl sm:text-2xl font-bold text-[#0B1F4D] tracking-tight mb-6">
          Informations complémentaires
        </h3>

        {/* Grille de 2 cartes sans shadow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {expertise.complementaryCards?.map((card, idx) => {
            const IconComp = complementaryIconMap[card.iconName] || Target;

            return (
              <div
                key={idx}
                className="group flex flex-col justify-start p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/80 hover:border-[#0B1F4D]/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0B1F4D]/5 flex items-center justify-center text-[#0B1F4D] group-hover:bg-[#DDA83A] group-hover:text-[#09152E] transition-all duration-300 mb-5">
                  <IconComp className="w-6 h-6 stroke-[2.2]" />
                </div>

                <h4 className="text-lg font-bold text-[#0B1F4D] mb-2 group-hover:text-[#0B1F4D] transition-colors">
                  {card.title}
                </h4>

                <p className="text-slate-600 text-sm leading-relaxed font-normal">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}

