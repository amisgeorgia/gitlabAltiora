import { Metadata } from "next";
import { ContactClient } from "@/components/contact/ContactClient";

export const metadata: Metadata = {
  title: "Contact | ALTIORA PREST",
  description: "Contactez ALTIORA PREST à Antananarivo par email, téléphone ou WhatsApp.",
  openGraph: {
    title: "Contact | ALTIORA PREST",
    description: "Contactez ALTIORA PREST à Antananarivo par email, téléphone ou WhatsApp.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="w-full pt-10 sm:pt-14 lg:pt-16">
      <ContactClient />
    </main>
  );
}