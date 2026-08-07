import { User } from "@/types/common.types";

export interface AuthSession {
  user: User | null;
  token: string | null;
}

export function getStoredSession(): AuthSession {
  if (typeof window === "undefined") {
    return { user: null, token: null };
  }
  const token = localStorage.getItem("auth_token");
  return { user: null, token };
}
