"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { AdminLayoutProvider } from "@/providers/AdminLayoutProvider";
import { AuthProvider } from "@/providers/AuthProvider";

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/connexion");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-[#0B1F4D]" />
          <p className="text-sm text-slate-600">Vérification de la session…</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <AdminLayoutProvider>
      <div className="flex h-screen overflow-hidden bg-slate-50">
        {/* Sidebar fixe à gauche */}
        <AdminSidebar />

        {/* Colonne droite : Header fixe en haut + Main seul avec défilement interne */}
        <div className="flex flex-1 flex-col min-w-0 h-full overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto px-4 sm:px-8 pb-10 pt-2">
            {children}
          </main>
        </div>
      </div>
    </AdminLayoutProvider>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AuthProvider>
  );
}
