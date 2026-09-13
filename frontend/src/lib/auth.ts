import { User } from "@/types/common.types";
import { authStorage } from "@/features/auth/utils/auth-storage";

export interface AuthSession {
  user: User | null;
  token: string | null;
}

export function getStoredSession(): AuthSession {
  return {
    user: authStorage.getUser(),
    token: authStorage.getAccessToken(),
  };
}

