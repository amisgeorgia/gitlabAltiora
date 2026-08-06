import React from "react";
import Link from "next/link";
import { adminNavigation } from "@/config/navigation";

export function AdminSidebar() {
  return (
    <aside className="w-64 border-r border-slate-200 bg-slate-900 text-slate-100 flex flex-col min-h-screen">
      <div className="h-16 flex items-center px-6 border-b border-slate-800 font-bold text-lg">
        Admin ALTIORA
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {adminNavigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-800 transition-colors"
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
