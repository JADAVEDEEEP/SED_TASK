import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "@/redux/slices/favoritesSlice";
import newsReducer from "@/redux/slices/newsSlice";
import preferencesReducer from "@/redux/slices/preferencesSlice";
import socialReducer from "@/redux/slices/socialSlice";
import themeReducer from "@/redux/slices/themeSlice";
import tvReducer from "@/redux/slices/tvSlice";

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    news: newsReducer,
    preferences: preferencesReducer,
    social: socialReducer,
    theme: themeReducer,
    tv: tvReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
