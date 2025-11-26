import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function Codigo2FA({ route, navigation }) {
  const { codigoGerado, email } = route.params;

  const [codigoDigitado, setCodigoDigitado] = useState("");
  const [erro, setErro] = useState("");

  const validarCodigo = () => {
    if (codigoDigitado === codigoGerado) {
      navigation.replace("HomeApp");
    } else {
      setErro("Código incorreto. Tente novamente.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Confirmação de 2FA</Text>
      <Text style={styles.subtitulo}>
        Enviamos um código de 6 dígitos para o e-mail:
      </Text>
      <Text style={styles.email}>{email}</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o código"
        keyboardType="numeric"
        maxLength={6}
        value={codigoDigitado}
        onChangeText={setCodigoDigitado}
      />

      {erro.length > 0 && <Text style={styles.erro}>{erro}</Text>}

      <TouchableOpacity onPress={validarCodigo} style={styles.botao}>
        <Text style={styles.txtBotao}>Confirmar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, justifyContent: "center" },
  titulo: { fontSize: 28, fontWeight: "bold", marginBottom: 10 },
  subtitulo: { color: "#666", fontSize: 16 },
  email: { fontSize: 16, fontWeight: "500", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    fontSize: 20,
    marginBottom: 15,
    textAlign: "center",
  },
  erro: { color: "red", marginBottom: 10 },
  botao: {
    backgroundColor: "#8B4513",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  txtBotao: { color: "white", fontSize: 18, fontWeight: "bold" },
});
