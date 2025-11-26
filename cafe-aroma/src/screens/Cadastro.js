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
  Alert,
} from 'react-native';

export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');

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

  function validarCadastro() {
    if (!nome.trim()) {
      return Alert.alert("Ops!", "Por favor, insira seu nome.");
    }

    if (!email.includes('@') || !email.includes('.')) {
      return Alert.alert("Email inválido", "Digite um email válido.");
    }

    if (senha.length < 6) {
      return Alert.alert("Senha fraca", "A senha deve ter pelo menos 6 caracteres.");
    }

    if (senha !== confirmSenha) {
      return Alert.alert("Senhas diferentes", "As senhas não coincidem.");
    }

    navigation.navigate('MainApp');
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0} 
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >

        <Animated.Image
          source={require('../../assets/images/icons/logo.png')}
          style={[styles.logo, { opacity: fadeLogo }]}
          resizeMode="contain"
        />

        <Animated.View style={{ width: '100%', opacity: fadeContent }}>
          <Text style={styles.title}>Criar Conta</Text>
          <Text style={styles.subtitle}>Cadastre-se e comece a aproveitar ☕</Text>

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
            keyboardType="email-address"
            autoCapitalize="none"
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

          <TouchableOpacity
            style={styles.btnPrimary}
            activeOpacity={0.8}
            onPress={validarCadastro}
          >
            <Text style={styles.btnPrimaryText}>Criar Conta</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnSecondary}
            onPress={() => navigation.navigate('Welcome')}
            activeOpacity={0.8}
          >
            <Text style={styles.btnSecondaryText}>Voltar</Text>
          </TouchableOpacity>
        </Animated.View>

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
    alignSelf: "center",
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
});
