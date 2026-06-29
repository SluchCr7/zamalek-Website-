import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'light',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', action.payload === 'dark');
      }
    },
    toggleTheme: (state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      state.theme = newTheme;
      localStorage.setItem('theme', newTheme);
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
      }
    },
    initTheme: (state) => {
      const savedTheme = typeof localStorage !== 'undefined' ? localStorage.getItem('theme') || 'light' : 'light';
      state.theme = savedTheme;
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', savedTheme === 'dark');
      }
    },
  },
});

export const { setTheme, toggleTheme, initTheme } = themeSlice.actions;
export default themeSlice.reducer;
