import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name : "auth",
    initialState : {
        users : ""
    },
    reducers : {
        setUsers : (state , action) => {
            state.users = action.payload
        },
        resetUsers : (state , action) => {
            state.users = action.payload || ""
        }
    }
})

export const authReducers = authSlice.reducer;
export const {resetUsers , setUsers} = authSlice.actions

export const getSelf = (state) => state.auth.users;