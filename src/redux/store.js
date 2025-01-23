import { configureStore } from "@reduxjs/toolkit";
import { authReducers } from "./slice/auth.slice";
import { userApi } from "./slice/userApi.slice";
import { miscReducer } from "./slice/misc.slice";

export const store = configureStore({
  reducer: {
    auth: authReducers,
    [userApi.reducerPath]: userApi.reducer,
    misc : miscReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});
