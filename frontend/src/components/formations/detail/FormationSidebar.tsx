"use client"

import Link from "next/link"
import { Button } from "@/components/ui/Button"

export function FormationSidebar() {
  return (
    <div className="bg-[#0D1322] text-white p-8 rounded-2xl sticky top-24 shadow-xl">
      <h3 className="text-xl font-bold mb-4">Intéressé(e) ?</h3>
      <p className="text-slate-300 text-sm mb-6 leading-relaxed">
        Inscrivez-vous dès maintenant ou contactez-nous pour organiser une session intra-entreprise sur-mesure.
      </p>
      <Link href="/contact">
        <Button variant="gold" className="w-full mb-4">
          S&apos;inscrire
        </Button>
      </Link>
      <Button variant="outline" className="w-full border-slate-600 text-white hover:bg-white/10 hover:text-white">
        Télécharger la brochure
      </Button>
    </div>
  );
}