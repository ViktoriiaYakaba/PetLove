import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

axios.defaults.baseURL = "https://petlove.b.goit.study/api"

const setAuthHeader = token => {
  console.log('Impostazione token:', token);
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};



export const registerUser = createAsyncThunk(
  'auth/register',
  async (data, thunkAPI) => {
    try {
      const resp = await axios.post('/users/signup', data)
      setAuthHeader(resp.data.token)
      return resp.data;
    }
    catch (error) {
      return thunkAPI.rejectWithValue(error.resp.data.message)
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (data, thunkAPI) => {
     try {
            const resp = await axios.post("/users/signin", data)
            setAuthHeader(resp.data.token)
            return resp.data;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
  }
)

export const logoutUser = createAsyncThunk(
    "auth/logout",
    async (_, thunkAPI) => {
        try {
            await axios.post('/users/signout')
            clearAuthHeader;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)

export const refreshUser = createAsyncThunk(
  'auth/current',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      Notify.error('Unable to fetch user');
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      setAuthHeader(persistedToken);
      const res = await axios.get('/users/current');
      return res.data;
    } catch (error) {
      Notify.error(`${error.message}`);
      return thunkAPI.rejectWithValue(error.message);
 
   }
  }
);

export const getAllUserInfo = createAsyncThunk(
    "auth/getAllUserInfo",
    async (_, thunkAPI) => {
        try {
            const resp = await axios.get('/users/current/full')
            return resp.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
);

export const editUserInfo = createAsyncThunk(
    "auth/editUserInfo",
    async (editData, thunkAPI) => {
        try {
            const resp = await axios.patch('/users/current/edit', editData)
            return resp.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
);

export const addPet = createAsyncThunk(
    "auth/addPet",
    async (newPetData, thunkAPI) => {
        try {
            const resp = await axios.post('/users/current/pets/add', newPetData)
            return resp.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
);

export const removePet = createAsyncThunk(
    "auth/removePet",
    async (id, thunkAPI) => {
        try {
            const resp = await axios.delete(`/users/current/pets/remove/${id}`)
            return resp.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
);
