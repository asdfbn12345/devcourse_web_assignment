import React, { useContext } from "react";
import { ThemeContext } from "context/themeContext";

function ThemeSwitcher() {
  const { themeName, toggleTheme } = useContext(ThemeContext);

  return <button onClick={toggleTheme}>테마스위처</button>;
}

export default ThemeSwitcher;
