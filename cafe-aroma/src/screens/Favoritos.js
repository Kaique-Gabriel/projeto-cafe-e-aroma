import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Favoritos() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favoritos</Text>
      <Text style={styles.text}>Você ainda não adicionou nenhum item aos favoritos.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3E5D0',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#4E342E',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#5C4033',
    textAlign: 'center',
  },
});
