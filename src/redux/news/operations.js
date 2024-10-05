import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://petlove.b.goit.study/api"

export const fetchNews = createAsyncThunk(
    'news/fetchAll',
    async ({ page, searchQuery }, thunkAPI) => {
      let response;
      try {
        if (!searchQuery) {
          response = await axios.get(`/news?page=${page}`);
        } else {
          response = await axios.get(`/news?page=${page}&keyword=${searchQuery}`);
        }
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
)
