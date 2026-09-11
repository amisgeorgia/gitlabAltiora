import { UserRole } from "@/types/auth.types";

export const rolePermissions: Record<UserRole, string[]> = {
  admin: ["*"],
  editor: ["read", "write"],
};

