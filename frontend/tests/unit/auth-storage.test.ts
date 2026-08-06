import { beforeEach, describe, expect, it } from "vitest";
import { authStorage } from "@/features/auth/utils/auth-storage";
import { AuthUser } from "@/types/auth.types";

const mockUser: AuthUser = {
  id: "test-001",
  firstName: "Test",
  lastName: "User",
  email: "test@example.com",
  role: "admin",
};

describe("authStorage", () => {
  beforeEach(() => {
    authStorage.clearSession();
  });

  it("doit enregistrer et récupérer un token", () => {
    authStorage.setAccessToken("test-token-123");
    expect(authStorage.getAccessToken()).toBe("test-token-123");
  });

  it("doit enregistrer et récupérer un utilisateur", () => {
    authStorage.setUser(mockUser);
    expect(authStorage.getUser()).toEqual(mockUser);
  });

  it("doit supprimer la session correctement", () => {
    authStorage.setAccessToken("test-token-123");
    authStorage.setUser(mockUser);

    authStorage.clearSession();

    expect(authStorage.getAccessToken()).toBeNull();
    expect(authStorage.getUser()).toBeNull();
  });
});
