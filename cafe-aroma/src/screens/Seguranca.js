// src/screens/Seguranca.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
  Switch,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../context/UserContext";

export default function Seguranca() {
  const navigation = useNavigation();
  const { theme, toggleTheme, userData, updateUserData } = useUser();

  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
    }).start();
  }, []);

  // Troca de senha
  function alterarSenha() {
    if (!oldPass || !newPass || !confirmPass) {
      alert("Preencha todos os campos.");
      return;
    }

    if (oldPass !== userData.password) {
      alert("A senha atual está incorreta.");
      return;
    }

    if (newPass.length < 6) {
      alert("A nova senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (newPass !== confirmPass) {
      alert("As senhas não coincidem.");
      return;
    }

    updateUserData({ password: newPass });

    alert("Senha alterada com sucesso!");
    navigation.goBack();
  }

  const isDark = theme === "dark";

  return (
    <Animated.View
      style={[
        styles.container,
        { opacity: fadeAnim, backgroundColor: isDark ? "#1E1A18" : "#F4EEE9" },
      ]}
    >
      <Text style={[styles.title, { color: isDark ? "#FFE8D6" : "#4C2E1E" }]}>
        Segurança
      </Text>

      {/* TEMA */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? "#E9D7C4" : "#4C2E1E" }]}>
          Tema do Aplicativo
        </Text>

        <View style={styles.themeRow}>
          <Text style={[styles.themeLabel, { color: isDark ? "#E9D7C4" : "#4C2E1E" }]}>
            Modo escuro
          </Text>
          <Switch value={isDark} onValueChange={toggleTheme} />
        </View>
      </View>

      {/* SENHA */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? "#E9D7C4" : "#4C2E1E" }]}>
          Alterar Senha
        </Text>

        <TextInput
          placeholder="Senha atual"
          placeholderTextColor={isDark ? "#C4B6A6" : "#8C7B6A"}
          secureTextEntry
          style={[
            styles.input,
            {
              backgroundColor: isDark ? "#2A2421" : "#FFF",
              color: isDark ? "#FFF" : "#000",
            },
          ]}
          value={oldPass}
          onChangeText={setOldPass}
        />

        <TextInput
          placeholder="Nova senha"
          placeholderTextColor={isDark ? "#C4B6A6" : "#8C7B6A"}
          secureTextEntry
          style={[
            styles.input,
            {
              backgroundColor: isDark ? "#2A2421" : "#FFF",
              color: isDark ? "#FFF" : "#000",
            },
          ]}
          value={newPass}
          onChangeText={setNewPass}
        />

        <TextInput
          placeholder="Confirmar nova senha"
          placeholderTextColor={isDark ? "#C4B6A6" : "#8C7B6A"}
          secureTextEntry
          style={[
            styles.input,
            {
              backgroundColor: isDark ? "#2A2421" : "#FFF",
              color: isDark ? "#FFF" : "#000",
            },
          ]}
          value={confirmPass}
          onChangeText={setConfirmPass}
        />

        <TouchableOpacity style={styles.saveButton} onPress={alterarSenha}>
          <Text style={styles.saveText}>Alterar senha</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    alignSelf: "center",
    marginBottom: 25,
  },

  section: {
    marginBottom: 28,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },

  themeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF33",
    borderRadius: 12,
  },

  themeLabel: {
    fontSize: 16,
    fontWeight: "600",
  },

  input: {
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#C7B39A",
  },

  saveButton: {
    backgroundColor: "#6A4A3C",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 4,
  },

  saveText: {
    color: "#FFF",
    fontSize: 17,
    fontWeight: "700",
  },
});
