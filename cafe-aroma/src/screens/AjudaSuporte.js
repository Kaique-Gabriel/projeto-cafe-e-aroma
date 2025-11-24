import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AjudaSuporte() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajuda & Suporte</Text>

      <Text style={styles.sectionTitle}>Como podemos te ajudar?</Text>
      <Text style={styles.text}>
        • Problemas com pedidos{'\n'}
        • Falha ao efetuar login{'\n'}
        • Pagamentos e reembolsos{'\n'}
        • Sugestões e feedbacks
      </Text>

      <Text style={styles.sectionTitle}>Contato direto:</Text>
      <Text style={styles.text}>Email: suporte@cafeearoma.com</Text>
      <Text style={styles.text}>WhatsApp: (11) 99999-9999</Text>

      <Text style={styles.footer}>Responderemos o mais rápido possível 😊</Text>
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
    fontSize: 30,
    fontWeight: '700',
    color: '#4E342E',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4E342E',
    marginTop: 16,
  },
  text: {
    fontSize: 16,
    color: '#5C4033',
    marginTop: 6,
  },
  footer: {
    marginTop: 40,
    fontSize: 14,
    color: '#6D4C41',
    fontStyle: 'italic',
  },
});
