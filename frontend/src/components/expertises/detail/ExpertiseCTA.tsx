import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function ExpertiseCTA() {
  return (
    <div className="text-center">
      <h3 className="text-xl font-bold text-blue-950 dark:text-white mb-6">
        Besoin d'accompagnement sur ce sujet ?
      </h3>
      <Link href="/contact">
        <Button variant="gold" size="lg" className="px-8 h-12 text-lg shadow-xl shadow-gold-500/20">
          Discutons de votre projet
        </Button>
      </Link>
    </div>
  );
}