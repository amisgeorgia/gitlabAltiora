"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";
import { authService } from "../services/auth.service";
import { isValidEmail } from "@/lib/validators";
import { AuthFeedback } from "./AuthFeedback";
import { formatError } from "@/utils/format-error";
import { cn } from "@/utils/cn";

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
      const res = await authService.forgotPassword({ email: email.trim() });
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
        <div className="space-y-4 pt-2 text-center">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/reinitialisation"
              className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full bg-[#D4AF37] hover:bg-[#B88A1A] text-sm font-semibold text-white transition-colors cursor-pointer"
            >
              <span>Saisir mon jeton</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/connexion"
              className="inline-flex items-center justify-center h-11 px-6 rounded-full border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Retour à la connexion
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7" noValidate>
          <div className="flex flex-col gap-1 w-full">
            <div className="relative flex items-center">
              <div className="absolute left-4 pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="forgot-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError("");
                }}
                aria-invalid={!!emailError}
                aria-describedby={emailError ? "forgot-email-error" : undefined}
                placeholder="admin123@gmail.com"
                className={cn(
                  "h-12 w-full rounded-full border border-slate-200 bg-[#F8F9FA] pl-11 pr-5 py-2.5 text-sm text-[#0B1F4D] placeholder:text-slate-400 transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] disabled:cursor-not-allowed disabled:opacity-50",
                  emailError && "border-red-500 bg-red-50/20 focus:border-red-500 focus:ring-red-500/20"
                )}
                disabled={isSubmitting}
              />
            </div>
            {emailError && (
              <span id="forgot-email-error" className="text-xs text-red-600 font-medium pl-3">
                {emailError}
              </span>
            )}
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 rounded-full bg-[#D4AF37] hover:bg-[#B88A1A] font-semibold text-white transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{isSubmitting ? "Envoi en cours…" : "Envoyer"}</span>
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
