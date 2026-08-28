"use client";

import React, { useState } from "react";
import Image from "next/image";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
}

export function AboutTeamSection() {
  const [activeId, setActiveId] = useState<number>(1);

  const team: TeamMember[] = [
    {
      id: 1,
      name: "Andry R.",
      role: "DIRECTEUR GENERAL",
      image: "/images/directeur.webp",
    },
    {
      id: 2,
      name: "Sarah A.",
      role: "HEAD OF DIGITAL STRATEGY",
      image: "/images/digitalstrategy.webp",
    },
    {
      id: 3,
      name: "Michael S.",
      role: "CONSULTANT SENIOR IT",
      image: "/images/consultantsenior.webp",
    },
    {
      id: 4,
      name: "Lova T.",
      role: "RESPONSABLE FORMATION",
      image: "/images/responsableformation.jpg",
    },
  ];

  return (
    <section className="relative w-full bg-white py-14 sm:py-18 lg:py-24 overflow-hidden">
      <div className="mx-auto max-w-[1490px] px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 sr-fade-up">
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0B1F4D] tracking-tight">
            L&apos;Équipe <span className="text-[#C59B27]">Dirigeante</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-[17px] text-slate-600 font-normal leading-relaxed">
            Des experts passionnés, combinant vision stratégique et rigueur opérationnelle.
          </p>
        </div>

        {/* Interactive Expanding Accordion Gallery */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-6 h-[720px] sm:h-[480px] md:h-[520px] lg:h-[560px] w-full sr-fade-up">
          {team.map((member) => {
            const isActive = activeId === member.id;

            return (
              <div
                key={member.id}
                onMouseEnter={() => setActiveId(member.id)}
                onClick={() => setActiveId(member.id)}
                className={`relative cursor-pointer overflow-hidden rounded-[24px] sm:rounded-[32px] md:rounded-[36px] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                  isActive
                    ? "flex-[3.5] sm:flex-[2.8] md:flex-[3.2] shadow-2xl shadow-slate-900/20 ring-2 ring-[#C59B27]/40"
                    : "flex-1 shadow-md shadow-slate-900/5 hover:scale-[1.01]"
                }`}
              >
                {/* Background Image */}
                <Image
                  src={member.image}
                  alt={`${member.name} - ${member.role}`}
                  fill
                  quality={95}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className={`object-cover transition-transform duration-700 ease-out ${
                    isActive ? "scale-105" : "scale-100"
                  }`}
                  style={{ objectPosition: "center 20%" }}
                  priority
                />

                {/* Content Overlay: Active Card (Flush Left Horizontal Banner) */}
                <div
                  className={`absolute left-0 bottom-10 sm:bottom-12 md:bottom-14 z-10 w-[88%] sm:w-[78%] md:w-[72%] transition-all duration-500 ${
                    isActive
                      ? "opacity-100 translate-x-0 pointer-events-auto"
                      : "opacity-0 -translate-x-4 pointer-events-none"
                  }`}
                >
                  <div className="bg-[#071633]/92 backdrop-blur-md pl-6 sm:pl-8 pr-6 py-3.5 sm:py-4 border-y border-r border-white/15 shadow-xl">
                    <h3 className="text-xl sm:text-2xl lg:text-[28px] font-extrabold text-white tracking-tight leading-tight">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm font-bold text-[#C59B27] uppercase tracking-wider">
                      {member.role}
                    </p>
                  </div>
                </div>

                {/* Content Overlay: Inactive/Collapsed Card (Flush Left Vertical Stripe - Desktop & Tablet) */}
                <div
                  className={`absolute left-0 bottom-10 sm:bottom-12 md:bottom-14 z-10 hidden sm:flex transition-all duration-500 ${
                    !isActive
                      ? "opacity-100 translate-x-0 pointer-events-auto"
                      : "opacity-0 -translate-x-4 pointer-events-none"
                  }`}
                >
                  <div className="bg-[#071633]/92 backdrop-blur-md pl-3 pr-2.5 py-6 border-y border-r border-white/15 shadow-lg">
                    <div className="flex items-center gap-2.5 [writing-mode:vertical-rl] rotate-180 select-none">
                      <span className="text-sm font-bold text-white tracking-wide whitespace-nowrap">
                        {member.name}
                      </span>
                      <span className="text-[11px] font-semibold text-[#C59B27] uppercase tracking-wider whitespace-nowrap">
                        {member.role}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Overlay: Inactive/Collapsed Card (Compact Flush Bottom - Mobile) */}
                <div
                  className={`absolute left-0 right-0 bottom-0 z-10 flex sm:hidden transition-all duration-500 ${
                    !isActive
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 translate-y-2 pointer-events-none"
                  }`}
                >
                  <div className="bg-[#071633]/95 backdrop-blur-md px-4 py-2.5 border-t border-white/15 shadow-sm flex items-center justify-between w-full">
                    <span className="text-xs font-bold text-white truncate">
                      {member.name}
                    </span>
                    <span className="text-[10px] font-semibold text-[#C59B27] uppercase tracking-wider truncate ml-2">
                      {member.role}
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
