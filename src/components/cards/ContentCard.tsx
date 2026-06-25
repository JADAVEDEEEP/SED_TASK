"use client";

import { motion } from "framer-motion";
import { FaHeart, FaRegHeart, FaExternalLinkAlt, FaGripVertical } from "react-icons/fa";
import { Badge } from "@/components/ui/Badge";
import type { ContentItem } from "@/types/content";

export function ContentCard({
  item,
  isFavorite,
  onFavorite,
  dragHandle,
}: {
  item: ContentItem;
  isFavorite: boolean;
  onFavorite: (item: ContentItem) => void;
  dragHandle?: React.ReactNode;
}) {
  return (
    <motion.article
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="relative h-40 bg-zinc-100 dark:bg-zinc-900">
        {item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt=""
            className="h-full w-full object-cover"
            src={item.image}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[linear-gradient(135deg,#0f766e,#334155)] text-sm font-semibold uppercase tracking-[0.18em] text-white">
            {item.type}
          </div>
        )}
        <button
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-md bg-white/95 text-rose-600 shadow-sm transition hover:scale-105 dark:bg-zinc-950/95"
          onClick={() => onFavorite(item)}
          type="button"
        >
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center justify-between gap-2">
          <Badge type={item.type}>{item.type}</Badge>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            {item.source}
          </span>
        </div>
        <h3 className="line-clamp-2 text-lg font-semibold leading-6 text-zinc-950 dark:text-zinc-50">
          {item.title}
        </h3>
        <p className="line-clamp-3 flex-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          {item.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {(item.tags ?? [item.category]).slice(0, 3).map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-zinc-100 pt-3 dark:border-zinc-900">
          {item.url ? (
            <a
              className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700 transition hover:text-teal-900 dark:text-teal-300 dark:hover:text-teal-200"
              href={item.url}
              rel="noreferrer"
              target="_blank"
            >
              {item.type === "tv" ? "View show" : "Read more"}
              <FaExternalLinkAlt className="text-xs" />
            </a>
          ) : (
            <span className="text-sm font-medium text-zinc-500">Social post</span>
          )}
          <span className="inline-flex items-center gap-2 text-xs text-zinc-400">
            {dragHandle ?? <FaGripVertical />}
          </span>
        </div>
      </div>
    </motion.article>
  );
}
