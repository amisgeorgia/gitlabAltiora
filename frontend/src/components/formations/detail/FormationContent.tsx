"use client"

import { CheckCircle2 } from "lucide-react"
import { FormationDetail } from "@/data/formationsSlug"


interface FormationContentProps {
  formation: FormationDetail;
}

export function FormationContent({ formation }: FormationContentProps) {
  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-2xl font-bold text-blue-950 dark:text-white mb-6">Objectifs de la formation</h2>
        <ul className="space-y-4">
          {formation.objectives.map((obj, idx) => (
            <li key={idx} className="flex items-start">
              <CheckCircle2 className="h-6 w-6 text-gold-500 mr-4 shrink-0 mt-0.5" />
              <span className="text-slate-700 dark:text-slate-300 leading-relaxed">{obj}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-blue-950 dark:text-white mb-6">Public cible</h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{formation.target}</p>
      </section>
      
      <section>
        <h2 className="text-2xl font-bold text-blue-950 dark:text-white mb-6">Prérequis</h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{formation.prerequisites}</p>
      </section>
    </div>
  );
}