"use client";

import React, { useEffect } from "react";
import { LogOut, X } from "lucide-react";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps) {
  // Fermer la modale
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Contenu de la modale */}
      <div className="relative w-full max-w-md rounded-2xl bg-white border border-slate-200 p-6 z-10 animate-in fade-in zoom-in-95 duration-150">
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="absolute right-4 top-4 w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-[#D4AF37] mb-4">
            <LogOut className="w-6 h-6" />
          </div>

          <h3 className="text-lg font-bold text-slate-900 mb-2">
            Confirmer la déconnexion
          </h3>

          <p className="text-sm text-slate-600 mb-6">
            Êtes-vous sûr de vouloir vous déconnecter de votre espace administrateur ALTIORA ?
          </p>

          <div className="flex w-full items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-200 py-2.5 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="flex-1 rounded-xl bg-[#0B1F4D] hover:bg-[#06132F] py-2.5 px-4 text-sm font-semibold text-white transition-colors cursor-pointer"
            >
              Se déconnecter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
