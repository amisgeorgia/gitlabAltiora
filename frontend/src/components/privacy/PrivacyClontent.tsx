"use client"

import { useEffect, useState } from "react"
import {motion} from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"

export function PrivacyContent() {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  // Sécurité anti-mismatch d'hydratation Next.js
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-16 flex justify-center items-center">
        <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-900 py-16 transition-colors duration-300 min-h-screen">
      <div className="container mx-auto px-4 sm:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-slate-800 p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:border-gold-500 transition-all duration-300"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-blue-950 dark:text-white mb-8">
            {t("legal.privacy.title")}
          </h1>

          <div className="prose prose-slate prose-blue max-w-none space-y-6 text-slate-600 dark:text-slate-300">
            <p>
              Chez <strong>ALTIORA PREST</strong>, nous accordons une grande importance à la protection de vos données personnelles. Cette politique de confidentialité explique comment nous recueillons, utilisons et protégeons vos informations.
            </p>

            <section>
              <h2 className="text-xl font-bold text-blue-950 dark:text-white mb-3">
                1. Collecte des données personnelles
              </h2>
              <p>
                Nous collectons les données personnelles que vous nous fournissez volontairement lors de l'utilisation de notre site, notamment lorsque vous :
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Remplissez notre formulaire de contact (nom, prénom, adresse e-mail, numéro de téléphone).</li>
                <li>Interagissez avec notre assistant virtuel (Chatbot).</li>
                <li>Naviguez sur le site (données d'utilisation, informations techniques).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-blue-950 dark:text-white mb-3">
                2. Utilisation de vos données
              </h2>
              <p>Les informations collectées sont utilisées pour :</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Répondre à vos demandes de renseignements ou de prestations.</li>
                <li>Vous envoyer des informations concernant nos formations et expertises (si vous y avez consenti).</li>
                <li>Améliorer l'expérience utilisateur et les performances de notre plateforme.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-blue-950 dark:text-white mb-3">
                3. Protection et partage des données
              </h2>
              <p>
                Vos données personnelles sont strictly confidentielles. ALTIORA PREST s'engage à ne pas vendre, louer ou céder vos données à des tiers à des fins commerciales sans votre consentement préalable. Les données peuvent être partagées uniquement avec nos partenaires de confiance (comme E PREST SOLUTIONS) dans le cadre strict de l'exécution d'un service que vous avez demandé.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-blue-950 dark:text-white mb-3">
                4. Vos droits
              </h2>
              <p>
                Conformément aux réglementations en vigueur sur la protection des données personnelles, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition au traitement de vos données personnelles.
              </p>
              <p>
                Pour exercer ces droits, vous pouvez nous contacter à l'adresse e-mail suivante : <strong>contact@altiora-prest.com</strong>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-blue-950 dark:text-white mb-3">
                5. Cookies
              </h2>
              <p>
                Notre site peut utiliser des cookies pour améliorer la navigation et réaliser des statistiques de visites. Vous pouvez configurer votre navigateur pour refuser l'installation de ces cookies, bien que cela puisse altérer le fonctionnement de certains services du site.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
