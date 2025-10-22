// src/app/services/page.tsx
"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Services() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const services = [
    {
      id: 1,
      title: "Kombi Bakımı",
      icon: "🔧",
      description:
        "Kombinizin ömrünü uzatmak ve güvenliğini sağlamak için periyodik bakım hizmeti veriyoruz. Filtre temizliği, kontrol ve testler profesyonel ekibimiz tarafından yapılır.",
    },
    {
      id: 2,
      title: "İklimlendirme",
      icon: "❄️",
      description:
        "Ev ve iş yerleriniz için yaz/kış konforunu sağlayan iklimlendirme sistemleri kuruyor ve bakımını yapıyoruz. Klimalar ve havalandırma sistemleri uzman ekibimizle güvenle çalıştırılır.",
    },
    {
      id: 3,
      title: "Petek Temizliği",
      icon: "🔥",
      description:
        "Daha verimli ve eşit ısınma için petek temizliği hizmeti sunuyoruz. Kir ve tortular özel ekipmanlarımızla temizlenir, ısınma performansı artar.",
    },
    {
    id: 4,
      title: "Su Tesisatı",
      icon: "🚰",
      description:
        "Ev ve iş yerlerinizde su tesisatı kurulumu, onarımı ve bakımı hizmeti veriyoruz. Sızıntı tespiti, boru değişimi ve su basıncı ayarlamaları profesyonel ekibimiz tarafından yapılır.",
    },
  ];

  return (
    <div>
      <Navbar />

      <section className="py-16 px-6 bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-bold text-center mb-12 text-black">
          Hizmetlerimiz
        </h1>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl shadow p-6 text-center hover:shadow-lg transition flex flex-col justify-between text-black"
            >
              <div>
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
              </div>
              <Link
                href="/contact"
                className="mt-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition"
                onClick={() => setSelectedService(service.title)}
              >
                Talep Oluştur
              </Link>
            </div>
          ))}
        </div>

        {selectedService && (
          <p className="text-center mt-8 text-gray-700">
            Seçilen hizmet: <strong>{selectedService}</strong>
          </p>
        )}
      </section>

      <Footer />
    </div>
  );
}
