"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function QuickContact() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    try {
      const res = await fetch("/api/quick-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSuccess(true);
        setFormData({ name: "", phone: "", service: "", message: "" });
      }
    } catch (err) {
      console.error("Mesaj gönderilemedi:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Sabit Buton */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-3 rounded-full shadow-lg transition z-50"
      >
        Hızlı Talep Oluştur
      </button>

      {/* Popup */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-semibold text-center mb-4 text-blue-600">
              Hızlı Talep Formu
            </h3>

            {success ? (
              <p className="text-green-600 text-center font-medium text-green-800">
                Talebiniz başarıyla gönderildi! 🎉
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ad Soyad"
                  required
                  className="w-full p-2 border rounded-lg text-black"
                />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Telefon Numarası"
                  required
                  className="w-full p-2 border rounded-lg text-black"
                />
                <input
                  type="text"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  placeholder="Hizmet Türü (örneğin: Kombi Bakımı)"
                  className="w-full p-2 border rounded-lg text-black"
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Mesajınız"
                  className="w-full p-2 border rounded-lg text-black"
                  rows={3}
                ></textarea>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
                >
                  {loading ? "Gönderiliyor..." : "Gönder"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
