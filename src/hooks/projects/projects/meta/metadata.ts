import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const pageTitle = "Projects | Rizki Ramadhan";
  const pageDescription =
    "Jelajahi koleksi proyek terbaik saya: website, aplikasi web, UI/UX, dan solusi digital modern yang dibangun dengan Next.js, React, dan teknologi terkini.";
  const ogImage = `${BASE_URL}/projects.png`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [
      "Portfolio Projects",
      "Web Development Projects",
      "Next.js Projects",
      "React Projects",
      "UI/UX Case Studies",
      "Frontend Developer Portfolio",
      "Full Stack Projects",
      "Rizki Ramadhan Projects",
      "Indonesia Developer Portfolio",
    ],
    authors: [{ name: "Rizki Ramadhan" }],
    category: "Web Development & Digital Solutions",
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      type: "website",
      url: `${BASE_URL}/projects`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
      siteName: "Rizki Ramadhan",
      locale: "id_ID",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [ogImage],
      creator: "@codingwithrizki",
      site: "@codingwithrizki",
    },
    alternates: {
      canonical: `${BASE_URL}/projects`,
      languages: {
        "id-ID": `${BASE_URL}/projects`,
        "en-US": `${BASE_URL}/en/projects`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
