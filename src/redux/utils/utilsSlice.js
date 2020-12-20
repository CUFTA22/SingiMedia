import { createSlice } from "@reduxjs/toolkit";

export const utilsSlice = createSlice({
  name: "utils",
  initialState: {
    darkMode: true,
  },
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { toggleDarkMode } = utilsSlice.actions;

export const selectDarkMode = (state) => state.utils.darkMode;

export default utilsSlice.reducer;
