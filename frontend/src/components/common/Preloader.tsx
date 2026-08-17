"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface PreloaderProps {
  onComplete?: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => {
      setIsFadingOut(true);
    }, 300);

    const removeTimer = window.setTimeout(() => {
      setIsDone(true);
      onComplete?.();
    }, 550);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(removeTimer);
    };
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white text-[#0F223D]
        transition-opacity duration-200 ease-out
        ${
          isFadingOut
            ? "pointer-events-none opacity-0"
            : "opacity-100"
        }`}
    >
      <div className="relative z-10 flex flex-col items-center gap-6 px-4">
        {/* Logo */}
        <div className="relative flex items-center justify-center">
          <div className="absolute -inset-3 rounded-2xl border border-[#C59B27]/30" />

          <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border border-slate-100 bg-white p-3 shadow-md sm:h-28 sm:w-28">
            <Image
              src="/images/logo.webp"
              alt="ALTIORA CONNECT"
              width={90}
              height={90}
              sizes="90px"
              priority
              className="object-contain"
            />
          </div>
        </div>

        {/* Brand */}
        <div className="flex flex-col items-center text-center">
          <p className="text-xl font-bold tracking-wider text-[#0F223D] sm:text-2xl">
            ALTIORA{" "}
            <span className="text-[#C59B27]">
              CONNECT
            </span>
          </p>

          <p className="mt-1 text-xs font-medium uppercase tracking-widest text-[#0F223D]/60 sm:text-sm">
            Solutions & Performance
          </p>
        </div>

        {/* Loading indicator */}
        <div className="mt-2 h-1.5 w-56 overflow-hidden rounded-full bg-slate-100 sm:w-64">
          <div className="h-full w-full origin-left animate-pulse rounded-full bg-[#C59B27]" />
        </div>

        <span className="text-[11px] font-medium text-slate-500">
          Chargement...
        </span>
      </div>
    </div>
  );
}