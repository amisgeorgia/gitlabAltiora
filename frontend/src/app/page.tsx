import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/common/Container";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Container className="py-20 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Bienvenue sur ALTIORA CONNECT
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Plateforme de conseil, de formation et de solutions numériques.
          </p>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
