import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  Animated,
  Vibration,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView
} from 'react-native';

import { loginUsuario } from '../utils/Auth'; // <-- usa a função de validação do Auth

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const fadeError = useRef(new Animated.Value(0)).current;
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

  const mostrarErro = (msg) => {
    setError(msg);
    Vibration.vibrate(50);

    fadeError.setValue(0);
    Animated.timing(fadeError, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  // VALIDAÇÃO com async/await usando loginUsuario do Auth.js
  const validarLogin = async () => {
    setError('');

    if (!email.trim() || !password.trim()) {
      return mostrarErro('Preencha todos os campos.');
    }

    const regexEmail = /\S+@\S+\.\S+/;
    if (!regexEmail.test(email)) {
      return mostrarErro('Digite um email válido.');
    }

    try {
      const res = await loginUsuario(email.trim(), password);
      if (!res.ok) {
        // res.msg vem do Auth.js (ex: "Email não encontrado." / "Senha incorreta.")
        return mostrarErro(res.msg || 'Erro ao logar.');
      }

      // Login OK → seguir para 2FA (mantendo seu fluxo)
      navigation.navigate('Codigo2FA', { email: email.trim() });

      // Se prefirar pular 2FA e ir direto para o app:
      // navigation.reset({ index: 0, routes: [{ name: 'MainApp' }] });
    } catch (e) {
      console.error('validarLogin error:', e);
      mostrarErro('Erro inesperado. Tente novamente.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.Image
            source={require('../../assets/images/icons/logo.png')}
            style={[styles.logo, { opacity: fadeLogo }]}
            resizeMode="contain"
          />

          <Animated.View style={{ width: '100%', opacity: fadeContent }}>
            <Text style={styles.title}>Entrar</Text>
            <Text style={styles.subtitle}>Acesse sua conta para continuar ☕</Text>

            <TextInput
              style={[styles.input]}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              style={[styles.input]}
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            {error !== '' && (
              <Animated.Text style={[styles.errorText, { opacity: fadeError }]}>
                {error}
              </Animated.Text>
            )}

            <TouchableOpacity
              style={styles.btnPrimary}
              activeOpacity={0.8}
              onPress={validarLogin}
            >
              <Text style={styles.btnPrimaryText}>Entrar</Text>
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
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    backgroundColor: '#f7e7d3',
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#4E342E',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6D4C41',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#D7CCC8',
  },
  errorText: {
    fontSize: 14,
    color: '#B71C1C',
    marginBottom: 10,
    textAlign: 'center',
  },
  btnPrimary: {
    width: '100%',
    backgroundColor: '#4E342E',
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 3,
  },
  btnPrimaryText: {
    color: '#F3E5D0',
    fontSize: 18,
    fontWeight: '700',
  },
  btnSecondary: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4E342E',
    marginBottom: 30,
  },
  btnSecondaryText: {
    color: '#4E342E',
    fontSize: 18,
    fontWeight: '700',
  },
});
