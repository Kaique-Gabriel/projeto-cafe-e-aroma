import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light'); // light = padrão

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const colors = theme === 'light'
    ? {
        background: '#FFF8F0',
        card: '#FFFFFF',
        text: '#4A2C2A',
        textSecondary: '#6E4E43',
        accent: '#C58B62',
      }
    : {
        background: '#1A1818',
        card: '#2A2727',
        text: '#E8D6C0',
        textSecondary: '#BFA68C',
        accent: '#E3B58B',
      };

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
