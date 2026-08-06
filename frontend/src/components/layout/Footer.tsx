import React from "react";
import Link from "next/link";
import { Container } from "@/components/common/Container";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-50 py-8">
      <Container className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-slate-500">
          &copy; {new Date().getFullYear()} ALTIORA CONNECT. Tous droits réservés.
        </p>
        <div className="flex gap-6 text-sm text-slate-500">
          <Link href="/mentions-legales" className="hover:text-slate-900">
            Mentions légales
          </Link>
          <Link href="/politique-de-confidentialite" className="hover:text-slate-900">
            Politique de confidentialité
          </Link>
        </div>
      </Container>
    </footer>
  );
}
