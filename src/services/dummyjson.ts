import axios from "axios";
import type { CategoryKey, ContentItem } from "@/types/content";

const DUMMYJSON_BASE_URL =
  process.env.NEXT_PUBLIC_DUMMYJSON_BASE_URL ?? "https://dummyjson.com";

type DummyPost = {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions?: {
    likes?: number;
  };
};

type DummyPostsResponse = {
  posts: DummyPost[];
};

export async function fetchPosts(
  categories: CategoryKey[] = ["technology"],
): Promise<ContentItem[]> {
  const { data } = await axios.get<DummyPostsResponse>(
    `${DUMMYJSON_BASE_URL}/posts`,
    {
      params: {
        limit: 30,
      },
    },
  );

  return data.posts.map((post) => ({
    id: `social-${post.id}`,
    type: "social",
    title: post.title,
    description: post.body,
    category: post.tags[0] ?? categories[0] ?? "Social",
    source: post.reactions?.likes
      ? `DummyJSON • ${post.reactions.likes} likes`
      : "DummyJSON",
    tags: post.tags,
  }));
}
