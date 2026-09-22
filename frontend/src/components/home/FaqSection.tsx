"use client";

import React, { useState } from "react";
import { PlusCircle, XCircle } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    question: "Quels types d'organisations accompagnez-vous ?",
    answer:
      "Nous accompagnons les entreprises de toutes tailles (startups, PME, grands comptes), ainsi que les institutions publiques, ONG et organisations professionnelles dans leur transformation et leur montée en compétences.",
  },
  {
    question: "Quels sont vos domaines d'expertise ?",
    answer:
      "Nous intervenons notamment en conseil stratégique, intelligence artificielle, développement web et mobile, UI/UX Design, Business Intelligence, Cloud, cybersécurité et formation professionnelle.",
  },
  {
    question: "Comment puis-je demander un accompagnement ?",
    answer:
      "Vous pouvez nous contacter directement via notre formulaire en ligne, par e-mail ou par téléphone. Notre équipe vous recontactera rapidement pour échanger sur vos objectifs et convenir d'un premier cadrage.",
  },
  {
    question: "Proposez-vous des formations sur mesure ?",
    answer:
      "Oui, toutes nos formations peuvent être adaptées sur mesure aux besoins réels et au niveau de vos équipes, en présentiel, à distance ou en format hybride.",
  },
];

export function FaqSection() {
  // Par défaut, la 2ème question (index 1) est ouverte comme sur la maquette
  const [openIndex, setOpenIndex] = useState<number | null>(1);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16 text-white overflow-hidden">
      
      <div className="mx-auto max-w-357.5 bg-[#0B1F4D] rounded-3xl sm:rounded-[40px] lg:rounded-[48px] p-6 sm:p-10 lg:p-16 shadow-xl">
        
        <div className="text-center mb-10 sm:mb-14 sr-header">
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-white">
            Questions <span className="text-brand-gold">fréquentes</span>
          </h2>
        </div>

        {/* FAQ Accordion List */}
        <div className="divide-y divide-white/15 border-t border-b border-white/15">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={index} className="py-6 sm:py-7 transition-all duration-300 sr-stagger">
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between gap-4 text-left cursor-pointer group select-none"
                  aria-expanded={isOpen}
                >
                  {/* Question */}
                  <span
                    className={`text-base sm:text-lg lg:text-xl transition-colors ${
                      isOpen
                        ? "font-bold text-white"
                        : "font-medium text-white/90 group-hover:text-white"
                    }`}
                  >
                    {item.question}
                  </span>

                  {/* Toggle Icon in brand-gold */}
                  <span className="shrink-0 text-brand-gold transition-transform duration-200">
                    {isOpen ? (
                      <XCircle size={26} strokeWidth={1.8} className="text-brand-gold" />
                    ) : (
                      <PlusCircle size={26} strokeWidth={1.8} className="text-brand-gold hover:opacity-90" />
                    )}
                  </span>
                </button>

                {/* Answer Content */}
                {isOpen && (
                  <div className="mt-3.5 sm:mt-4 pr-6 sm:pr-12 animate-fadeIn">
                    <p className="text-sm sm:text-base text-slate-200/90 leading-relaxed font-normal">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}