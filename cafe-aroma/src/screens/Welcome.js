import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Welcome({ navigation }) {
  return (
    <LinearGradient
      colors={['#f7e7d3', '#f0d5aa', '#eac08a']}
      style={styles.container}
    >

      {/* LOGO */}
      <Image
        source={require('../../assets/images/icons/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* TÍTULO */}
      <Text style={styles.title}>Café & Aroma</Text>
      <Text style={styles.subtitle}>O sabor que desperta o seu dia ☕</Text>

      {/* ILUSTRAÇÃO (PODE TROCAR DEPOIS) */}

      {/* BOTÃO ENTRAR */}
      <TouchableOpacity
        style={styles.btnPrimary}
        onPress={() => navigation.navigate('Login')}
        activeOpacity={0.8}
      >
        <Text style={styles.btnPrimaryText}>Entrar</Text>
      </TouchableOpacity>

      {/* BOTÃO CADASTRAR */}
      <TouchableOpacity
        style={styles.btnSecondary}
        onPress={() => navigation.navigate('Cadastro')}
        activeOpacity={0.8}
      >
        <Text style={styles.btnSecondaryText}>Criar Conta</Text>
      </TouchableOpacity>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop: 80,
  },

  logo: {
    width: 160,
    height: 160,
    marginBottom: 5,
  },

  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#4E342E',
    marginTop: 10,
  },

  subtitle: {
    fontSize: 17,
    color: '#6D4C41',
    marginBottom: 25,
  },

  illustration: {
    width: '100%',
    height: 250,
    marginBottom: 40,
  },

  btnPrimary: {
    width: '85%',
    backgroundColor: '#4E342E',
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 4,
  },

  btnPrimaryText: {
    color: '#F3E5D0',
    fontSize: 18,
    fontWeight: '700',
  },

  btnSecondary: {
    width: '85%',
    backgroundColor: '#F3E5D0',
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4E342E',
  },

  btnSecondaryText: {
    color: '#4E342E',
    fontSize: 18,
    fontWeight: '700',
  },
});
