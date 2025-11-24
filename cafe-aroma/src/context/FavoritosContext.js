// src/context/FavoritosContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Cria o contexto
const FavoritosContext = createContext();

// Hook para usar o contexto mais facilmente
export function useFavoritos() {
  return useContext(FavoritosContext);
}

export function FavoritosProvider({ children }) {
  const [favoritos, setFavoritos] = useState([]);

  // ---------------------------------------------------------------
  // 1. Carregar favoritos salvos localmente (AsyncStorage)
  // ---------------------------------------------------------------
  useEffect(() => {
    async function carregarFavoritos() {
      try {
        const dadosSalvos = await AsyncStorage.getItem("@favoritos");
        if (dadosSalvos) {
          setFavoritos(JSON.parse(dadosSalvos));
        }
      } catch (error) {
        console.log("Erro ao carregar favoritos:", error);
      }
    }

    carregarFavoritos();
  }, []);

  // ---------------------------------------------------------------
  // 2. Salvar automaticamente quando favoritos mudar
  // ---------------------------------------------------------------
  useEffect(() => {
    async function salvarFavoritos() {
      try {
        await AsyncStorage.setItem("@favoritos", JSON.stringify(favoritos));
      } catch (error) {
        console.log("Erro ao salvar favoritos:", error);
      }
    }

    salvarFavoritos();
  }, [favoritos]);

  // ---------------------------------------------------------------
  // 3. Funções principais
  // ---------------------------------------------------------------

  // Verifica se um produto está favoritado
  function isFavorito(idProduto) {
    return favoritos.includes(idProduto);
  }

  // Adiciona favorito
  function adicionarFavorito(idProduto) {
    setFavoritos((prev) => [...prev, idProduto]);
  }

  // Remove favorito
  function removerFavorito(idProduto) {
    setFavoritos((prev) => prev.filter((id) => id !== idProduto));
  }

  // Alterna entre favorito e não favorito
  function toggleFavorito(idProduto) {
    if (isFavorito(idProduto)) {
      removerFavorito(idProduto);
    } else {
      adicionarFavorito(idProduto);
    }
  }

  // ---------------------------------------------------------------
  // 4. Retorna o provider
  // ---------------------------------------------------------------
  return (
    <FavoritosContext.Provider
      value={{
        favoritos,
        isFavorito,
        adicionarFavorito,
        removerFavorito,
        toggleFavorito,
      }}
    >
      {children}
    </FavoritosContext.Provider>
  );
}
