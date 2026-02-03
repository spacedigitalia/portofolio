import { Metadata } from "next";

import baseMetadata from "@/base/meta/Metadata";

export async function generateMetadata(): Promise<Metadata> {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

  const pageTitle = "About | Rizki Ramadhan";
  const pageDescription =
    "Pelajari lebih lanjut tentang saya, keterampilan teknis, pencapaian, dan pengalaman sebagai Full Stack Developer dari Indonesia.";

  return {
    ...baseMetadata,
    title: pageTitle,
    description: pageDescription,
    keywords: [
      ...(baseMetadata.keywords || []),
      "About Rizki Ramadhan",
      "Full Stack Developer Profile",
      "Developer Skills",
      "Portfolio About",
      "Tech Skills",
      "Developer Experience",
      "Indonesia Developer",
    ],
    openGraph: {
      ...baseMetadata.openGraph,
      title: pageTitle,
      description: pageDescription,
      url: `${BASE_URL}/about`,
      type: "profile",
    },
    twitter: {
      ...baseMetadata.twitter,
      title: pageTitle,
      description: pageDescription,
    },
    alternates: {
      ...baseMetadata.alternates,
      canonical: `${BASE_URL}/about`,
      languages: {
        "id-ID": `${BASE_URL}/about`,
        "en-US": `${BASE_URL}/en/about`,
      },
    },
  };
}
