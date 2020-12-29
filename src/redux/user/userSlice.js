import { createSlice } from "@reduxjs/toolkit";
import { axiosFetch } from "../../axios";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    accessToken: null,
    userInfo: {
      displayName: null,
      isAdmin: null,
      avatar: null,
    },
  },
  reducers: {
    setUser: (state, action) => {
      if (action.payload.accessToken) {
        state.accessToken = action.payload.accessToken;
      }
      state.userInfo = action.payload.userInfo;
    },
    setUserStart: (state) => {
      state.isLoading = true;
    },
    setUserFinish: (state) => {
      state.isLoading = false;
    },
    logout: (state) => {
      state.accessToken = null;
      state.userInfo.displayName = null;
      state.userInfo.isAdmin = null;
      state.userInfo.avatar = null;

      axiosFetch.post("/auth/logout");
    },
  },
});

export const {
  setUser,
  setUserStart,
  setUserFinish,
  logout,
} = userSlice.actions;

export const selectUser = (state) => state.user.userInfo; // For profile and add page
export const selectAccessToken = (state) => state.user.accessToken; // For profile and add page

export const selectIsAuthenticated = (state) => {
  return state.user.accessToken !== null;
};
export const selectIsAdmin = (state) => state.user.userInfo?.isAdmin === "true";
export const selectUserIsLoading = (state) => state.user.isLoading;

export default userSlice.reducer;
