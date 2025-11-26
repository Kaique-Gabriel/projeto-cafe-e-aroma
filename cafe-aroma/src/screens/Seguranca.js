// src/screens/Seguranca.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../context/UserContext";
import { Ionicons } from "@expo/vector-icons";

export default function Seguranca() {
  const navigation = useNavigation();
  const { user, updateUser } = useUser();

  const fadeAnim = useState(new Animated.Value(0))[0];

  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [passStrength, setPassStrength] = useState(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  function calcularForcaSenha(senha) {
    let pontos = 0;
    if (senha.length >= 6) pontos++;
    if (senha.length >= 10) pontos++;
    if (/[A-Z]/.test(senha)) pontos++;
    if (/[0-9]/.test(senha)) pontos++;
    if (/[^A-Za-z0-9]/.test(senha)) pontos++;
    setPassStrength(pontos);
  }

  function alterarSenha() {
    if (!oldPass || !newPass || !confirmPass) {
      alert("Preencha todos os campos.");
      return;
    }

    if (!user || !user.password) {
      alert("Erro: usuário não possui senha cadastrada.");
      return;
    }

    if (oldPass !== user.password) {
      alert("A senha atual está incorreta.");
      return;
    }

    if (passStrength < 3) {
      alert("Sua nova senha é muito fraca.");
      return;
    }

    if (newPass !== confirmPass) {
      alert("As senhas não coincidem.");
      return;
    }

    updateUser({ password: newPass });
    alert("Senha alterada com sucesso!");
    navigation.goBack();
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>

          <Text style={styles.title}>Segurança</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Alterar Senha</Text>

            {/* Senha atual */}
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Senha atual"
                secureTextEntry={!showOld}
                style={styles.input}
                value={oldPass}
                onChangeText={setOldPass}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowOld(!showOld)}
              >
                <Ionicons
                  name={showOld ? "eye-off" : "eye"}
                  size={22}
                  color="#7A5C47"
                />
              </TouchableOpacity>
            </View>

            {/* Nova senha */}
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Nova senha"
                secureTextEntry={!showNew}
                style={styles.input}
                value={newPass}
                onChangeText={(txt) => {
                  setNewPass(txt);
                  calcularForcaSenha(txt);
                }}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowNew(!showNew)}
              >
                <Ionicons
                  name={showNew ? "eye-off" : "eye"}
                  size={22}
                  color="#7A5C47"
                />
              </TouchableOpacity>
            </View>

            {/* Barra de força */}
            <View style={styles.strengthBar}>
              {[1, 2, 3, 4, 5].map((i) => (
                <View
                  key={i}
                  style={[
                    styles.strengthSegment,
                    { backgroundColor: passStrength >= i ? "#4CAF50" : "#D0BFAF" },
                  ]}
                />
              ))}
            </View>

            {/* Confirmar senha */}
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Confirmar nova senha"
                secureTextEntry={!showConfirm}
                style={styles.input}
                value={confirmPass}
                onChangeText={setConfirmPass}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowConfirm(!showConfirm)}
              >
                <Ionicons
                  name={showConfirm ? "eye-off" : "eye"}
                  size={22}
                  color="#7A5C47"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={alterarSenha}>
              <Text style={styles.saveText}>Alterar senha</Text>
            </TouchableOpacity>
          </View>

        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    backgroundColor: "#F6EFE7",
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    alignSelf: "center",
    marginBottom: 25,
    color: "#4C2E1E",
  },

  section: {
    marginBottom: 28,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    color: "#4C2E1E",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  input: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#C7B39A",
  },

  eyeButton: {
    position: "absolute",
    right: 14,
  },

  strengthBar: {
    flexDirection: "row",
    height: 8,
    marginBottom: 12,
  },

  strengthSegment: {
    flex: 1,
    marginHorizontal: 2,
    borderRadius: 4,
  },

  saveButton: {
    backgroundColor: "#6A4A3C",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },

  saveText: {
    color: "#FFF",
    fontSize: 17,
    fontWeight: "700",
  },
});
