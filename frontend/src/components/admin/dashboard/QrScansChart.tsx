"use client";

import React, { useState } from "react";
import { QrScanDataPoint } from "@/types/dashboard.types";
import { useAdminLayout } from "@/hooks/useAdminLayout";

interface QrScansChartProps {
  data: QrScanDataPoint[];
}

export function QrScansChart({ data }: QrScansChartProps) {
  const { isCollapsed } = useAdminLayout();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const yTicks = [60, 45, 30, 15, 0];
  const maxY = 60;

  // Dimensions SVG de référence
  const width = 420;
  const height = 380;
  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 30;
  const paddingBottom = 45;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;
  const barWidth = 22;

  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200/90 p-6 flex flex-col justify-between transition-all duration-300 ease-in-out ${
        isCollapsed ? "h-[540px]" : "h-[490px]"
      }`}
    >
      <style jsx>{`
        @keyframes barGrow {
          from {
            transform: scaleY(0);
          }
          to {
            transform: scaleY(1);
          }
        }
      `}</style>

      {/* En-tête */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-[#0B1F4D] tracking-tight">
          Scans QR Codes
        </h3>
      </div>

      {/* Zone du graphique SVG */}
      <div className="flex-1 w-full relative min-h-0">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          {/* Lignes de repère horizontales et Labels Y */}
          {yTicks.map((tick) => {
            const y = paddingTop + chartHeight - (tick / maxY) * chartHeight;
            return (
              <g key={tick}>
                <text
                  x={paddingLeft - 10}
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

          {/* Barres verticales dorées avec animation et hover */}
          {data.map((d, index) => {
            const slotWidth = chartWidth / data.length;
            const x = paddingLeft + index * slotWidth + (slotWidth - barWidth) / 2;
            const barH = (d.scans / maxY) * chartHeight;
            const y = paddingTop + chartHeight - barH;
            const isHovered = hoveredIndex === index;
            const delay = (0.1 + (index / data.length) * 0.4).toFixed(2);

            return (
              <g
                key={d.day}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Zone de survol élargie */}
                <rect
                  x={x - 8}
                  y={paddingTop}
                  width={barWidth + 16}
                  height={chartHeight}
                  fill="transparent"
                />

                {/* Barre Dorée ALTIORA animée avec croissance depuis la base */}
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barH}
                  fill={isHovered ? "#B88A1A" : "#D4AF37"}
                  rx="3"
                  className="transition-colors duration-200"
                  style={{
                    transformOrigin: `${x + barWidth / 2}px ${paddingTop + chartHeight}px`,
                    animation: `barGrow 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s both`,
                  }}
                />

                {/* Bulle Tooltip au survol */}
                {isHovered && (
                  <g className="animate-in fade-in zoom-in-90 duration-150">
                    <rect
                      x={x + barWidth / 2 - 32}
                      y={y - 30}
                      width="64"
                      height="22"
                      rx="5"
                      fill="#06132F"
                    />
                    <text
                      x={x + barWidth / 2}
                      y={y - 15}
                      textAnchor="middle"
                      className="text-[11px] fill-white font-bold font-sans select-none"
                    >
                      {d.scans} scans
                    </text>
                  </g>
                )}

                {/* Label X (Jour) */}
                <text
                  x={x + barWidth / 2}
                  y={height - 14}
                  textAnchor="middle"
                  className={`text-[11px] font-sans transition-colors duration-150 select-none ${
                    isHovered
                      ? "fill-[#0B1F4D] font-bold"
                      : "fill-slate-500 font-medium"
                  }`}
                >
                  {d.day}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
