import { createSlice } from "@reduxjs/toolkit";
import { fetchCities } from "./operation";

const initialState = {
    cities: [],        
    isLoading: false,  
    error: null, 
}

const citiesSlice = createSlice({
    name: 'cities',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCities.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCities.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cities = action.payload;
                console.log(action.payload)
            })
            .addCase(fetchCities.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const citiesReducers = citiesSlice.reducer;
