import { createContext, ReactNode, useEffect, useState } from "react";
import { getTheme, ThemeName } from "../styles/theme";
import { GlobalStyle } from "../styles/global";
import { ThemeProvider } from "styled-components";

const DEFAULT_THEME_NAME = "dark";
const THEME_LOCAL_STORAGE_KEY = "book_store_theme";

interface State {
  themeName: ThemeName;
  toggleTheme: () => void;
}

export const state = {
  themeName: "dark" as ThemeName,
  toggleTheme: () => {},
};

export const ThemeContext = createContext<State>(state);

export const BookStoreThemeProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [themeName, setThemeName] = useState<ThemeName>(DEFAULT_THEME_NAME);

  const toggleTheme = () => {
    const nextThemeName = themeName === "light" ? "dark" : "light";
    setThemeName(nextThemeName);
    localStorage.setItem(THEME_LOCAL_STORAGE_KEY, nextThemeName);
  };

  useEffect(() => {
    const savedThemeName = localStorage.getItem(
      THEME_LOCAL_STORAGE_KEY
    ) as ThemeName;
    setThemeName(savedThemeName || DEFAULT_THEME_NAME);
  }, []);

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={getTheme(themeName)}>
        <GlobalStyle themeName={themeName} />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
