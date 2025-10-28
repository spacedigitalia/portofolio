import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const pageTitle = "Articles | Rizki Ramadhan";
  const pageDescription =
    "Baca artikel, tutorial, dan studi kasus seputar web development, UI/UX, dan teknologi modern yang saya tulis.";
  const ogImage = `${BASE_URL}/articles.png`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [
      "Web Development Articles",
      "Next.js Tutorial",
      "React Guide",
      "UI/UX Case Study",
      "Frontend Tips",
      "Backend Best Practices",
      "SEO untuk Developer",
      "Artikel Pemrograman Indonesia",
      "Blog Teknologi",
    ],
    authors: [{ name: "Rizki Ramadhan" }],
    category: "Web Development & Digital Solutions",
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      type: "website",
      url: `${BASE_URL}/articles`,
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
      canonical: `${BASE_URL}/articles`,
      languages: {
        "id-ID": `${BASE_URL}/articles`,
        "en-US": `${BASE_URL}/en/articles`,
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
