import React from "react";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import { cn } from "@/utils/cn";

export interface AuthFeedbackProps {
  type: "error" | "success" | "info";
  message: string;
  className?: string;
}

export function AuthFeedback({ type, message, className }: AuthFeedbackProps) {
  if (!message) return null;

  const styles = {
    error: "bg-red-50/90 text-red-800 border-red-200",
    success: "bg-emerald-50/90 text-emerald-800 border-emerald-200",
    info: "bg-blue-50/90 text-[#0B1F4D] border-blue-200",
  };

  const icons = {
    error: <AlertCircle className="w-5 h-5 text-[#DF3434] shrink-0 mt-0.5" />,
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />,
    info: <Info className="w-5 h-5 text-[#0B1F4D] shrink-0 mt-0.5" />,
  };

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={cn(
        "rounded-2xl border p-3.5 text-sm font-medium text-left flex items-start gap-2.5",
        styles[type],
        className
      )}
    >
      {icons[type]}
      <div className="flex-1 leading-snug">{message}</div>
    </div>
  );
}
