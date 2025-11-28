// src/screens/Combos.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Combos() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Combos de Café da Manhã e Tarde</Text>
      <Text style={styles.subtitle}>Tela criada com sucesso! Agora podemos integrar o banner.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
  },
});
