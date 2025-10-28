const API_URL = `${process.env.NEXT_PUBLIC_API}/articles`;

export const fetchArticlesHome = async (): Promise<Article[]> => {
  try {
    const response = await fetch(API_URL, {
      next: { revalidate: 10 },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch articles contents: ${response.statusText}`
      );
    }

    const data = await response.json();
    const latestThree: Article[] = [...data]
      .sort(
        (a: Article, b: Article) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
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
    const response = await fetch(API_URL, {
      next: { revalidate: 10 },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch articles contents: ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching articles contents:", error);
    throw error;
  }
};

export const fetchArticleBySlug = async (
  slug: string
): Promise<ArticleDetails> => {
  try {
    const response = await fetch(`${API_URL}/${slug}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET}`,
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Article with slug "${slug}" not found`);
      }
      throw new Error(
        `Failed to fetch article by slug: ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching article by slug:", error);
    throw error;
  }
};
