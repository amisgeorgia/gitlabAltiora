import React from "react";
import { PagePlaceholder } from "@/components/common/PagePlaceholder";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ExpertiseDetailPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <PagePlaceholder
      title={`Expertise : ${slug}`}
      description="Détail de l'expertise sélectionnée"
    />
  );
}
