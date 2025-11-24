import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export default function HistoricoPedidos() {
  const historico = [
    { id: '1', titulo: 'Combo Especial', data: '15/11/2025', status: 'Entregue' },
    { id: '2', titulo: 'Café da Tarde', data: '10/11/2025', status: 'Cancelado' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico</Text>

      <FlatList
        data={historico}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.titulo}</Text>
            <Text style={styles.cardDate}>Dia {item.data}</Text>
            <Text style={[
              styles.cardStatus,
              { color: item.status === 'Entregue' ? '#2e8b57' : '#c0392b' }
            ]}>
              {item.status}
            </Text>
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
  cardStatus: {
    marginTop: 5,
    fontWeight: 'bold',
  },
});
