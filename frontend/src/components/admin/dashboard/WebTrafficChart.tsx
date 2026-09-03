"use client";

import React, { useState } from "react";
import { TrafficDataPoint } from "@/types/dashboard.types";
import { useAdminLayout } from "@/hooks/useAdminLayout";

interface WebTrafficChartProps {
  data7Days: TrafficDataPoint[];
  data30Days: TrafficDataPoint[];
}

export function WebTrafficChart({ data7Days, data30Days }: WebTrafficChartProps) {
  const [period, setPeriod] = useState<"7d" | "30d">("30d");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { isCollapsed } = useAdminLayout();
  const data = period === "7d" ? data7Days : data30Days;

  const yTicks = [800, 600, 400, 200, 0];
  const maxY = 800;

  // Dimensions SVG de référence
  const width = 600;
  const height = 380;
  const paddingLeft = 45;
  const paddingRight = 25;
  const paddingTop = 30;
  const paddingBottom = 45;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  // Calcul des coordonnées des points
  const points = data.map((d, index) => {
    const x = paddingLeft + (index / (data.length - 1)) * chartWidth;
    const y = paddingTop + chartHeight - (d.visits / maxY) * chartHeight;
    return { x, y, day: d.day, visits: d.visits };
  });

  // Fonction de spline cubique fluide (Catmull-Rom vers Bezier)
  const getCatmullRomPath = (pts: { x: number; y: number }[]) => {
    if (pts.length < 2) return "";
    let path = `M ${pts[0].x} ${pts[0].y}`;

    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = i > 0 ? pts[i - 1] : pts[i];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = i < pts.length - 2 ? pts[i + 2] : p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return path;
  };

  const linePath = getCatmullRomPath(points);
  const baselineY = paddingTop + chartHeight;
  const areaPath = points.length > 0
    ? `${linePath} L ${points[points.length - 1].x} ${baselineY} L ${points[0].x} ${baselineY} Z`
    : "";

  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200/90 p-6 flex flex-col justify-between transition-all duration-300 ease-in-out ${
        isCollapsed ? "h-[540px]" : "h-[490px]"
      }`}
    >
      {/* Styles d'animation en serpent de gauche à droite */}
      <style jsx>{`
        @keyframes snakeDraw {
          0% {
            stroke-dashoffset: 1000;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        @keyframes areaFadeIn {
          0% {
            opacity: 0;
          }
          40% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        @keyframes pointPop {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          70% {
            transform: scale(1.3);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>

      {/* En-tête : Titre & Switcher de période */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-[#0B1F4D] tracking-tight">
          Visites du site web
        </h3>

        {/* Switcher 7 jours / 30 jours */}
        <div className="inline-flex items-center rounded-full border border-slate-300 p-0.5 bg-white text-xs">
          <button
            type="button"
            onClick={() => setPeriod("7d")}
            className={`px-3.5 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
              period === "7d"
                ? "bg-[#06132F] text-white scale-[1.02]"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            7 jours
          </button>
          <button
            type="button"
            onClick={() => setPeriod("30d")}
            className={`px-3.5 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
              period === "30d"
                ? "bg-[#06132F] text-white scale-[1.02]"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            30 jours
          </button>
        </div>
      </div>

      {/* Zone du graphique SVG interactif et animé */}
      <div className="flex-1 w-full relative min-h-0" key={period}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Dégradé sous la courbe */}
            <linearGradient id="trafficGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0.35" />
              <stop offset="65%" stopColor="#3B82F6" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Lignes de repère horizontales et Labels Y */}
          {yTicks.map((tick) => {
            const y = paddingTop + chartHeight - (tick / maxY) * chartHeight;
            return (
              <g key={tick}>
                <text
                  x={paddingLeft - 12}
                  y={y + 4}
                  textAnchor="end"
                  className="text-[11px] fill-slate-400 font-sans select-none"
                >
                  {tick}
                </text>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="#F1F5F9"
                  strokeWidth="1"
                  strokeDasharray={tick === 0 ? undefined : "3 3"}
                />
              </g>
            );
          })}

          {/* Remplissage dégradé fluide sous la courbe */}
          {areaPath && (
            <path
              d={areaPath}
              fill="url(#trafficGradient)"
              style={{
                animation: "areaFadeIn 1.5s ease-out forwards",
              }}
            />
          )}

          {/* Ligne de la courbe animée en serpent de gauche à droite */}
          {linePath && (
            <path
              d={linePath}
              fill="none"
              stroke="#0B3D7A"
              strokeWidth="2.5"
              strokeLinecap="round"
              pathLength={1000}
              strokeDasharray={1000}
              strokeDashoffset={0}
              style={{
                animation: "snakeDraw 1.4s cubic-bezier(0.25, 1, 0.5, 1) forwards",
              }}
            />
          )}

          {/* Ligne verticale de survol */}
          {hoveredIndex !== null && points[hoveredIndex] && (
            <line
              x1={points[hoveredIndex].x}
              y1={paddingTop}
              x2={points[hoveredIndex].x}
              y2={baselineY}
              stroke="#94A3B8"
              strokeWidth="1"
              strokeDasharray="2 2"
              className="transition-opacity duration-150"
            />
          )}

          {/* Points de données qui apparaissent séquentiellement avec le serpent */}
          {points.map((pt, i) => {
            const isHovered = hoveredIndex === i;
            const delay = (0.2 + (i / (points.length - 1)) * 1.0).toFixed(2);

            return (
              <g
                key={i}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Zone de survol invisible élargie */}
                <circle cx={pt.x} cy={pt.y} r="16" fill="transparent" />

                {/* Halo interactif au survol */}
                {isHovered && (
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="8"
                    className="fill-[#0B1F4D]/20 animate-ping"
                  />
                )}

                {/* Point de données avec apparition échelonnée */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? 5.5 : 3.5}
                  className={`transition-all duration-200 ${
                    isHovered
                      ? "fill-[#D4AF37] stroke-2 stroke-white"
                      : "fill-[#0B1F4D]"
                  }`}
                  style={{
                    transformOrigin: `${pt.x}px ${pt.y}px`,
                    animation: `pointPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s both`,
                  }}
                />

                {/* Bulle Tooltip au survol */}
                {isHovered && (
                  <g className="animate-in fade-in zoom-in-90 duration-150">
                    <rect
                      x={pt.x - 36}
                      y={pt.y - 34}
                      width="72"
                      height="24"
                      rx="6"
                      fill="#06132F"
                    />
                    <text
                      x={pt.x}
                      y={pt.y - 18}
                      textAnchor="middle"
                      className="text-[11px] fill-white font-bold font-sans select-none"
                    >
                      {pt.visits} visites
                    </text>
                  </g>
                )}

                {/* Label X (Jour) */}
                <text
                  x={pt.x}
                  y={height - 14}
                  textAnchor="middle"
                  className={`text-[11px] font-sans transition-colors duration-150 select-none ${
                    isHovered
                      ? "fill-[#0B1F4D] font-bold"
                      : "fill-slate-500 font-medium"
                  }`}
                >
                  {pt.day}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
