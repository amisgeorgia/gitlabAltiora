"use client"

import * as React from "react"
import Link from "next/link"
import {motion} from "framer-motion"
import { Send } from "lucide-react"
import { toast } from "sonner"
import { Button } from "../ui/Button"
import { useLanguage } from "@/contexts/LanguageContext"
import { TranslationKey } from "@/i18n/translations"

export function ContactForm() {
  const { t } = useLanguage();
  const [status, setStatus] = React.useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('submitting');

    setTimeout(() => {
      setStatus('idle');
      toast.success(t('contact.form.success_desc'));
      form.reset();
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="lg:col-span-2 w-full"
    >
      <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 h-full hover:shadow-xl hover:border-gold-500 dark:hover:border-gold-500 transition-all duration-300">
        <h3 className="text-2xl font-bold text-blue-950 dark:text-white mb-6">
          {t('contact.form.title')}
        </h3>
        <p className="text-slate-600 dark:text-slate-300 mb-8">
          {t('contact.form.subtitle')}
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-sm font-medium text-blue-950 dark:text-slate-200">
                {t('contact.form.firstname' as TranslationKey)} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all bg-slate-50 dark:bg-slate-900/50 focus:bg-white dark:focus:bg-slate-900 text-slate-800 dark:text-white"
                placeholder="Jean"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName" className="text-sm font-medium text-blue-950 dark:text-slate-200">
                {t('contact.form.lastname' as TranslationKey)} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all bg-slate-50 dark:bg-slate-900/50 focus:bg-white dark:focus:bg-slate-900 text-slate-800 dark:text-white"
                placeholder="Dupont"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-blue-950 dark:text-slate-200">
                {t('contact.form.email' as TranslationKey)} <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all bg-slate-50 dark:bg-slate-900/50 focus:bg-white dark:focus:bg-slate-900 text-slate-800 dark:text-white"
                placeholder="jean.dupont@exemple.com"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-blue-950 dark:text-slate-200">
                {t('contact.form.phone' as TranslationKey)}
              </label>
              <input
                type="tel"
                id="phone"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all bg-slate-50 dark:bg-slate-900/50 focus:bg-white dark:focus:bg-slate-900 text-slate-800 dark:text-white"
                placeholder="+261 34 XX XXX XX"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium text-blue-950 dark:text-slate-200">
              {t('contact.form.subject' as TranslationKey)} <span className="text-red-500">*</span>
            </label>
            <select
              id="subject"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all bg-slate-50 dark:bg-slate-900/50 focus:bg-white dark:focus:bg-slate-900 text-slate-700 dark:text-slate-200"
              required
              defaultValue=""
            >
              <option value="" disabled>{t('contact.form.subject.placeholder' as TranslationKey)}</option>
              <option value="formation">{t('contact.form.subject.opt1' as TranslationKey)}</option>
              <option value="conseil">{t('contact.form.subject.opt2' as TranslationKey)}</option>
              <option value="bpo">{t('contact.form.subject.opt3' as TranslationKey)}</option>
              <option value="developpement">{t('contact.form.subject.opt4' as TranslationKey)}</option>
              <option value="autre">{t('contact.form.subject.opt5' as TranslationKey)}</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-blue-950 dark:text-slate-200">
              {t('contact.form.message' as TranslationKey)} <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              rows={5}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all bg-slate-50 dark:bg-slate-900/50 focus:bg-white dark:focus:bg-slate-900 text-slate-800 dark:text-white resize-none"
              placeholder={t('contact.form.message.placeholder' as TranslationKey)}
              required
            ></textarea>
          </div>

          {/* Honeypot Anti-spam */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website">Ne pas remplir ce champ si vous êtes humain</label>
            <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="flex items-start space-x-3 pt-2 pb-4">
            <div className="flex items-center h-6">
              <input
                id="consent"
                name="consent"
                type="checkbox"
                required
                className="h-4 w-4 rounded border-slate-300 text-gold-600 focus:ring-gold-600 dark:border-slate-600 dark:bg-slate-800 dark:ring-offset-slate-900"
              />
            </div>
            <div className="text-sm">
              <label htmlFor="consent" className="font-medium text-slate-700 dark:text-slate-300">
                J&apos;accepte la politique de confidentialité <span className="text-red-500">*</span>
              </label>
              <p className="text-slate-500 dark:text-slate-400 mt-1">
                En cochant cette case, j&apos;accepte que mes données soient traitées pour répondre à ma demande.
                <Link href="/politique-de-confidentialite" className="text-gold-600 hover:underline ml-1">
                  En savoir plus
                </Link>
              </p>
            </div>
          </div>

          <Button
            type="submit"
            variant="gold"
            size="lg"
            disabled={status === 'submitting'}
            className="w-full sm:w-auto font-bold px-8 h-14 rounded-xl shadow-lg shadow-gold-500/20 text-lg disabled:opacity-70 disabled:cursor-not-allowed group"
          >
            <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            {status === 'submitting' ? 'Envoi en cours...' : 'Envoyer le message'}
          </Button>

          <p className="text-xs text-slate-500 mt-4">
            * Champs obligatoires. Ce site est protégé contre le spam. Vos données personnelles sont traitées conformément à notre{" "}
            <Link href="/politique-de-confidentialite" className="underline hover:text-blue-950">
              politique de confidentialité
            </Link>.
          </p>
        </form>
      </div>
    </motion.div>
  );
}