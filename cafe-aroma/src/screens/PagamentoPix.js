// src/screens/PagamentoPix.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function PagamentoPix({ navigation }) {
  const handleContinuar = () => {
    navigation.navigate("EnderecoEntrega");
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>

        <Ionicons name="qr-code-outline" size={90} color="#C78C65" style={{ marginBottom: 15 }} />

        <Text style={styles.title}>Pagamento via Pix</Text>
        <Text style={styles.subtitle}>
          Escaneie o QR Code no caixa ou finalize direto com o atendente.
        </Text>

        <View style={styles.qrBox}>
          <Ionicons name="qr-code" size={140} color="#4A2C2A" />
        </View>

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
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 18,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#4A2C2A",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#6A4E42",
    marginBottom: 20,
  },
  qrBox: {
    backgroundColor: "#F1E4D8",
    padding: 20,
    borderRadius: 15,
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
