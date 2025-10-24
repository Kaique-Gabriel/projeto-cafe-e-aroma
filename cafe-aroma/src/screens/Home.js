import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>☕</Text>
      <Text style={styles.title}>Café & Aroma</Text>
      <Text style={styles.subtitle}>Seu café da manhã em um toque!</Text>

      <TouchableOpacity style={styles.buttonPrimary} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSecondary} onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.buttonSecondaryText}>Criar conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5ebe0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 64,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6f4e37',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8c7051',
    marginBottom: 40,
  },
  buttonPrimary: {
    backgroundColor: '#6f4e37',
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonSecondary: {
    borderColor: '#6f4e37',
    borderWidth: 2,
    paddingVertical: 12,
    paddingHorizontal: 55,
    borderRadius: 25,
  },
  buttonSecondaryText: {
    color: '#6f4e37',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
