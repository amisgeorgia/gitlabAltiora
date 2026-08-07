import { beforeEach, describe, expect, it } from "vitest";
import { authService, MOCK_ADMIN_USER } from "@/features/auth/services/auth.service";
import { authStorage } from "@/features/auth/utils/auth-storage";

describe("authService (Mock)", () => {
  beforeEach(() => {
    authStorage.clearSession();
  });

  it("doit se connecter avec les identifiants de démonstration corrects", async () => {
    const res = await authService.login({
      email: "admin@altiora-connect.com",
      password: "Admin123!",
    });

    expect(res.user).toEqual(MOCK_ADMIN_USER);
    expect(res.accessToken).toBe("mock-access-token-altiora");
    expect(authStorage.getAccessToken()).toBe("mock-access-token-altiora");
  });

  it("doit lever une erreur contrôlée en cas de mauvais mot de passe", async () => {
    await expect(
      authService.login({
        email: "admin@altiora-connect.com",
        password: "MauvaisMotDePasse",
      })
    ).rejects.toThrow("E-mail ou mot de passe incorrect.");
  });

  it("doit toujours retourner le message de sécurité pour mot de passe oublié", async () => {
    const res = await authService.forgotPassword({
      email: "inconnu@altiora-connect.com",
    });

    expect(res.message).toBe(
      "Si un compte correspond à cette adresse, un lien de réinitialisation a été envoyé."
    );
  });

  it("doit réinitialiser le mot de passe lorsque la confirmation et les règles correspondent", async () => {
    const res = await authService.resetPassword({
      token: "mock-reset-token",
      password: "NewPassword123!",
      confirmPassword: "NewPassword123!",
    });

    expect(res.message).toBe("Votre mot de passe a été réinitialisé avec succès.");
  });

  it("doit rejeter la réinitialisation si les mots de passe ne correspondent pas", async () => {
    await expect(
      authService.resetPassword({
        token: "mock-reset-token",
        password: "NewPassword123!",
        confirmPassword: "DifferentPassword123!",
      })
    ).rejects.toThrow("Les mots de passe ne correspondent pas.");
  });
});
