import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser, logoutUser, refreshUser, getAllUserInfo, editUserInfo, addPet, removePet} from "./operation";

const initialState = {
  user: { name: null, email: null, password: null, avatar: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  favoritesList: [],
  petsList: [],
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })


      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })


      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = { name: null, email: null, password: null, avatar: null };
        state.token = null;
        state.isLoggedIn = false;
        state.favoritesList = [];
        state.petsList = [];
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })


      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.user = action.payload;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload;
      })
      .addCase(getAllUserInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.favoritesList = action.payload.favoritesList;
        state.petsList = action.payload.petsList;
      })
      .addCase(getAllUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
     .addCase(editUserInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = { ...state.user, ...action.payload };
      })
      .addCase(editUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
    .addCase(addPet.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addPet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.petsList = [...state.petsList, action.payload];
      })
      .addCase(addPet.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
    .addCase(removePet.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removePet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.petsList = state.petsList.filter(pet => pet.id !== action.payload.id);
      })
      .addCase(removePet.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const authReducer = authSlice.reducer;
