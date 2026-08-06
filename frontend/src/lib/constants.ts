export const APP_NAME = "ALTIORA CONNECT";
export const DEFAULT_PAGE_SIZE = 10;

// À confirmer avec le Backend via OpenAPI avant activation du mode réel.
export const AUTH_ENDPOINTS = {
  login: "/auth/login",
  forgotPassword: "/auth/forgot-password",
  resetPassword: "/auth/reset-password",
  me: "/auth/me",
} as const;
