import React, { createContext, useState, useMemo, useContext } from 'react';

export const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {

  const [carrinho, setCarrinho] = useState([]);

  /* =====================================================
     ADICIONAR ITEM
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
     REMOVER UM ITEM
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

/* =====================================================
   🔥 HOOK CORRETO — ESSENCIAL PARA FUNCIONAR
   Agora a tela de detalhes pode chamar:
   const { adicionarItem } = useCarrinho();
===================================================== */
export function useCarrinho() {
  const context = useContext(CarrinhoContext);

  if (!context) {
    throw new Error("useCarrinho deve ser usado dentro de um CarrinhoProvider");
  }

  return context;
}
