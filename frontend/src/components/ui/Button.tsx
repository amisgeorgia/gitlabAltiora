"use client";

import React from "react";
import { cn } from "@/utils/cn";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isChild?: boolean
  variant?: "default" | "primary" | "secondary" | "outline" | "ghost" | "gold";
  size?: "sm" | "md" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = "default",
      size = "md",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const variants = {
      default:
        "bg-blue-950 text-white hover:bg-blue-900 border border-transparent dark:bg-blue-900 dark:hover:bg-blue-800",
      primary: "bg-slate-900 text-white hover:bg-slate-800 border border-transparent",
      secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200 border border-transparent",
      outline:
        "border border-blue-950 text-blue-950 bg-transparent hover:bg-blue-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800",
      ghost:
        "bg-transparent text-blue-950 hover:bg-blue-50 border border-transparent dark:text-slate-200 dark:hover:bg-slate-800",
      gold:
        "bg-gold-500 text-blue-950 hover:bg-gold-600 font-semibold border border-transparent dark:text-blue-950",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6 text-base",
      icon: "h-10 w-10 p-0",
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };