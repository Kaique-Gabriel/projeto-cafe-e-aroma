import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SobreApp() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sobre o Café & Aroma</Text>

      <Text style={styles.text}>
        O Café & Aroma é um aplicativo criado para trazer até você o melhor café da manhã e café da
        tarde da sua região, com praticidade, conforto e rapidez.
      </Text>

      <Text style={styles.section}>Versão atual:</Text>
      <Text style={styles.text}>2.0.1</Text>

      <Text style={styles.section}>Desenvolvido por:</Text>
      <Text style={styles.text}>Kaique Gabriel</Text>

      <Text style={styles.footer}>
        Obrigado por usar o Café & Aroma! Esperamos que sua experiência seja deliciosa ☕✨
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3E5D0',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#4E342E',
    marginBottom: 15,
  },
  text: {
    fontSize: 17,
    color: '#5C4033',
    marginBottom: 10,
    lineHeight: 24,
  },
  section: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4E342E',
    marginTop: 20,
  },
  footer: {
    marginTop: 40,
    fontSize: 15,
    color: '#6D4C41',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
