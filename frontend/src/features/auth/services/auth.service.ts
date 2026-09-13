import { env } from "@/config/env";
import { AUTH_ENDPOINTS } from "@/lib/constants";
import { apiClient } from "@/lib/api-client";
import {
  AuthUser,
  BackendLoginResponse,
  LoginCredentials,
  LoginResponse,
  MessageResponse,
  PasswordResetConfirmRequest,
  PasswordResetRequest,
  ResetPasswordPayload,
} from "@/types/auth.types";
import { authStorage } from "../utils/auth-storage";
import { validatePasswordRules } from "../utils/password-validation";

export const MOCK_ADMIN_USER: AuthUser = {
  id: "admin-001",
  email: "admin@altiora-connect.com",
  role: "admin",
  firstName: "Administrateur",
  lastName: "ALTIORA",
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

    // Appel API réel FastAPI POST /auth/login
    const backendResponse = await apiClient<BackendLoginResponse>(AUTH_ENDPOINTS.login, {
      method: "POST",
      body: JSON.stringify({
        email: credentials.email.trim().toLowerCase(),
        password: credentials.password,
      }),
    });

    const response: LoginResponse = {
      accessToken: backendResponse.access_token,
      tokenType: backendResponse.token_type,
      user: backendResponse.user,
    };

    authStorage.setAccessToken(response.accessToken);
    authStorage.setUser(response.user);
    return response;
  },

  logout(): void {
    authStorage.clearSession();
  },

  async requestPasswordReset(payload: PasswordResetRequest): Promise<MessageResponse> {
    if (env.useMockApi) {
      await mockDelay(400);
      return {
        message: "Si un compte correspond à cette adresse, un lien de réinitialisation a été envoyé.",
      };
    }

    // Appel API réel FastAPI POST /auth/password-reset/request
    return apiClient<MessageResponse>(AUTH_ENDPOINTS.passwordResetRequest, {
      method: "POST",
      body: JSON.stringify({
        email: payload.email.trim().toLowerCase(),
      }),
    });
  },

  // Alias pour rétrocompatibilité avec les formulaires existants
  async forgotPassword(payload: PasswordResetRequest): Promise<MessageResponse> {
    return this.requestPasswordReset(payload);
  },

  async confirmPasswordReset(payload: PasswordResetConfirmRequest): Promise<MessageResponse> {
    if (!payload.new_password) {
      throw new Error("Veuillez saisir votre nouveau mot de passe.");
    }

    const rules = validatePasswordRules(payload.new_password);
    if (!rules.isValid) {
      throw new Error(
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre."
      );
    }

    if (env.useMockApi) {
      await mockDelay(400);
      return {
        message: "Votre mot de passe a été réinitialisé avec succès.",
      };
    }

    // Appel API réel FastAPI POST /auth/password-reset/confirm
    return apiClient<MessageResponse>(AUTH_ENDPOINTS.passwordResetConfirm, {
      method: "POST",
      body: JSON.stringify({
        token: payload.token,
        new_password: payload.new_password,
      }),
    });
  },

  // Utilisé par le formulaire UI existant ResetPasswordForm
  async resetPassword(payload: ResetPasswordPayload): Promise<MessageResponse> {
    const { password, confirmPassword, token } = payload;

    if (password !== confirmPassword) {
      throw new Error("Les mots de passe ne correspondent pas.");
    }

    return this.confirmPasswordReset({
      token,
      new_password: password,
    });
  },

  async getCurrentUser(): Promise<AuthUser | null> {
    const user = authStorage.getUser();
    const token = authStorage.getAccessToken();

    if (!user || !token) {
      authStorage.clearSession();
      return null;
    }

    return user;
  },
};

