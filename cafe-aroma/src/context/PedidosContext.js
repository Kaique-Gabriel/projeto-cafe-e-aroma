// src/context/PedidosContext.js
import React, { createContext, useState } from "react";

export const PedidosContext = createContext();

export function PedidosProvider({ children }) {

  const [pedidos, setPedidos] = useState([]);        // pedidos em andamento
  const [historico, setHistorico] = useState([]);    // pedidos entregues

  function adicionarPedido(novoPedido) {
    setPedidos(prev => [...prev, novoPedido]);
  }

  // Marca como entregue e move para o histórico (mantendo endereço)
  function marcarComoEntregue(id) {
    const pedido = pedidos.find(p => p.id === id);
    if (!pedido) return;

    setPedidos(prev => prev.filter(p => p.id !== id));
    setHistorico(prev => [...prev, pedido]);
  }

  return (
    <PedidosContext.Provider
      value={{
        pedidos,
        historico,
        adicionarPedido,
        marcarComoEntregue
      }}
    >
      {children}
    </PedidosContext.Provider>
  );
}
