"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useAdminLayout } from "@/hooks/useAdminLayout";
import { LogoutModal } from "@/components/layout/LogoutModal";
import {
  Menu,
  Bell,
  MessageSquareMore,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  LogOut,
  Settings,
} from "lucide-react";

// Titre contextuel en fonction de la route active
function getPageTitle(pathname: string): string {
  if (pathname === "/admin") return "Tableau de bord";
  if (pathname.startsWith("/admin/contenus")) return "Contenus";
  if (pathname.startsWith("/admin/expertises")) return "Expertises";
  if (pathname.startsWith("/admin/formations")) return "Formations";
  if (pathname.startsWith("/admin/actualites")) return "Actualités";
  if (pathname.startsWith("/admin/contacts")) return "Contacts";
  if (pathname.startsWith("/admin/qrcodes")) return "QR Codes";
  if (pathname.startsWith("/admin/conversations")) return "Conversation";
  if (pathname.startsWith("/admin/base-connaissances")) return "Base de connaissances";
  if (pathname.startsWith("/admin/utilisateurs")) return "Utilisateurs";
  if (pathname.startsWith("/admin/parametres")) return "Paramètres";
  return "Tableau de bord";
}

export function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const { toggleMobile } = useAdminLayout();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const pageTitle = getPageTitle(pathname);

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

  return (
    <>
      <header className="h-16 sm:h-20 px-4 sm:px-8 flex items-center justify-between bg-transparent">
        {/* 1. Bouton Burger Mobile + Titre contextuel */}
        <div className="flex items-center gap-3">
          {/* Bouton Hamburger en responsive  */}
          <button
            type="button"
            onClick={toggleMobile}
            aria-label="Ouvrir le menu de navigation"
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-slate-200/90 text-slate-700 hover:text-[#0B1F4D] hover:bg-slate-50 transition-colors cursor-pointer focus:outline-none"
          >
            <Menu className="w-5 h-5" />
          </button>

          <span className="text-sm md:text-base font-semibold text-slate-800 tracking-tight">
            {pageTitle}
          </span>
        </div>

        {/* 2. Actions rapides & Profil Admin */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Bouton Notification */}
          <button
            type="button"
            aria-label="Notifications"
            className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-white border border-slate-200/90 flex items-center justify-center text-slate-700 hover:text-[#0B1F4D] hover:bg-slate-50 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0B1F4D]/10"
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Bouton Messages */}
          <button
            type="button"
            aria-label="Messages"
            className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-white border border-slate-200/90 flex items-center justify-center text-slate-700 hover:text-[#0B1F4D] hover:bg-slate-50 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0B1F4D]/10"
          >
            <MessageSquareMore className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Séparateur Vertical */}
          <div className="h-6 sm:h-8 w-px bg-slate-300 mx-1 sm:mx-1.5" />

          {/* Bloc Profil Admin avec Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setProfileDropdownOpen((prev) => !prev)}
              aria-expanded={profileDropdownOpen}
              className="flex items-center gap-2 sm:gap-3 px-1.5 sm:px-2 py-1.5 rounded-xl hover:bg-white/60 transition-colors cursor-pointer focus:outline-none"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-slate-200/90 bg-slate-100 shrink-0 relative">
                <Image
                  src="/images/directeur.webp"
                  alt="Avatar Admin"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-sm font-bold text-slate-900 leading-tight">
                  {user?.firstName || "Admin"}
                </span>
                <span className="text-xs text-slate-500 leading-tight">
                  {user?.email || "admin@gmail.com"}
                </span>
              </div>
              {profileDropdownOpen ? (
                <ChevronUp className="w-4 h-4 text-slate-500 ml-0.5 sm:ml-1 shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-500 ml-0.5 sm:ml-1 shrink-0" />
              )}
            </button>

            {/* Menu Déroulant du Profil */}
            {profileDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl bg-white border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-2.5 border-b border-slate-100 mb-1">
                  <p className="text-sm font-bold text-slate-900">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-slate-500 truncate">
                    {user?.email || "admin@gmail.com"}
                  </p>
                </div>

                <Link
                  href="/"
                  target="_blank"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                  <span>Voir le site public</span>
                </Link>

                <Link
                  href="/admin/parametres"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                >
                  <Settings className="w-4 h-4 text-slate-400" />
                  <span>Paramètres</span>
                </Link>

                <div className="border-t border-slate-100 my-1" />

                <button
                  type="button"
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    setLogoutModalOpen(true);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-red-500" />
                  <span>Déconnexion</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Modale de confirmation de déconnexion */}
      <LogoutModal
        isOpen={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </>
  );
}
