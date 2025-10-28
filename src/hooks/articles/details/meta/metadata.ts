import { Metadata } from "next";

const API_URL = `${process.env.NEXT_PUBLIC_API}/articles`;

export async function getArticle(slug: string): Promise<Article | null> {
  try {
    const response = await fetch(`${API_URL}/${slug}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    const article = await response.json();
    return article;
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const article = await getArticle(resolvedParams.slug);
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

    if (!article) {
      return {
        title: "Article Not Found",
        description: "The requested article could not be found.",
        openGraph: {
          title: "Article Not Found",
          description: "The requested article could not be found.",
          images: [],
        },
      };
    }

    const imageUrl = article.thumbnail;
    const fullImageUrl = imageUrl.startsWith("http")
      ? imageUrl
      : `${BASE_URL}${imageUrl}`;

    return {
      title: `${article.title} | Articles`,
      description: article.description,
      openGraph: {
        title: `${article.title} | Articles`,
        description: article.description,
        type: "article",
        url: `${BASE_URL}/articles/${article.slug}`,
        images: [
          {
            url: fullImageUrl,
            width: 1200,
            height: 630,
            alt: article.title,
          },
        ],
        siteName: "Rizki Ramadhan",
        locale: "id_ID",
      },
      twitter: {
        card: "summary_large_image",
        title: `${article.title} | Articles`,
        description: article.description,
        images: [fullImageUrl],
        creator: "@codingwithrizki",
        site: "@codingwithrizki",
      },
      alternates: {
        canonical: `${BASE_URL}/articles/${article.slug}`,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Article Not Found",
      description: "The requested article could not be found.",
      openGraph: {
        title: "Article Not Found",
        description: "The requested article could not be found.",
        images: [],
      },
    };
  }
}
