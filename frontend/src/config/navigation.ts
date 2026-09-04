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
  { title: "Tableau de bord", href: "/admin", icon: "LayoutDashboard" },
  { title: "Contenus", href: "/admin/contenus", icon: "FileText" },
  { title: "Expertises", href: "/admin/expertises", icon: "GraduationCap" },
  { title: "Formations", href: "/admin/formations", icon: "MonitorPlay" },
  { title: "Actualités", href: "/admin/actualites", icon: "Newspaper" },
  { title: "Contacts", href: "/admin/contacts", icon: "Phone" },
  { title: "QR Codes", href: "/admin/qrcodes", icon: "QrCode" },
  { title: "Conversation", href: "/admin/conversations", icon: "MessageSquare" },
  { title: "Base de connaissances", href: "/admin/base-connaissances/documents", icon: "Database" },
  { title: "Utilisateurs", href: "/admin/utilisateurs", icon: "CircleUser" },
];
