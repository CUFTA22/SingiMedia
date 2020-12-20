import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import utilsReducer from "./utils/utilsSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    utils: utilsReducer,
  },
});
