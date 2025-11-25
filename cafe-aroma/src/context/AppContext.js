import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme
} from '@react-navigation/native';

export const AppContext = createContext();

export function useApp() {
  return useContext(AppContext);
}

export function AppProvider({ children }) {

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    async function loadTheme() {
      try {
        const savedTheme = await AsyncStorage.getItem('@themeMode');
        if (savedTheme !== null) {
          setIsDarkMode(savedTheme === 'dark');
        }
      } catch (error) {
        console.log('Erro ao carregar tema:', error);
      }
    }
    loadTheme();
  }, []);

  async function toggleTheme() {
    try {
      const newTheme = !isDarkMode;
      setIsDarkMode(newTheme);
      await AsyncStorage.setItem('@themeMode', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.log('Erro ao salvar tema:', error);
    }
  }

  // ===========================
  // 🎨 PALETA GLOBAL DE CORES
  // ===========================
  const paletteLight = {
    background: '#F6EFE7',
    card: '#FFF7EE',
    text: '#3B2922',
    border: '#E0D4C8',
    primary: '#C59B72',

    // extras úteis nas telas
    inputBg: '#FFFFFF',
    inputText: '#3B2922',
    placeholder: '#8C7A65',
    buttonBg: '#C59B72',
    buttonText: '#FFF',
  };

  const paletteDark = {
    background: '#1F1A17',
    card: '#2A2320',
    text: '#F5D7A1',
    border: '#40352F',
    primary: '#C59B72',

    inputBg: '#2A2320',
    inputText: '#F5D7A1',
    placeholder: '#BFA780',
    buttonBg: '#C59B72',
    buttonText: '#FFF',
  };

  // ===========================
  // 🎨 TEMAS DO NAVIGATION
  // ===========================
  const LightTheme = {
    ...NavigationDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...paletteLight
    }
  };

  const DarkTheme = {
    ...NavigationDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...paletteDark
    }
  };

  // 🍫 Tema escolhido
  const theme = isDarkMode ? DarkTheme : LightTheme;

  return (
    <AppContext.Provider
      value={{
        user: null,
        setUser: () => {},
        isDarkMode,
        toggleTheme,
        theme,          // 👈 agora basta usar theme.colors.xxx nas telas
        colors: theme.colors, // 👈 acesso rápido
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
