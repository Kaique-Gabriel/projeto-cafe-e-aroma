// ThemeContext.js
import React, { createContext, useContext, useState, useMemo } from 'react';
import { colorsLight, colorsDark } from '../theme/colors';
import createTheme from '../theme/theme';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  const colors = isDark ? colorsDark : colorsLight;

  const theme = useMemo(() => createTheme(colors), [colors]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ theme, colors, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
