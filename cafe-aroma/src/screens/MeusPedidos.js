// src/screens/MeusPedidos.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function MeusPedidos({ onNavigate }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Pedidos</Text>

      <Text style={styles.subtitle}>Histórico dos seus pedidos ☕</Text>

      <Text style={styles.text}>
        Você ainda não fez nenhum pedido real.
      </Text>

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
    backgroundColor: '#1C1209', // fundo escuro café premium
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#F3E5D0', // bege claro premium
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    color: '#D5C3A4', // bege médio suave
    marginBottom: 6,
    textAlign: 'center',
  },

  text: {
    color: '#C7B8A2',
    textAlign: 'center',
    marginBottom: 25,
    fontSize: 14,
  },

  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginVertical: 8,
  },

  primary: {
    backgroundColor: '#5A3E2B', // marrom médio elegante
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },

  buttonText: {
    fontWeight: '700',
    color: '#F3E5D0',
    fontSize: 16,
  },
});
