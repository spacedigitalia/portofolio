import { apiFetch } from "@/lib/apiFetch";

const API_URL = `${process.env.NEXT_PUBLIC_API}/articles`;

export const fetchArticlesHome = async (): Promise<Article[]> => {
  try {
    const data = await apiFetch<Article[]>(API_URL, {
      revalidate: 3600,
      tags: ["articles"],
    });
    const latestThree: Article[] = [...data]
      .sort(
        (a: Article, b: Article) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 3);
    return latestThree;
  } catch (error) {
    console.error("Error fetching articles contents:", error);
    throw error;
  }
};

export const fetchArticlesContents = async (): Promise<Article[]> => {
  try {
    const data = await apiFetch<Article[]>(API_URL, {
      revalidate: 3600,
      tags: ["articles"],
    });
    return data;
  } catch (error) {
    console.error("Error fetching articles contents:", error);
    throw error;
  }
};

export const fetchArticleBySlug = async (
  slug: string,
): Promise<ArticleDetails> => {
  try {
    const data = await apiFetch<ArticleDetails>(`${API_URL}/${slug}`, {
      tags: ["articles"],
    });
    return data;
  } catch (error) {
    console.error("Error fetching article by slug:", error);
    throw error;
  }
};
