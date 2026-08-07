import { UserRole, AuthUser } from "./auth.types";

export type { UserRole, AuthUser };

export interface User extends AuthUser {
  createdAt?: string;
}

export type ContentType = "page" | "formation" | "actualite";

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}
