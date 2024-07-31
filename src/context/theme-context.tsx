"use client";
import {
  useState,
  createContext,
  SetStateAction,
  useMemo,
  Dispatch,
  useEffect,
} from "react";

export interface ThemeType {
  theme: boolean;
  setTheme: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const ThemeContext = createContext<ThemeType | null>(null);

function ThemeProvider({ children }: { children: JSX.Element }) {
  const [theme, setTheme] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  // LISTENERS ----------------------------------------------------------------

  useEffect(() => {
    const storedDarkMode =
      typeof localStorage != "undefined"
        ? localStorage.getItem("darkMode")
        : null;
    const initialDarkMode = storedDarkMode ? JSON.parse(storedDarkMode) : false;
    setTheme(initialDarkMode);
    setLoading(false);
  }, []);

  const values = useMemo(
    () => ({
      theme,
      setTheme,
      loading,
      setLoading,
    }),
    [theme, setTheme, loading, setLoading]
  );

  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
}

export { ThemeProvider, ThemeContext };
