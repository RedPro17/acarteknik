"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import Head from "next/head"; 

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Gönderiliyor...");

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("Talebiniz başarıyla gönderildi!");
        setForm({ name: "", email: "", phone: "", service: "", message: "" });
      } else {
        const errorData = await res.json();
        console.error("Sunucu yanıtı:", errorData);
        setStatus("Bir hata oluştu. Lütfen tekrar deneyin.");
      }
    } catch (err) {
      console.error("İstek hatası:", err);
      setStatus("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <>
      <Head>
        <title>İletişim - AÇAR TEKNİK</title>
        <meta
          name="description"
          content="AÇAR TEKNİK ile iletişime geçin. Kombi bakımı, iklimlendirme ve petek temizliği taleplerinizi bize iletin."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.siteniz.com/contact" />
        <meta property="og:title" content="İletişim - AÇAR TEKNİK" />
        <meta
          property="og:description"
          content="AÇAR TEKNİK ile iletişime geçin. Kombi bakımı, iklimlendirme ve petek temizliği taleplerinizi bize iletin."
        />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:url" content="https://www.siteniz.com/contact" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="İletişim - AÇAR TEKNİK" />
        <meta
          name="twitter:description"
          content="AÇAR TEKNİK ile iletişime geçin. Kombi bakımı, iklimlendirme ve petek temizliği taleplerinizi bize iletin."
        />
        <meta name="twitter:image" content="/logo.png" />
      </Head>

      <Navbar />
      <section className="py-16 px-6 min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-center mb-12 text-black">İletişim</h1>

        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow space-y-4"
        >
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Adınız Soyadınız"
            className="w-full p-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="E-posta Adresiniz"
            className="w-full p-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Telefon Numaranız"
            className="w-full p-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Hizmet Seçiniz</option>
            <option value="Kombi Bakımı">Kombi Bakımı</option>
            <option value="İklimlendirme">İklimlendirme</option>
            <option value="Petek Temizliği">Petek Temizliği</option>
            <option value ="Su Tesisatı">Su Tesisatı</option>
          </select>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Mesajınız"
            className="w-full p-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={5}
            required
          ></textarea>

          <button
            type="submit"
            className="w-full py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition"
          >
            Talebi Gönder
          </button>

          {status && <p className="text-center mt-2 text-gray-700">{status}</p>}
        </form>
      </section>
      <Footer />
    </>
  );
}
