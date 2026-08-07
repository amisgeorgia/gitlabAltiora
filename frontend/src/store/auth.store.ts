// Store d'authentification minimal
// Note: Zustand n'est pas encore installé. Ce fichier fournit une structure simple et typée.

import { User } from "@/types/common.types";

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export const initialAuthState: AuthState = {
  user: null,
  isAuthenticated: false,
};
