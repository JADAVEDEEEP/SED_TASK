import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { DEFAULT_CATEGORIES } from "@/constants/categories";
import type { CategoryKey } from "@/types/content";

type PreferencesState = {
  categories: CategoryKey[];
  searchQuery: string;
  activeSection: "feed" | "trending" | "favorites" | "settings";
};

const initialState: PreferencesState = {
  categories: DEFAULT_CATEGORIES,
  searchQuery: "",
  activeSection: "feed",
};

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    hydrateCategories(state, action: PayloadAction<CategoryKey[]>) {
      state.categories = action.payload.length
        ? action.payload
        : DEFAULT_CATEGORIES;
    },
    toggleCategory(state, action: PayloadAction<CategoryKey>) {
      const exists = state.categories.includes(action.payload);
      state.categories = exists
        ? state.categories.filter((category) => category !== action.payload)
        : [...state.categories, action.payload];
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setActiveSection(
      state,
      action: PayloadAction<PreferencesState["activeSection"]>,
    ) {
      state.activeSection = action.payload;
    },
  },
});

export const {
  hydrateCategories,
  setActiveSection,
  setSearchQuery,
  toggleCategory,
} = preferencesSlice.actions;
export default preferencesSlice.reducer;
