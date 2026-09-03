import React from "react";

interface DashboardHeaderProps {
  title?: string;
  subtitle?: string;
}

export function DashboardHeader({
  title = "Tableau de bord ALTIORA",
  subtitle = "Statistiques consolidées (Scans QR, Conversions Chatbot, Trafic)",
}: DashboardHeaderProps) {
  return (
    <div className="space-y-1 mb-6">
      <h1 className="text-2xl md:text-[26px] font-bold text-[#0B1F4D] tracking-tight">
        {title}
      </h1>
      <p className="text-xs md:text-sm text-slate-500 font-normal">
        {subtitle}
      </p>
    </div>
  );
}
