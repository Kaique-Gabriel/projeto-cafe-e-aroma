// src/screens/ConfirmacaoPedido.js
import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { PedidosContext } from "../context/PedidosContext";
import { CarrinhoContext } from "../context/CarrinhoContext";

export default function ConfirmacaoPedido({ navigation, route }) {

  const endereco = route?.params?.endereco ?? {};
  const itens = route?.params?.itens ?? [];
  const valorTotal = route?.params?.valorTotal ?? 0;

  const metodoPagamento = route?.params?.pagamento ?? "Não informado";

  const { adicionarPedido } = useContext(PedidosContext);
  const { limparCarrinho } = useContext(CarrinhoContext);

  function finalizarTudo() {
    const pedido = {
      id: Date.now(),
      itens,
      total: valorTotal,
      data: new Date().toLocaleString(),
      endereco,
      pagamento: metodoPagamento,
    };

    adicionarPedido(pedido);
    limparCarrinho();

    navigation.navigate("MainApp", { screen: "Pedidos" });
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Confirmar Pedido</Text>

      {/* ENDEREÇO */}
      <View style={styles.section}>
        <Text style={styles.sectionTitulo}>Endereço</Text>
        <Text style={styles.texto}>{endereco.rua}, {endereco.numero}</Text>
        <Text style={styles.texto}>{endereco.bairro}</Text>
        <Text style={styles.texto}>{endereco.cidade}</Text>
        <Text style={styles.texto}>CEP: {endereco.cep}</Text>
        <Text style={styles.texto}>
          Referência: {endereco.referencia || "Nenhuma"}
        </Text>
      </View>

      {/* PAGAMENTO */}
      <View style={styles.section}>
        <Text style={styles.sectionTitulo}>Forma de Pagamento</Text>
        <Text style={styles.texto}>{metodoPagamento}</Text>
      </View>

      {/* ITENS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitulo}>Itens do Pedido</Text>
        {itens.map((item, index) => (
          <Text key={index} style={styles.texto}>
            • {item.nome} — R$ {item.preco.toFixed(2)}
          </Text>
        ))}
      </View>

      {/* TOTAL */}
      <View style={styles.section}>
        <Text style={styles.totalTitulo}>Total</Text>
        <Text style={styles.totalValor}>R$ {valorTotal.toFixed(2)}</Text>
      </View>

      {/* FINALIZAR */}
      <TouchableOpacity style={styles.botaoFinalizar} onPress={finalizarTudo}>
        <Text style={styles.botaoTexto}>Finalizar Pedido</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoVoltar}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.botaoVoltarTexto}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAF3E7", padding: 20 },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4E342E",
    marginBottom: 20,
  },

  section: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E0C3A0",
  },

  sectionTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4E342E",
    marginBottom: 10,
  },

  texto: {
    fontSize: 16,
    color: "#4E342E",
    marginBottom: 5,
  },

  totalTitulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4E342E",
  },

  totalValor: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#8D6E63",
    marginTop: 5,
  },

  botaoFinalizar: {
    backgroundColor: "#4E342E",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  botaoTexto: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  botaoVoltar: {
    padding: 12,
    marginTop: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#4E342E",
    alignItems: "center",
  },

  botaoVoltarTexto: {
    color: "#4E342E",
    fontSize: 16,
    fontWeight: "600",
  },
});
