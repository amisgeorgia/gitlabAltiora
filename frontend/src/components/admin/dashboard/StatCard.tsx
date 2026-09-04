import React from "react";
import { ArrowUp, ArrowDown, QrCode, MessageSquare, TrendingUp } from "lucide-react";
import { StatCardItem } from "@/types/dashboard.types";

interface StatCardProps {
  stat: StatCardItem;
}

export function StatCard({ stat }: StatCardProps) {
  const isPositive = stat.trend === "up";

  const renderIcon = () => {
    switch (stat.iconType) {
      case "qr":
        return (
          <div className="w-8 h-8 rounded-lg bg-[#F8ECC2] flex items-center justify-center text-[#B88A1A]">
            <QrCode className="w-4.5 h-4.5" />
          </div>
        );
      case "chat-green":
        return (
          <div className="w-8 h-8 rounded-lg bg-[#DCFCE7] flex items-center justify-center text-[#16A34A]">
            <MessageSquare className="w-4.5 h-4.5" />
          </div>
        );
      case "chat-yellow":
        return (
          <div className="w-8 h-8 rounded-lg bg-[#FEF9C3] flex items-center justify-center text-[#CA8A04]">
            <MessageSquare className="w-4.5 h-4.5" />
          </div>
        );
      case "trend":
        return (
          <div className="w-8 h-8 rounded-lg bg-[#F1F5F9] flex items-center justify-center text-[#475569]">
            <TrendingUp className="w-4.5 h-4.5" />
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 flex flex-col justify-between h-34">
      {/* Ligne du haut : Titre et Icône */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-700 tracking-tight">
          {stat.title}
        </span>
        {renderIcon()}
      </div>

      {/* Ligne du bas : Valeur et Tendance */}
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-3xl lg:text-[34px] font-bold text-slate-900 tracking-tight leading-none">
          {stat.value}
        </span>

        <div
          className={`flex items-center gap-1 text-xs font-semibold ${
            isPositive ? "text-[#16A34A]" : "text-[#DC2626]"
          }`}
        >
          <div
            className={`w-4 h-4 rounded-full flex items-center justify-center text-white text-[10px] ${
              isPositive ? "bg-[#16A34A]" : "bg-[#DC2626]"
            }`}
          >
            {isPositive ? (
              <ArrowUp className="w-2.5 h-2.5 stroke-[3]" />
            ) : (
              <ArrowDown className="w-2.5 h-2.5 stroke-[3]" />
            )}
          </div>
          <span>{stat.change}</span>
        </div>
      </div>
    </div>
  );
}
