
export interface ArticleContentSection {
  heading?: string;
  paragraphs: string[];
}

export interface Article {
  id: string;
  title: string;
  date: string;
  category: string;
  images: string[];
  excerpt: string;
  readTime?: string;
  quote?: string;
  content?: ArticleContentSection[]
}

export const articlesList: Article[] = [
  {
    id: "lancement-partenariat-e-prest",
    title: "ALTIORA PREST signe un partenariat stratégique avec E PREST SOLUTIONS",
    date: "15 Juillet 2026",
    category: "Entreprise",
    images: [
      "/images/partenaire.avif",
      "/images/partenaire1.avif",
      "/images/partenaire2.avif"
    ],
    excerpt: "Une nouvelle ère s'ouvre pour l'accompagnement des entreprises à Madagascar avec cette alliance forte alliant expertise conseil et excellence opérationnelle BPO.",
    readTime: "5 min",
    quote: "Cette alliance combine la puissance de notre conseil stratégique à la réactivité opérationnelle des services BPO pour propulser le marché local.",
    content: [
      {
        paragraphs: [
          "ALTIORA PREST et E PREST SOLUTIONS annoncent la signature d'un accord de partenariat stratégique visant à transformer l'écosystème des services aux entreprises à Madagascar.",
          "Face aux exigences accrues de compétitivité, cette collaboration permet d'offrir un accompagnement de bout en bout, combinant conseil de haut niveau et externalisation de processus métier (BPO)."
        ]
      },
      {
        heading: "Une vision partagée de l'excellence",
        paragraphs: [
          "Ce rapprochement s'appuie sur une complémentarité naturelle : l'expertise d'ALTIORA PREST en restructuration et stratégie d'entreprise s'associe à la maîtrise technique d'E PREST SOLUTIONS dans la gestion déléguée des opérations.",
          "Les entreprises partenaires bénéficieront de synergies inédites pour accélérer leur digitalisation, optimiser leurs coûts de structure et sécuriser leurs opérations critiques."
        ]
      },
      {
        heading: "Impact et perspectives pour 2026-2027",
        paragraphs: [
          "Cette alliance prévoit également la création d'un centre de compétences partagé à Antananarivo pour former les cadres de demain aux standards internationaux.",
          "Grâce à ce réseau unifié, nos clients accèdent désormais à un catalogue complet de solutions sur-mesure pour accompagner leur expansion régionale."
        ]
      }
    ]    
  },
  {
    id: "ia-transformation-entreprises-afrique",
    title: "L'Intelligence Artificielle : Levier de transformation pour les entreprises africaines",
    date: "28 Juin 2026",
    category: "Insights & Tendances",
    images: [
      "/images/AI1.avif",
      "/images/AI2.avif",
      "/images/AI3.avif"
    ],
    excerpt: "Découvrez comment l'IA redessine les processus métiers et offre des opportunités de croissance inédites sur le continent.",
    readTime: "8 min",
    quote: "L'IA en Afrique n'est pas un luxe technologique, c'est un accélérateur pour sauter des étapes de développement.",
    content: [
      {
        paragraphs: [
          "L'adoption de l'intelligence artificielle s'accélère à un rythme sans précédent à travers le continent africain, redéfinissant la manière dont les PME et grands groupes opèrent au quotidien.",
          "Des services financiers automatisés à l'optimisation des chaînes logistiques, l'IA devient un moteur incontournable d'efficacité et d'inclusion."
        ]
      },
      {
        heading: "Optimisation des processus et automatisation intelligente",
        paragraphs: [
          "En intégrant des modèles d'analyse prédictive et des agents conversationnels, les organisations réduisent leurs temps de traitement tout en améliorant significativement l'expérience client.",
          "L'enjeu majeur réside aujourd'hui dans l'adaptation de ces technologies aux spécificités des marchés locaux et au traitement des langues vernaculaires."
        ]
      }
    ]
  },
  {
    id: "nouveau-programme-leadership-feminin",
    title: "Ouverture des inscriptions : Programme Leadership Féminin",
    date: "10 Juin 2026",
    category: "Formations",
    images: [
      "/images/leadFemme.avif",
      "/images/leadFemme2.avif",
      "/images/leadFemme3.avif"
    ],
    excerpt: "ALTIORA PREST lance sa nouvelle cohorte dédiée aux femmes dirigeantes et entrepreneures. Un programme intensif de 3 mois.",
    readTime: "6 min",
    quote: "Accompagner l'émergence des décideuses de demain est une priorité stratégique pour la transformation économique du continent.",
    content: [
      {
        paragraphs: [
          "ALTIORA PREST est fière d'annoncer le lancement officiel des inscriptions pour la nouvelle édition de son programme phare axé sur le Leadership Féminin.",
          "Conçu spécifiquement pour répondre aux réalités des femmes cadres et entrepreneures, ce parcours immersif de 3 mois allie formation académique, coaching personnalisé et sessions de mentorat avec des figures clés du monde des affaires."
        ]
      },
      {
        heading: "Un parcours axé sur la pratique et l'impact",
        paragraphs: [
          "Le cursus s'articule autour de trois piliers fondamentaux : la prise de décision stratégique, la communication d'impact et la négociation complexe.",
          "Chaque participante sera amenée à développer un projet de transformation concret au sein de son organisation ou de son entreprise tout au long du programme."
        ]
      },
      {
        heading: "Modalités et accès à la cohorte 2026",
        paragraphs: [
          "Les places sont limitées à 20 participantes par promotion afin de garantir un suivi individualisé et un réseau de pairs de haute qualité.",
          "Les candidatures sont ouvertes jusqu'au 30 juin 2026 via notre plateforme en ligne dédiée."
        ]
      }
    ]
  },
  {
    id: "importance-audit-financier",
    title: "Pourquoi l'audit financier est crucial en période de crise ?",
    date: "22 Mai 2026",
    category: "Conseil",
    images: [
      "/images/crise.avif",
      "/images/crise1.avif",
      "/images/crise2.avif"
    ],
    excerpt: "L'analyse rigoureuse des états financiers permet non seulement de prévenir les risques mais aussi d'identifier des poches de rentabilité cachées.",
    readTime: "7 min",
    quote: "L'audit ne doit pas être perçu comme une contrainte réglementaire, mais comme une boussole stratégique en temps d'incertitude.",
    content: [
      {
        paragraphs: [
          "Face aux turbulences économiques et aux fluctuations des marchés, la gestion prudente de la trésorerie et la maîtrise du risque financier deviennent vitales pour les entreprises.",
          "Trop souvent considéré comme un simple exercice de conformité, l'audit financier s'avère être un outil puissant de diagnostic organisationnel en période de crise."
        ]
      },
      {
        heading: "Détecter les fragilités opérationnelles et sécuriser la trésorerie",
        paragraphs: [
          "L'examen approfondi des bilans et des flux de trésorerie permet de repérer rapidement les inefficacités opérationnelles, les créances à risque et les coûts cachés.",
          "Une telle démarche sécurise les relations avec les partenaires bancaires et financiers en leur apportant une visibilité transparente et certifiée sur la santé réelle de l'entreprise."
        ]
      },
      {
        heading: "De l'évaluation des risques à l'opportunité de croissance",
        paragraphs: [
          "Au-delà de la protection du capital, l'audit met en lumière des levier de rationalisation financière, permettant de réorienter les ressources vers les activités les plus rentables."
        ]
      }
    ]
  },
  {
    id: "optimisation-fiscale-madagascar-2026",
    title: "L'optimisation fiscale à Madagascar : Nouveautés 2026",
    date: "05 Mai 2026",
    category: "Conseil",
    images: [
      "/images/opt.avif",
      "/images/act9.avif"
    ],
    excerpt: "Anticipez les changements réglementaires et découvrez comment optimiser la fiscalité de votre entreprise en toute conformité.",
    readTime: "5 min",
    quote: "S'adapter aux évolutions de la Loi de Finances n'est pas seulement une question de conformité, c'est un levier direct de rentabilité.",
    content: [
      {
        paragraphs: [
          "L'exercice fiscal 2026 introduit plusieurs réformes majeures touchant la fiscalité des entreprises opérant à Madagascar, imposant une mise à jour rapide des pratiques comptables.",
          "Comprendre ces évolutions permet aux dirigeants d'anticiper les impacts sur leur trésorerie et de tirer parti des incitations fiscales légales prévues par la législation."
        ]
      },
      {
        heading: "Mesures phares et incitations sectorielles",
        paragraphs: [
          "Les nouvelles dispositions mettent l'accent sur la numérisation des déclarations, le renforcement des contrôles de prix de transfert et des crédits d'impôt ciblés pour la transition énergétique.",
          "Nos experts conseillent un audit de conformité fiscale préalable afin de réajuster vos stratégies de déductibilité et de gestion de TVA en toute sécurité."
        ]
      }
    ]
  },
  {
    id: "supply-chain-resiliente",
    title: "Bâtir une Supply Chain résiliente face aux crises mondiales",
    date: "18 Avril 2026",
    category: "Insights & Tendances",
    images: [
      "/images/batir.avif",
      "/images/lean.avif",
      "/images/lean1.avif"
    ],
    excerpt: "Les stratégies indispensables pour sécuriser vos approvisionnements et maintenir votre activité opérationnelle en toutes circonstances.",
    readTime: "8 min",
    quote: "La résilience d'une chaîne logistique ne réside pas dans l'absence de perturbations, mais dans la rapidité d'adaptation.",
    content: [
      {
        paragraphs: [
          "Volatilité des prix du transport, goulots d'étranglement logistiques et tensions géopolitiques : la gestion de la Supply Chain subit une pression sans précédent.",
          "Pour maintenir la continuité de leurs opérations, les entreprises doivent renoncer au modèle traditionnel axé uniquement sur le coût le plus bas au profit d'un modèle basé sur la résilience."
        ]
      },
      {
        heading: "Diversification des fournisseurs et visibilité de bout en bout",
        paragraphs: [
          "La dépendance à une source unique d'approvisionnement constitue le principal facteur de vulnérabilité. La régionalisation des achats (nearshoring) et le multi-sourcing deviennent indispensables.",
          "En intégrant des outils de suivi en temps réel et d'analyse prédictive, les responsables logistiques peuvent anticiper les retards et réorienter les flux avant l'interruption de la chaîne."
        ]
      },
      {
        heading: "Digitalisation et méthodologies Lean",
        paragraphs: [
          "L'association de la méthodologie Lean à la numérisation permet de réduire les stocks de sécurité inutiles tout en conservant une réactivité optimale face aux aléas de livraison."
        ]
      }
    ]
  },
  {
    id: "developpement-logiciels-agiles",
    title: "Développement logiciel : Adopter l'agilité pour accélérer votre Time-to-Market",
    date: "05 Mai 2026",
    category: "Technologie",
    images: [
      "/images/dev.avif"
    ],
    excerpt: "L'approche agile n'est plus une option. Comment transformer la culture de votre équipe de développement pour livrer plus rapidement des produits de qualité.",
    readTime: "6 min",
    quote: "L'agilité n'est pas une simple méthodologie informatique, c'est une culture d'entreprise tournée vers la valeur client.",
    content: [
      {
        paragraphs: [
          "Dans un environnement numérique en constante évolution, la capacité à mettre rapidement sur le marché des fonctionnalités logicielles stables est un avantage concurrentiel décisif.",
          "L'adoption des frameworks Agiles (Scrum, Kanban) permet aux équipes produit d'aligner étroitement le développement sur les besoins réels des utilisateurs."
        ]
      },
      {
        heading: "Réduire les cycles de livraison grâce aux itérations courtes",
        paragraphs: [
          "En découpant les projets d'envergure en livrables hebdomadaires ou bi-mensuels, les équipes réduisent les risques de dérive budgétaire et améliorent la qualité du code.",
          "Les boucles de rétroaction continues garantissent que chaque fonctionnalité développée apporte une valeur mesurable immédiate aux utilisateurs."
        ]
      },
      {
        heading: "Conduire le changement culturel",
        paragraphs: [
          "Réussir sa transition agile exige un changement d'état d'esprit : favoriser la collaboration interdisciplinaire, encourager la responsabilité partagée et accepter l'amélioration continue."
        ]
      }
    ]
  }
];