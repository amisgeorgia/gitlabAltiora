import React from "react";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { publicNavigation } from "@/config/navigation";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="text-xl font-bold text-slate-900">
          ALTIORA CONNECT
        </Link>
        <nav className="flex items-center gap-6">
          {publicNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              {item.title}
            </Link>
          ))}
          <Link
            href="/connexion"
            className="rounded-md bg-slate-900 px-3.5 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Connexion
          </Link>
        </nav>
      </Container>
    </header>
  );
}
