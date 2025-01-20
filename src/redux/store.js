import { configureStore } from "@reduxjs/toolkit";
import { authReducers } from "./slice/auth.slice";

export const store = configureStore({
    reducer : {
        auth : authReducers
    }
})

