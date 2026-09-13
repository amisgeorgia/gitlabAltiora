import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, ArrowRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { isValidEmail } from "@/lib/validators";
import { PasswordField } from "./PasswordField";
import { AuthFeedback } from "./AuthFeedback";
import { formatError } from "@/utils/format-error";
import { cn } from "@/utils/cn";

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      await login({ email: email.trim(), password });
      router.push("/admin");
    } catch (err) {
      const msg = formatError(err);
      if (
        msg.toLowerCase().includes("invalide") ||
        msg.toLowerCase().includes("incorrect") ||
        msg.includes("401")
      ) {
        setFormError(
          "Identifiants incorrects. Veuillez vérifier votre adresse e-mail ou votre mot de passe."
        );
      } else {
        setFormError(msg);
      }
      setPassword("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasCredentialsError = Boolean(formError);

  return (
    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7 text-left" noValidate>
      {formError && <AuthFeedback type="error" message={formError} />}

      {/* Groupe des champs */}
      <div className="space-y-4">
        {/* Champ Email */}
        <div className="flex flex-col gap-1 w-full">
          <div className="relative flex items-center">
            <div className="absolute left-4 pointer-events-none text-slate-400">
              <Mail className="w-4 h-4" />
            </div>
            <input
              id="email-input"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError("");
                if (formError) setFormError("");
              }}
              aria-invalid={!!emailError || hasCredentialsError}
              aria-describedby={emailError ? "email-error" : undefined}
              placeholder="admin123@gmail.com"
              className={cn(
                "h-12 w-full rounded-full border border-slate-200 bg-[#F8F9FA] pl-11 pr-5 py-2.5 text-sm text-[#0B1F4D] placeholder:text-slate-400 transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] disabled:cursor-not-allowed disabled:opacity-50",
                (emailError || hasCredentialsError) &&
                  "border-red-500 bg-red-50/20 focus:border-red-500 focus:ring-red-500/20"
              )}
              disabled={isSubmitting}
            />
          </div>
          {emailError && (
            <span id="email-error" className="text-xs text-red-600 font-medium pl-3">
              {emailError}
            </span>
          )}
        </div>

        {/* Champ Mot de passe */}
        <div className="flex flex-col gap-1 w-full">
          <PasswordField
            id="password-login-input"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (passwordError) setPasswordError("");
              if (formError) setFormError("");
            }}
            placeholder="••••••••••••••••••••"
            error={passwordError || (hasCredentialsError ? " " : undefined)}
            disabled={isSubmitting}
          />
        </div>
      </div>

      {/* Groupe Bouton & Lien */}
      <div className="space-y-2.5">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 rounded-full bg-[#D4AF37] hover:bg-[#B88A1A] font-semibold text-white transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>{isSubmitting ? "Connexion en cours…" : "Se connecter"}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="flex justify-end pt-1">
          <Link
            href="/mot-de-passe-oublie"
            className="text-xs font-normal text-slate-500 hover:text-[#0B1F4D] transition-colors cursor-pointer"
          >
            Mot de passe oublié ?
          </Link>
        </div>
      </div>
    </form>
  );
}
