import type { ContentItem } from "@/types/content";

export function matchesSearch(item: ContentItem, query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return true;
  }

  return [
    item.title,
    item.description,
    item.category,
    item.source,
    ...(item.tags ?? []),
  ]
    .join(" ")
    .toLowerCase()
    .includes(normalizedQuery);
}

export function moveItem<T>(items: T[], fromIndex: number, toIndex: number) {
  const nextItems = [...items];
  const [removed] = nextItems.splice(fromIndex, 1);
  nextItems.splice(toIndex, 0, removed);
  return nextItems;
}
