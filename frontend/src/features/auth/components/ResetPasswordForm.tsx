"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PasswordField } from "./PasswordField";
import { AuthFeedback } from "./AuthFeedback";
import { authService } from "../services/auth.service";
import { validatePasswordRules } from "../utils/password-validation";
import { formatError } from "@/utils/format-error";

export function ResetPasswordForm({ token }: { token?: string | null }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!token) {
    return (
      <div className="space-y-4 text-center">
        <AuthFeedback
          type="error"
          message="Le lien de réinitialisation est invalide ou incomplet."
        />
        <div className="pt-2">
          <Link
            href="/connexion"
            className="inline-block rounded-md bg-[#0B1F4D] px-4 py-2 text-sm font-semibold text-white hover:bg-[#071433]"
          >
            Retourner à la connexion
          </Link>
        </div>
      </div>
    );
  }

  const rules = validatePasswordRules(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!password) {
      setFeedback({
        type: "error",
        message: "Veuillez renseigner votre nouveau mot de passe.",
      });
      return;
    }

    if (!rules.isValid) {
      setFeedback({
        type: "error",
        message:
          "Le mot de passe ne respecte pas les critères de sécurité requis.",
      });
      return;
    }

    if (password !== confirmPassword) {
      setFeedback({
        type: "error",
        message: "Les mots de passe ne correspondent pas.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await authService.resetPassword({
        token,
        password,
        confirmPassword,
      });
      setFeedback({ type: "success", message: res.message });
    } catch (err) {
      setFeedback({ type: "error", message: formatError(err) });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-5 text-left">
      {feedback && <AuthFeedback type={feedback.type} message={feedback.message} />}

      {feedback?.type === "success" ? (
        <div className="space-y-4 text-center pt-2">
          <Link
            href="/connexion"
            className="inline-block rounded-md bg-[#0B1F4D] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#071433]"
          >
            Se connecter maintenant
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <PasswordField
            id="new-password"
            label="Nouveau mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isSubmitting}
          />

          {/* Rule indicators */}
          <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-xs space-y-1">
            <p className="font-semibold text-slate-700">Règles du mot de passe :</p>
            <div className="grid grid-cols-2 gap-1 text-slate-600">
              <span className={rules.hasMinLength ? "text-emerald-700 font-medium" : ""}>
                {rules.hasMinLength ? "✓" : "•"} Au moins 8 caractères
              </span>
              <span className={rules.hasUppercase ? "text-emerald-700 font-medium" : ""}>
                {rules.hasUppercase ? "✓" : "•"} Une majuscule
              </span>
              <span className={rules.hasLowercase ? "text-emerald-700 font-medium" : ""}>
                {rules.hasLowercase ? "✓" : "•"} Une minuscule
              </span>
              <span className={rules.hasDigit ? "text-emerald-700 font-medium" : ""}>
                {rules.hasDigit ? "✓" : "•"} Un chiffre
              </span>
            </div>
          </div>

          <PasswordField
            id="confirm-password"
            label="Confirmez le mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isSubmitting}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-11 rounded-md bg-[#0B1F4D] font-semibold text-white transition-colors hover:bg-[#071433] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Réinitialisation…" : "Réinitialiser le mot de passe"}
          </button>
        </form>
      )}
    </div>
  );
}
