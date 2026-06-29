import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import swal from 'sweetalert';
import { showAlert } from './alertSlice';

axios.defaults.withCredentials = true;

const API_URL = process.env.NEXT_PUBLIC_BACK_URL;

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      localStorage.setItem('zscUser', JSON.stringify(res.data.user));
      localStorage.setItem('State', 'true');
      dispatch(showAlert(res.data.message || 'Login successful'));
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
      return res.data.user;
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      dispatch(showAlert(message));
      return rejectWithValue(message);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async ({ username, name, email, password }, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/register`, {
        username,
        name,
        email,
        password,
      });
      dispatch(showAlert(res.data.message));
      setTimeout(() => (window.location.href = '/Pages/Login'), 2000);
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed';
      swal('عذراً!', message, 'error');
      return rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue, dispatch }) => {
    return new Promise((resolve, reject) => {
      swal({
        title: 'هل أنت متأكد من تسجيل الخروج؟',
        text: 'سيتم تسجيل خروجك من الحساب وستحتاج لتسجيل الدخول مرة أخرى.',
        icon: 'warning',
        buttons: ['إلغاء', 'تسجيل الخروج'],
        dangerMode: true,
      }).then(async (willLogout) => {
        if (willLogout) {
          try {
            await axios.post(`${API_URL}/api/auth/logout`);
            localStorage.removeItem('zscUser');
            localStorage.removeItem('State');
            window.location.href = '/Pages/Login';
            resolve();
          } catch (err) {
            reject(rejectWithValue(err.message));
          }
        } else {
          reject(rejectWithValue('Logout cancelled'));
        }
      });
    });
  }
);

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (profileData, { rejectWithValue, dispatch, getState }) => {
    try {
      const res = await axios.put(`${API_URL}/api/auth/profile-update`, profileData);
      const { auth } = getState();
      const updatedUser = { ...auth.user, ...res.data };
      localStorage.setItem('zscUser', JSON.stringify(updatedUser));
      dispatch(showAlert('تم تحديث الملف الشخصي بنجاح'));
      return updatedUser;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update profile';
      dispatch(showAlert(message));
      return rejectWithValue(message);
    }
  }
);

export const updatePhoto = createAsyncThunk(
  'auth/updatePhoto',
  async (photo, { rejectWithValue, dispatch, getState }) => {
    try {
      const formData = new FormData();
      formData.append('image', photo);
      const res = await axios.post(`${API_URL}/api/auth/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      dispatch(showAlert('تم تحديث الصورة بنجاح'));
      const { auth } = getState();
      const updatedUser = {
        ...auth.user,
        profilePhoto: res.data,
      };
      localStorage.setItem('zscUser', JSON.stringify(updatedUser));
      return updatedUser;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update photo';
      dispatch(showAlert(message));
      return rejectWithValue(message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ id, token, password }, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post(`${API_URL}/api/password/reset-password/${id}/${token}`, {
        password,
      });
      dispatch(showAlert(res.data.message));
      return true;
    } catch (err) {
      const message = 'Failed to reset password';
      dispatch(showAlert(message));
      return rejectWithValue(message);
    }
  }
);

export const forgetEmail = createAsyncThunk(
  'auth/forgetEmail',
  async (email, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post(`${API_URL}/api/password/reset`, { email });
      dispatch(showAlert(res.data.message || res.data));
      return true;
    } catch (err) {
      const message = 'Failed to send recovery email';
      dispatch(showAlert(message));
      return rejectWithValue(message);
    }
  }
);

export const verifyAccount = createAsyncThunk(
  'auth/verifyAccount',
  async ({ id, token }, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.get(`${API_URL}/api/auth/${id}/verify/${token}`);
      dispatch(showAlert(res.data.message || 'Account verified successfully'));
      return true;
    } catch (err) {
      console.error(err);
      return rejectWithValue('Verification failed');
    }
  }
);

export const fetchUsers = createAsyncThunk(
  'auth/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/auth`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch users');
    }
  }
);

const initialState = {
  user: null,
  users: [],
  isLogin: false,
  isAuthChecked: false,
  verifyStatus: false,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initializeAuth: (state) => {
      const storedUser = localStorage.getItem('zscUser');
      const loginState = localStorage.getItem('State');

      if (storedUser && loginState === 'true') {
        state.user = JSON.parse(storedUser);
        state.isLogin = true;
      } else {
        state.isLogin = false;
      }

      state.isAuthChecked = true;
    },
    setVerifyStatus: (state, action) => {
      state.verifyStatus = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isLogin = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isLogin = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updatePhoto.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(forgetEmail.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(verifyAccount.fulfilled, (state) => {
        state.verifyStatus = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      });
  },
});

export const { initializeAuth, setVerifyStatus, clearError } = authSlice.actions;
export default authSlice.reducer;
