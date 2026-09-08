"use client"

import * as React from 'react'
import { useLanguage } from "@/contexts/LanguageContext"
import { getFormationBySlug } from "@/data/formationsSlug"
import { FormationHeader } from "@/components/formations/detail/FormationHeader"
import { FormationContent } from "@/components/formations/detail/FormationContent"
import { FormationSidebar } from "@/components/formations/detail/FormationSidebar"
import { FormationNotFound } from "@/components/formations/FormationNotFound"

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function FormationSlugPage({ params }: PageProps) {
  const { slug } = React.use(params);
  const { t } = useLanguage();

  const formation = getFormationBySlug(slug, t);

  if (!formation) {
    return <FormationNotFound />;
  }

  return (
    <div className="bg-white dark:bg-slate-900 pb-16 transition-colors duration-300">
      <FormationHeader formation={formation} />

      <div className="container mx-auto px-4 sm:px-8 max-w-4xl mt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          <FormationContent formation={formation} />
        </div>
        <div className="md:col-span-1">
          <FormationSidebar />
        </div>
      </div>
    </div>
  );
}