// src/screens/Pedidos.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import theme from '../theme/theme';

export default function Pedidos() {
  const navigation = useNavigation();

  const cards = [
    {
      id: 'andamento',
      title: 'Pedidos em andamento',
      image: require('../../assets/cards/cafe.png'),
      screen: 'MeusPedidos',
    },
    {
      id: 'meuspedidos',
      title: 'Meus pedidos',
      image: require('../../assets/cards/paes.png'),
      screen: 'MeusPedidos',
    },
    {
      id: 'historico',
      title: 'Histórico',
      image: require('../../assets/cards/doces.png'),
      screen: 'MeusPedidos',
    },
    {
      id: 'promo',
      title: 'Promoções',
      image: require('../../assets/cards/promo.png'),
      screen: 'HomeApp',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Pedidos</Text>

      <View style={styles.cardContainer}>
        {cards.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => navigation.navigate(item.screen)}
          >
            <Image source={item.image} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: 20,
  },

  cardContainer: {
    flexDirection: 'column',
    gap: 20,
    marginBottom: 40,
  },

  card: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  cardImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },

  cardTitle: {
    padding: 14,
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
});
