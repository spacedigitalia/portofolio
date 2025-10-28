interface Article {
  _id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ArticlesResponse {
  articles: Article[];
  total: number;
  page: number;
  limit: number;
}

type ArticleCardProps = {
  article: Article;
  index: number;
};

type ArticlesGridProps = {
  articles: Article[];
};

//============ Article Details ============//
interface ArticleDetails {
  _id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  category: string;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  relatedArticles: RelatedArticle[];
}

interface RelatedArticle {
  _id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  thumbnail: string;
}

interface ArticleDetailsResponse {
  article: ArticleDetails;
}

interface ArticlesLayoutProps {
  productsData: ArticleDetails;
}
