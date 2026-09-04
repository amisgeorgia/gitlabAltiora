import React from "react";
import { mockDashboardData } from "@/data/dashboard.mock";
import { DashboardHeader } from "@/components/admin/dashboard/DashboardHeader";
import { DashboardStatsGrid } from "@/components/admin/dashboard/DashboardStatsGrid";
import { WebTrafficChart } from "@/components/admin/dashboard/WebTrafficChart";
import { QrScansChart } from "@/components/admin/dashboard/QrScansChart";
import { QrCampaignsTable } from "@/components/admin/dashboard/QrCampaignsTable";

export default function AdminDashboardPage() {
  return (
    <div className="w-full space-y-6">
      {/* 1. Titre & Sous-titre */}
      <DashboardHeader />

      {/* 2. Grille des 4 Cartes Statistiques */}
      <DashboardStatsGrid stats={mockDashboardData.stats} />

      {/* 3. Section des Graphiques (Visites Web + Scans QR) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7">
          <WebTrafficChart
            data7Days={mockDashboardData.traffic7Days}
            data30Days={mockDashboardData.traffic30Days}
          />
        </div>
        <div className="lg:col-span-5">
          <QrScansChart data={mockDashboardData.qrScansWeekly} />
        </div>
      </div>

      {/* 4. Tableau des Statistiques des Campagnes QR */}
      <QrCampaignsTable campaigns={mockDashboardData.campaigns} />
    </div>
  );
}
