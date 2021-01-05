import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import utilsReducer from "./utils/utilsSlice";
import postReducer from "./posts/postsSlice";
import burgerReducer from "./burger/burgerSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    utils: utilsReducer,
    posts: postReducer,
    burger: burgerReducer,
  },
});
