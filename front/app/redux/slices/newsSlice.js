import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { showAlert } from './alertSlice';

const API_URL = process.env.NEXT_PUBLIC_BACK_URL;

export const fetchNews = createAsyncThunk('news/fetchNews', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/api/news`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch news');
  }
});

export const addNews = createAsyncThunk(
  'news/addNews',
  async ({ title, content, image, token }, { rejectWithValue, dispatch }) => {
    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('title', title);
      formData.append('content', content);

      const response = await axios.post(`${API_URL}/api/news/add`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      dispatch(showAlert(response.data.message || 'News added successfully'));
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to add news';
      dispatch(showAlert(message));
      return rejectWithValue(message);
    }
  }
);

export const deleteNews = createAsyncThunk(
  'news/deleteNews',
  async ({ id, token }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete(`${API_URL}/api/news/delete/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      dispatch(showAlert(response.data.message || 'News deleted successfully'));
      return id;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete news';
      dispatch(showAlert(message));
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  news: [],
  loading: false,
  error: null,
  openModal: false,
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setOpenModal: (state, action) => {
      state.openModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.news = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addNews.fulfilled, (state, action) => {
        state.news.push(action.payload);
        state.openModal = false;
      })
      .addCase(deleteNews.fulfilled, (state, action) => {
        state.news = state.news.filter((item) => item._id !== action.payload);
      });
  },
});

export const { setOpenModal } = newsSlice.actions;
export default newsSlice.reducer;
