import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";


export const metadata = {
  title: "AÇAR TEKNİK - Kombi Bakımı, İklimlendirme ve Petek Temizliği",
  description: "Profesyonel kombi bakımı, iklimlendirme ve petek temizliği hizmetleri. Güvenilir ve hızlı servis.",
  openGraph: {
    title: "AÇAR TEKNİK - Kombi & İklimlendirme",
    description: "Profesyonel kombi bakımı, iklimlendirme ve petek temizliği hizmetleri.",
    url: "https://www.siteniz.com/",
    images: ["/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AÇAR TEKNİK - Kombi & İklimlendirme",
    description: "Profesyonel kombi bakımı, iklimlendirme ve petek temizliği hizmetleri.",
    images: ["/logo.png"],
  },
};
export default function Home() {
  return (
    <>
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-blue-500 to-red-500 text-white py-24 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
            Kombi Bakımı, İklimlendirme ve Petek Temizliği
          </h1>
          <p className="text-lg md:text-2xl font-light mb-8 text-gray-100">
            Eviniz her mevsim konforlu olsun — uzman kadromuzla hizmetinizdeyiz.
          </p>
          <Link
            href="/contact"
            className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-2xl shadow-lg hover:scale-105 hover:bg-gray-100 transition-transform"
          >
            Hemen İletişime Geç
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6 bg-gray-50 flex-grow">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Hizmetlerimiz
        </h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {/* Service Card 1 */}
          <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all">
            <div className="text-blue-600 text-6xl mb-4">🔧</div>
            <h3 className="text-2xl font-semibold mb-3 text-red-500">
              Kombi Bakımı
            </h3>
            <p className="text-gray-600 mb-6">
              Kombinizin ömrünü uzatmak ve enerji verimliliğini artırmak için düzenli bakım.
            </p>
            <Link
              href="/contact"
              className="inline-block px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
            >
              Talep Oluştur
            </Link>
          </div>

          {/* Service Card 2 */}
          <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all">
            <div className="text-red-600 text-6xl mb-4">❄️</div>
            <h3 className="text-2xl font-semibold mb-3 text-blue-500">
              İklimlendirme
            </h3>
            <p className="text-gray-600 mb-6">
              Yazın serin, kışın sıcak kalın — modern iklimlendirme çözümleriyle evinizde rahatlık.
            </p>
            <Link
              href="/contact"
              className="inline-block px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
            >
              Talep Oluştur
            </Link>
          </div>

          {/* Service Card 3 */}
          <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all">
            <div className="text-blue-600 text-6xl mb-4">🔥</div>
            <h3 className="text-2xl font-semibold mb-3 text-red-500">
              Petek Temizliği
            </h3>
            <p className="text-gray-600 mb-6">
              Daha verimli ısınma, düşük fatura ve uzun ömürlü sistemler için petek temizliği.
            </p>
            <Link
              href="/contact"
              className="inline-block px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
            >
              Talep Oluştur
            </Link>
          </div>
          {/* Servicee Card 4 */}
          <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all">
            <div className="text-blue-600 text-6xl mb-4">🚰</div>
            <h3 className="text-2xl font-semibold mb-3 text-blue-500">
              Su Tesisatı
            </h3>
            <p className="text-gray-600 mb-6">
              Ev ve iş yerlerinizde su tesisatı kurulumu, onarımı ve bakımı hizmeti veriyoruz.
            </p>
            <Link
              href="/contact"
              className="inline-block px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
            >
              Talep Oluştur
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
    </>
  );
}
