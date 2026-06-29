'use client';

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { initializeAuth } from "./redux/slices/authSlice";
import { initTheme } from "./redux/slices/themeSlice";
import LayoutComponent from "@/Components/LayoutComponent";
import { ThemeProvider } from "./Context/ThemeContext";
import { AlertContextProvider } from "./Context/AlertContext";
import { AuthContextProvider } from "./Context/AuthContext";
import { NewsContextProvider } from "./Context/NewsContext";

function RootLayoutContent({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
    dispatch(initTheme());
  }, [dispatch]);

  return (
    <LayoutComponent>{children}</LayoutComponent>
  );
}

export default function RootLayoutClient({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <AlertContextProvider>
            <AuthContextProvider>
              <NewsContextProvider>
                <RootLayoutContent>{children}</RootLayoutContent>
              </NewsContextProvider>
            </AuthContextProvider>
          </AlertContextProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
