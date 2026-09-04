import React from "react";
import { QrCampaignItem } from "@/types/dashboard.types";

interface QrCampaignsTableProps {
  campaigns?: QrCampaignItem[];
}

export function QrCampaignsTable({ campaigns = [] }: QrCampaignsTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 mt-6">
      {/* Titre de la section */}
      <h3 className="text-sm font-bold text-[#0B1F4D] tracking-tight mb-4">
        Statistiques des campagnes QR
      </h3>

      {/* En-tête du tableau */}
      <div className="grid grid-cols-4 bg-slate-100/90 rounded-md py-2.5 px-4 text-[11px] font-semibold text-slate-600 tracking-wider uppercase">
        <div>NOM DU SUPPORT</div>
        <div>CODE COURT</div>
        <div>SCANS</div>
        <div>DATE DE CRÉATION</div>
      </div>

      {/* Corps du tableau / État vide */}
      {campaigns.length === 0 ? (
        <div className="py-12 text-center text-xs text-slate-500 font-normal">
          Aucun QR Code Généré.
        </div>
      ) : (
        <div className="divide-y divide-slate-100 text-xs text-slate-700">
          {campaigns.map((camp) => (
            <div
              key={camp.id}
              className="grid grid-cols-4 py-3 px-4 hover:bg-slate-50 transition-colors items-center"
            >
              <div className="font-medium text-slate-900">{camp.supportName}</div>
              <div className="font-mono text-slate-500">{camp.shortCode}</div>
              <div className="font-semibold text-slate-800">{camp.scans}</div>
              <div className="text-slate-500">{camp.createdAt}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
