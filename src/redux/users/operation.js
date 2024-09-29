import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

axios.defaults.baseURL = 'https://petlove.b.goit.study/api';

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const singUpUser = createAsyncThunk(
  'auth/singup',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post('/users/signup', credentials);
      setAuthHeader(res.data.token);
      Notify.success('Welcome to PetL💛ve!');
      return res.data;
    } catch (error) {
      Notify.error(`${error.message}`);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const singInUser = createAsyncThunk(
  'auth/singin',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post('/users/singin', credentials);
      setAuthHeader(res.data.token);
      Notify.success('Welcome back 💛 !');
      return res.data;
    } catch (error) {
      Notify.error('Wrong password or email. Please try again!');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const singOutUser = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/users/singout');
    clearAuthHeader();
  } catch (error) {
     Notify.error(`${error.message}`);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const currentUser = createAsyncThunk(
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

export const currentFullUser = createAsyncThunk(
  'auth/currentFullUser',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      Notify.error('Unable to fetch full user data');
      return thunkAPI.rejectWithValue('Unable to fetch full user data');
    }

    try {
      setAuthHeader(persistedToken);
      const res = await axios.get('/users/full'); 
      return res.data;
    } catch (error) {
      Notify.error(`${error.message}`);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const currentEditUser = createAsyncThunk(
  'auth/editUser',
  async (userData, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      Notify.error('Unable to edit user: Not authenticated.');
      return thunkAPI.rejectWithValue('Not authenticated');
    }

    try {
      setAuthHeader(persistedToken); 
      const res = await axios.patch('/users/current', userData); 
      Notify.success('User information updated successfully!');
      return res.data; 
    } catch (error) {
      Notify.error(`Error updating user: ${error.message}`);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const currentPetsAdd = createAsyncThunk(
  'pets/addUserPet',
  async (petData, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token; 

    if (persistedToken === null) {
      Notify.error('Unable to add pet: Not authenticated.');
      return thunkAPI.rejectWithValue('Not authenticated');
    }

    try {
      setAuthHeader(persistedToken); 
      const res = await axios.post('/pets', petData); 
      Notify.success('Pet added successfully!');
      return res.data; 
    } catch (error) {
      Notify.error(`Error adding pet: ${error.message}`);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const currentPetRemoveId = createAsyncThunk(
  'pets/removeUserPet',
  async (petId, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token; 

    if (!persistedToken) {
      Notify.error('Unable to remove pet: Not authenticated.');
      return thunkAPI.rejectWithValue('Not authenticated');
    }

    try {
      setAuthHeader(persistedToken); 
      await axios.delete(`/pets/${petId}`);
      Notify.success('Pet removed successfully!');
      return petId; 
    } catch (error) {
      Notify.error(`Error removing pet: ${error.message}`);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);











