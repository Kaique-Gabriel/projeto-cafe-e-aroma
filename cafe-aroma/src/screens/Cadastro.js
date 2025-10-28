import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Cadastro({ onNavigate }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <Text style={styles.text}>Tela de cadastro simulada</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => onNavigate('home')}>
        <Text style={styles.buttonText}>Voltar</Text>
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
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#4b2e1e',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#7b4f33',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#7b4f33',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
