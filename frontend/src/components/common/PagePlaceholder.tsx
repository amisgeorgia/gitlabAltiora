import React from "react";
import { Container } from "./Container";

export interface PagePlaceholderProps {
  title: string;
  description?: string;
}

export function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <Container className="py-12">
      <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-8 text-center">
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        {description && (
          <p className="mt-2 text-sm text-slate-600">{description}</p>
        )}
      </div>
    </Container>
  );
}
