export type ContentType = "news" | "tv" | "social";

export type ContentItem = {
  id: string;
  type: ContentType;
  title: string;
  description: string;
  image?: string;
  category: string;
  source: string;
  url?: string;
  publishedAt?: string;
  tags?: string[];
};

export type AsyncStatus = "idle" | "loading" | "succeeded" | "failed";

export type CategoryKey =
  | "technology"
  | "sports"
  | "finance"
  | "entertainment"
  | "health"
  | "science";
