import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface ExpertiseHeaderProps {
  title: string;
  description: string;
}

export function ExpertiseHeader({ title, description }: ExpertiseHeaderProps) {
  return (
    <div className="bg-[#0D1322] dark:bg-slate-950 text-white py-16 transition-colors duration-300 md:py-24">
      <div className="container mx-auto px-4 sm:px-8 max-w-4xl text-center">
        <Link 
          href="/expertises" 
          className="inline-flex items-center text-slate-300 hover:text-gold-400 transition-colors mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Retour aux expertises
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">{title}</h1>
        <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>
      </div>
    </div>
  );
}