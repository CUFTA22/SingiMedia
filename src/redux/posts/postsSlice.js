import { createSlice } from "@reduxjs/toolkit";
import { axiosFetch } from "../../axios";

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [null, null, null, null, null, null],
    count: 6,
    isLoading: true, // In component we check
    error: false,
  },
  reducers: {
    fetchPostsSTART: (state) => {
      state.isLoading = true;
      state.posts = [null, null, null, null, null, null];
    },
    fetchPostsSUCCESS: (state) => {
      state.isLoading = false;
    },
    fetchPostsFAILED: (state) => {
      state.error = true;
    },
    setPosts: (state, action) => {
      // action.payload.map((newPost) => {
      //   state.posts = [...state.posts, newPost];
      // });
      state.posts = action.payload;
    },
  },
});

export const {
  fetchPostsSTART,
  fetchPostsSUCCESS,
  fetchPostsFAILED,
  setPosts,
} = postsSlice.actions;

export const selectPostsLoading = (state) => state.posts.isLoading;
export const selectPostsError = (state) => state.posts.error;

export const selectPosts = (state) => state.posts.posts;

export const fetchPostsAsync = (filter = "Stars", count = 6) => (dispatch) => {
  dispatch(fetchPostsSTART());
  axiosFetch
    .get("/posts/front", {
      params: {
        filter: filter,
        count: count,
      },
    })
    .then((res) => {
      dispatch(fetchPostsSUCCESS());
      dispatch(setPosts(res.data));
    })
    .catch(() => {
      dispatch(fetchPostsFAILED());
    });
};

export default postsSlice.reducer;
