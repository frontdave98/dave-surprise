import { ThemeContext, ThemeType } from "@/context/theme-context";
import { useContext, useEffect, useState } from "react";

const useDarkMode = () => {
  // Try to get the dark mode preference from local storage
  const { theme, setTheme, loading } = useContext(ThemeContext) as ThemeType;

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    setTheme((prev) => !prev);
  };

  useEffect(() => {
    if (!loading) {
      // Apply dark mode styles to the body element
      document.body.classList.toggle("dark", theme);
      setIsDarkMode(theme);

      // Save the dark mode state to local storage
      localStorage.setItem("darkMode", JSON.stringify(theme));
    }
  }, [theme, loading]);

  return { isDarkMode, toggleDarkMode };
};

export default useDarkMode;
