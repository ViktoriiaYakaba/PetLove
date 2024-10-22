import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://petlove.b.goit.study/api";

export const fetchCities = createAsyncThunk(
  'cities/fetchCities',
  async (keyword, thunkAPI) => {
    try {
      const response = await axios.get('/cities', {
        params: { keyword },
      });
      console.log('Cities fetched:', response.data); 
      return response.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'An error occurred');
    }
  }
);
