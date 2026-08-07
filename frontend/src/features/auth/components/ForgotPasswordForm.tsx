"use client";

import React, { useState } from "react";
import Link from "next/link";
import { env } from "@/config/env";
import { authService } from "../services/auth.service";
import { isValidEmail } from "@/lib/validators";
import { AuthFeedback } from "./AuthFeedback";
import { formatError } from "@/utils/format-error";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setFeedback(null);

    if (!email.trim()) {
      setEmailError("Veuillez renseigner votre adresse e-mail.");
      return;
    }

    if (!isValidEmail(email)) {
      setEmailError("Veuillez saisir une adresse e-mail valide.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await authService.forgotPassword({ email });
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
        <div className="space-y-4 text-center">
          {env.useMockApi && (
            <div className="rounded-md border border-[#D4AF37] bg-amber-50 p-3 text-xs text-[#0B1F4D] text-left">
              <strong>Mode Simulation :</strong>
              <br />
              Vous pouvez tester la réinitialisation directement :
              <div className="mt-2 text-center">
                <Link
                  href="/reinitialisation?token=mock-reset-token"
                  className="font-bold underline text-[#0B1F4D] hover:text-[#D4AF37]"
                >
                  Tester la réinitialisation avec le faux token
                </Link>
              </div>
            </div>
          )}

          <div className="pt-2">
            <Link
              href="/connexion"
              className="inline-block rounded-md bg-[#0B1F4D] px-4 py-2 text-sm font-semibold text-white hover:bg-[#071433]"
            >
              Retour à la connexion
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="forgot-email" className="text-sm font-medium text-[#0B1F4D]">
              Adresse e-mail
            </label>
            <input
              id="forgot-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={!!emailError}
              aria-describedby={emailError ? "forgot-email-error" : undefined}
              placeholder="votre-email@exemple.com"
              className={`flex h-11 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0B1F4D] ${
                emailError ? "border-red-500 focus:ring-red-500" : ""
              }`}
              disabled={isSubmitting}
            />
            {emailError && (
              <span id="forgot-email-error" className="text-xs text-red-600 font-medium">
                {emailError}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-11 rounded-md bg-[#0B1F4D] font-semibold text-white transition-colors hover:bg-[#071433] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Envoi en cours…" : "Envoyer le lien"}
          </button>

          <div className="text-center pt-2">
            <Link href="/connexion" className="text-sm font-medium text-[#0B1F4D] hover:underline">
              &larr; Retour à la connexion
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}
