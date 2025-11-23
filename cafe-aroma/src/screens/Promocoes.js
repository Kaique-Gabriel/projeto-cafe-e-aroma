// screens/Promocoes.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

export default function Promocoes() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Promoções</Text>

      <View style={styles.card}>
        <Image
          source={{ uri: 'https://placehold.co/600x400?text=Promoção+01' }}
          style={styles.image}
        />
        <Text style={styles.cardTitle}>Combo Café + Pão</Text>
        <Text style={styles.cardDesc}>
          Aproveite nosso combo especial com desconto exclusivo!
        </Text>
      </View>

      <View style={styles.card}>
        <Image
          source={{ uri: 'https://placehold.co/600x400?text=Promoção+02' }}
          style={styles.image}
        />
        <Text style={styles.cardTitle}>Café Gelado</Text>
        <Text style={styles.cardDesc}>
          Refresque seu dia com nosso café gelado da casa.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f4ef',
    padding: 16,
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4e342e',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4e342e',
  },
  cardDesc: {
    marginTop: 5,
    fontSize: 15,
    color: '#6d4c41',
  },
});
