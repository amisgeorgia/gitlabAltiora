import React from "react";
import { PagePlaceholder } from "@/components/common/PagePlaceholder";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ActualiteDetailPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <PagePlaceholder
      title={`Article : ${slug}`}
      description="Détail de l'article d'actualité"
    />
  );
}
