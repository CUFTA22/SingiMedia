import { createSlice } from "@reduxjs/toolkit";
import { axiosFetch } from "../../axios";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    accessToken: null,
    userInfo: {
      displayName: null,
      isAdmin: null,
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.accessToken = action.payload.token;
      state.userInfo = action.payload.userInfo;
    },
    logout: (state) => {
      state.accessToken = null;
      state.userInfo.displayName = null;
      state.userInfo.role = null;

      axiosFetch.post("/auth/logout");
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export const selectUser = (state) => state.user.userInfo; // For profile page
export const selectIsAuthenticated = (state) => {
  return state.user.userInfo.displayName !== null;
};
export const selectIsAdmin = (state) => state.user.userInfo.isAdmin === "true";

export default userSlice.reducer;
