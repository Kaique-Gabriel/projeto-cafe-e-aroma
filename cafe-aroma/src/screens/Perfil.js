// src/screens/Perfil.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function Perfil({ onBack, onNavigate }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu Perfil</Text>

      {/* Foto de perfil */}
      <View style={styles.profileWrapper}>
        <Image
          source={{ uri: "https://i.imgur.com/4ZQZ4Zg.png" }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Usuário</Text>
        <Text style={styles.profileEmail}>email@exemplo.com</Text>
      </View>

      {/* Botões */}
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => onNavigate && onNavigate("EditarPerfil")}
        >
          <Text style={styles.optionText}>Editar Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => onNavigate && onNavigate("Enderecos")}
        >
          <Text style={styles.optionText}>Meus Endereços</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => onNavigate && onNavigate("Seguranca")}
        >
          <Text style={styles.optionText}>Segurança</Text>
        </TouchableOpacity>
      </View>

      {/* Botão voltar */}
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

// ----- estilos -----
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B1A1A",
    padding: 25,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#D9C5A3",
    alignSelf: "center",
    marginBottom: 25,
  },

  profileWrapper: {
    alignItems: "center",
    marginBottom: 25,
  },

  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#7A4E2F",
  },

  profileName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#E6D5BD",
    marginTop: 10,
  },

  profileEmail: {
    fontSize: 16,
    color: "#B8A48A",
  },

  buttons: {
    marginTop: 20,
  },

  option: {
    backgroundColor: "#2A2727",
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#7A4E2F",
    marginBottom: 15,
  },

  optionText: {
    color: "#E6D5BD",
    fontSize: 16,
    fontWeight: "600",
  },

  backButton: {
    marginTop: 20,
    alignSelf: "center",
  },

  backText: {
    color: "#B8A48A",
    fontSize: 16,
    fontWeight: "600",
  },
});
