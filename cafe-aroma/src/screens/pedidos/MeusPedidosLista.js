import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export default function MeusPedidosLista() {
  const pedidos = [
    { id: '1', titulo: 'Café Tradicional', data: '22/11/2025' },
    { id: '2', titulo: 'Café com Croissant', data: '21/11/2025' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Pedidos</Text>

      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.titulo}</Text>
            <Text style={styles.cardDate}>Realizado em {item.data}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7F0',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 12,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  cardDate: {
    marginTop: 5,
    color: '#555',
  },
});
