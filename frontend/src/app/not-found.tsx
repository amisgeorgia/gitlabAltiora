import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center px-4">
      <h1 className="text-4xl font-extrabold text-slate-900">404</h1>
      <p className="text-lg text-slate-600">Page introuvable.</p>
      <Link
        href="/"
        className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
      >
        Retourner à l&apos;accueil
      </Link>
    </div>
  );
}
