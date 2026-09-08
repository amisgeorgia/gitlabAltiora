"use client"

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export function ContactInfo() {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="lg:col-span-1 space-y-8"
    >
      <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 h-full flex flex-col hover:shadow-xl hover:border-gold-500 dark:hover:border-gold-500 transition-all duration-300">
        <h3 className="text-2xl font-bold text-blue-950 dark:text-white mb-8">
          {t('contact.info.title')}
        </h3>

        <div className="space-y-8 text-slate-600 dark:text-slate-300 flex flex-col flex-1">
          {/* Adresse */}
          <div className="flex items-start group">
            <div className="bg-blue-50 dark:bg-slate-700 p-3 rounded-full text-blue-950 dark:text-white mr-4 group-hover:bg-gold-50 group-hover:text-gold-600 dark:group-hover:bg-gold-900/30 dark:group-hover:text-gold-400 transition-colors">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-semibold text-blue-950 dark:text-white mb-1 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                {t('contact.info.address')}
              </h4>
              <p className="group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                Antananarivo,<br />Madagascar
              </p>
            </div>
          </div>

          {/* Téléphone */}
          <div className="flex items-start group">
            <div className="bg-blue-50 dark:bg-slate-700 p-3 rounded-full text-blue-950 dark:text-white mr-4 group-hover:bg-gold-50 group-hover:text-gold-600 dark:group-hover:bg-gold-900/30 dark:group-hover:text-gold-400 transition-colors">
              <Phone className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-semibold text-blue-950 dark:text-white mb-1 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                {t('contact.info.phone')}
              </h4>
              <p className="group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                +261 34 07 106 33
              </p>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="flex items-start group">
            <div className="bg-blue-50 dark:bg-slate-700 p-3 rounded-full text-blue-950 dark:text-white mr-4 group-hover:bg-gold-50 group-hover:text-gold-600 dark:group-hover:bg-gold-900/30 dark:group-hover:text-gold-400 transition-colors">
              <MessageCircle className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-semibold text-blue-950 dark:text-white mb-1 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                WhatsApp
              </h4>
              <p className="group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                +261 35 506 00
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start group">
            <div className="bg-blue-50 dark:bg-slate-700 p-3 rounded-full text-blue-950 dark:text-white mr-4 group-hover:bg-gold-50 group-hover:text-gold-600 dark:group-hover:bg-gold-900/30 dark:group-hover:text-gold-400 transition-colors">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-semibold text-blue-950 dark:text-white mb-1 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                Email
              </h4>
              <a
                href="mailto:contact@altiora-prest.com"
                className="group-hover:text-slate-900 dark:group-hover:text-white hover:text-gold-600 dark:hover:text-gold-400 transition-colors"
              >
                contact@altiora-prest.com
              </a>
            </div>
          </div>

          {/* Carte Google Maps */}
          <div className="mt-auto pt-8 rounded-2xl overflow-hidden border-slate-100 dark:border-slate-700 w-full shadow-sm flex-1 min-h-50 flex flex-col">
            <div className="flex-1 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700">
              <iframe
                src="https://maps.google.com/maps?width=100%25&height=600&hl=fr&q=Antananarivo,%20Madagascar+(Altiora%20Connect)&t=&z=14&ie=UTF8&iwloc=B&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation Antananarivo, Madagascar"
                className="dark:invert dark:hue-rotate-180 dark:contrast-75 dark:opacity-80 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}