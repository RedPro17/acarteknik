import { Mail, Phone, MapPin } from "lucide-react";
import QuickContact from "./QuickContact";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-red-500 text-white py-10 px-6 mt-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Firma Bilgisi */}
        <div>
          <h3 className="text-2xl font-bold mb-3">AÇAR TEKNİK</h3>
          <p className="text-gray-100">
            Kombi Bakımı, İklimlendirme ve Petek Temizliği alanında profesyonel hizmet.
          </p>
        </div>

        {/* İletişim Bilgileri */}
        <div className="space-y-2">
          <h4 className="text-xl font-semibold mb-2">İletişim</h4>
          <p className="flex justify-center md:justify-start items-center gap-2">
            <Phone size={18} /> <span>+90 543 155 55 30</span>
          </p>
          <p className="flex justify-center md:justify-start items-center gap-2">
            <Mail size={18} /> <span>acar.teknik.info@gmail.com</span>
          </p>
          <p className="flex justify-center md:justify-start items-center gap-2">
            <MapPin size={18} /> <span>Samsun, Türkiye</span>
          </p>
        </div>

        {/* Sosyal Medya */}
        <div>
          <h4 className="text-xl font-semibold mb-3">Bizi Takip Edin</h4>
          <div className="flex justify-center md:justify-start gap-4">
            <a
              href="instagram.com/acarteknik55"
              className="hover:text-blue-200 transition"
              aria-label="Instagram"
            >
              📷
            </a>
            <a
              href="#"
              className="hover:text-blue-200 transition"
              aria-label="Facebook"
            >
              👍
            </a>
            <a
              href="#"
              className="hover:text-blue-200 transition"
              aria-label="WhatsApp"
            >
              💬
            </a>
          </div>
        </div>
      </div>

      {/* Alt Kısım */}
      <div className="border-t border-white/20 mt-8 pt-4 text-center text-sm text-gray-200">
        © 2025 <span className="font-semibold">AÇAR TEKNİK</span> — Tüm hakları saklıdır.
      </div>
       <QuickContact />
    </footer>
  );
}
