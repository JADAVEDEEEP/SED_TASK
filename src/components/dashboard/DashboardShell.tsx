"use client";

import { useEffect, useMemo, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { EmptyState } from "@/components/common/EmptyState";
import { LoadingGrid } from "@/components/common/LoadingGrid";
import { ContentCard } from "@/components/cards/ContentCard";
import { DraggableContentCard } from "@/components/cards/DraggableContentCard";
import { Header } from "@/components/layout/Header";
import { Sidebar, type SectionId } from "@/components/layout/Sidebar";
import { SectionTabs } from "@/components/dashboard/SectionTabs";
import { SettingsPanel } from "@/components/dashboard/SettingsPanel";
import { StatStrip } from "@/components/dashboard/StatStrip";
import { useDebounce } from "@/hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { toggleFavorite } from "@/redux/slices/favoritesSlice";
import {
  setActiveSection,
  setSearchQuery,
  toggleCategory,
} from "@/redux/slices/preferencesSlice";
import { loadNews } from "@/redux/slices/newsSlice";
import { loadPosts } from "@/redux/slices/socialSlice";
import { toggleTheme } from "@/redux/slices/themeSlice";
import { loadShows } from "@/redux/slices/tvSlice";
import { matchesSearch, moveItem } from "@/utils/content";
import type { ContentItem } from "@/types/content";

const PAGE_SIZE = 9;

export function DashboardShell() {
  const dispatch = useAppDispatch();
  const news = useAppSelector((state) => state.news);
  const tv = useAppSelector((state) => state.tv);
  const social = useAppSelector((state) => state.social);
  const favorites = useAppSelector((state) => state.favorites.items);
  const preferences = useAppSelector((state) => state.preferences);
  const theme = useAppSelector((state) => state.theme.mode);
  const debouncedQuery = useDebounce(preferences.searchQuery);
  const [orderedIds, setOrderedIds] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    dispatch(loadNews(preferences.categories));
    dispatch(loadShows(preferences.categories));
    dispatch(loadPosts(preferences.categories));
  }, [dispatch, preferences.categories]);

  const unifiedFeed = useMemo(
    () => [...news.items, ...tv.items, ...social.items],
    [news.items, social.items, tv.items],
  );

  const orderedFeed = useMemo(() => {
    const itemById = new Map(unifiedFeed.map((item) => [item.id, item]));
    const orderedItems = orderedIds
      .map((id) => itemById.get(id))
      .filter((item): item is ContentItem => Boolean(item));
    const missingItems = unifiedFeed.filter((item) => !orderedIds.includes(item.id));

    return [...orderedItems, ...missingItems];
  }, [orderedIds, unifiedFeed]);

  const filteredFeed = useMemo(
    () => orderedFeed.filter((item) => matchesSearch(item, debouncedQuery)),
    [debouncedQuery, orderedFeed],
  );

  const trendingItems = useMemo(
    () =>
      [...unifiedFeed]
        .sort((a, b) => (b.tags?.length ?? 0) - (a.tags?.length ?? 0))
        .slice(0, 6),
    [unifiedFeed],
  );

  const favoriteIds = useMemo(
    () => new Set(favorites.map((item) => item.id)),
    [favorites],
  );

  const isLoading =
    news.status === "loading" ||
    tv.status === "loading" ||
    social.status === "loading";

  const hasErrors = [news.error, tv.error, social.error].filter(Boolean);
  const syncStatus = isLoading
    ? "Loading"
    : hasErrors.length
      ? "Partial"
      : "Live";

  const visibleItems = filteredFeed.slice(0, visibleCount);

  function moveFeedItem(fromIndex: number, toIndex: number) {
    setOrderedIds(moveItem(filteredFeed.map((item) => item.id), fromIndex, toIndex));
  }

  function setSection(section: SectionId) {
    dispatch(setActiveSection(section));
  }

  const activeSection = preferences.activeSection as SectionId;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex min-h-screen bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
        <Sidebar activeSection={activeSection} onSectionChange={setSection} />
        <div className="flex min-w-0 flex-1 flex-col">
          <Header
            onQueryChange={(query) => dispatch(setSearchQuery(query))}
            onThemeToggle={() => dispatch(toggleTheme())}
            query={preferences.searchQuery}
            theme={theme}
          />

          <main className="flex-1 space-y-6 p-4 lg:p-6">
            <SectionTabs
              activeSection={activeSection}
              onSectionChange={setSection}
            />
            <StatStrip
              favorites={favorites.length}
              status={syncStatus}
              total={unifiedFeed.length}
              trending={trendingItems.length}
            />

            {hasErrors.length > 0 ? (
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-100">
                Some sources could not load. The dashboard will continue showing
                available content.
              </div>
            ) : null}

            {activeSection === "settings" ? (
              <SettingsPanel
                onToggleCategory={(category) => dispatch(toggleCategory(category))}
                selectedCategories={preferences.categories}
              />
            ) : null}

            {activeSection === "feed" ? (
              <section className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-bold text-zinc-950 dark:text-white">
                      Personalized feed
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Drag cards to reorder your dashboard.
                    </p>
                  </div>
                </div>
                {isLoading ? <LoadingGrid /> : null}
                {!isLoading && visibleItems.length === 0 ? (
                  <EmptyState
                    description="Try another search term or enable more categories in settings."
                    title="No matching content"
                  />
                ) : null}
                {!isLoading && visibleItems.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {visibleItems.map((item, index) => (
                      <DraggableContentCard
                        index={index}
                        isFavorite={favoriteIds.has(item.id)}
                        item={item}
                        key={item.id}
                        onFavorite={(contentItem) =>
                          dispatch(toggleFavorite(contentItem))
                        }
                        onMove={moveFeedItem}
                      />
                    ))}
                  </div>
                ) : null}
                {visibleCount < filteredFeed.length ? (
                  <button
                    className="rounded-lg bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-800"
                    onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                    type="button"
                  >
                    Load more
                  </button>
                ) : null}
              </section>
            ) : null}

            {activeSection === "trending" ? (
              <CardGrid
                emptyDescription="Trending content will appear when API data is available."
                emptyTitle="No trending items yet"
                favoriteIds={favoriteIds}
                items={trendingItems}
                onFavorite={(item) => dispatch(toggleFavorite(item))}
                title="Trending now"
              />
            ) : null}

            {activeSection === "favorites" ? (
              <CardGrid
                emptyDescription="Tap the heart on any content card to save it here."
                emptyTitle="No favorites saved"
                favoriteIds={favoriteIds}
                items={favorites.filter((item) => matchesSearch(item, debouncedQuery))}
                onFavorite={(item) => dispatch(toggleFavorite(item))}
                title="Favorite content"
              />
            ) : null}
          </main>
        </div>
      </div>
    </DndProvider>
  );
}

function CardGrid({
  title,
  items,
  favoriteIds,
  onFavorite,
  emptyTitle,
  emptyDescription,
}: {
  title: string;
  items: ContentItem[];
  favoriteIds: Set<string>;
  onFavorite: (item: ContentItem) => void;
  emptyTitle: string;
  emptyDescription: string;
}) {
  return (
    <section className="space-y-4">
      <h3 className="text-xl font-bold text-zinc-950 dark:text-white">{title}</h3>
      {items.length === 0 ? (
        <EmptyState description={emptyDescription} title={emptyTitle} />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <ContentCard
              isFavorite={favoriteIds.has(item.id)}
              item={item}
              key={item.id}
              onFavorite={onFavorite}
            />
          ))}
        </div>
      )}
    </section>
  );
}
