export interface FormationMock {
  id: string;
  title: string;
  slug: string;
  description: string;
  duration: string;
}

export const mockFormations: FormationMock[] = [
  {
    id: "1",
    title: "Développement Web Moderne avec Next.js",
    slug: "developpement-web-moderne-nextjs",
    description: "Apprenez à créer des applications web performantes avec Next.js.",
    duration: "3 jours",
  },
  {
    id: "2",
    title: "Architecture Microservices & Cloud",
    slug: "architecture-microservices-cloud",
    description: "Conception et déploiement d'architectures distribuées.",
    duration: "5 jours",
  },
];
