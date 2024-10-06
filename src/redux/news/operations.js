import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://petlove.b.goit.study/api";


export const fetchNews = createAsyncThunk(
    'news/fetchAll',
    async ({ page, keyword }, thunkAPI) => {
        let response;
        try {
            if (!keyword) {
                response = await axios.get(`/news?page=${page}`);
            } else {
                response = await axios.get(`/news?page=${page}&keyword=${keyword}`);
            }
            return response.data;
        } catch (error) {
            console.error("Error fetching news:", error.message);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
