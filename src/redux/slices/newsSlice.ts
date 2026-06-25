import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchNews } from "@/services/mediastack";
import type { AsyncStatus, CategoryKey, ContentItem } from "@/types/content";

type NewsState = {
  items: ContentItem[];
  status: AsyncStatus;
  error?: string;
};

const initialState: NewsState = {
  items: [],
  status: "idle",
};

export const loadNews = createAsyncThunk(
  "news/loadNews",
  async (categories: CategoryKey[]) => fetchNews(categories),
);

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadNews.pending, (state) => {
        state.status = "loading";
        state.error = undefined;
      })
      .addCase(loadNews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(loadNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unable to load news.";
      });
  },
});

export default newsSlice.reducer;
