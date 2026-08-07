import React from "react";
import { ForgotPasswordForm } from "@/features/auth/components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-bold text-[#0B1F4D]">Mot de passe oublié</h1>
        <p className="text-sm text-slate-600">
          Saisissez votre e-mail pour recevoir les instructions de réinitialisation
        </p>
      </div>
      <ForgotPasswordForm />
    </div>
  );
}
