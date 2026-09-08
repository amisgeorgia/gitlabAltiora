import { Metadata } from "next";
import { LegalNoticeClient } from "@/components/legal/LegalNoticeClient";

export const metadata: Metadata = {
  title: "Mentions Légales | ALTIORA PREST",
  description:
    "Consultez les mentions légales d'ALTIORA PREST : informations éditeur, hébergement, propriété intellectuelle et limitation de responsabilité.",
  openGraph: {
    title: "Mentions Légales | ALTIORA PREST",
    description:
      "Mentions légales et informations réglementaires concernant le site ALTIORA PREST.",
    url: "/mentions-legales",
  },
};

export default function MentionsLegalesPage() {
  return <LegalNoticeClient />;
}