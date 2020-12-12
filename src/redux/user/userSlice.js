import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    token: localStorage.getItem("token"),
    expiresAt: localStorage.getItem("expiresAt"),
    userInfo: JSON.parse(localStorage.getItem("userInfo")),
  },
  reducers: {
    setUser: (state, action) => {
      state.token = action.payload.token;
      state.expiresAt = action.payload.expiresAt;
      state.userInfo = action.payload.userInfo;
    },
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("expiresAt");
      localStorage.removeItem("userInfo");

      state.token = null;
      state.expiresAt = null;
      state.userInfo = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export const selectUser = (state) => state.user.userInfo; // getCurrentUser
export const selectIsAuthenticated = (state) => {
  if (!state.user.token || !state.user.expiresAt) {
    return false;
  }
  return new Date().getTime() / 1000 < state.user.expiresAt;
};
export const selectIsAdmin = (state) => state.user.userInfo.role === "admin";

export default userSlice.reducer;
