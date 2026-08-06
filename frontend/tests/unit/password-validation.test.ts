import { describe, expect, it } from "vitest";
import { validatePasswordRules } from "@/features/auth/utils/password-validation";

describe("validatePasswordRules", () => {
  it("doit valider un mot de passe fort respectant toutes les règles", () => {
    const res = validatePasswordRules("Admin123!");
    expect(res.hasMinLength).toBe(true);
    expect(res.hasUppercase).toBe(true);
    expect(res.hasLowercase).toBe(true);
    expect(res.hasDigit).toBe(true);
    expect(res.isValid).toBe(true);
  });

  it("doit rejeter un mot de passe trop court", () => {
    const res = validatePasswordRules("Adm1!");
    expect(res.hasMinLength).toBe(false);
    expect(res.isValid).toBe(false);
  });

  it("doit rejeter un mot de passe sans majuscule", () => {
    const res = validatePasswordRules("admin123!");
    expect(res.hasUppercase).toBe(false);
    expect(res.isValid).toBe(false);
  });

  it("doit rejeter un mot de passe sans chiffre", () => {
    const res = validatePasswordRules("AdminPass!");
    expect(res.hasDigit).toBe(false);
    expect(res.isValid).toBe(false);
  });
});
