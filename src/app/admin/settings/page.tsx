"use client";

import React, { useEffect, useState, ChangeEvent } from "react";


const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

type Theme = "light" | "dark";
type ToastType = "success" | "error";

interface Toast {
  message: string;
  type: ToastType;
}

interface Settings {
  siteName: string;
  logoUrl: string;
  contactEmail: string;
  phone: string;
  address: string;
  metaTitle: string;
  metaDescription: string;
  adminName: string;
  adminEmail: string;
  theme: Theme;
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPass: string;
  sessionTimeoutMinutes: number;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"general" | "admin" | "mail" | "theme" | "security">("general");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);

  const [settings, setSettings] = useState<Settings>({
    siteName: "",
    logoUrl: "",
    contactEmail: "",
    phone: "",
    address: "",
    metaTitle: "",
    metaDescription: "",
    adminName: "",
    adminEmail: "",
    theme: "light",
    smtpHost: "",
    smtpPort: 587,
    smtpUser: "",
    smtpPass: "",
    sessionTimeoutMinutes: 60,
  });

  // 🔹 Ayarları getir
  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/api/settings`);
        if (!res.ok) throw new Error("Ayarlar alınamadı");
        const data: Partial<Settings> = await res.json();
        setSettings((s) => ({ ...s, ...data }));
      } catch (err) {
        console.error(err);
        showToast("Ayarlar yüklenirken hata oluştu", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  // 🔹 Toast göster
  const showToast = (message: string, type: ToastType = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // 🔹 Input değişikliklerini yönet
  const handleChange = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings((s) => ({ ...s, [key]: value }));
  };

  // 🔹 Kaydet
  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/settings`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Kaydedilemedi");
      }
      showToast("Ayarlar başarıyla kaydedildi", "success");
    } catch (err) {
      console.error(err);
      showToast("Sunucu hatası", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-black">Ayarlar</h2>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? "Kaydediliyor..." : "Tüm Ayarları Kaydet"}
          </button>
          <button
            onClick={() => window.location.href = '/admin'}
            className="ml-4 px-4 py-2 bg-gray-300 text-black rounded-md shadow hover:bg-gray-400">Anasayfaya Dön</button>
        </div>

        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            {/* 🔹 Sekme Menüsü */}
            <div className="w-full md:w-64">
              <nav className="space-y-2">
                <TabButton label="Genel" active={activeTab === "general"} onClick={() => setActiveTab("general")} />
                <TabButton label="Admin" active={activeTab === "admin"} onClick={() => setActiveTab("admin")} />
                <TabButton label="E-posta" active={activeTab === "mail"} onClick={() => setActiveTab("mail")} />
                <TabButton label="Tema" active={activeTab === "theme"} onClick={() => setActiveTab("theme")} />
                <TabButton label="Güvenlik" active={activeTab === "security"} onClick={() => setActiveTab("security")} />
              </nav>
            </div>

            {/* 🔹 Sekme İçeriği */}
            <div className="flex-1">
              {loading ? (
                <p>Yükleniyor...</p>
              ) : (
                <div className="space-y-6 text-black">
                  {/* Genel Ayarlar */}
                  {activeTab === "general" && (
                    <Section title="Genel Ayarlar">
                      <Input label="Site Adı" value={settings.siteName} onChange={(v) => handleChange("siteName", v)} />
                      <Input label="Meta Başlık" value={settings.metaTitle} onChange={(v) => handleChange("metaTitle", v)} />
                      <Input label="İletişim E-posta" value={settings.contactEmail} onChange={(v) => handleChange("contactEmail", v)} />
                      <Input label="Telefon" value={settings.phone} onChange={(v) => handleChange("phone", v)} />
                      <Input label="Adres" value={settings.address} onChange={(v) => handleChange("address", v)} />
                      <Input label="Logo URL" value={settings.logoUrl} onChange={(v) => handleChange("logoUrl", v)} />
                      <Textarea label="Meta Açıklama" value={settings.metaDescription} onChange={(v) => handleChange("metaDescription", v)} />
                    </Section>
                  )}

                  {/* Admin Ayarları */}
                  {activeTab === "admin" && (
                    <Section title="Admin Bilgileri">
                      <Input label="Admin İsim" value={settings.adminName} onChange={(v) => handleChange("adminName", v)} />
                      <Input label="Admin E-posta" value={settings.adminEmail} onChange={(v) => handleChange("adminEmail", v)} />
                      <PasswordChange />
                    </Section>
                  )}

                  {/* Mail Ayarları */}
                  {activeTab === "mail" && (
                    <Section title="E-posta / SMTP Ayarları">
                      <Input label="SMTP Host" value={settings.smtpHost} onChange={(v) => handleChange("smtpHost", v)} />
                      <Input
                        label="SMTP Port"
                        type="number"
                        value={String(settings.smtpPort)}
                        onChange={(v) => handleChange("smtpPort", Number(v))}
                      />
                      <Input label="SMTP Kullanıcı" value={settings.smtpUser} onChange={(v) => handleChange("smtpUser", v)} />
                      <Input label="SMTP Şifre" value={settings.smtpPass} onChange={(v) => handleChange("smtpPass", v)} />
                      <p className="text-sm text-gray-600 mt-2">
                        Not: Gmail kullanıyorsanız uygulama şifresi oluşturmanız gerekir.
                      </p>
                    </Section>
                  )}

                  {/* Tema Ayarları */}
                  {activeTab === "theme" && (
                    <Section title="Tema & Görünüm">
                      <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="theme"
                            checked={settings.theme === "light"}
                            onChange={() => handleChange("theme", "light")}
                          />
                          Açık Tema
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="theme"
                            checked={settings.theme === "dark"}
                            onChange={() => handleChange("theme", "dark")}
                          />
                          Koyu Tema
                        </label>
                        <Input label="Ana Renk (hex)" value="#d00000" onChange={() => {}} />
                      </div>
                    </Section>
                  )}

                  {/* Güvenlik Ayarları */}
                  {activeTab === "security" && (
                    <Section title="Güvenlik">
                      <Input
                        label="Oturum Süresi (dk)"
                        type="number"
                        value={String(settings.sessionTimeoutMinutes)}
                        onChange={(v) => handleChange("sessionTimeoutMinutes", Number(v))}
                      />
                      <label className="flex items-center gap-3">
                        <input type="checkbox" />
                        <span>İki Aşamalı Doğrulama (2FA)</span>
                      </label>
                    </Section>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Toast Bildirimi */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 p-4 rounded shadow-lg ${
            toast.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Yardımcı Bileşenler                           */
/* -------------------------------------------------------------------------- */

function TabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-2 rounded ${
        active ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50"
      }`}
    >
      {label}
    </button>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1 text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

function Textarea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1 text-gray-700">{label}</label>
      <textarea
        value={value}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
        rows={4}
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

function PasswordChange() {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [saving, setSaving] = useState(false);

  const handleChangePass = async () => {
    if (!oldPass || !newPass) return alert("Eski ve yeni şifre gerekli");
    if (newPass !== confirmPass) return alert("Yeni şifreler eşleşmiyor");

    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/admin/change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldPass, newPass }),
      });
      if (!res.ok) throw new Error("Şifre değiştirilemedi");
      alert("Şifre başarıyla değiştirildi");
      setOldPass("");
      setNewPass("");
      setConfirmPass("");
    } catch (err) {
      console.error(err);
      alert("Şifre değiştirilemedi");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="col-span-1 md:col-span-2">
      <label className="block text-sm font-medium mb-1 text-gray-700">Şifre Değiştir</label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <input
          placeholder="Eski Şifre"
          value={oldPass}
          onChange={(e) => setOldPass(e.target.value)}
          type="password"
          className="border rounded px-3 py-2"
        />
        <input
          placeholder="Yeni Şifre"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
          type="password"
          className="border rounded px-3 py-2"
        />
        <input
          placeholder="Yeni Şifre (Tekrar)"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
          type="password"
          className="border rounded px-3 py-2"
        />
      </div>
      <div className="mt-2">
        <button
          onClick={handleChangePass}
          disabled={saving}
          className="px-3 py-2 bg-yellow-500 rounded text-white"
        >
          {saving ? "Kaydediliyor..." : "Şifreyi Güncelle"}
        </button>
      </div>
    </div>
  );
}
