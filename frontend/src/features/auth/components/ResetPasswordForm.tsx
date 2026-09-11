"use client";

import React, { useState } from "react";
import Link from "next/link";
import { KeyRound, ArrowRight } from "lucide-react";
import { PasswordField } from "./PasswordField";
import { AuthFeedback } from "./AuthFeedback";
import { authService } from "../services/auth.service";
import { validatePasswordRules } from "../utils/password-validation";
import { formatError } from "@/utils/format-error";
import { cn } from "@/utils/cn";

export function ResetPasswordForm({ token: initialToken }: { token?: string | null }) {
  const [token, setToken] = useState(initialToken || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const rules = validatePasswordRules(password);

  // Calcul du score de force
  const score = [
    rules.hasMinLength,
    rules.hasUppercase,
    rules.hasLowercase,
    rules.hasDigit,
  ].filter(Boolean).length;

  let strengthLabel = "Faible";
  let strengthColor = "text-red-500";
  let barColor = "bg-red-500";
  let barWidth = "w-1/4";

  if (score >= 4) {
    strengthLabel = "Fort";
    strengthColor = "text-emerald-600";
    barColor = "bg-emerald-500";
    barWidth = "w-full";
  } else if (score >= 3) {
    strengthLabel = "Moyen";
    strengthColor = "text-[#D4AF37]";
    barColor = "bg-[#D4AF37]";
    barWidth = "w-2/3";
  } else if (score >= 2) {
    strengthLabel = "Moyen";
    strengthColor = "text-[#D4AF37]";
    barColor = "bg-[#D4AF37]";
    barWidth = "w-1/2";
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!token.trim()) {
      setFeedback({
        type: "error",
        message: "Veuillez renseigner votre jeton de réinitialisation.",
      });
      return;
    }

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
          "Le mot de passe doit comporter au moins 8 caractères, une majuscule, une minuscule et un chiffre.",
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
        token: token.trim(),
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
            className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-[#D4AF37] hover:bg-[#B88A1A] font-semibold text-white transition-all duration-200 cursor-pointer"
          >
            <span>Se connecter maintenant</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7" noValidate>
          {/* Groupe des champs */}
          <div className="space-y-4">
            {/* Champ Jeton de réinitialisation */}
            <div className="flex flex-col gap-1 w-full">
              <div className="relative flex items-center">
                <div className="absolute left-4 pointer-events-none text-slate-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  id="reset-token"
                  type="text"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="Jeton reçu par e-mail"
                  className="h-12 w-full rounded-full border border-slate-200 bg-[#F8F9FA] pl-11 pr-5 py-2.5 text-sm text-[#0B1F4D] placeholder:text-slate-400 transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={isSubmitting}
                  required
                />
              </div>
            </div>

            {/* Champ Nouveau mot de passe */}
            <div className="flex flex-col gap-1 w-full">
              <PasswordField
                id="new-password"
                placeholder="Nouveau mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
              />
            </div>

            {/* Jauge de force de mot de passe */}
            {password.length > 0 && (
              <div className="space-y-1.5 px-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Force de mot de passe</span>
                  <span className={cn("font-semibold text-xs", strengthColor)}>
                    {strengthLabel}
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={cn(
                      "h-full transition-all duration-300 rounded-full",
                      barColor,
                      barWidth
                    )}
                  />
                </div>
              </div>
            )}

            {/* Champ Confirmer le mot de passe */}
            <div className="flex flex-col gap-1 w-full">
              <PasswordField
                id="confirm-password"
                placeholder="Confirmer le mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Groupe Bouton & Lien */}
          <div className="space-y-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 rounded-full bg-[#D4AF37] hover:bg-[#B88A1A] font-semibold text-white transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>
                {isSubmitting ? "Réinitialisation…" : "Réinitialiser le mot de passe"}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-center pt-1">
              <Link
                href="/connexion"
                className="text-xs font-medium text-slate-500 hover:text-[#0B1F4D] transition-colors cursor-pointer"
              >
                &larr; Retour à la connexion
              </Link>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
