"use client"

import * as React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { getFormationsCatalog } from '@/data/formations'

import { FormationsHeroSection } from '@/components/formations/FormationsHeroSection'
import { FormationsFilterSection } from '@/components/formations/FormationsFilterSection'
import { FormationsGridSection } from '@/components/formations/FormationsGridSection'
import { FormationsPagination } from '@/components/formations/FormationsPagination'
import { FormationsCTA } from '@/components/formations/FormationsCTA'

export default function FormationsPage() {
  const { t } = useLanguage();
  const formationsCatalog = getFormationsCatalog(t);

  return (
    <div className="bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-8 max-w-7xl pt-10 pb-20">
        <FormationsHeroSection />
        <FormationsFilterSection />
        <FormationsGridSection formations={formationsCatalog} />
        <FormationsPagination />
        <FormationsCTA />
      </div>
    </div>
  );
}