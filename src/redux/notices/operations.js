import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://petlove.b.goit.study/api";

export const fetchAllNotices = createAsyncThunk(
  "notices/fetchAllNotices",
  async ({ keyword, category, species, limit, locationId, firstNotPopular, page, sex }, thunkAPI) => {
    try {
      const response = await axios.get(`/notices`, {
          params: {
          page: page,
          sex: sex === "all" ? "" : sex,
          keyword: keyword || "",
          category: category === "all" ? "" : category,
          species: species === "all" ? "" : species,
          limit: limit || 6,
          locationId: locationId || "",
          byPopularity: firstNotPopular || false
        }
      });
      return response.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "An error occurred");
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "notices/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const resp = await axios.get("/notices/categories");
      return resp.data || []; 
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchPetSex = createAsyncThunk(
  "notices/fetchPetSex",
  async (_, thunkAPI) => {
    try {
      const resp = await axios.get("/notices/sex");
      return resp.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response?.data?.message || "An error occurred");
    }
  }
);

export const fetchPetType = createAsyncThunk(
  "notices/fetchPetType",
  async (_, thunkAPI) => {
    try {
      const resp = await axios.get("/notices/species");
      return resp.data;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);





export const fetchNotices = createAsyncThunk(
  "notices/fetchNotices",
  async (
    { page, keyword, category, species, locationId, firstNotPopular},
    thunkAPI
  ) => {
    try {
      const resp = await axios.get(
        `/notices?page=${page || 1}&keyword=${keyword || ""}&category=${
          category === "all" ? "" : category
        }&species=${species === "all" ? "" : species}&locationId=${
          locationId ? locationId : ""
        }&byPopularity=${firstNotPopular || false}`
      );
      return resp.data;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);


export const fetchCities = createAsyncThunk(
  "notices/fetchCities",
  async (_, thunkAPI) => {
    try {
      const resp = await axios.get("/cities");
      return resp.data;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);


export const addFavoriteNotice = createAsyncThunk(
  "notices/addFavoriteNotice",
  async (id, thunkAPI) => {
    try {
      const resp = await axios.post(`/notices/favorites/add/${id}`);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const removeFavoriteNotice = createAsyncThunk(
  "notices/removeFavoriteNotice",
  async (id, thunkAPI) => {
    try {
      const resp = await axios.delete(`/notices/favorites/remove/${id}`);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);


export const fetchNoticeById = createAsyncThunk(
  "notices/fetchNoticeById",
  async (id, thunkAPI) => {
    try {
      const resp = await axios.get(`/notices/${id}`);
      return resp.data
    }
    catch (error){
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
)
