// src/screens/ComboInfo.js
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function ComboInfo({ route }) {
  const { combo } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Informações do Combo</Text>

      <Text style={styles.label}>Nome:</Text>
      <Text style={styles.texto}>{combo.nome}</Text>

      <Text style={styles.label}>Preço:</Text>
      <Text style={styles.texto}>R$ {combo.preco.toFixed(2)}</Text>

      <Text style={styles.label}>Descrição Completa:</Text>
      <Text style={styles.texto}>{combo.descricao}</Text>

      {combo.itens && (
        <>
          <Text style={styles.label}>Itens Inclusos:</Text>
          {combo.itens.map((item, index) => (
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
