// src/screens/Login.js
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function Login({ onBack }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrar</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#A78C7A"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#A78C7A"
        secureTextEntry
      />

      {/* Botão principal */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginText}>Entrar</Text>
      </TouchableOpacity>

      {/* Voltar */}
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1B1A1A', // fundo escuro elegante
    padding: 25,
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#D9C5A3', // creme café suave
    marginBottom: 30,
  },

  input: {
    width: '85%',
    backgroundColor: '#2A2727', // caixa escura
    borderWidth: 1,
    borderColor: '#7A4E2F', // contorno café
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    fontSize: 16,
    color: '#E6D5BD', // texto claro
  },

  loginButton: {
    width: '85%',
    backgroundColor: '#7A4E2F', // marrom café
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
  },

  loginText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },

  backButton: {
    marginTop: 15,
    padding: 10,
  },

  backText: {
    color: '#B8A48A',
    fontSize: 16,
    fontWeight: '600',
  },
});
