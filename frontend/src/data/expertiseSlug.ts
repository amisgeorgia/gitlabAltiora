export interface ExpertiseData {
  title: string;
  description: string;
  details: string[];
}

export const EXPERTISES_DATA: Record<string, ExpertiseData> = {
  "formation-ia": {
    title: "Formation & Intelligence Artificielle",
    description: "Montez en compétence grâce à nos programmes de formation de pointe et exploitez la puissance de l'IA.",
    details: [
      "Sensibilisation et acculturation à l'Intelligence Artificielle.",
      "Formations techniques sur les outils d'IA générative.",
      "Programmes de leadership et management à l'ère du digital.",
      "Ateliers pratiques et cas d'usage métiers."
    ]
  },
  "conseil-strategique": {
    title: "Conseil Stratégique",
    description: "Un accompagnement sur-mesure pour définir le cap et aligner vos opérations avec vos ambitions.",
    details: [
      "Audit organisationnel et diagnostic de performance.",
      "Élaboration de schémas directeurs.",
      "Accompagnement à la conduite du changement.",
      "Alignement de la stratégie IT avec les objectifs business."
    ]
  },
  "etudes-financieres": {
    title: "Études Financières & Business Plans",
    description: "Des analyses rigoureuses pour éclairer vos décisions d'investissement et structurer vos financements.",
    details: [
      "Modélisation financière et prévisions de trésorerie.",
      "Évaluation d'entreprises et due diligence.",
      "Rédaction de business plans bancables.",
      "Analyse de rentabilité des projets (ROI, TIR)."
    ]
  },
  "services-entreprises": {
    title: "Services aux Entreprises",
    description: "Une palette de services pour soulager votre organisation des tâches chronophages.",
    details: [
      "Secrétariat juridique et administratif.",
      "Assistance RH (recrutement, paie, contrats).",
      "Services de comptabilité et déclarations fiscales.",
      "Domiciliation et services généraux."
    ]
  },
  "externalisation-bpo": {
    title: "Externalisation (BPO)",
    description: "Déléguez vos processus métiers à nos experts pour gagner en agilité et maîtriser vos coûts.",
    details: [
      "Gestion de la relation client (Service client, SAV).",
      "Saisie de données et back-office.",
      "Support informatique de niveau 1 et 2.",
      "Télémarketing et génération de leads."
    ]
  },
  "developpement-logiciel": {
    title: "Développement de Logiciels de Gestion",
    description: "Conception et réalisation d'applications métiers performantes, sécurisées et évolutives.",
    details: [
      "Développement d'outils ERP et CRM sur-mesure.",
      "Applications web et mobiles.",
      "Intégration d'API et interopérabilité des systèmes.",
      "Maintenance applicative (TMA)."
    ]
  },
  "transformation-digitale": {
    title: "Transformation Digitale",
    description: "Modernisez votre entreprise en intégrant les technologies numériques au cœur de votre activité.",
    details: [
      "Audit de maturité numérique.",
      "Déploiement de solutions cloud et collaboratives.",
      "Dématérialisation des documents et processus.",
      "Sécurisation des systèmes d'information."
    ]
  },
  "gestion-projets": {
    title: "Gestion de Projets",
    description: "Une méthodologie éprouvée pour garantir la livraison de vos projets dans les délais et budgets impartis.",
    details: [
      "Cadrage, planification et allocation des ressources.",
      "Pilotage agile (Scrum, Kanban) ou cycle en V.",
      "Gestion des risques et contrôle qualité.",
      "Reporting et tableaux de bord de suivi (PMO)."
    ]
  },
  "optimisation-processus": {
    title: "Optimisation des Processus",
    description: "Rationalisez vos opérations pour éliminer les gaspillages et maximiser la création de valeur.",
    details: [
      "Cartographie des processus existants (BPM).",
      "Identification des goulots d'étranglement.",
      "Déploiement des méthodes Lean et Six Sigma.",
      "Automatisation des tâches répétitives (RPA)."
    ]
  }
};