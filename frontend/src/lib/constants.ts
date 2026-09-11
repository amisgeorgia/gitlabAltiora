export const APP_NAME = "ALTIORA CONNECT";
export const DEFAULT_PAGE_SIZE = 10;

// Endpoints authentification réels du backend FastAPI
export const AUTH_ENDPOINTS = {
  login: "/auth/login",
  passwordResetRequest: "/auth/password-reset/request",
  passwordResetConfirm: "/auth/password-reset/confirm",

  // Alias pour rétrocompatibilité
  forgotPassword: "/auth/password-reset/request",
  resetPassword: "/auth/password-reset/confirm",
} as const;

