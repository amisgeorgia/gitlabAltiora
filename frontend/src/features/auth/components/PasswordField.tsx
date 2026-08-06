"use client";

import React, { useState } from "react";
import { cn } from "@/utils/cn";

export interface PasswordFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function PasswordField({
  label = "Mot de passe",
  error,
  helperText,
  className,
  id,
  ...props
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || "password-input";
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  const togglePassword = () => setShowPassword((prev) => !prev);

  const ariaDescribedBy = [
    error ? errorId : null,
    helperText ? helperId : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="flex flex-col gap-1 w-full text-left">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-[#0B1F4D]"
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <input
          id={inputId}
          type={showPassword ? "text" : "password"}
          aria-invalid={!!error}
          aria-describedby={ariaDescribedBy || undefined}
          className={cn(
            "flex h-11 w-full rounded-md border border-slate-300 bg-white px-3 py-2 pr-10 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0B1F4D] disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500 focus:ring-red-500",
            className
          )}
          {...props}
        />
        <button
          type="button"
          onClick={togglePassword}
          aria-label={
            showPassword
              ? "Masquer le mot de passe"
              : "Afficher le mot de passe"
          }
          className="absolute right-3 text-slate-400 hover:text-slate-600 focus:outline-none text-xs font-semibold select-none"
        >
          {showPassword ? "Masquer" : "Afficher"}
        </button>
      </div>
      {helperText && !error && (
        <span id={helperId} className="text-xs text-slate-500">
          {helperText}
        </span>
      )}
      {error && (
        <span id={errorId} className="text-xs text-red-600 font-medium">
          {error}
        </span>
      )}
    </div>
  );
}
