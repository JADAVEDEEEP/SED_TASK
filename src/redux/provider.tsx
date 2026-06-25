"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { hydrateFavorites } from "@/redux/slices/favoritesSlice";
import { hydrateCategories } from "@/redux/slices/preferencesSlice";
import { hydrateTheme } from "@/redux/slices/themeSlice";
import { loadFromStorage, saveToStorage } from "@/utils/storage";
import type { CategoryKey, ContentItem } from "@/types/content";
import { store } from "./store";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    store.dispatch(
      hydrateCategories(
        loadFromStorage<CategoryKey[]>("dashboard:categories", []),
      ),
    );
    store.dispatch(
      hydrateFavorites(
        loadFromStorage<ContentItem[]>("dashboard:favorites", []),
      ),
    );
    store.dispatch(
      hydrateTheme(loadFromStorage<"light" | "dark">("dashboard:theme", "light")),
    );

    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      saveToStorage("dashboard:categories", state.preferences.categories);
      saveToStorage("dashboard:favorites", state.favorites.items);
      saveToStorage("dashboard:theme", state.theme.mode);
      document.documentElement.classList.toggle(
        "dark",
        state.theme.mode === "dark",
      );
    });

    document.documentElement.classList.toggle(
      "dark",
      store.getState().theme.mode === "dark",
    );

    return unsubscribe;
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
