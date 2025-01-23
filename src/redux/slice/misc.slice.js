import { createSlice } from "@reduxjs/toolkit";

const miscSlice = createSlice({
    name : "misc",
    initialState : {
        isCommentOpen : false,
        selectedPostForReaction : null
    },
    reducers : {
        setCommentOpen : (state , action) => {
            state.isCommentOpen = action.payload;
        },
        setSelectedPostForReaction : (state , action) => {
            state.selectedPostForReaction = action.payload;
        }
    }
})

export const { setCommentOpen , setSelectedPostForReaction } = miscSlice.actions;
export const miscReducer = miscSlice.reducer;

export const getMiscData = (state) => state.misc;