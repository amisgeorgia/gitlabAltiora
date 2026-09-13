import { AuthCardLayout } from "@/features/auth/components/AuthCardLayout";
import { ForgotPasswordForm } from "@/features/auth/components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <AuthCardLayout
      leftTitle="Mot de passe oublié ?"
      leftSubtitle="Saisissez votre adresse e-mail pour recevoir les instructions de réinitialisation."
      rightTitle="Mot de passe oublié ?"
    >
      <ForgotPasswordForm />
    </AuthCardLayout>
  );
}
