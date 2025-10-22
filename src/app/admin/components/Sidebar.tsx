"use client";

import Link from "next/link";
import { useState } from "react";
import { Home, Settings, Globe, LogOut, Menu } from "lucide-react";

type NavItemProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
  onClick?: () => void;
  target?: string;
};

function NavItem({ href, icon, label, collapsed, onClick, target }: NavItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className="flex items-center gap-3 py-3 px-4 rounded hover:bg-blue-500 transition-all duration-200"
    >
      <span className="text-white">{icon}</span>
      {!collapsed && <span>{label}</span>}
    </Link>
  );
}

type SidebarProps = {
  isMobileOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ isMobileOpen, onClose }: SidebarProps) {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <aside
      className={`
        fixed md:static top-0 left-0 h-full z-40
        bg-blue-600 text-white flex flex-col transition-all duration-300
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        ${open ? "w-64" : "w-0 md:w-20"}
      `}
    >
      {/* Üst kısım */}
      <div className="flex justify-between items-center p-4 border-b border-blue-500">
        {open && <span className="font-bold text-lg">Admin Panel</span>}
        <button
          onClick={() => setOpen(!open)}
          className="text-white text-xl focus:outline-none md:absolute md:right-[-40px] md:top-4 bg-blue-600 p-2 rounded-r"
          aria-label="Menüyü Aç/Kapat"
        >
          {open ? "«" : <Menu size={22} />}
        </button>
      </div>

      {/* Menü öğeleri */}
      <nav className={`mt-6 flex-1 space-y-2 ${open ? "opacity-100" : "opacity-0 md:opacity-100"} transition-opacity duration-300`}>
        <NavItem href="/admin" icon={<Home size={20} />} label="Mesajlar" collapsed={!open} />
        <NavItem href="/admin/settings" icon={<Settings size={20} />} label="Ayarlar" collapsed={!open} />
        <NavItem href="/" icon={<Globe size={20} />} label="Siteye Git" collapsed={!open} target="_blank" />
        <NavItem
          href="/login"
          icon={<LogOut size={20} />}
          label="Çıkış Yap"
          collapsed={!open}
          onClick={() => localStorage.removeItem("adminToken")}
        />
      </nav>
    </aside>
  );
}
