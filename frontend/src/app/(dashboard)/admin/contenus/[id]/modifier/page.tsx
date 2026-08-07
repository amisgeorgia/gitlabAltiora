import React from "react";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminEditContenuPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">Modifier le contenu</h1>
      <p className="text-slate-600">Modification du contenu ID : {id}</p>
    </div>
  );
}
