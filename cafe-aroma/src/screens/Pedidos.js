// src/screens/Pedidos.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Pedidos({ onNavigate }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>☕ Detalhes do Pedido</Text>

      <Text style={styles.subtitle}>
        Aqui você verá o resumo e a confirmação do seu pedido.
      </Text>

      {/* Botão principal */}
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => onNavigate('meusPedidos')}
      >
        <Text style={styles.primaryText}>Ver Meus Pedidos</Text>
      </TouchableOpacity>

      {/* Botão secundário */}
      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => onNavigate('homeApp')}
      >
        <Text style={styles.secondaryText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B1A1A', // fundo escuro elegante
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#D9C5A3', // marrom claro café
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#B8A48A',
    textAlign: 'center',
    marginBottom: 35,
    lineHeight: 22,
  },

  // Botão principal
  primaryButton: {
    width: '80%',
    backgroundColor: '#7A4E2F', // marrom elegante
    paddingVertical: 14,
    borderRadius: 18,
    marginBottom: 15,
    alignItems: 'center',
  },
  primaryText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 17,
  },

  // Botão secundário
  secondaryButton: {
    width: '80%',
    borderWidth: 2,
    borderColor: '#7A4E2F',
    paddingVertical: 14,
    borderRadius: 18,
    alignItems: 'center',
  },
  secondaryText: {
    color: '#D9C5A3',
    fontWeight: '700',
    fontSize: 17,
  },
});
