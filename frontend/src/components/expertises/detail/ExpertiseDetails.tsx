import { CheckCircle2 } from "lucide-react";

interface ExpertiseDetailsProps {
  details: string[];
}

export function ExpertiseDetails({ details }: ExpertiseDetailsProps) {
  return (
    <div className="bg-slate-50 dark:bg-slate-800 p-8 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-700 mb-12">
      <h2 className="text-2xl font-bold text-blue-950 dark:text-white mb-8">
        Nos domaines d&apos;intervention
      </h2>
      <div className="space-y-6">
        {details.map((detail, index) => (
          <div key={index} className="flex items-start">
            <CheckCircle2 className="h-6 w-6 text-gold-500 mr-4 shrink-0 mt-0.5" />
            <p className="text-lg text-slate-700 dark:text-slate-300">{detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}