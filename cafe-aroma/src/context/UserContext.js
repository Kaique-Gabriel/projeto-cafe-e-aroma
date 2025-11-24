// src/context/UserContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    name: "Usuário",
    email: "email@exemplo.com",
    photo: null,
  });

  // Carregar dados do usuário ao iniciar o app
  useEffect(() => {
    async function loadUser() {
      try {
        const data = await AsyncStorage.getItem("@user_data");
        if (data) setUser(JSON.parse(data));
      } catch (e) {
        console.log("Erro ao carregar dados do usuário", e);
      }
    }
    loadUser();
  }, []);

  // Salvar ao mudar
  useEffect(() => {
    async function saveUser() {
      try {
        await AsyncStorage.setItem("@user_data", JSON.stringify(user));
      } catch (e) {
        console.log("Erro ao salvar usuário", e);
      }
    }
    saveUser();
  }, [user]);

  function updateUser(data) {
    setUser((prev) => ({ ...prev, ...data }));
  }

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
