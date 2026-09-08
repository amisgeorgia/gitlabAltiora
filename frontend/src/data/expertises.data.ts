import { 
  BrainCircuit, 
  Lightbulb, 
  PieChart, 
  Building2, 
  Globe, 
  Code, 
  RefreshCw, 
  Gauge, 
  LucideIcon 
} from "lucide-react";

export interface ExpertiseItem {
  id: string;
  titleKey: string;
  icon: LucideIcon;
  descKey: string;
  images: string[];
  features: string[];
}

export const EXPERTISES_DATA: ExpertiseItem[] = [
  { 
    id: "formation-ia", 
    titleKey: "expertises.items.1.title", 
    icon: BrainCircuit, 
    descKey: "expertises.items.1.desc", 
    images: [
      "/images/act2.avif", 
      "/images/act3.avif"
    ],
    features: ["IA générative", "Chatbots", "Automatisation"]
  },
  { 
    id: "conseil-strategique", 
    titleKey: "expertises.items.2.title", 
    icon: Lightbulb, 
    descKey: "expertises.items.2.desc", 
    images: [
      "/images/act1.avif", 
      "/images/act4.avif"
    ],
    features: ["Diagnostic organisationnel", "Plan stratégique", "Accompagnement décisionnel"]
  },
  { 
    id: "etudes-financieres", 
    titleKey: "expertises.items.3.title", 
    icon: PieChart, 
    descKey: "expertises.items.3.desc", 
    images: [
      "/images/act6.avif", 
      "/images/experte1.avif"
    ],
    features: ["Analyse financière", "Business plan", "Évaluation d'entreprise"]
  },
  { 
    id: "services-entreprises", 
    titleKey: "expertises.items.4.title", 
    icon: Building2, 
    descKey: "expertises.items.4.desc", 
    images: [
      "/images/act9.avif", 
      "/images/act7.avif"
    ],
    features: ["Gestion administrative", "Ressources humaines", "Support juridique"]
  },
  { 
    id: "externalisation-bpo", 
    titleKey: "expertises.items.5.title", 
    icon: Globe, 
    descKey: "expertises.items.5.desc", 
    images: [
      "/images/act10.avif", 
      "/images/act8.avif"
    ],
    features: ["Service client", "Saisie de données", "Support technique"]
  },
  { 
    id: "developpement-logiciel", 
    titleKey: "expertises.items.6.title", 
    icon: Code, 
    descKey: "expertises.items.6.desc", 
    images: [
      "/images/act7.avif", 
      "/images/act2.avif"
    ],
    features: ["Applications web", "Applications mobiles", "Logiciels sur-mesure"]
  },
  { 
    id: "transformation-digitale", 
    titleKey: "expertises.items.7.title", 
    icon: RefreshCw, 
    descKey: "expertises.items.7.desc", 
    images: [
      "/images/experte1.avif", 
      "/images/act5.avif"
    ],
    features: ["Audit numérique", "Stratégie digitale", "Accompagnement au changement"]
  },
  { 
    id: "optimisation-processus", 
    titleKey: "expertises.items.8.title", 
    icon: Gauge, 
    descKey: "expertises.items.8.desc", 
    images: [
      "/images/experte2.avif", 
      "/images/experte3.avif"
    ],
    features: ["Cartographie des processus", "Lean Management", "Automatisation RPA"]
  }
];

export const METHODOLOGY_STEPS = [
  { num: "1", title: "Analyse", desc: "Analyse approfondie des besoins et enjeux." },
  { num: "2", title: "Diagnostic", desc: "Diagnostic précis & Conseil stratégique." },
  { num: "3", title: "Conception", desc: "Modélisation de la solution sur-mesure." },
  { num: "4", title: "Déploiement", desc: "Mise en œuvre technique et pilotage." },
  { num: "5", title: "Suivi", desc: "Optimisation & Amélioration continue." }
];

export const TESTIMONIALS = [
  { name: "Jean Rakoto", text: "ALTIORA CONNECT nous a permis de structurer notre transformation digitale avec une approche claire et un accompagnement de qualité." },
  { name: "Sarah Andriamiarisoa", text: "Les formations proposées sont concrètes, interactives et directement applicables dans notre activité quotidienne." },
  { name: "Michel stall", text: "L'équipe a parfaitement compris nos besoins et livré une solution adaptée à nos objectifs." },
  { name: "Michel Randria", text: "Grâce à la structuration de nos processus et aux formations dispensées, nos équipes ont gagné un temps précieux au quotidien." }
];