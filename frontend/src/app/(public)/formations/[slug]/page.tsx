import React from "react";
import { PagePlaceholder } from "@/components/common/PagePlaceholder";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function FormationDetailPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <PagePlaceholder
      title={`Formation : ${slug}`}
      description="Détail du programme de la formation"
    />
  );
}
