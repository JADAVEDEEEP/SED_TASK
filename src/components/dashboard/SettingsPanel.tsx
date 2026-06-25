"use client";

import { CATEGORIES } from "@/constants/categories";
import type { CategoryKey } from "@/types/content";

export function SettingsPanel({
  selectedCategories,
  onToggleCategory,
}: {
  selectedCategories: CategoryKey[];
  onToggleCategory: (category: CategoryKey) => void;
}) {
  return (
    <section className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-zinc-950 dark:text-white">
          Content preferences
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Choose categories to personalize news and recommendation fetches.
        </p>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((category) => {
          const selected = selectedCategories.includes(category.key);

          return (
            <label
              className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 text-sm font-semibold transition ${
                selected
                  ? "border-teal-600 bg-teal-50 text-teal-900 dark:border-teal-500 dark:bg-teal-950 dark:text-teal-100"
                  : "border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
              }`}
              key={category.key}
            >
              <span>{category.label}</span>
              <input
                checked={selected}
                className="h-4 w-4 accent-teal-700"
                onChange={() => onToggleCategory(category.key)}
                type="checkbox"
              />
            </label>
          );
        })}
      </div>
    </section>
  );
}
