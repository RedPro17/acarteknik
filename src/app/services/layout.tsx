// src/app/services/layout.tsx
import { ReactNode } from "react";

export const metadata = {
  title: "Hizmetlerimiz - AÇAR TEKNİK",
  description:
    "Kombi bakımı, iklimlendirme ve petek temizliği hizmetlerimiz hakkında detaylı bilgi alın.",
  openGraph: {
    title: "Hizmetlerimiz - AÇAR TEKNİK",
    description:
      "Kombi bakımı, iklimlendirme ve petek temizliği hizmetlerimiz hakkında detaylı bilgi alın.",
    images: ["/logo.png"],
    url: "https://www.siteniz.com/services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hizmetlerimiz - AÇAR TEKNİK",
    description:
      "Kombi bakımı, iklimlendirme ve petek temizliği hizmetlerimiz hakkında detaylı bilgi alın.",
    images: ["/logo.png"],
  },
};

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
