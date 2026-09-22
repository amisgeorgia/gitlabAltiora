"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function FormationSidebar() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#0B1528] via-[#0A111F] to-[#060B14] border border-slate-800 p-8 sm:p-10 text-white shadow-xl sticky top-24 min-h-105 sm:min-h-115 flex flex-col justify-between">
      {/* Halo lumineux subtil en arrière-plan */}
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-[#C59B27]/10 blur-3xl" />

      <div>
        <h3 className="text-2xl font-bold text-white mb-4">Intéressé(e) ?</h3>
        <p className="text-slate-300 text-base leading-relaxed">
          Inscrivez-vous dès maintenant ou contactez-nous pour organiser une session intra-entreprise sur-mesure.
        </p>
      </div>

      <div className="space-y-4 pt-8">
        <Link href="/contact" className="block w-full">
          <Button variant="gold" className="w-full h-12 text-base font-bold bg-[#C59B27] hover:bg-[#b08a22] text-[#0B1F4D]">
            S&apos;inscrire
          </Button>
        </Link>
        <Button variant="outline" className="w-full h-12 text-base border-slate-700 text-white hover:bg-white/10 hover:text-white">
          Télécharger la brochure
        </Button>
      </div>
    </div>
  );
}