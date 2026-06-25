import axios from "axios";
import type { CategoryKey, ContentItem } from "@/types/content";

const MEDIASTACK_BASE_URL =
  process.env.NEXT_PUBLIC_MEDIASTACK_BASE_URL ?? "https://api.mediastack.com/v1";

const MEDIASTACK_API_KEY = process.env.NEXT_PUBLIC_MEDIASTACK_API_KEY;

type MediastackArticle = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  source?: string;
  category?: string;
  published_at?: string;
};

type MediastackResponse = {
  data?: MediastackArticle[];
};

export async function fetchNews(
  categories: CategoryKey[] = ["sports"],
): Promise<ContentItem[]> {
  const keywords = categories.join(",");
  const { data } = await axios.get<MediastackResponse>(
    `${MEDIASTACK_BASE_URL}/news`,
    {
      params: {
        access_key: MEDIASTACK_API_KEY,
        keywords,
        countries: "us,gb,de",
        limit: 20,
      },
    },
  );

  return (data.data ?? []).map((article, index) => ({
    id: `news-${article.url ?? index}`,
    type: "news",
    title: article.title ?? "Untitled news story",
    description: article.description ?? "No description available.",
    image: article.image,
    category: article.category ?? categories[0] ?? "news",
    source: article.source ?? "Mediastack",
    url: article.url,
    publishedAt: article.published_at,
    tags: categories,
  }));
}
