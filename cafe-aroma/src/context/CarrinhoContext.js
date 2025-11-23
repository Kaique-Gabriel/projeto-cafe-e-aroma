import React, { createContext, useState } from 'react';

export const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {

  const [carrinho, setCarrinho] = useState([]);

  function adicionarItem(item) {
    setCarrinho(prev => [...prev, item]);
  }

  function removerItem(index) {
    setCarrinho(prev => prev.filter((_, i) => i !== index));
  }

  function limparCarrinho() {
    setCarrinho([]);
  }

  function calcularTotal() {
    return carrinho.reduce((acc, item) => acc + Number(item.preco || 0), 0);
  }

  return (
    <CarrinhoContext.Provider 
      value={{
        carrinho,
        adicionarItem,
        removerItem,
        limparCarrinho,
        calcularTotal
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}
