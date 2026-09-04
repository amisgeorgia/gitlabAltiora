import React from "react";
import { StatCardItem } from "@/types/dashboard.types";
import { StatCard } from "./StatCard";

interface DashboardStatsGridProps {
  stats: StatCardItem[];
}

export function DashboardStatsGrid({ stats }: DashboardStatsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <StatCard key={stat.id} stat={stat} />
      ))}
    </div>
  );
}
