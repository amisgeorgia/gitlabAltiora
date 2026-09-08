import { TranslationKey } from "@/i18n/translations";
import { Formation } from "@/components/formations/FormationsCard";

export const getFormationsCatalog = (t: (key: TranslationKey) => string): Formation[] => [
  {
    id: "ia-generative-essentiels",
    title: t('formations.items.1.title' as TranslationKey),
    category: t('formations.items.1.cat' as TranslationKey),
    duration: t('formations.items.1.duration' as TranslationKey),
    level: t('formations.items.1.level' as TranslationKey),
    summary: t('formations.items.1.summary' as TranslationKey),
    images: [
      '/images/technoIA.avif',
      '/images/technoIA2.avif',
      '/images/technoIA3.avif'
    ],
    price: "Sur demande"
  },
  {
    id: "leadership-agile",
    title: t('formations.items.2.title' as TranslationKey),
    category: t('formations.items.2.cat' as TranslationKey),
    duration: t('formations.items.2.duration' as TranslationKey),
    level: t('formations.items.2.level' as TranslationKey),
    summary: t('formations.items.2.summary' as TranslationKey),
    images: [
      '/images/leadAgile.avif',
      '/images/agile.avif',
      '/images/agile1.avif'
    ],
    price: "Sur demande"
  },
  {
    id: "finance-pour-non-financiers",
    title: t('formations.items.3.title' as TranslationKey),
    category: t('formations.items.3.cat' as TranslationKey),
    duration: t('formations.items.3.duration' as TranslationKey),
    level: t('formations.items.3.level' as TranslationKey),
    summary: t('formations.items.3.summary' as TranslationKey),
   images: [
      '/images/finance.avif',
      '/images/finance1.avif',
      '/images/finance2.avif'
    ],
    price: "Sur demande"
  },
  {
    id: "masterclass-gestion-projet",
    title: t('formations.items.4.title' as TranslationKey),
    category: t('formations.items.4.cat' as TranslationKey),
    duration: t('formations.items.4.duration' as TranslationKey),
    level: t('formations.items.4.level' as TranslationKey),
    summary: t('formations.items.4.summary' as TranslationKey),
    images: [
      '/images/masterclass.avif',
      '/images/act5.avif',
      '/images/masterclass1.avif'
    ],
    price: "Sur demande"
  }
];