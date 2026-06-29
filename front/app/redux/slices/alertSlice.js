import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
  isVisible: false,
};

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: (state, action) => {
      state.message = action.payload;
      state.isVisible = true;
    },
    hideAlert: (state) => {
      state.isVisible = false;
      state.message = '';
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;
