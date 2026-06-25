import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchShows } from "@/services/tvmaze";
import type { AsyncStatus, CategoryKey, ContentItem } from "@/types/content";

type TvState = {
  items: ContentItem[];
  status: AsyncStatus;
  error?: string;
};

const initialState: TvState = {
  items: [],
  status: "idle",
};

export const loadShows = createAsyncThunk(
  "tv/loadShows",
  async (categories: CategoryKey[]) => fetchShows(categories),
);

const tvSlice = createSlice({
  name: "tv",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadShows.pending, (state) => {
        state.status = "loading";
        state.error = undefined;
      })
      .addCase(loadShows.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(loadShows.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unable to load shows.";
      });
  },
});

export default tvSlice.reducer;
