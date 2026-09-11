"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AuthCardLayout } from "@/features/auth/components/AuthCardLayout";
import { ResetPasswordForm } from "@/features/auth/components/ResetPasswordForm";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  return <ResetPasswordForm token={token} />;
}

export default function ResetPasswordPage() {
  return (
    <AuthCardLayout
      leftTitle="Changer le mot de passe"
      leftSubtitle="Ecrire votre nouveau mot de passe et le confirmer"
      rightTitle="Créer un nouveau mot de passe"
      rightSubtitle="Votre nouveau mot de passe doit être différent des mots de passe précédemment utilisés."
    >
      <Suspense
        fallback={
          <div className="flex justify-center py-6">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-300 border-t-[#0B1F4D]" />
          </div>
        }
      >
        <ResetPasswordContent />
      </Suspense>
    </AuthCardLayout>
  );
}
