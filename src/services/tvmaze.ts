import axios from "axios";
import type { CategoryKey, ContentItem } from "@/types/content";

const TVMAZE_BASE_URL =
  process.env.NEXT_PUBLIC_TVMAZE_BASE_URL ?? "https://api.tvmaze.com";

type TvMazeShow = {
  id: number;
  name?: string;
  summary?: string;
  image?: {
    medium?: string;
    original?: string;
  };
  genres?: string[];
  url?: string;
  rating?: {
    average?: number;
  };
};

export async function fetchShows(
  categories: CategoryKey[] = ["entertainment"],
): Promise<ContentItem[]> {
  const { data } = await axios.get<TvMazeShow[]>(`${TVMAZE_BASE_URL}/shows`);
  const categoryWords = categories.map((category) => category.toLowerCase());

  return data
    .filter((show) => {
      if (!categoryWords.length) {
        return true;
      }

      const haystack = `${show.name ?? ""} ${(show.genres ?? []).join(" ")}`.toLowerCase();
      return (
        categoryWords.includes("entertainment") ||
        categoryWords.some((category) => haystack.includes(category))
      );
    })
    .slice(0, 24)
    .map((show) => ({
      id: `tv-${show.id}`,
      type: "tv",
      title: show.name ?? "Untitled show",
      description:
        show.summary?.replace(/<[^>]*>/g, "") ??
        "A curated show recommendation from TVMaze.",
      image: show.image?.original ?? show.image?.medium,
      category: show.genres?.[0] ?? "Entertainment",
      source: show.rating?.average
        ? `TVMaze • ${show.rating.average}/10`
        : "TVMaze",
      url: show.url,
      tags: show.genres,
    }));
}
