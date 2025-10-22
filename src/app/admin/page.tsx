"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import RequestTable from "./components/RequestTable";
import { QuickRequest } from "@/types/Request";
import { Menu } from "lucide-react";

export default function AdminPage() {
  const [requests, setRequests] = useState<QuickRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) router.push("/login");
  }, [router]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/contact");
        if (!res.ok) throw new Error(`API hatası: ${res.status}`);
        const data = await res.json();
        setRequests(data.requests || data || []);
      } catch (err) {
        console.error("API fetch hatası:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      {/* ✅ Mobil menü butonu */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-md shadow"
      >
        <Menu size={22} />
      </button>

      {/* ✅ Sidebar */}
      <Sidebar isMobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* ✅ İçerik alanı */}
      <main
        className="flex-1 p-4 md:p-6 transition-all duration-300"
        onClick={() => sidebarOpen && setSidebarOpen(false)}
      >
        <h1
          className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center md:text-left
                    pl-12 md:pl-0"
        >
        <span className="pl-12">Yönetici Paneli - Gelen Mesajlar</span> 
        </h1>

        {loading ? (
          <p className="text-center text-gray-700">Yükleniyor...</p>
        ) : requests.length === 0 ? (
          <p className="text-center text-gray-700">Henüz mesaj yok.</p>
        ) : (
          <div className="overflow-x-auto text-black">
            <RequestTable requests={requests} />
          </div>
        )}
      </main>

      {/* ✅ Mobilde arka plan overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 /40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
