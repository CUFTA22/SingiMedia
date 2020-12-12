import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    isLoading: false, // In component we check
    error: false,
  },
  reducers: {
    fetchPostsSTART: (state) => {
      state.isLoading = true;
    },
    fetchPostsSUCCESS: (state) => {
      state.isLoading = false;
    },
    fetchPostsFAILED: (state) => {
      state.error = true;
    },
    setPosts: (state, action) => {
      // Maybe we can do this in SUCCESS
      state.posts = actions.payload.posts;
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export const fetchPosts = (posts) => (dispatch) => {
  dispatch(fetchPostsSTART());
  fetch("")
    .then((res) => {
      dispatch(fetchPostsSUCCESS());
      dispatch(setPosts(res.data));
    })
    .catch((err) => {
      dispatch(fetchPostsFAILED());
    });
};

export const selectUser = (state) => state.user; // getCurrentUser

export default userSlice.reducer;
