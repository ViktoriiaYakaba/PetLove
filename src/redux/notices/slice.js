import { createSlice } from "@reduxjs/toolkit";
import { 
  addFavoriteNotice, 
  removeFavoriteNotice, 
  fetchAllNotices, 
  fetchCategories, 
  fetchNotices, 
  fetchPetSex, 
  fetchPetType, 
  fetchNoticeById,
} from "./operations";

const initialState = {
    notices: [],
    favIds: [],
    lastPage: null,
    categories: null,
    sex: null,
    types: null,
    cities: null,
    isLoading: false,
    error: null,
    sexValue: "all",
    sortWord: null,
    currentNotice: null,
};

const noticesSlice = createSlice({
    name: "notices",
    initialState,
    reducers: {
        changeSexValue(state, actions) {
            state.sexValue = actions.payload;
        },
        changeSortWord(state, actions) {
            state.sortWord = actions.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, actions) => {
                state.isLoading = false;
                state.error = null;
                state.categories = actions.payload;
            })
            .addCase(fetchCategories.rejected, (state, actions) => {
                state.isLoading = false;
                state.error = actions.payload;
            })
            .addCase(fetchPetSex.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchPetSex.fulfilled, (state, actions) => {
                state.isLoading = false;
                state.error = null;
                state.sex = actions.payload;
            })
            .addCase(fetchPetSex.rejected, (state, actions) => {
                state.isLoading = false;
                state.error = actions.payload;
            })
            .addCase(fetchPetType.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchPetType.fulfilled, (state, actions) => {
                state.isLoading = false;
                state.error = null;
                state.types = actions.payload;
            })
            .addCase(fetchPetType.rejected, (state, actions) => {
                state.isLoading = false;
                state.error = actions.payload;
            })
            .addCase(fetchNotices.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchNotices.fulfilled, (state, actions) => {
                state.isLoading = false;
                state.error = null;
                state.notices = actions.payload.results;
                state.lastPage = actions.payload.totalPages;
            })
            .addCase(fetchNotices.rejected, (state, actions) => {
                state.isLoading = false;
                state.error = actions.payload;
            })
            .addCase(fetchAllNotices.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllNotices.fulfilled, (state, actions) => {
                state.isLoading = false;
                state.error = null;
                state.notices = actions.payload.results;
                state.lastPage = actions.payload.totalPages;

                if (state.sexValue !== "all") {
                    state.notices = state.notices.filter(
                        (item) => item.sex === state.sexValue
                    );
                }
                if (state.sortWord === "cheap") {
                    const noPrice = state.notices.filter(
                        (item) => item.price === undefined
                    );
                    const sortPrices = state.notices
                        .filter((item) => item.price)
                        .sort((itemPrev, itemNext) => itemPrev.price - itemNext.price);
                    state.notices = [...noPrice, ...sortPrices];
                }
                if (state.sortWord === "expensive") {
                    const noPrice = state.notices.filter(
                        (item) => item.price === undefined
                    );
                    const sortPrices = state.notices
                        .filter((item) => item.price)
                        .sort((itemPrev, itemNext) => itemNext.price - itemPrev.price);
                    state.notices = [...sortPrices, ...noPrice];
                }
                if (state.notices.length === 0) console.log("Empty");
            })
            .addCase(fetchAllNotices.rejected, (state, actions) => {
                state.isLoading = false;
                state.error = actions.payload;
            })
            .addCase(addFavoriteNotice.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addFavoriteNotice.fulfilled, (state, actions) => {
                state.isLoading = false;
                state.error = null;
                state.favIds = actions.payload;
            })
            .addCase(addFavoriteNotice.rejected, (state, actions) => {
                state.isLoading = false;
                state.error = actions.payload;
            })
            .addCase(removeFavoriteNotice.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(removeFavoriteNotice.fulfilled, (state, actions) => {
                state.isLoading = false;
                state.error = null;
                state.favIds = actions.payload;
            })
            .addCase(removeFavoriteNotice.rejected, (state, actions) => {
                state.isLoading = false;
                state.error = actions.payload;
            })
            .addCase(fetchNoticeById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchNoticeById.fulfilled, (state, actions) => {
                state.isLoading = false;
                state.error = null;
                state.currentNotice = actions.payload;
            })
            .addCase(fetchNoticeById.rejected, (state, actions) => {
                state.isLoading = false;
                state.error = actions.payload;
            });
    }
});

export const { changeSexValue, changeSortWord } = noticesSlice.actions;

export const noticesReducers = noticesSlice.reducer;
