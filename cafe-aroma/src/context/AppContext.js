import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme
} from '@react-navigation/native';

export const AppContext = createContext();

// Hook para usar o contexto
export function useApp() {
  return useContext(AppContext);
}

export function AppProvider({ children }) {

  // ===========================
  // 🔥 TEMA ESCURO / CLARO
  // ===========================
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
  // 🎨 TEMAS COMPLETOS
  // ===========================
  const LightTheme = {
    ...NavigationDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      background: '#F6EFE7',
      card: '#FFF7EE',
      text: '#3B2922',
      border: '#E0D4C8',
      primary: '#C59B72',
    },
  };

  const DarkTheme = {
    ...NavigationDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      background: '#1F1A17',
      card: '#2A2320',
      text: '#F5D7A1',
      border: '#40352F',
      primary: '#C59B72',
    },
  };

  // ===========================
  // 🔥 DADOS DO USUÁRIO GLOBAL
  // ===========================
  const [user, setUser] = useState(null);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isDarkMode,
        setIsDarkMode,
        toggleTheme,
        LightTheme,
        DarkTheme, // 👈 agora o tema está disponível para o app
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
