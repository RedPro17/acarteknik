"use client";

import { useState } from "react";
import { QuickRequest } from "@/types/Request";



interface Props {
  requests: QuickRequest[];
}

export default function RequestTable({ requests }: Props) {
  const [selectedRequest, setSelectedRequest] = useState<QuickRequest | null>(null);
  const [loading, setLoading] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  // ✅ Onaylama işlemi
  const handleApprove = async (id: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/contact/${id}/approve`, { method: "PUT" });
      if (res.ok) {
        alert("✅ Talep onaylandı ve e-posta gönderildi!");
        setSelectedRequest(null);
        window.location.reload();
      } else {
        const err = await res.json();
        alert("❌ Hata: " + (err.error || "Onaylama işlemi başarısız"));
      }
    } catch (err) {
      console.error(err);
      alert("❌ Sunucu hatası oluştu");
    } finally {
      setLoading(false);
    }
  };

  // ❌ Silme işlemi
  const handleDelete = async (id: string) => {
    if (!confirm("Bu talebi silmek istediğinize emin misiniz?")) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/contact/${id}`, { method: "DELETE" });
      if (res.ok) {
        alert("🗑️ Talep silindi");
        setSelectedRequest(null);
        window.location.reload();
      } else {
        const err = await res.json();
        alert("❌ Hata: " + (err.error || "Silme işlemi başarısız"));
      }
    } catch (err) {
      console.error(err);
      alert("❌ Sunucu hatası oluştu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-3 px-6 text-left">Adı</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Hizmet</th>
            <th className="py-3 px-6 text-left">Durum</th>
            <th className="py-3 px-6 text-left">Tarih</th>
            <th className="py-3 px-6 text-center">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req._id} className="border-b hover:bg-gray-100 transition">
              <td className="py-3 px-6">{req.name}</td>
              <td className="py-3 px-6">{req.email}</td>
              <td className="py-3 px-6">{req.service}</td>
              <td className="py-3 px-6">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    req.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {req.status === "approved" ? "Onaylandı" : "Bekliyor"}
                </span>
              </td>
              <td className="py-3 px-6">
                {req.createdAt
                  ? new Date(req.createdAt).toLocaleString("tr-TR")
                  : "-"}
              </td>
              <td className="py-3 px-6 text-center">
                <button
                  onClick={() => setSelectedRequest(req)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Detay
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🟦 Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <h2 className="text-xl font-bold mb-4">Talep Detayı</h2>
            <p><strong>Adı:</strong> {selectedRequest.name}</p>
            <p><strong>Email:</strong> {selectedRequest.email}</p>
            <p><strong>Telefon:</strong> {selectedRequest.phone}</p>
            <p><strong>Hizmet:</strong> {selectedRequest.service}</p>
            <p><strong>Mesaj:</strong> {selectedRequest.message}</p>
            <p className="mt-2">
              <strong>Tarih:</strong>{" "}
              {selectedRequest.createdAt
                ? new Date(selectedRequest.createdAt).toLocaleString("tr-TR")
                : "-"}
            </p>
            <p className="mt-2">
              <strong>Durum:</strong>{" "}
              {selectedRequest.status === "approved" ? "✅ Onaylandı" : "⏳ Bekliyor"}
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setSelectedRequest(null)}
                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
              >
                Kapat
              </button>
              <button
                onClick={() => handleApprove(selectedRequest._id)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
                disabled={loading || selectedRequest.status === "approved"}
              >
                Onayla
              </button>
              <button
                onClick={() => handleDelete(selectedRequest._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50"
                disabled={loading}
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
