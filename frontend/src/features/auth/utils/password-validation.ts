export interface PasswordRulesResult {
  hasMinLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasDigit: boolean;
  isValid: boolean;
}

export function validatePasswordRules(password: string): PasswordRulesResult {
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasDigit = /[0-9]/.test(password);

  return {
    hasMinLength,
    hasUppercase,
    hasLowercase,
    hasDigit,
    isValid: hasMinLength && hasUppercase && hasLowercase && hasDigit,
  };
}
