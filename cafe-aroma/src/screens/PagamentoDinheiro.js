// src/screens/PagamentoDinheiro.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function PagamentoDinheiro({ navigation }) {
  const handleContinuar = () => {
    navigation.navigate("EnderecoEntrega");
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>

        <Ionicons name="cash-outline" size={100} color="#C78C65" style={{ marginBottom: 20 }} />

        <Text style={styles.title}>Pagamento em Dinheiro</Text>
        <Text style={styles.subtitle}>
          O troco será ajustado no momento da entrega.
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleContinuar}>
          <Text style={styles.buttonText}>Continuar</Text>
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
    backgroundColor: "#FFF",
    padding: 25,
    borderRadius: 18,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#4A2C2A",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#6A4E42",
    marginBottom: 25,
  },
  button: {
    backgroundColor: "#C78C65",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
  },
});
