"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface PreloaderProps {
  onComplete?: () => void;
  minDuration?: number; // Duration in ms
}

export function Preloader({ onComplete, minDuration = 1800 }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(100, Math.floor((elapsed / minDuration) * 100));

      setProgress(rawProgress);

      if (rawProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(() => {
            setIsDone(true);
            if (onComplete) onComplete();
          }, 600); // fade duration
        }, 200);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [minDuration, onComplete]);

  if (isDone) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white text-[#0F223D] transition-all duration-700 ease-in-out ${
        isFadingOut ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Background glowing ambience */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[#C59B27]/10 blur-3xl animate-pulse-glow" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#0F223D]/5 blur-3xl animate-pulse-glow" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-4">
        {/* Logo Container with Golden Halo */}
        <div className="relative flex items-center justify-center">
          {/* Animated Golden Ring */}
          <div className="absolute -inset-3 rounded-2xl border border-[#C59B27]/30 animate-spin [animation-duration:8s]" />
          <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#C59B27]/20 to-transparent blur-sm" />

          {/* Logo Card */}
          <div className="relative flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-2xl bg-white p-3 shadow-xl border border-slate-100">
            <Image
              src="/images/logo.png"
              alt="ALTIORA Logo"
              width={90}
              height={90}
              priority
              className="object-contain drop-shadow-sm"
            />
          </div>
        </div>

        {/* Brand Name & Tagline */}
        <div className="flex flex-col items-center text-center">
          <h2 className="text-xl sm:text-2xl font-bold tracking-wider text-[#0F223D]">
            ALTIORA <span className="text-[#C59B27]">CONNECT</span>
          </h2>
          <p className="mt-1 text-xs sm:text-sm font-medium tracking-widest text-[#0F223D]/60 uppercase">
            Solutions & Performance
          </p>
        </div>

        {/* Progress Bar & Counter */}
        <div className="w-56 sm:w-64 flex flex-col items-center gap-2 mt-2">
          <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-slate-100 border border-slate-200/80">
            <div
              className="h-full bg-gradient-to-r from-[#C59B27] via-[#e5b942] to-[#C59B27] rounded-full transition-all duration-100 ease-out shadow-[0_0_10px_rgba(197,155,39,0.5)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex w-full justify-between items-center text-[11px] font-medium text-slate-500">
            <span className="animate-pulse">Chargement en cours...</span>
            <span className="font-mono text-[#C59B27] font-semibold">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
