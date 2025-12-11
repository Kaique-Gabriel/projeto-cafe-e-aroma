// src/screens/Login.js
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Vibration,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons'; // <- usamos vector icons
import { loginUsuario } from '../utils/Auth'; // <-- usa a função de validação do Auth

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // novo: controla se a senha está visível
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState('');

  // animações já existentes (refatorei para usar uma sequência mais fluida)
  const fadeError = useRef(new Animated.Value(0)).current;
  const fadeLogo = useRef(new Animated.Value(0)).current;
  const fadeContent = useRef(new Animated.Value(0)).current;
  const slideContent = useRef(new Animated.Value(10)).current; // para slide-up leve

  // animação do ícone do olho
  const eyeScale = useRef(new Animated.Value(1)).current;

  // animação do botão Entrar (press)
  const btnScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // animação de entrada: logo -> conteúdo (fade + slide)
    Animated.sequence([
      Animated.timing(fadeLogo, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.parallel([
        Animated.timing(fadeContent, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(slideContent, { toValue: 0, duration: 500, useNativeDriver: true }),
      ]),
    ]).start();
  }, []);

  const mostrarErro = (msg) => {
    setError(msg);
    Vibration.vibrate(50);

    fadeError.setValue(0);
    Animated.timing(fadeError, {
      toValue: 1,
      duration: 220,
      useNativeDriver: true,
    }).start();
  };

  // validação com async/await usando loginUsuario do Auth.js
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
        // mensagem do Auth.js caso invalido (ex: "Email não encontrado." / "Senha incorreta.")
        return mostrarErro(res.msg || 'Erro ao logar.');
      }

      // Login OK → seguir para 2FA (mantendo seu fluxo)
      navigation.navigate('Codigo2FA', { email: email.trim() });

    } catch (e) {
      console.error('validarLogin error:', e);
      mostrarErro('Erro inesperado. Tente novamente.');
    }
  };

  // toggles
  function toggleShowPassword() {
    // animação pequena no olho
    Animated.sequence([
      Animated.timing(eyeScale, { toValue: 0.88, duration: 100, useNativeDriver: true }),
      Animated.timing(eyeScale, { toValue: 1.05, duration: 140, useNativeDriver: true }),
      Animated.timing(eyeScale, { toValue: 1, duration: 80, useNativeDriver: true }),
    ]).start();

    setShowPassword((s) => !s);
  }

  // animação do botão "Entrar" ao pressionar
  function onPressInButton() {
    Animated.spring(btnScale, { toValue: 0.96, useNativeDriver: true, friction: 7 }).start();
  }
  function onPressOutButton() {
    Animated.spring(btnScale, { toValue: 1, useNativeDriver: true, friction: 7 }).start();
  }

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
          {/* LOGO (fade) */}
          <Animated.Image
            source={require('../../assets/images/icons/logo.png')}
            style={[styles.logo, { opacity: fadeLogo }]}
            resizeMode="contain"
          />

          {/* CONTENT (fade + slide) */}
          <Animated.View
            style={{
              width: '100%',
              opacity: fadeContent,
              transform: [{ translateY: slideContent }],
            }}
          >
            <Text style={styles.title}>Entrar</Text>
            <Text style={styles.subtitle}>Acesse sua conta para continuar ☕</Text>

            <TextInput
              style={[styles.input]}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor="#9E8275"
            />

            {/* Campo senha com botão olho */}
            <View style={styles.passwordWrap}>
              <TextInput
                style={[styles.input, { paddingRight: 50 }]} // espaço para o olho
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                placeholderTextColor="#9E8275"
              />

              <Animated.View style={[styles.eyeBtnWrap, { transform: [{ scale: eyeScale }] }]}>
                <TouchableOpacity
                  onPress={toggleShowPassword}
                  activeOpacity={0.8}
                  accessible
                  accessibilityLabel={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  <MaterialIcons
                    name={showPassword ? 'visibility' : 'visibility-off'}
                    size={22}
                    color="#4E342E"
                  />
                </TouchableOpacity>
              </Animated.View>
            </View>

            {/* erro (fade) */}
            {error !== '' && (
              <Animated.Text style={[styles.errorText, { opacity: fadeError }]}>
                {error}
              </Animated.Text>
            )}

            {/* botão Entrar com animação */}
            <Animated.View style={{ transform: [{ scale: btnScale }] }}>
              <TouchableOpacity
                style={styles.btnPrimary}
                activeOpacity={0.85}
                onPress={validarLogin}
                onPressIn={onPressInButton}
                onPressOut={onPressOutButton}
              >
                <Text style={styles.btnPrimaryText}>Entrar</Text>
              </TouchableOpacity>
            </Animated.View>

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
    marginBottom: 22,
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
    color: '#4A2C2A',
  },

  /* wrapper do campo de senha para posicionar o olho */
  passwordWrap: {
    width: '100%',
    position: 'relative',
  },
  eyeBtnWrap: {
    position: 'absolute',
    right: 14,
    top: 14,
    height: 32,
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
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
