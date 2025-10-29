// src/screens/MeusPedidos.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function MeusPedidos({ onNavigate }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Pedidos</Text>
      <Text style={styles.subtitle}>Histórico dos seus pedidos ☕</Text>
      <Text style={styles.text}>Você ainda não fez nenhum pedido real.</Text>

      <TouchableOpacity
        style={[styles.button, styles.primary]}
        onPress={() => onNavigate('homeApp')}
      >
        <Text style={styles.buttonText}>Voltar para o início</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7efe6',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#4b2e1e',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6e4f36',
    marginBottom: 6,
    textAlign: 'center',
  },
  text: {
    color: '#8b6f51',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 25,
    marginVertical: 8,
  },
  primary: {
    backgroundColor: '#7b4f33',
  },
  buttonText: {
    fontWeight: '700',
    color: '#fff',
    fontSize: 16,
  },
});
