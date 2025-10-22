"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Menü ikonu

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-6 py-3 sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <a href="./"><Image
            src="/logo.png"
            alt="Logo"
            width={70}
            height={70}
            className="object-contain"
          /></a>
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-bold text-blue-600 tracking-tight">
              Temiz Enerji,
            </span>
            <span className="text-lg font-bold text-red-600 tracking-tight">
              Güvenli Yaşam.
            </span>
          </div>
        </div>

        {/* Menü (masaüstü görünümü) */}
        <div className="hidden md:flex space-x-4">
          <Link
            href="/"
            className="px-4 py-2 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
          >
            Ana Sayfa
          </Link>
          <Link
            href="/services"
            className="px-4 py-2 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition"
          >
            Hizmetler
          </Link>
          <Link
            href="/about"
            className="px-4 py-2 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
          >
            Hakkımızda
          </Link>
          <Link
            href="/contact"
            className="px-4 py-2 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition"
          >
            İletişim
          </Link>
        </div>

        {/* Mobil menü butonu */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobil menü */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-3 items-center">
          <Link
            href="/"
            className="w-3/4 text-center px-4 py-2 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
          >
            Ana Sayfa
          </Link>
          <Link
            href="/services"
            className="w-3/4 text-center px-4 py-2 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition"
          >
            Hizmetler
          </Link>
          <Link
            href="/about"
            className="w-3/4 text-center px-4 py-2 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
          >
            Hakkımızda
          </Link>
          <Link
            href="/contact"
            className="w-3/4 text-center px-4 py-2 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition"
          >
            İletişim
          </Link>
        </div>
      )}
    </nav>
  );
}
