import { createSlice } from "@reduxjs/toolkit";
import { fetchNews } from "./operations";
import { Store } from "react-notifications-component";

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
            if (payload.results.length === 0) {
        Store.addNotification({
          title: "Warning!",
          message:
            "There are no news to your request. Try to change a search word",
          type: "info",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
        return;        
      }
        state.news = payload.results;
        state.totalPages = payload.totalPages;
        state.lastPage =payload.totalPages;
        }).addCase(fetchNews.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        }).addCase(fetchNews.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        })
    }
})

export const newsReducer = newsSlice.reducer;
