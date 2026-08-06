"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export function AdminHeader() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/connexion");
  };

  return (
    <header className="h-16 border-b border-slate-200 bg-white px-6 flex items-center justify-between">
      <h2 className="text-lg font-semibold text-[#0B1F4D]">
        Espace Administration
      </h2>
      <div className="flex items-center gap-4 text-sm text-slate-600">
        {user && (
          <span className="font-medium text-[#0B1F4D]">
            {user.firstName} {user.lastName} ({user.role})
          </span>
        )}
        <Link href="/" className="hover:text-slate-900">
          Voir le site public
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-md bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100 transition-colors"
        >
          Déconnexion
        </button>
      </div>
    </header>
  );
}
