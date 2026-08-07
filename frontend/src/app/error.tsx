"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center px-4">
      <h2 className="text-xl font-bold text-slate-900">
        Une erreur s&apos;est produite
      </h2>
      <p className="text-sm text-slate-600">
        {error.message || "Une erreur inattendue est survenue."}
      </p>
      <Button onClick={() => reset()} variant="primary">
        Réessayer
      </Button>
    </div>
  );
}
