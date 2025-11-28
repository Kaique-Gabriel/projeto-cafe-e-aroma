import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
  Modal
} from 'react-native';

import { cadastrarUsuario, getUsuarioPorEmail } from '../utils/Auth';

export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  const fadeLogo = useRef(new Animated.Value(0)).current;
  const fadeContent = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeLogo, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(fadeContent, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  async function validarCadastro() {
    if (!nome.trim()) return showError("Por favor, insira seu nome.");
    if (!email.includes('@') || !email.includes('.'))
      return showError("Digite um e-mail válido.");
    if (senha.length < 6)
      return showError("A senha deve ter ao menos 6 caracteres.");
    if (senha !== confirmSenha)
      return showError("As senhas não coincidem.");

    const existente = await getUsuarioPorEmail(email);

    if (existente) return showError("Já existe uma conta com esse e-mail.");

    const ok = await cadastrarUsuario(nome, email, senha);

    if (ok) {
      setModalVisible(true);
    } else {
      showError("Erro inesperado ao cadastrar. Tente novamente.");
    }
  }

  function showError(msg) {
    return alert(msg);
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container}>
        
        <Animated.Image
          source={require('../../assets/images/icons/logo.png')}
          style={[styles.logo, { opacity: fadeLogo }]}
          resizeMode="contain"
        />

        <Animated.View style={{ width: '100%', opacity: fadeContent }}>
          <Text style={styles.title}>Criar Conta</Text>
          <Text style={styles.subtitle}>Cadastre-se e aproveite ☕</Text>

          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />

          <TextInput
            style={styles.input}
            placeholder="Confirmar Senha"
            value={confirmSenha}
            onChangeText={setConfirmSenha}
            secureTextEntry
          />

          <TouchableOpacity style={styles.btnPrimary} onPress={validarCadastro}>
            <Text style={styles.btnPrimaryText}>Criar Conta</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnSecondary}
            onPress={() => navigation.navigate('Welcome')}
          >
            <Text style={styles.btnSecondaryText}>Voltar</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* MODAL SUCESSO */}
        <Modal visible={modalVisible} transparent animationType="fade">
          <View style={styles.modalBackground}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>Conta criada!</Text>
              <Text style={styles.modalText}>
                Sua conta foi criada com sucesso ☕✨
              </Text>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('Login');
                }}
              >
                <Text style={styles.modalButtonText}>Ir para Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#F6EFE7",
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#4C2E1E",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: "#7A5C47",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#FFF",
    width: "100%",
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#C7B39A",
    fontSize: 15,
  },
  btnPrimary: {
    backgroundColor: "#6A4A3C",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 10,
  },
  btnPrimaryText: {
    color: "#FFF",
    fontSize: 17,
    fontWeight: "700",
  },
  btnSecondary: {
    marginTop: 14,
    paddingVertical: 14,
    alignItems: "center",
  },
  btnSecondaryText: {
    color: "#6A4A3C",
    fontSize: 15,
    fontWeight: "600",
  },

  // MODAL
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "80%",
    backgroundColor: "#FFF8F1",
    padding: 25,
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#D8C2A8",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#4C2E1E",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: "#6A4A3C",
    textAlign: "center",
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#6A4A3C",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  modalButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
