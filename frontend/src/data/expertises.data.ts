export interface ExpertiseKeyPoint {
  title: string;
  description: string;
}

export interface ExpertiseComplementaryCard {
  iconName: "target" | "zap" | "shield" | "trending" | "layers" | "cpu" | "code" | "users" | "sparkles" | "checkCircle" | "award" | "settings";
  title: string;
  description: string;
}

export interface ExpertiseItem {
  id: string;
  slug: string;
  categoryBadge: string;
  title: string;
  heroDescription: string;
  description: string;
  image: string;
  iconName: "compass" | "brain" | "code" | "smartphone" | "palette" | "barChart" | "cloud" | "shield" | "graduationCap";
  points: string[];
  presentationParagraphs: string[];
  keyBenefits: ExpertiseKeyPoint[];
  complementaryCards: ExpertiseComplementaryCard[];
}

export const expertisesList: ExpertiseItem[] = [
  {
    id: "1",
    slug: "conseil-strategique",
    categoryBadge: "STRATÉGIE & TRANSFORMATION",
    title: "Conseil stratégique",
    heroDescription:
      "Accompagnement sur-mesure des dirigeants et organisations pour définir des feuilles de route claires, optimiser leurs performances et accélérer leur croissance durable.",
    description:
      "Accompagnement des entreprises dans la définition de leurs orientations stratégiques, l'amélioration de leurs performances et la conduite du changement.",
    image: "/images/digitalstrategy.webp",
    iconName: "compass",
    points: [
      "Diagnostic organisationnel complet",
      "Élaboration de feuilles de route stratégiques",
      "Accompagnement à la gouvernance et prise de décision",
    ],
    presentationParagraphs: [
      "Dans un environnement économique en constante mutation, réussir sa transformation nécessite une vision claire et une exécution rigoureuse. ALTIORA CONNECT intervient auprès des décideurs pour structurer leurs choix stratégiques, aligner leurs ressources avec leurs objectifs et sécuriser chaque étape de leur développement.",
      "Notre méthode s'appuie sur une analyse approfondie des dynamiques de votre marché, l'identification de vos leviers de croissance et la co-construction de solutions concrètes, pragmatiques et orientées résultats."
    ],
    keyBenefits: [
      {
        title: "Alignement stratégique",
        description: "Clarifiez vos priorités et mobilisez vos équipes autour d'une vision commune.",
      },
      {
        title: "Optimisation de la performance",
        description: "Identifiez les gisements d'efficacité et rationalisez vos processus opérationnels.",
      },
      {
        title: "Gestion du changement sécurisée",
        description: "Anticipez les freins organisationnels et pérennisez l'adoption de vos nouveaux modèles.",
      },
    ],
    complementaryCards: [
      {
        iconName: "target",
        title: "Approche sur-mesure",
        description: "Des recommandations calibrées précisément selon la taille, le secteur et la culture de votre organisation.",
      },
      {
        iconName: "trending",
        title: "Impact mesurable",
        description: "Définition d'indicateurs de performance (KPIs) tangibles pour suivre la concrétisation de la valeur.",
      },
    ],
  },
  {
    id: "2",
    slug: "intelligence-artificielle",
    categoryBadge: "INNOVATION & IA",
    title: "Intelligence Artificielle",
    heroDescription:
      "Intégrez l'intelligence artificielle générative et prédictive au cœur de vos processus pour automatiser les tâches complexes et décupler la productivité de vos équipes.",
    description:
      "Conception de solutions basées sur l'IA pour améliorer la productivité, automatiser les processus et faciliter la prise de décision.",
    image: "/images/ia.webp",
    iconName: "brain",
    points: [
      "IA générative et modèles de langage (LLM)",
      "Agents conversationnels & Chatbots intelligents",
      "Automatisation cognitive des processus métiers",
    ],
    presentationParagraphs: [
      "L'intelligence artificielle n'est plus une simple perspective d'avenir : c'est un levier immédiat de compétitivité et d'innovation. Nous concevons et déployons des solutions IA sur-mesure, adaptées à vos données d'entreprise et respectueuses des plus hauts standards de confidentialité.",
      "De l'automatisation du service client par agents conversationnels avancés au traitement automatique de documents complexes, nos experts vous guident pour transformer l'IA en avantage concurrentiel durable."
    ],
    keyBenefits: [
      {
        title: "Automatisation à haute valeur",
        description: "Libérez vos collaborateurs des tâches répétitives pour vous concentrer sur l'essentiel.",
      },
      {
        title: "Décisions basées sur les données",
        description: "Exploitez vos flux d'information pour dégager des insights prédictifs immédiats.",
      },
      {
        title: "Sécurité & Souveraineté des données",
        description: "Déploiements sécurisés garantissant l'étanchéité et la confidentialité totale de votre savoir-faire.",
      },
    ],
    complementaryCards: [
      {
        iconName: "sparkles",
        title: "Modèles contextualisés",
        description: "Intégration d'architectures RAG (Retrieval-Augmented Generation) entraînées sur vos propres bases de connaissances.",
      },
      {
        iconName: "zap",
        title: "Déploiement rapide",
        description: "Mise en place de Proofs of Concept (POC) opérationnels en quelques semaines pour valider le ROI.",
      },
    ],
  },
  {
    id: "3",
    slug: "developpement-web",
    categoryBadge: "INGÉNIERIE LOGICIELLE",
    title: "Développement Web",
    heroDescription:
      "Conception et développement de plateformes web modernes, hautement scalables, performantes et sécurisées, répondant aux exigences techniques les plus strictes.",
    description:
      "Création de plateformes web modernes, sécurisées et évolutives adaptées aux besoins des organisations.",
    image: "/images/devweb.webp",
    iconName: "code",
    points: [
      "Applications Web & SaaS sur-mesure",
      "Portails métiers et plateformes collaboratives",
      "Architectures modernes, API REST et microservices",
    ],
    presentationParagraphs: [
      "Vos applications web constituent le cœur névralgique de vos opérations et de vos interactions avec vos clients. Nous développons des architectures web modernes, robustes et extensibles qui soutiennent vos ambitions de croissance.",
      "En combinant les meilleures pratiques d'ingénierie logicielle (Next.js, TypeScript, API sécurisées) avec un design soigné, nous livrons des expériences utilisateur ultra-rapides et des infrastructures pérennes."
    ],
    keyBenefits: [
      {
        title: "Performance & Vitesse optimale",
        description: "Des temps de chargement ultra-courts favorisant le référencement et l'engagement utilisateur.",
      },
      {
        title: "Scalabilité & Robustesse",
        description: "Des architectures modulaires conçues pour absorber les montées en charge sans friction.",
      },
      {
        title: "Sécurité dès la conception",
        description: "Application stricte des normes de sécurité pour protéger vos applications contre toute vulnérabilité.",
      },
    ],
    complementaryCards: [
      {
        iconName: "layers",
        title: "Stack technologique de pointe",
        description: "Utilisation des frameworks modernes garantissant maintenabilité, fluidité et évolutivité continue.",
      },
      {
        iconName: "checkCircle",
        title: "Qualité de code irréprochable",
        description: "Tests automatisés, intégration continue (CI/CD) et revues de code systématiques.",
      },
    ],
  },
  {
    id: "4",
    slug: "developpement-mobile",
    categoryBadge: "MOBILITÉ & APPLICATIONS",
    title: "Développement Mobile",
    heroDescription:
      "Création d'applications mobiles iOS et Android captivantes et réactives, conçues pour offrir une expérience utilisateur remarquable dans toutes les situations.",
    description:
      "Développement d'applications Android et iOS offrant une expérience utilisateur fluide et performante.",
    image: "/images/comming-mobile.webp",
    iconName: "smartphone",
    points: [
      "Applications natives iOS & Android",
      "Solutions cross-platform (Flutter / React Native)",
      "Synchronisation hors-ligne & notifications ciblées",
    ],
    presentationParagraphs: [
      "Dans un monde centré sur le mobile, disposer d'une application ergonomique, rapide et fiable est un prérequis pour fidéliser vos utilisateurs ou fluidifier le travail de vos collaborateurs sur le terrain.",
      "Nous assurons l'intégralité du cycle de vie de votre projet mobile : du prototypage UX/UI à la publication sur l'App Store et Google Play, avec un suivi rigoureux des performances en temps réel."
    ],
    keyBenefits: [
      {
        title: "Expérience fluide et intuitive",
        description: "Interfaces conçues pour des gestuelles naturelles et une navigation agréable.",
      },
      {
        title: "Compatibilité multi-plateformes",
        description: "Une base de code optimisée pour couvrir l'ensemble du parc mobile avec efficacité.",
      },
      {
        title: "Mode hors-ligne résilient",
        description: "Continuité de service garantie même en cas de connectivité internet limitée.",
      },
    ],
    complementaryCards: [
      {
        iconName: "cpu",
        title: "Performance native",
        description: "Exploitation maximale des fonctionnalités matérielles (caméra, géolocalisation, biométrie).",
      },
      {
        iconName: "shield",
        title: "Publication & Conformité",
        description: "Accompagnement complet pour les validations éditoriales et le respect des chartes Apple et Google.",
      },
    ],
  },
  {
    id: "5",
    slug: "ui-ux-design",
    categoryBadge: "EXPÉRIENCE UTILISATEUR",
    title: "UI / UX Design",
    heroDescription:
      "Conception d'expériences numériques élégantes, fonctionnelles et centrées sur l'humain pour transformer vos visiteurs en utilisateurs conquis et engagés.",
    description:
      "Conception d'interfaces intuitives centrées sur l'utilisateur afin d'améliorer la satisfaction et l'efficacité des solutions.",
    image: "/images/comming1-web.webp",
    iconName: "palette",
    points: [
      "Recherche utilisateurs & Parcours clients",
      "Wireframes interactifs & Prototypes haute fidélité",
      "Création de Design Systems cohérents et réutilisables",
    ],
    presentationParagraphs: [
      "Un produit technologique d'excellence commence par un design intuitif. Notre pôle UI/UX combine empathie utilisateur, esthétique premium et psychologie cognitive pour façonner des interfaces fluides et captivantes.",
      "Nous impliquons vos utilisateurs finaux à chaque étape par des ateliers de co-création et des tests d'utilisabilité, garantissant un taux d'adoption maximal dès le lancement."
    ],
    keyBenefits: [
      {
        title: "Clarté et simplicité d'usage",
        description: "Réduction drastique des points de friction et de la charge cognitive pour les utilisateurs.",
      },
      {
        title: "Cohérence de marque renforcée",
        description: "Déploiement d'une identité visuelle moderne et harmonieuse sur tous vos supports numériques.",
      },
      {
        title: "Accélération du développement",
        description: "Des Design Systems documentés facilitant grandement le travail d'intégration des développeurs.",
      },
    ],
    complementaryCards: [
      {
        iconName: "users",
        title: "Design centré utilisateur",
        description: "Entretiens qualitatifs et tests en conditions réelles pour valider chaque choix ergonomique.",
      },
      {
        iconName: "layers",
        title: "Design Systems modulaires",
        description: "Composants réutilisables sous Figma assurant une pérennité visuelle et technique totale.",
      },
    ],
  },
  {
    id: "6",
    slug: "business-intelligence",
    categoryBadge: "DATA & ANALYTICS",
    title: "Business Intelligence",
    heroDescription:
      "Transformez vos données brutes en indicateurs décisionnels clairs et percutants grâce à des tableaux de bord interactifs et des analyses prédictives.",
    description:
      "Valorisation des données pour produire des tableaux de bord et faciliter la prise de décision stratégique.",
    image: "/images/data.webp",
    iconName: "barChart",
    points: [
      "Pipelines d'intégration de données (ETL)",
      "Tableaux de bord dynamiques (Power BI, Superset, Looker)",
      "Modélisation prédictive et analyse de tendances",
    ],
    presentationParagraphs: [
      "Vos données constituent l'un de vos actifs les plus précieux. ALTIORA CONNECT vous accompagne pour décloisonner vos sources d'information, fiabiliser vos indicateurs et offrir aux décideurs une vue synthétique à 360° de leur activité.",
      "Grâce à des dashboards interactifs et automatisés, gagnez un temps précieux dans la production de rapports et anticipez les opportunités et risques avec précision."
    ],
    keyBenefits: [
      {
        title: "Vision consolidée en temps réel",
        description: "Accédez en un coup d'œil aux métriques critiques de performance de votre entreprise.",
      },
      {
        title: "Gain de temps opérationnel",
        description: "Fin des consolidations manuelles sous tableurs grâce à l'automatisation des flux de données.",
      },
      {
        title: "Aide à la décision objective",
        description: "Basez vos orientations sur des faits mesurés plutôt que sur de simples intuitions.",
      },
    ],
    complementaryCards: [
      {
        iconName: "trending",
        title: "Dashboards sur-mesure",
        description: "Interfaces de restitution personnalisées selon les profils (direction générale, opérations, finance).",
      },
      {
        iconName: "settings",
        title: "Gouvernance de la donnée",
        description: "Mise en place de règles de traçabilité, de nettoyage et de qualité pour des données irréprochables.",
      },
    ],
  },
  {
    id: "7",
    slug: "cloud",
    categoryBadge: "INFRASTRUCTURE & DEVOPS",
    title: "Cloud & DevOps",
    heroDescription:
      "Modernisez vos infrastructures informatiques vers le cloud pour gagner en agilité, flexibilité et optimiser vos coûts opérationnels en toute sérénité.",
    description:
      "Migration, architecture et sécurisation de vos infrastructures cloud pour une haute disponibilité et scalabilité.",
    image: "/images/cloud.webp",
    iconName: "cloud",
    points: [
      "Architecture Cloud hybride et multi-cloud",
      "Migration sécurisée et sans interruption de service",
      "Automatisation CI/CD et Infrastructure as Code (IaC)",
    ],
    presentationParagraphs: [
      "L'adoption du Cloud et des méthodologies DevOps permet d'accélérer drastiquement la livraison de vos services tout en renforçant la résilience de vos systèmes. Nous accompagnons votre transition de bout en bout.",
      "Nos experts conçoivent des architectures hautement disponibles, automatisent vos pipelines de déploiement et mettent en place les meilleures pratiques FinOps pour maîtriser vos dépenses d'infrastructure."
    ],
    keyBenefits: [
      {
        title: "Disponibilité & Résilience maximale",
        description: "Tolérance aux pannes et reprise d'activité rapide grâce à des configurations redondées.",
      },
      {
        title: "Accélération des cycles de release",
        description: "Déploiements automatisés sans interruption, réduisant le time-to-market de vos innovations.",
      },
      {
        title: "Optimisation des coûts (FinOps)",
        description: "Ajustement automatique des ressources consommées pour ne payer que ce dont vous avez besoin.",
      },
    ],
    complementaryCards: [
      {
        iconName: "zap",
        title: "Automatisation CI/CD",
        description: "Pipelines continus éliminant les erreurs manuelles et garantissant une qualité constante.",
      },
      {
        iconName: "shield",
        title: "Sécurité & Conformité Cloud",
        description: "Gestion stricte des accès, chiffrement systématique et audits de conformité automatisés.",
      },
    ],
  },
  {
    id: "8",
    slug: "cybersecurite",
    categoryBadge: "SÉCURITÉ DES SYSTÈMES",
    title: "Cybersécurité",
    heroDescription:
      "Protégez vos actifs stratégiques, vos données sensibles et assurez la résilience opérationnelle de votre organisation face aux cybermenaces émergentes.",
    description:
      "Protection de vos données sensibles et audit approfondi des systèmes pour contrer les cybermenaces.",
    image: "/images/cybe.webp",
    iconName: "shield",
    points: [
      "Audits d'architecture & Tests d'intrusion (Pen-testing)",
      "Protection et gouvernance des données sensibles",
      "Sensibilisation des équipes & plan de réponse à incident",
    ],
    presentationParagraphs: [
      "Dans un paysage de menaces de plus en plus sophistiquées, la cybersécurité est un enjeu vital de survie et de confiance. ALTIORA CONNECT déploie une approche de sécurité proactive et globale pour préserver l'intégrité de vos systèmes.",
      "De l'évaluation de vos vulnérabilités à la remédiation technique en passant par la formation de vos collaborateurs, nous bâtissons avec vous une défense en profondeur robuste."
    ],
    keyBenefits: [
      {
        title: "Réduction drastique des risques",
        description: "Identification et correction préventive des failles avant qu'elles ne soient exploitées.",
      },
      {
        title: "Continuité d'activité garantie",
        description: "Procédures de sauvegarde et plans d'urgence éprouvés pour faire face à tout incident.",
      },
      {
        title: "Conformité réglementaire",
        description: "Alignement avec les standards de protection des données et exigences sectorielles.",
      },
    ],
    complementaryCards: [
      {
        iconName: "shield",
        title: "Audit approfondi",
        description: "Analyses de vulnérabilités techniques et organisationnelles avec rapport de remédiation priorisé.",
      },
      {
        iconName: "users",
        title: "Culture de sécurité",
        description: "Programmes interactifs de sensibilisation pour transformer vos équipes en première ligne de défense.",
      },
    ],
  },
  {
    id: "9",
    slug: "formation",
    categoryBadge: "COMPÉTENCES & TALENTS",
    title: "Formation Professionnelle",
    heroDescription:
      "Développez les compétences de vos équipes grâce à des programmes pédagogiques pratiques, animés par des experts praticiens et adaptés aux défis de demain.",
    description:
      "Programmes d'apprentissage sur-mesure pour monter en compétences sur les technologies et méthodologies de pointe.",
    image: "/images/gestion.webp",
    iconName: "graduationCap",
    points: [
      "Formations certifiantes et programmes sur-mesure",
      "Ateliers pratiques, études de cas réels et immersions",
      "Coaching technique et accompagnement managérial",
    ],
    presentationParagraphs: [
      "Le capital humain est le premier moteur de la transformation numérique. ALTIORA CONNECT conçoit des modules de formation immersifs et dynamiques pour doter vos collaborateurs des compétences indispensables à l'ère du digital.",
      "Nos formations sont animées par des intervenants de terrain qui partagent retours d'expérience concrets, méthodologies agiles et meilleures pratiques directement applicables à vos projets."
    ],
    keyBenefits: [
      {
        title: "Montée en compétences rapide",
        description: "Pédagogie active 70% pratique favorisant l'assimilation immédiate des concepts clés.",
      },
      {
        title: "Contenus adaptés à votre secteur",
        description: "Exemples et cas pratiques tirés directement de votre contexte d'entreprise.",
      },
      {
        title: "Valorisation des talents",
        description: "Renforcez l'engagement et l'attractivité de vos équipes grâce à des parcours certifiants.",
      },
    ],
    complementaryCards: [
      {
        iconName: "award",
        title: "Expertise éprouvée",
        description: "Formateurs certifiés et experts seniors en activité sur des projets d'envergure.",
      },
      {
        iconName: "target",
        title: "Suivi post-formation",
        description: "Évaluations des acquis et sessions de questions/réponses pour assurer un ancrage durable.",
      },
    ],
  },
];

