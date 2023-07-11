import { configureStore } from "@reduxjs/toolkit";
// Slices
import authSlice from "./slices/authSlice";
import userManageSlice from "./slices/userManageSlice";
import articleSlice from "./slices/articleSlice";
// API / Services / Queries
import { usersApi } from "../services/usersApi";
import { articleQueryApi } from "../services/articleQuery";
import { facilityQueryApi } from "../services/facilityQuery";
import facilitySlice from "./slices/facilitySlice";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [articleQueryApi.reducerPath]: articleQueryApi.reducer,
    [facilityQueryApi.reducerPath]: facilityQueryApi.reducer,
    facility: facilitySlice,
    userManage: userManageSlice,
    auth: authSlice,
    articles: articleSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      usersApi.middleware,
      articleQueryApi.middleware,
      facilityQueryApi.middleware,
    ]),
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
