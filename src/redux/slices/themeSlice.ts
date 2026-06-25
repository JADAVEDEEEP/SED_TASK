import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type ThemeState = {
  mode: "light" | "dark";
};

const initialState: ThemeState = {
  mode: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    hydrateTheme(state, action: PayloadAction<ThemeState["mode"]>) {
      state.mode = action.payload;
    },
    toggleTheme(state) {
      state.mode = state.mode === "dark" ? "light" : "dark";
    },
  },
});

export const { hydrateTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
