// Minimal Query Client placeholder
// TanStack Query n'est pas encore installé comme dépendance npm.
// Ce fichier servira de point de configuration lorsque @tanstack/react-query sera ajouté.

export const queryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
};
