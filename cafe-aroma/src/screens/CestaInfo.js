// src/screens/CestaInfo.js
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function CestaInfo({ route }) {
  const { cesta } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Informações da Cesta</Text>

      <Text style={styles.label}>Nome:</Text>
      <Text style={styles.texto}>{cesta.nome}</Text>

      <Text style={styles.label}>Preço:</Text>
      <Text style={styles.texto}>R$ {cesta.preco.toFixed(2)}</Text>

      <Text style={styles.label}>Descrição Completa:</Text>
      <Text style={styles.texto}>{cesta.descricao}</Text>

      {cesta.itens && (
        <>
          <Text style={styles.label}>Itens Inclusos:</Text>
          {cesta.itens.map((item, index) => (
            <Text key={index} style={styles.texto}>• {item}</Text>
          ))}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#FAF3E7", padding: 20 },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#4E342E",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6D4C41",
    marginTop: 15,
  },
  texto: {
    fontSize: 16,
    color: "#4E342E",
    marginBottom: 5,
  },
});
