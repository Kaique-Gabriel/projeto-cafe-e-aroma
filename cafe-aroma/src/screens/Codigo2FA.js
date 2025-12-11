import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Modal,
  Animated
} from "react-native";

export default function Codigo2FA({ navigation }) {
  const codigoFixo = "123456";
  const [codigo, setCodigo] = useState("");

  // estados do alert customizado
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertAction, setAlertAction] = useState(null);

  function abrirAlert(titulo, mensagem, acao) {
    setAlertTitle(titulo);
    setAlertMessage(mensagem);
    setAlertAction(() => acao);
    setAlertVisible(true);
  }

  function validarCodigo() {
    if (codigo === codigoFixo) {
      abrirAlert(
        "☕ Código verificado!",
        "Seu acesso foi liberado com sucesso.\nBem-vindo ao Café & Aroma! ✨",
        () => {
          navigation.reset({
            index: 0,
            routes: [{ name: "MainApp" }],
          });
        }
      );
    } else {
      abrirAlert(
        "⚠️ Código incorreto",
        "O código informado não é válido.\nTente novamente, por favor. 🍃"
      );
    }
  }

  return (
    <>
      {/* alert personalizado */}
      <Modal transparent visible={alertVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.alertBox}>

            <Text style={styles.alertTitle}>{alertTitle}</Text>
            <Text style={styles.alertMessage}>{alertMessage}</Text>

            <TouchableOpacity
              style={styles.alertButton}
              onPress={() => {
                setAlertVisible(false);
                if (alertAction) alertAction();
              }}
            >
              <Text style={styles.alertButtonText}>
                OK
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            
            <View style={styles.container}>
              
              <Text style={styles.title}>🔐 Verificação 2FA</Text>
              <Text style={styles.subtitle}>Insira o código enviado:</Text>

              <Text style={styles.codeHint}>
                Código para teste: <Text style={{ fontWeight: "700" }}>123456</Text>
              </Text>

              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  value={codigo}
                  onChangeText={setCodigo}
                  keyboardType="numeric"
                  maxLength={6}
                  placeholder="000000"
                  placeholderTextColor="#aaa"
                />
              </View>

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
    </>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    padding: 30
  },

  title: { 
    fontSize: 32, 
    fontWeight: "700", 
    marginBottom: 10,
    color: "#4E342E"
  },

  subtitle: { 
    fontSize: 18, 
    marginBottom: 5, 
    color: "#333"
  },

  codeHint: {
    fontSize: 14,
    color: "#6A4F4B",
    marginBottom: 25
  },

  inputWrapper: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 5,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    marginBottom: 20,
  },

  input: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 12,
    fontSize: 22,
    textAlign: "center",
    color: "#333",
    letterSpacing: 6,
  },

  btn: {
    backgroundColor: "#4E342E",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    marginTop: 10,
  },

  btnText: { 
    color: "#fff", 
    fontSize: 18, 
    fontWeight: "700" 
  },

  btnVoltar: { 
    color: "#4E342E", 
    fontSize: 16, 
    marginTop: 15 
  },

  /* alert personalizado — Café & Aroma */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  alertBox: {
    width: "80%",
    backgroundColor: "#FAF6F2",
    padding: 25,
    borderRadius: 20,
    alignItems: "center",

    shadowColor: "#4E342E",
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 8,
  },

  alertTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#4E342E",
    marginBottom: 10,
    textAlign: "center",
  },

  alertMessage: {
    fontSize: 16,
    color: "#5A4A47",
    textAlign: "center",
    marginBottom: 20,
  },

  alertButton: {
    backgroundColor: "#4E342E",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
  },

  alertButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
