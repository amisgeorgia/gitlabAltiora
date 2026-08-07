export interface ActualiteMock {
  id: string;
  title: string;
  slug: string;
  summary: string;
  publishedAt: string;
}

export const mockActualites: ActualiteMock[] = [
  {
    id: "1",
    title: "Lancement de la plateforme ALTIORA CONNECT",
    slug: "lancement-de-la-plateforme-altiora-connect",
    summary: "Découvrez notre nouvelle offre de transformation numérique.",
    publishedAt: "2026-08-01",
  },
  {
    id: "2",
    title: "Nouvelles sessions de formation 2026",
    slug: "nouvelles-sessions-de-formation-2026",
    summary: "Inscrivez-vous dès maintenant aux prochaines sessions de formation.",
    publishedAt: "2026-08-05",
  },
];
