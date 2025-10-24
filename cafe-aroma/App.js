import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function App() {
  const [screen, setScreen] = useState('home');

  const renderScreen = () => {
    switch (screen) {
      case 'home':
        return (
          <View style={styles.container}>
            <Text style={styles.title}>☕ Café & Aroma</Text>
            <Image
              source={{ uri: 'https://i.imgur.com/yQpO2Ax.png' }}
              style={styles.image}
            />
            <Text style={styles.subtitle}>Seu café da manhã em um toque!</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setScreen('login')}>
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.outline]}
              onPress={() => setScreen('cadastro')}>
              <Text style={[styles.buttonText, styles.outlineText]}>
                Criar conta
              </Text>
            </TouchableOpacity>
          </View>
        );

      case 'login':
        return (
          <View style={styles.container}>
            <Text style={styles.title}>Entrar</Text>
            <Text style={styles.text}>Tela de login simulada</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setScreen('home')}>
              <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
          </View>
        );

      case 'cadastro':
        return (
          <View style={styles.container}>
            <Text style={styles.title}>Cadastro</Text>
            <Text style={styles.text}>Tela de cadastro simulada</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setScreen('home')}>
              <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
          </View>
        );

      default:
        return <Text>Erro ao carregar a tela</Text>;
    }
  };

  return <View style={styles.main}>{renderScreen()}</View>;
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fef7f2',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#4b2e1e',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#7b4f33',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#7b4f33',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#7b4f33',
  },
  outlineText: {
    color: '#7b4f33',
  },
  text: {
    color: '#4b2e1e',
    fontSize: 16,
    marginBottom: 20,
  },
});
