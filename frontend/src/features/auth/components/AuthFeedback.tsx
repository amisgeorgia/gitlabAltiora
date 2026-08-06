import React from "react";
import { cn } from "@/utils/cn";

export interface AuthFeedbackProps {
  type: "error" | "success" | "info";
  message: string;
  className?: string;
}

export function AuthFeedback({ type, message, className }: AuthFeedbackProps) {
  if (!message) return null;

  const styles = {
    error: "bg-red-50 text-red-800 border-red-200",
    success: "bg-emerald-50 text-emerald-800 border-emerald-200",
    info: "bg-blue-50 text-blue-800 border-blue-200",
  };

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={cn(
        "rounded-md border p-3.5 text-sm font-medium text-left",
        styles[type],
        className
      )}
    >
      {message}
    </div>
  );
}
