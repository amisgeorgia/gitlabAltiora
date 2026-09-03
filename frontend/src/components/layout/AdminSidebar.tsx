"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useAdminLayout } from "@/hooks/useAdminLayout";
import { LogoutModal } from "@/components/layout/LogoutModal";
import {
  LayoutDashboard,
  FileText,
  GraduationCap,
  MonitorPlay,
  Newspaper,
  Phone,
  QrCode,
  MessageSquare,
  Database,
  CircleUser,
  Settings,
  LogOut,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  X,
} from "lucide-react";
import { adminNavigation } from "@/config/navigation";

// Mapping des icônes pour les entrées de navigation
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  FileText,
  GraduationCap,
  MonitorPlay,
  Newspaper,
  Phone,
  QrCode,
  MessageSquare,
  Database,
  CircleUser,
};

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const { isMobileOpen, setIsMobileOpen, isCollapsed, toggleCollapsed } = useAdminLayout();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fermer le dropdown en cas de clic extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleConfirmLogout = () => {
    setLogoutModalOpen(false);
    logout();
    router.push("/connexion");
  };

  const isItemActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. SIDEBAR DESKTOP & TABLETTE (Permanent, collapsible)                     */}
      {/* ========================================================================= */}
      <aside
        className={`hidden md:flex relative bg-[#06132F] text-slate-100 flex-col shrink-0 h-screen border-r border-white/5 select-none transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-20" : "w-64 md:w-70"
        }`}
      >
        {/* Bouton Toggle Flèche pour plier/déplier la Sidebar */}
        <button
          type="button"
          onClick={toggleCollapsed}
          aria-label={isCollapsed ? "Déplier la barre latérale" : "Plier la barre latérale"}
          className="absolute -right-3.5 top-17 z-40 w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:text-slate-950 hover:scale-105 transition-all cursor-pointer focus:outline-none"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-slate-800" strokeWidth={2.5} />
          ) : (
            <ChevronLeft className="w-4 h-4 text-slate-800" strokeWidth={2.5} />
          )}
        </button>

        {/* Logo & Identité ALTIORA */}
        <div
          className={`h-20 flex items-center ${
            isCollapsed ? "justify-center px-2" : "px-6 gap-3.5"
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-1.5 shrink-0">
            <Image
              src="/images/logo.png"
              alt="Logo ALTIORA"
              width={32}
              height={32}
              className="object-contain"
              priority
            />
          </div>
          {!isCollapsed && (
            <Link href="/admin" className="flex items-center gap-1.5 focus:outline-none truncate">
              <span className="text-xl font-bold tracking-tight">
                <span className="text-[#D4AF37]">Altiora</span>{" "}
                <span className="text-white">Prest</span>
              </span>
            </Link>
          )}
        </div>

        {/* Premier Séparateur */}
        <div className="border-b border-white/10" />

        {/* Navigation Principale */}
        <nav className={`flex-1 py-4 space-y-1 overflow-y-auto ${isCollapsed ? "px-2" : "px-3.5"}`}>
          {adminNavigation.map((item) => {
            const active = isItemActive(item.href);
            const IconComponent = (item.icon && ICON_MAP[item.icon]) || LayoutDashboard;

            return (
              <Link
                key={item.title}
                href={item.href}
                title={isCollapsed ? item.title : undefined}
                className={`group flex items-center rounded-lg text-sm font-medium transition-colors ${
                  isCollapsed
                    ? "justify-center p-3"
                    : "gap-3.5 px-3.5 py-2.5"
                } ${
                  active
                    ? "bg-[#13285c] text-white"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <IconComponent
                  className={`w-5 h-5 shrink-0 transition-colors ${
                    active ? "text-[#D4AF37]" : "text-slate-400 group-hover:text-slate-200"
                  }`}
                />
                {!isCollapsed && <span className="truncate">{item.title}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Deuxième Séparateur */}
        <div className="border-t border-white/10" />

        {/* Zone Inférieure : Paramètres + Profil + Déconnexion */}
        <div className={`p-3.5 space-y-3 ${isCollapsed ? "px-2" : "px-3.5"}`} ref={dropdownRef}>
          {/* Paramètres */}
          <Link
            href="/admin/parametres"
            title={isCollapsed ? "Paramètres" : undefined}
            className={`group flex items-center rounded-lg text-sm font-medium transition-colors ${
              isCollapsed
                ? "justify-center p-3"
                : "gap-3.5 px-3.5 py-2"
            } ${
              pathname.startsWith("/admin/parametres")
                ? "bg-[#13285c] text-white"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <Settings
              className={`w-5 h-5 shrink-0 transition-colors ${
                pathname.startsWith("/admin/parametres")
                  ? "text-[#D4AF37]"
                  : "text-slate-400 group-hover:text-slate-200"
              }`}
            />
            {!isCollapsed && <span>Paramètres</span>}
          </Link>

          {/* Profil Administrateur */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setProfileDropdownOpen((prev) => !prev)}
              title={isCollapsed ? (user?.email || "Admin") : undefined}
              className={`w-full flex items-center rounded-lg hover:bg-white/5 transition-colors cursor-pointer text-left focus:outline-none ${
                isCollapsed ? "justify-center p-2" : "justify-between p-2"
              }`}
              aria-expanded={profileDropdownOpen}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full border border-white/20 overflow-hidden bg-slate-800 shrink-0 flex items-center justify-center relative">
                  <Image
                    src="/images/directeur.webp"
                    alt="Avatar Admin"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                {!isCollapsed && (
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white tracking-wider uppercase truncate">
                      {user?.role ? user.role.toUpperCase() : "ADMIN"}
                    </p>
                    <p className="text-[11px] text-slate-300 truncate">
                      {user?.email || "admin@gmail.com"}
                    </p>
                  </div>
                )}
              </div>
              {!isCollapsed &&
                (profileDropdownOpen ? (
                  <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                ))}
            </button>

            {/* Menu déroulant du profil dans la Sidebar */}
            {profileDropdownOpen && (
              <div
                className={`absolute bottom-full mb-2 rounded-xl bg-[#091B42] border border-white/10 p-1.5 z-50 animate-in fade-in slide-in-from-bottom-2 duration-150 ${
                  isCollapsed ? "left-full ml-2 w-48" : "left-0 right-0"
                }`}
              >
                <Link
                  href="/"
                  target="_blank"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  <span>Voir le site public</span>
                </Link>
              </div>
            )}
          </div>

          {/* Bouton Déconnexion */}
          <button
            type="button"
            onClick={() => setLogoutModalOpen(true)}
            title={isCollapsed ? "Déconnexion" : undefined}
            className={`bg-[#D4AF37] hover:bg-[#C5A028] active:bg-[#B88A1A] text-white font-semibold transition-colors cursor-pointer flex items-center justify-center ${
              isCollapsed
                ? "w-12 h-12 rounded-xl mx-auto"
                : "w-full text-sm py-2.5 px-4 rounded-lg gap-2.5"
            }`}
          >
            <LogOut className="w-5 h-5 text-white shrink-0" />
            {!isCollapsed && <span>Déconnexion</span>}
          </button>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 2. TIROIR MOBILE SMARTPHONE (Slide-over drawer avec animation fluide)     */}
      {/* ========================================================================= */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ease-in-out ${
          isMobileOpen
            ? "opacity-100 pointer-events-auto visible"
            : "opacity-0 pointer-events-none invisible"
        }`}
      >
        {/* Backdrop sombre semi-transparent avec transition douce */}
        <div
          className={`fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300 ease-in-out ${
            isMobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />

        {/* Tiroir coulissant avec transition translate fluide */}
        <div
          className={`fixed inset-y-0 left-0 w-72 max-w-[80vw] bg-[#06132F] text-slate-100 flex flex-col h-full z-10 transform transition-transform duration-300 ease-out ${
            isMobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Header du tiroir avec Logo et bouton fermeture */}
          <div className="h-20 px-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-1.5 shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Logo ALTIORA"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <span className="text-lg font-bold tracking-tight">
                <span className="text-[#D4AF37]">Altiora</span>{" "}
                <span className="text-white">Prest</span>
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsMobileOpen(false)}
              aria-label="Fermer le menu"
              className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Séparateur */}
          <div className="border-b border-white/10" />

          {/* Liens de navigation */}
          <nav className="flex-1 py-4 px-3.5 space-y-1 overflow-y-auto">
            {adminNavigation.map((item) => {
              const active = isItemActive(item.href);
              const IconComponent = (item.icon && ICON_MAP[item.icon]) || LayoutDashboard;

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`group flex items-center gap-3.5 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? "bg-[#13285c] text-white"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <IconComponent
                    className={`w-5 h-5 shrink-0 transition-colors ${
                      active ? "text-[#D4AF37]" : "text-slate-400 group-hover:text-slate-200"
                    }`}
                  />
                  <span className="truncate">{item.title}</span>
                </Link>
              );
            })}
          </nav>

          {/* Séparateur */}
          <div className="border-t border-white/10" />

          {/* Zone inférieure mobile */}
          <div className="p-3.5 space-y-3">
            <Link
              href="/admin/parametres"
              onClick={() => setIsMobileOpen(false)}
              className={`group flex items-center gap-3.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname.startsWith("/admin/parametres")
                  ? "bg-[#13285c] text-white"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <Settings
                className={`w-5 h-5 shrink-0 transition-colors ${
                  pathname.startsWith("/admin/parametres")
                    ? "text-[#D4AF37]"
                    : "text-slate-400 group-hover:text-slate-200"
                }`}
              />
              <span>Paramètres</span>
            </Link>

            {/* Profil dans mobile */}
            <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
              <div className="w-10 h-10 rounded-full border border-white/20 overflow-hidden bg-slate-800 shrink-0 flex items-center justify-center relative">
                <Image
                  src="/images/directeur.webp"
                  alt="Avatar Admin"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white tracking-wider uppercase truncate">
                  {user?.role ? user.role.toUpperCase() : "ADMIN"}
                </p>
                <p className="text-[11px] text-slate-300 truncate">
                  {user?.email || "admin@gmail.com"}
                </p>
              </div>
            </div>

            {/* Déconnexion */}
            <button
              type="button"
              onClick={() => {
                setIsMobileOpen(false);
                setLogoutModalOpen(true);
              }}
              className="w-full bg-[#D4AF37] hover:bg-[#C5A028] active:bg-[#B88A1A] text-white font-semibold text-sm py-2.5 px-4 rounded-lg flex items-center justify-center gap-2.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-white shrink-0" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modale de confirmation de déconnexion */}
      <LogoutModal
        isOpen={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </>
  );
}
