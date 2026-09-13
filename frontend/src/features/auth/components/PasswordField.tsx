"use client";

import React, { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { cn } from "@/utils/cn";

export interface PasswordFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  showIcon?: boolean;
}

export function PasswordField({
  label,
  error,
  helperText,
  className,
  id,
  showIcon = true,
  placeholder = "Mot de passe",
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
    <div className="flex flex-col gap-1.5 w-full text-left">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-semibold uppercase tracking-wider text-slate-600 pl-1"
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {showIcon && (
          <div className="absolute left-4 pointer-events-none text-slate-400">
            <Lock className="w-4 h-4" />
          </div>
        )}
        <input
          id={inputId}
          type={showPassword ? "text" : "password"}
          aria-invalid={!!error}
          aria-describedby={ariaDescribedBy || undefined}
          placeholder={placeholder}
          className={cn(
            "h-12 w-full rounded-full border border-slate-200 bg-[#F8F9FA] py-2.5 text-sm text-[#0B1F4D] placeholder:text-slate-400 transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] disabled:cursor-not-allowed disabled:opacity-50",
            showIcon ? "pl-11 pr-11" : "px-5 pr-11",
            error && "border-red-500 bg-red-50/20 focus:border-red-500 focus:ring-red-500/20",
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
          className="absolute right-4 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors p-1"
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>
      </div>
      {helperText && !error && (
        <span id={helperId} className="text-xs text-slate-500 pl-3">
          {helperText}
        </span>
      )}
      {error && (
        <span id={errorId} className="text-xs text-red-600 font-medium pl-3">
          {error}
        </span>
      )}
    </div>
  );
}
