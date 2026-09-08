"use client"

import {motion} from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"

export function LegalNoticeClient() {
  const { t } = useLanguage();

  return (
    <div className="bg-slate-50 dark:bg-slate-900 py-16 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-slate-800 p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:border-gold-500 transition-all duration-300"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-blue-950 dark:text-white mb-8">
            {t("legal.mentions.title")}
          </h1>

          <div className="prose prose-slate prose-blue max-w-none space-y-6 text-slate-600 dark:text-slate-300">
            <section>
              <h2 className="text-xl font-bold text-blue-950 dark:text-white mb-3">
                1. Éditeur du site
              </h2>
              <p>
                Le présent site est édité par la société <strong>ALTIORA PREST</strong>, cabinet de conseil et de formation en partenariat avec E PREST SOLUTIONS.
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Siège social :</strong> Antananarivo, Madagascar</li>
                <li><strong>Téléphone :</strong> +261 34 07 106 33</li>
                <li><strong>Email :</strong> contact@altiora-prest.com</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-blue-950 dark:text-white mb-3">
                2. Hébergement
              </h2>
              <p>
                Le site est hébergé sur des serveurs sécurisés afin de garantir l'intégrité et la disponibilité des données. Pour toute question concernant l'infrastructure d'hébergement, veuillez nous contacter aux coordonnées ci-dessus.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-blue-950 dark:text-white mb-3">
                3. Propriété intellectuelle
              </h2>
              <p>
                L'ensemble de ce site relève de la législation internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
              </p>
              <p>
                La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-blue-950 dark:text-white mb-3">
                4. Limitation de responsabilité
              </h2>
              <p>
                ALTIORA PREST s'efforce d'assurer au mieux de ses possibilités l'exactitude et la mise à jour des informations diffusées sur ce site. Toutefois, ALTIORA PREST décline toute responsabilité pour toute imprécision, inexactitude ou omission portant sur des informations disponibles sur le site.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}