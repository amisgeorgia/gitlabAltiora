import { Metadata } from "next";
import { PrivacyContent } from "@/components/privacy/PrivacyClontent";

export const metadata: Metadata = {
  title: "Politique de Confidentialité | ALTIORA PREST",
  description:
    "Découvrez comment ALTIORA PREST collecte, utilise et protège vos données personnelles.",
  openGraph: {
    title: "Politique de Confidentialité | ALTIORA PREST",
    description: "Protection et traitement des données personnelles chez ALTIORA PREST.",
    url: "/politique-de-confidentialite",
  },
};

export default function PolitiqueConfidentialitePage() {
  return <PrivacyContent />;
}