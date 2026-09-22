import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { EXPERTISES_DATA } from "@/data/expertiseSlug";
import { ExpertiseHeader } from "@/components/expertises/detail/ExpertiseHeader";
import { ExpertiseDetails } from "@/components/expertises/detail/ExpertiseDetails";
import { ExpertiseCTA } from "@/components/expertises/detail/ExpertiseCTA";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = EXPERTISES_DATA[slug];

  if (!data) return { title: "Expertise introuvable" };

  return {
    title: `${data.title} | Altiora Connect`,
    description: data.description,
  };
}

export async function generateStaticParams() {
  return Object.keys(EXPERTISES_DATA).map((slug) => ({ slug }));
}

export default async function ExpertiseSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const data = EXPERTISES_DATA[slug];

  if (!data) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-blue-950 dark:text-white mb-4">
          Expertise introuvable
        </h1>
        <Link href="/expertises">
          <Button>Retour aux expertises</Button>
        </Link>
      </div>
    );
  }

return (
    <main className="w-full pt-10 sm:pt-14 lg:pt-16 bg-white dark:bg-slate-900 transition-colors duration-300 pb-12 sm:pb-16">
      <ExpertiseHeader title={data.title} description={data.description} />

      <div className="mx-auto max-w-357.5 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 sm:space-y-12">
        <ExpertiseDetails details={data.details} />
        <ExpertiseCTA />
      </div>
    </main>
  );
}