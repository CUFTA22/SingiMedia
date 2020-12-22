import { createSlice } from "@reduxjs/toolkit";

export const utilsSlice = createSlice({
  name: "utils",
  initialState: {
    darkMode:
      localStorage.getItem("darkMode") !== null
        ? JSON.parse(localStorage.getItem("darkMode"))
        : true,
  },
  reducers: {
    toggleDarkMode: (state) => {
      localStorage.setItem("darkMode", !state.darkMode);
      state.darkMode = !state.darkMode;
    },
  },
});

export const { toggleDarkMode } = utilsSlice.actions;

export const selectDarkMode = (state) => state.utils.darkMode;

export default utilsSlice.reducer;
