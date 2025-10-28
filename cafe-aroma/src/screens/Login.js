import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function Login({ onBack }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrar</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#7b4f33"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#7b4f33"
        secureTextEntry
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

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
    backgroundColor: '#fef7f2',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4b2e1e',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#7b4f33',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    fontSize: 16,
    color: '#4b2e1e',
  },
  button: {
    backgroundColor: '#7b4f33',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  backButton: {
    marginTop: 10,
  },
  backText: {
    color: '#7b4f33',
    fontSize: 16,
  },
});
