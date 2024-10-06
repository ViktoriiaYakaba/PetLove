import { createSlice } from "@reduxjs/toolkit";
import { fetchFriends } from "./operation";

const initialState = {
    friends: [],
    isLoading: false,
    isError: null,
};

const friendsSlice = createSlice({
    name: 'friends',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFriends.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(fetchFriends.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.friends = payload;
            })
            .addCase(fetchFriends.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.isError = payload; 
            });
    },
});

export const friendsReducer = friendsSlice.reducer;
