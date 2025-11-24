import React, { createContext, useState, useMemo } from 'react';

export const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {

  const [carrinho, setCarrinho] = useState([]);

  /* =====================================================
     ADICIONAR ITEM
     - Garante que SEMPRE exista um ID único
     - Se já existir no carrinho → aumenta quantidade
  ===================================================== */
  function adicionarItem(novoItem) {

    const itemComId = {
      ...novoItem,
      id: novoItem.id ?? Date.now() + Math.random(), // Garante ID único
    };

    setCarrinho(prev => {
      const index = prev.findIndex(item => item.id === itemComId.id);

      if (index !== -1) {
        const atualizado = [...prev];
        atualizado[index].quantidade += 1;
        return atualizado;
      }

      return [...prev, { ...itemComId, quantidade: 1 }];
    });
  }

  /* =====================================================
     REMOVER UM ITEM (reduz quantidade ou remove)
  ===================================================== */
  function removerItem(id) {
    setCarrinho(prev => {
      const index = prev.findIndex(item => item.id === id);
      if (index === -1) return prev;

      const atualizado = [...prev];

      if (atualizado[index].quantidade > 1) {
        atualizado[index].quantidade -= 1;
        return atualizado;
      }

      return atualizado.filter(item => item.id !== id);
    });
  }

  /* =====================================================
     REMOVER COMPLETAMENTE
  ===================================================== */
  function removerItemCompleto(id) {
    setCarrinho(prev => prev.filter(item => item.id !== id));
  }

  /* =====================================================
     LIMPAR CARRINHO
  ===================================================== */
  function limparCarrinho() {
    setCarrinho([]);
  }

  /* =====================================================
     TOTAL
  ===================================================== */
  const total = useMemo(() => {
    return carrinho.reduce((soma, item) => {
      const preco = Number(item.preco || 0);
      return soma + preco * item.quantidade;
    }, 0);
  }, [carrinho]);

  return (
    <CarrinhoContext.Provider 
      value={{
        carrinho,
        adicionarItem,
        removerItem,
        removerItemCompleto,
        limparCarrinho,
        total
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}
