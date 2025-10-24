import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Perfil() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤 Perfil do Usuário</Text>
      <Text style={styles.subtitle}>Nome: João da Silva</Text>
      <Text style={styles.subtitle}>E-mail: joao@example.com</Text>
      <Text style={styles.subtitle}>Membro desde: 2025</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff7f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4b2e1e',
  },
  subtitle: {
    marginTop: 8,
    color: '#7b5b3e',
  },
});
