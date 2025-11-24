import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function Promocoes() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Promoções</Text>

      <View style={styles.card}>
        <Image
          source={{ uri: 'https://i.imgur.com/Fp0xO4b.png' }}
          style={styles.img}
        />
        <Text style={styles.cardTitle}>Combo Dois por Um</Text>
        <Text style={styles.cardDesc}>
          Peça 1 combo e ganhe o segundo pela metade do preço!
        </Text>
      </View>

      <View style={styles.card}>
        <Image
          source={{ uri: 'https://i.imgur.com/2nCt3Sbl.png' }}
          style={styles.img}
        />
        <Text style={styles.cardTitle}>Café Especial</Text>
        <Text style={styles.cardDesc}>
          20% OFF em qualquer café premium por tempo limitado.
        </Text>
      </View>

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
    borderRadius: 16,
    padding: 15,
    marginBottom: 25,
    elevation: 4,
  },
  img: {
    width: '100%',
    height: 140,
    borderRadius: 12,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  cardDesc: {
    marginTop: 5,
    color: '#444',
  },
});
