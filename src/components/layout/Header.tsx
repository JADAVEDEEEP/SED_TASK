"use client";

import { FaMoon, FaSearch, FaSun, FaUserCircle } from "react-icons/fa";

export function Header({
  query,
  theme,
  onQueryChange,
  onThemeToggle,
}: {
  query: string;
  theme: "light" | "dark";
  onQueryChange: (query: string) => void;
  onThemeToggle: () => void;
}) {
  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/90 px-4 py-4 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90 lg:px-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium text-teal-700 dark:text-teal-300">
            Personalized Content Dashboard
          </p>
          <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
            Your content command center
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <label className="relative block w-full min-w-0 md:w-80">
            <FaSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              className="h-11 w-full rounded-lg border border-zinc-200 bg-zinc-50 pl-10 pr-3 text-sm text-zinc-950 outline-none transition focus:border-teal-600 focus:bg-white dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:focus:border-teal-400"
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Search news, shows, posts"
              type="search"
              value={query}
            />
          </label>
          <button
            aria-label="Toggle dark mode"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-zinc-200 text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900"
            onClick={onThemeToggle}
            type="button"
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>
          <div className="hidden items-center gap-2 rounded-lg border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-700 dark:border-zinc-800 dark:text-zinc-200 sm:flex">
            <FaUserCircle />
            Nirav
          </div>
        </div>
      </div>
    </header>
  );
}
