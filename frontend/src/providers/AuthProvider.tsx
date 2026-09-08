"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AuthUser, LoginCredentials } from "@/types/auth.types";
import { authService } from "@/features/auth/services/auth.service";
import { authStorage } from "@/features/auth/utils/auth-storage";

export interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initAuth = () => {
      const storedUser = authStorage.getUser();
      const token = authStorage.getAccessToken();
      if (storedUser && token) {
        setUser(storedUser);
      }
      setIsLoading(false);
    };

    Promise.resolve().then(initAuth);
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const response = await authService.login(credentials);
      setUser(response.user);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);

  const contextValue = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
    }),
    [user, isLoading, login, logout]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé au sein d'un AuthProvider");
  }
  return context;
}
