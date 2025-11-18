import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Animated,
  Easing
} from 'react-native';

export default function Cadastro({ onNavigate }) {
  const [fadeAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>

      <Text style={styles.title}>Crie sua conta</Text>
      <Text style={styles.subtitle}>Preencha os campos abaixo</Text>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome completo"
          placeholderTextColor="#b8a999"
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#b8a999"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          placeholderTextColor="#b8a999"
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={() => onNavigate('home')}
      >
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onNavigate('home')}
        style={styles.backButton}
      >
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>

    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', 
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#e4d7c5',
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 15,
    color: '#c7b8a4',
    marginBottom: 25,
  },

  formContainer: {
    width: '100%',
    marginBottom: 25,
  },

  input: {
    backgroundColor: '#1e1e1e',
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderRadius: 12,
    color: '#fff',
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#3a2f28', // detalhe café elegante
  },

  button: {
    backgroundColor: '#8b5e3c', 
    width: '100%',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#8b5e3c',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  backButton: {
    paddingVertical: 5,
  },

  backText: {
    color: '#c7b8a4',
    fontSize: 15,
  },
});
