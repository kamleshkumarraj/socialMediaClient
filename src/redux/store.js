import { configureStore } from "@reduxjs/toolkit";
import { authReducers } from "./slice/auth.slice";
import { userApi } from "./slice/userApi.slice";

export const store = configureStore({
  reducer: {
    auth: authReducers,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});
