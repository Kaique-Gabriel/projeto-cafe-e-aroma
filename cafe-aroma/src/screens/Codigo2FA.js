import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform
} from "react-native";

export default function Codigo2FA({ navigation }) {
  const codigoFixo = "123456";
  const [codigo, setCodigo] = useState("");

  function validarCodigo() {
    if (codigo === codigoFixo) {
      navigation.reset({
        index: 0,
        routes: [{ name: "MainApp" }],
      });
    } else {
      Alert.alert("Código incorreto", "Tente novamente.");
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          
          <View style={styles.container}>
            <Text style={styles.title}>Verificação 2FA</Text>
            <Text style={styles.subtitle}>Digite o código: 123456</Text>

            <TextInput
              style={styles.input}
              value={codigo}
              onChangeText={setCodigo}
              keyboardType="numeric"
              maxLength={6}
              placeholder="000000"
            />

            <TouchableOpacity style={styles.btn} onPress={validarCodigo}>
              <Text style={styles.btnText}>Validar Código</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.btnVoltar}>Cancelar</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    padding: 20
  },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 10 },
  subtitle: { fontSize: 16, marginBottom: 20 },
  input: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    fontSize: 20,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
  },
  btn: {
    backgroundColor: "#4E342E",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 10,
  },
  btnText: { color: "#fff", fontSize: 18, fontWeight: "700" },
  btnVoltar: { color: "#4E342E", fontSize: 16, marginTop: 10 },
});
