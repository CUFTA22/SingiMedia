import { createSlice } from "@reduxjs/toolkit";
import { axiosFetch } from "../../axios";

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [null, null, null, null, null, null, null, null],
    isLoading: true, // In component we check
    error: false,
  },
  reducers: {
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
export const selectPosts = (state) => state.posts.posts;

export const fetchPostsAsync = (filter) => (dispatch) => {
  axiosFetch
    .get("/posts/front", {
      params: {
        filter: filter,
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
