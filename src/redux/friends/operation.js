import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://petlove.b.goit.study/api";

export const fetchFriends = createAsyncThunk(
    'friends/fetchAll',
    async (_, thunkAPI) => {
        try {
                const response = await axios.get(`/friends/`);
            return response.data;
        } catch (error) {
            console.error("Error fetching news:", error.message);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)
