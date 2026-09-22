"use client";

import * as React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getFormationsCatalog } from "@/data/formations";

import { FormationsHeroSection } from "@/components/formations/FormationsHeroSection";
import { FormationsFilterSection } from "@/components/formations/FormationsFilterSection";
import { FormationsGridSection } from "@/components/formations/FormationsGridSection";
import { FormationsPagination } from "@/components/formations/FormationsPagination";
import { FormationsCTA } from "@/components/formations/FormationsCTA";

export default function FormationsPage() {
  const { t } = useLanguage();
  const formationsCatalog = getFormationsCatalog(t);

  return (
    <div className="w-full bg-white dark:bg-slate-900 transition-colors duration-300">
      <main className="w-full pt-10 sm:pt-14 lg:pt-16 flex flex-col pb-16 sm:pb-24">
        <FormationsHeroSection />
        <FormationsFilterSection />
        <FormationsGridSection formations={formationsCatalog} />
        <FormationsPagination />
        <FormationsCTA />
      </main>
    </div>
  );
}