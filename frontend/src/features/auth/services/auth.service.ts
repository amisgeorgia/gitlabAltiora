import { env } from "@/config/env";
import { AUTH_ENDPOINTS } from "@/lib/constants";
import { apiClient } from "@/lib/api-client";
import {
  AuthUser,
  LoginCredentials,
  LoginResponse,
  ForgotPasswordPayload,
  ResetPasswordPayload,
} from "@/types/auth.types";
import { authStorage } from "../utils/auth-storage";
import { validatePasswordRules } from "../utils/password-validation";

export const MOCK_ADMIN_USER: AuthUser = {
  id: "admin-001",
  firstName: "Administrateur",
  lastName: "ALTIORA",
  email: "admin@altiora-connect.com",
  role: "admin",
};

export const MOCK_ACCESS_TOKEN = "mock-access-token-altiora";

async function mockDelay(ms: number = 600): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    if (env.useMockApi) {
      await mockDelay(600);
      const isEmailValid = credentials.email.trim().toLowerCase() === MOCK_ADMIN_USER.email;
      const isPasswordValid = credentials.password === "Admin123!";

      if (isEmailValid && isPasswordValid) {
        const response: LoginResponse = {
          user: MOCK_ADMIN_USER,
          accessToken: MOCK_ACCESS_TOKEN,
        };
        authStorage.setAccessToken(response.accessToken);
        authStorage.setUser(response.user);
        return response;
      }

      throw new Error("E-mail ou mot de passe incorrect.");
    }

    // Futur appel API réel
    const response = await apiClient<LoginResponse>(AUTH_ENDPOINTS.login, {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    authStorage.setAccessToken(response.accessToken);
    authStorage.setUser(response.user);
    return response;
  },

  logout(): void {
    authStorage.clearSession();
  },

  async forgotPassword(payload: ForgotPasswordPayload): Promise<{ message: string }> {
    if (env.useMockApi) {
      await mockDelay(400);
      return {
        message: "Si un compte correspond à cette adresse, un lien de réinitialisation a été envoyé.",
      };
    }

    return apiClient<{ message: string }>(AUTH_ENDPOINTS.forgotPassword, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async resetPassword(payload: ResetPasswordPayload): Promise<{ message: string }> {
    const { password, confirmPassword } = payload;

    if (!password) {
      throw new Error("Veuillez saisir votre nouveau mot de passe.");
    }

    const rules = validatePasswordRules(password);
    if (!rules.isValid) {
      throw new Error(
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre."
      );
    }

    if (password !== confirmPassword) {
      throw new Error("Les mots de passe ne correspondent pas.");
    }

    if (env.useMockApi) {
      await mockDelay(400);
      return {
        message: "Votre mot de passe a été réinitialisé avec succès.",
      };
    }

    return apiClient<{ message: string }>(AUTH_ENDPOINTS.resetPassword, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async getCurrentUser(): Promise<AuthUser | null> {
    if (env.useMockApi) {
      return authStorage.getUser();
    }

    try {
      const user = await apiClient<AuthUser>(AUTH_ENDPOINTS.me);
      authStorage.setUser(user);
      return user;
    } catch {
      authStorage.clearSession();
      return null;
    }
  },
};
