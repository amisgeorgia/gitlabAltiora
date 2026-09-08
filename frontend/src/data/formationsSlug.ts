import { TranslationKey } from "@/i18n/translations";

export interface FormationDetail {
  id: string;
  title: string;
  category: string;
  duration: string;
  level: string;
  summary: string;
  objectives: string[];
  target: string;
  prerequisites: string;
}

export const getFormationBySlug = (
  slug: string, 
  t: (key: TranslationKey) => string
): FormationDetail | undefined => {
  const detailsMap: Record<string, Omit<FormationDetail, "id" | "title" | "category" | "duration" | "level" | "summary">> = {
    "ia-generative-essentiels": {
      objectives: [
        "Comprendre les principes de base de l'IA et de l'apprentissage automatique.",
        "Savoir prompter efficacement pour obtenir les meilleurs résultats.",
        "Identifier les cas d'usage pertinents pour son métier.",
        "Appréhender les enjeux éthiques et de sécurité liés à l'IA."
      ],
      target: "Professionnels de tous secteurs souhaitant intégrer l'IA dans leur quotidien.",
      prerequisites: "Aucun prérequis technique nécessaire. Familiarité avec l'outil informatique."
    },
    "leadership-agile": {
      objectives: [
        "Comprendre les principes du manifeste Agile appliqués au management.",
        "Développer une posture de 'Servant Leader'.",
        "Favoriser l'autonomie et la responsabilisation des équipes.",
        "Gérer les conflits et la résistance au changement de manière constructive."
      ],
      target: "Managers, chefs de projet, directeurs souhaitant faire évoluer leur style de management.",
      prerequisites: "Expérience préalable en management d'équipe recommandée."
    },
    "finance-pour-non-financiers": {
      objectives: [
        "Lire et interpréter les documents financiers de synthèse (Bilan, Compte de résultat).",
        "Maîtriser les principaux indicateurs de performance financière (EBITDA, BFR...).",
        "Comprendre l'impact de ses décisions opérationnelles sur la rentabilité.",
        "Savoir évaluer la viabilité financière d'un projet d'investissement."
      ],
      target: "Managers opérationnels, cadres commerciaux, entrepreneurs, chefs de projet.",
      prerequisites: "Aucun prérequis en comptabilité n'est exigé."
    },
    "masterclass-gestion-projet": {
      objectives: [
        "Maîtriser le référentiel PMBOK® du Project Management Institute (PMI).",
        "Gérer efficacement les coûts, les délais, les risques et la qualité.",
        "Développer des compétences en communication et gestion des parties prenantes.",
        "Se préparer intensément au passage de l'examen de certification PMP®."
      ],
      target: "Chefs de projet expérimentés, directeurs de programmes.",
      prerequisites: "Expérience professionnelle significative en gestion de projet (conforme aux exigences du PMI)."
    }
  };

  const catalogItemsMap: Record<string, { itemKey: string }> = {
    "ia-generative-essentiels": { itemKey: "1" },
    "leadership-agile": { itemKey: "2" },
    "finance-pour-non-financiers": { itemKey: "3" },
    "masterclass-gestion-projet": { itemKey: "4" }
  };

  const catalogConfig = catalogItemsMap[slug];
  const detailConfig = detailsMap[slug];

  if (!catalogConfig || !detailConfig) return undefined;

  const k = catalogConfig.itemKey;

  return {
    id: slug,
    title: t(`formations.items.${k}.title` as TranslationKey),
    category: t(`formations.items.${k}.cat` as TranslationKey),
    duration: t(`formations.items.${k}.duration` as TranslationKey),
    level: t(`formations.items.${k}.level` as TranslationKey),
    summary: t(`formations.items.${k}.summary` as TranslationKey),
    ...detailConfig
  };
};