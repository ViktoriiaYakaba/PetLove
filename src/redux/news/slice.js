import { createSlice } from "@reduxjs/toolkit";
import { fetchNews } from "./operations";

const initialState = {
    news: [],
    totalPages: null,
    lastPage: null,
    isLoading: false,
    isError: false
}

export const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchNews.fulfilled, (state, {payload}) => {
          state.isLoading = false;
          state.isError = false;
        state.news = payload.results;
        state.totalPages = payload.totalPages;
        state.lastPage =payload.totalPages;
        }).addCase(fetchNews.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        }).addCase(fetchNews.rejected, (state, actions) => {
      state.isLoading = false;
      state.isError = actions.payload;
    });
    }
})

export const newsReducer = newsSlice.reducer;
