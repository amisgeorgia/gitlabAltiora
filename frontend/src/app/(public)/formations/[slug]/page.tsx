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
    <main className="w-full pt-10 sm:pt-14 lg:pt-16 bg-white dark:bg-slate-900 pb-16 transition-colors duration-300">
      <FormationHeader formation={formation} />

      <section className="w-full px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12">
        <div className="mx-auto max-w-357.5 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <FormationContent formation={formation} />
          </div>
          <div className="lg:col-span-1">
            <FormationSidebar />
          </div>
        </div>
      </section>
    </main>
  );
}