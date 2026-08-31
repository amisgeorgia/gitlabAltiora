"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className={`flex items-center justify-center gap-2 sm:gap-3 select-none ${className}`}
    >
      {/* Bouton Page précédente */}
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        aria-label="Page précédente"
        className={`flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-lg border transition-all duration-200 cursor-pointer ${
          currentPage === 1
            ? "border-slate-200 text-slate-300 cursor-not-allowed bg-slate-50/50"
            : "border-slate-200 text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 active:scale-95 shadow-xs"
        }`}
      >
        <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
      </button>

      {/* Numéros de page */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {pages.map((page) => {
          const isActive = page === currentPage;
          return (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              aria-current={isActive ? "page" : undefined}
              aria-label={`Page ${page}`}
              className={`flex items-center justify-center min-w-[38px] sm:min-w-[42px] h-10 sm:h-11 px-3 sm:px-3.5 rounded-lg text-sm sm:text-base font-bold transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-[#0B1F4D] text-white shadow-sm shadow-[#0B1F4D]/20 scale-100"
                  : "bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-950 active:scale-95"
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Bouton Page suivante */}
      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        aria-label="Page suivante"
        className={`flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-lg border transition-all duration-200 cursor-pointer ${
          currentPage === totalPages
            ? "border-slate-200 text-slate-300 cursor-not-allowed bg-slate-50/50"
            : "border-slate-200 text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 active:scale-95 shadow-xs"
        }`}
      >
        <ChevronRight className="w-5 h-5 stroke-[2.2]" />
      </button>
    </nav>
  );
}
