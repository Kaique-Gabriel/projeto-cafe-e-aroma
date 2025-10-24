import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Pedidos() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📦 Meus Pedidos</Text>
      <Text style={styles.subtitle}>Você ainda não fez nenhum pedido.</Text>
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
    marginTop: 10,
    color: '#7b5b3e',
  },
});
