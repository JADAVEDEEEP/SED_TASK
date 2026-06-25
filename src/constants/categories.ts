import type { CategoryKey } from "@/types/content";

export const CATEGORIES: { key: CategoryKey; label: string }[] = [
  { key: "technology", label: "Technology" },
  { key: "sports", label: "Sports" },
  { key: "finance", label: "Finance" },
  { key: "entertainment", label: "Entertainment" },
  { key: "health", label: "Health" },
  { key: "science", label: "Science" },
];

export const DEFAULT_CATEGORIES: CategoryKey[] = [
  "technology",
  "sports",
  "entertainment",
];
