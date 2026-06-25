import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchPosts } from "@/services/dummyjson";
import type { AsyncStatus, CategoryKey, ContentItem } from "@/types/content";

type SocialState = {
  items: ContentItem[];
  status: AsyncStatus;
  error?: string;
};

const initialState: SocialState = {
  items: [],
  status: "idle",
};

export const loadPosts = createAsyncThunk(
  "social/loadPosts",
  async (categories: CategoryKey[]) => fetchPosts(categories),
);

const socialSlice = createSlice({
  name: "social",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadPosts.pending, (state) => {
        state.status = "loading";
        state.error = undefined;
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(loadPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unable to load social posts.";
      });
  },
});

export default socialSlice.reducer;
