import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
