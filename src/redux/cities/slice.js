import { createSlice } from "@reduxjs/toolkit";
import { fetchCities, fetchCitiesLocations } from "./operation";


const initialState = {
    cities: [],
    locations: [],
    loading: false,
    error: null,
};

const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = action.payload; 
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.loading = false;
          state.error = action.payload; 
      })
      .addCase(fetchCitiesLocations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCitiesLocations.fulfilled, (state, action) => {
        state.loading = false;
        state.locations = action.payload;
      })
      .addCase(fetchCitiesLocations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});
export const citiesRedusers = createSlice.reducer;
