"use client";

import React from "react";

// Provider QueryClient minimal
// TanStack Query n'est pas encore installé comme dépendance npm.
// Ce composant retournera <QueryClientProvider> lorsque la dépendance sera ajoutée.
export function QueryProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
