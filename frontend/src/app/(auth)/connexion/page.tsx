"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { AuthCardLayout } from "@/features/auth/components/AuthCardLayout";
import { LoginForm } from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/admin");
    }
  }, [isLoading, isAuthenticated, router]);

  return (
    <AuthCardLayout
      leftTitle="BIENVENUE"
      leftSubtitle="Connectez-vous à votre espace d'administration."
      rightTitle="Se connecter"
    >
      <LoginForm />
    </AuthCardLayout>
  );
}
