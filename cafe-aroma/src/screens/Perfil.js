import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function Perfil({ onNavigate }) {
  const handleVoltar = () => {
    onNavigate('homeApp');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meu Perfil</Text>
      </View>

      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>João da Silva</Text>
        <Text style={styles.email}>joao.silva@example.com</Text>
      </View>

      <View style={styles.options}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Editar Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.logoutButton]}>
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={handleVoltar}>
        <Text style={styles.backText}>← Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F2',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    position: 'absolute',
    top: 50,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#6B4226',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 60,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#E7BFAE',
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    color: '#6B4226',
  },
  email: {
    fontSize: 16,
    color: '#8C6A4A',
    marginTop: 5,
  },
  options: {
    width: '100%',
    alignItems: 'center',
    gap: 15,
  },
  button: {
    backgroundColor: '#E7BFAE',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 20,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  logoutButton: {
    backgroundColor: '#D17A66',
  },
  buttonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '600',
  },
  backButton: {
    position: 'absolute',
    bottom: 40,
  },
  backText: {
    color: '#6B4226',
    fontSize: 16,
  },
});
