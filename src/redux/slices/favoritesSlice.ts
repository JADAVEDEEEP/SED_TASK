import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ContentItem } from "@/types/content";

type FavoritesState = {
  items: ContentItem[];
};

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    hydrateFavorites(state, action: PayloadAction<ContentItem[]>) {
      state.items = action.payload;
    },
    toggleFavorite(state, action: PayloadAction<ContentItem>) {
      const exists = state.items.some((item) => item.id === action.payload.id);
      state.items = exists
        ? state.items.filter((item) => item.id !== action.payload.id)
        : [action.payload, ...state.items];
    },
  },
});

export const { hydrateFavorites, toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
