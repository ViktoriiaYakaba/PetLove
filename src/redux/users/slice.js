import { createSlice } from '@reduxjs/toolkit';
import { singInUser, singOutUser, singUpUser, refreshUser, currentEditUser, currentFullUser, currentPetRemoveId, currentPetsAdd  } from './operation';


const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(singUpUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(singUpUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.token = action.payload.token; 
    });
    builder.addCase(singUpUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; 
    });
    builder.addCase(singInUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(singInUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload; 
      state.token = action.payload.token; 
    });
    builder.addCase(singInUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; 
    });
    builder.addCase(singOutUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(singOutUser.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
      state.token = null; 
    });
    builder.addCase(singOutUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(refreshUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(refreshUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload; 
    });
    builder.addCase(refreshUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; 
    });
    builder.addCase(currentFullUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(currentFullUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload; 
    });
    builder.addCase(currentFullUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(currentEditUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(currentEditUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload; 
    });
    builder.addCase(currentEditUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(currentPetsAdd.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(currentPetsAdd.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(currentPetsAdd.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(currentPetRemoveId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(currentPetRemoveId.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(currentPetRemoveId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; 
    });
  },
});

export const { clearAuthError } = authSlice.actions;
export const authReducer = authSlice.reducer;
