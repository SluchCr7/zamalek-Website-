import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { setTheme, toggleTheme, initTheme } from '../redux/slices/themeSlice';

export const useTheme = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  const handleSetTheme = useCallback(
    (newTheme) => dispatch(setTheme(newTheme)),
    [dispatch]
  );

  const handleToggleTheme = useCallback(() => dispatch(toggleTheme()), [dispatch]);

  const handleInitTheme = useCallback(() => dispatch(initTheme()), [dispatch]);

  return {
    theme,
    setTheme: handleSetTheme,
    toggleTheme: handleToggleTheme,
    initTheme: handleInitTheme,
  };
};
