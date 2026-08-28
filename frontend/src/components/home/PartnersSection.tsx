"use client";

import React from "react";

interface PartnerItem {
  id: string;
  name: string;
  isGold: boolean;
  logo: React.ReactNode;
}

export function PartnersSection() {
  const partners: PartnerItem[] = [
    {
      id: "asus",
      name: "ASUS",
      isGold: true,
      logo: (
        <span className="text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tighter text-[#4A3B00] select-none font-sans italic">
          ASUS
        </span>
      ),
    },
    {
      id: "puma",
      name: "PUMA",
      isGold: false,
      logo: (
        <div className="flex items-center gap-2 select-none">
          <span className="text-2xl sm:text-3xl lg:text-[34px] font-black tracking-tight text-[#4B5563]">
            PUMA
          </span>
          <svg
            className="w-8 h-8 sm:w-10 sm:h-10 fill-[#4B5563]"
            viewBox="0 0 24 24"
          >
            <path d="M19.5 7.5c-1.5-1.5-3.5-2-5.5-1.5l1 2c1.2-.3 2.5 0 3.5 1 .8.8 1 2 .5 3l1.8.8c.8-1.8.5-3.8-1.3-5.3zM4 14.5l3-2c1.5-1 3.5-.8 4.8.5l1.5 1.5c.8.8 2 .8 2.8 0l2-2c.4-.4 1-.4 1.4 0l1.5 1.5-1.5 1.5-2 2c-1.5 1.5-4 1.5-5.5 0l-1.5-1.5c-.4-.4-1-.5-1.5-.2l-3 2-1.5-1.8z" />
          </svg>
        </div>
      ),
    },
    {
      id: "sony",
      name: "SONY",
      isGold: true,
      logo: (
        <span className="text-3xl sm:text-4xl lg:text-[42px] font-black tracking-wider text-[#4A3B00] select-none font-serif">
          SONY
        </span>
      ),
    },
    {
      id: "ikea",
      name: "IKEA",
      isGold: false,
      logo: (
        <div className="border-2 border-[#6B7280] rounded-[50px] px-6 py-1 bg-transparent select-none">
          <span className="text-2xl sm:text-3xl lg:text-[32px] font-black tracking-widest text-[#4B5563]">
            IKEA
          </span>
        </div>
      ),
    },
  ];

  return (
    <section className="relative w-full bg-white py-14 sm:py-16 lg:py-20 overflow-hidden">
      <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8">
        
        {/* Header Label: Bullet + "Partenaires actifs" */}
        <div className="flex items-center gap-2.5 mb-8 sm:mb-10 sr-header">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-900 shrink-0" />
          <h3 className="text-base sm:text-lg font-semibold text-slate-900 tracking-tight">
            Partenaires actifs
          </h3>
        </div>

        {/* 4 Partners Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className={`h-[160px] sm:h-[180px] lg:h-[190px] rounded-[22px] sm:rounded-[26px] flex items-center justify-center p-6 transition-all duration-300 hover:scale-[1.02] cursor-pointer sr-scale ${
                partner.isGold
                  ? "bg-[#D4AF37] hover:bg-[#c9a32c] shadow-sm"
                  : "bg-white border border-slate-200/80 hover:border-slate-300 shadow-xs"
              }`}
            >
              {partner.logo}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
