// src/screens/PagamentoCartao.js
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function PagamentoCartao({ navigation, route }) {

  // 🔥 Agora pegamos TUDO que veio do carrinho → MetodoPagamento → aqui
  const itens = route?.params?.itens ?? [];
  const valorTotal = route?.params?.valorTotal ?? 0;
  const quantidadeTotal = route?.params?.quantidadeTotal ?? 0;

  const [nome, setNome] = useState("");
  const [numero, setNumero] = useState("");
  const [validade, setValidade] = useState("");
  const [cvv, setCvv] = useState("");

  function handleContinuar() {

    // 🔥 ENVIANDO TODOS OS DADOS NECESSÁRIOS → EnderecoEntrega
    navigation.navigate("EnderecoEntrega", {
      itens,
      valorTotal,
      quantidadeTotal,
      metodoPagamento: "cartao",
      dadosCartao: {
        nome,
        numero,
        validade,
        cvv,
      },
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>

        <Ionicons name="card-outline" size={80} color="#C78C65" style={{ marginBottom: 20 }} />

        <Text style={styles.title}>Pagamento com Cartão</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome no cartão"
          placeholderTextColor="#BFA9A0"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={styles.input}
          placeholder="Número do cartão"
          placeholderTextColor="#BFA9A0"
          keyboardType="numeric"
          value={numero}
          onChangeText={setNumero}
        />

        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.half]}
            placeholder="Validade (MM/AA)"
            placeholderTextColor="#BFA9A0"
            value={validade}
            onChangeText={setValidade}
          />

          <TextInput
            style={[styles.input, styles.half]}
            placeholder="CVV"
            placeholderTextColor="#BFA9A0"
            keyboardType="numeric"
            value={cvv}
            onChangeText={setCvv}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleContinuar}>
          <Text style={styles.buttonText}>Confirmar Pagamento</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF6F0",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 18,
    padding: 25,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 26,
    color: "#4A2C2A",
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#F1E4D8",
    padding: 12,
    borderRadius: 10,
    color: "#4A2C2A",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  half: {
    flex: 1,
  },
  button: {
    backgroundColor: "#C78C65",
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
  },
});
