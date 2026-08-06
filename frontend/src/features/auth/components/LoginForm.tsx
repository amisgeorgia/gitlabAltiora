"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { isValidEmail } from "@/lib/validators";
import { PasswordField } from "./PasswordField";
import { AuthFeedback } from "./AuthFeedback";
import { formatError } from "@/utils/format-error";

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");
    setFormError("");

    let hasError = false;

    if (!email.trim()) {
      setEmailError("Veuillez renseigner votre adresse e-mail.");
      hasError = true;
    } else if (!isValidEmail(email)) {
      setEmailError("Veuillez saisir une adresse e-mail valide.");
      hasError = true;
    }

    if (!password) {
      setPasswordError("Veuillez renseigner votre mot de passe.");
      hasError = true;
    }

    if (hasError) return;

    setIsSubmitting(true);

    try {
      await login({ email, password });
      router.push("/admin");
    } catch (err) {
      setFormError(formatError(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-left" noValidate>
      {formError && <AuthFeedback type="error" message={formError} />}

      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="email-input" className="text-sm font-medium text-[#0B1F4D]">
          Adresse e-mail
        </label>
        <input
          id="email-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!emailError}
          aria-describedby={emailError ? "email-error" : undefined}
          placeholder="admin@altiora-connect.com"
          className={`flex h-11 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0B1F4D] ${
            emailError ? "border-red-500 focus:ring-red-500" : ""
          }`}
          disabled={isSubmitting}
        />
        {emailError && (
          <span id="email-error" className="text-xs text-red-600 font-medium">
            {emailError}
          </span>
        )}
      </div>

      <PasswordField
        id="password-login-input"
        label="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={passwordError}
        disabled={isSubmitting}
      />

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-[#0B1F4D] focus:ring-[#0B1F4D]"
            disabled={isSubmitting}
          />
          Se souvenir de moi
        </label>
        <Link
          href="/mot-de-passe-oublie"
          className="font-medium text-[#0B1F4D] hover:underline"
        >
          Mot de passe oublié ?
        </Link>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-11 rounded-md bg-[#0B1F4D] font-semibold text-white transition-colors hover:bg-[#071433] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Connexion en cours…" : "Se connecter"}
      </button>
    </form>
  );
}
