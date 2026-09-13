export type UserRole = "admin" | "editor";

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
}

export type User = AuthUser;

// Contrat requête POST /auth/login
export interface LoginRequest {
  email: string;
  password: string;
}

export type LoginCredentials = LoginRequest;

// Réponse brute renvoyée par le Backend FastAPI
export interface BackendLoginResponse {
  access_token: string;
  token_type: string;
  user: AuthUser;
}

// Réponse normalisée pour l'état interne Frontend
export interface LoginResponse {
  user: AuthUser;
  accessToken: string;
  tokenType?: string;
}

// Contrat requête POST /auth/password-reset/request
export interface PasswordResetRequest {
  email: string;
}

export type ForgotPasswordPayload = PasswordResetRequest;

// Contrat requête POST /auth/password-reset/confirm
export interface PasswordResetConfirmRequest {
  token: string;
  new_password: string;
}

// Payload formulaire UI avec validation de confirmation
export interface ResetPasswordPayload {
  token: string;
  password: string;
  confirmPassword: string;
}

// Réponse générique FastAPI MessageResponse
export interface MessageResponse {
  message: string;
}

