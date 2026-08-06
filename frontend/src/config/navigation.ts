export interface NavItem {
  title: string;
  href: string;
  icon?: string;
}

export const publicNavigation: NavItem[] = [
  { title: "Accueil", href: "/" },
  { title: "À propos", href: "/a-propos" },
  { title: "Expertises", href: "/expertises" },
  { title: "Formations", href: "/formations" },
  { title: "Actualités", href: "/actualites" },
  { title: "Contact", href: "/contact" },
];

export const adminNavigation: NavItem[] = [
  { title: "Vue d'ensemble", href: "/admin" },
  { title: "Contenus", href: "/admin/contenus" },
  { title: "Formations", href: "/admin/formations" },
  { title: "Actualités", href: "/admin/actualites" },
  { title: "Contacts", href: "/admin/contacts" },
  { title: "Utilisateurs", href: "/admin/utilisateurs" },
  { title: "Conversations", href: "/admin/conversations" },
  { title: "Documents BD", href: "/admin/base-connaissances/documents" },
  { title: "Chunks BD", href: "/admin/base-connaissances/chunks" },
  { title: "QR Codes", href: "/admin/qrcodes" },
];
