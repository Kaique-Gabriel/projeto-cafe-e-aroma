// src/screens/CestaDetalhes.js
import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function CestaDetalhes({ navigation, route }) {
  const { cesta } = route.params;

  return (
    <ScrollView style={styles.container}>
      
      {/* CORREÇÃO AQUI */}
      <Image source={cesta.imagem} style={styles.imagem} />

      <Text style={styles.nome}>{cesta.nome}</Text>
      <Text style={styles.preco}>R$ {cesta.preco.toFixed(2)}</Text>

      <Text style={styles.tituloSecao}>Descrição</Text>
      <Text style={styles.descricao}>{cesta.descricao}</Text>

      <TouchableOpacity
        style={styles.botaoInfo}
        onPress={() => navigation.navigate("CestaInfo", { cesta })}
      >
        <Text style={styles.botaoTexto}>Mais Informações</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoCarrinho}
        onPress={() => navigation.navigate("Carrinho", { item: cesta })}
      >
        <Text style={styles.botaoTexto}>Adicionar ao Carrinho</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#FAF3E7", padding: 20 },
  imagem: {
    width: "100%",
    height: 230,
    borderRadius: 12,
    marginBottom: 20,
  },
  nome: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#4E342E",
  },
  preco: {
    fontSize: 22,
    color: "#6D4C41",
    fontWeight: "600",
    marginBottom: 20,
  },
  tituloSecao: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4E342E",
    marginBottom: 5,
  },
  descricao: {
    fontSize: 16,
    color: "#6D4C41",
    marginBottom: 25,
  },
  botaoInfo: {
    backgroundColor: "#8D6E63",
    padding: 14,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: "center",
  },
  botaoCarrinho: {
    backgroundColor: "#4E342E",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 40,
  },
  botaoTexto: { color: "#FFF", fontSize: 18, fontWeight: "bold" },
});
