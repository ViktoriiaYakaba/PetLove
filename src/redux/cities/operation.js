import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://petlove.b.goit.study/api";

export const fetchCities = createAsyncThunk(
  "cities/fetchCities",
  async (keyword, thunkAPI) => {
    try {
      const response = await axios.get(`/cities`, {
        params: {
          keyword, 
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchCitiesLocations = createAsyncThunk(
  "cities/fetchCitiesLocations",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`/cities/locations`); 
      return response.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
