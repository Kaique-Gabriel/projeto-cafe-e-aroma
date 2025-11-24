// src/screens/Pedidos.js
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
} from 'react-native';
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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Meus Pedidos</Text>

      <View style={styles.cardContainer}>
        {cards.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => navigation.navigate(item.screen)}
          >
            <View style={styles.imageWrapper}>
              <Image source={item.image} style={styles.cardImage} />
              <View style={styles.overlay} />
            </View>

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
    paddingHorizontal: 18,
    paddingTop: 28,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: 25,
    letterSpacing: 0.5,
  },

  cardContainer: {
    flexDirection: 'column',
    gap: 24,
    marginBottom: 80,
  },

  card: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: 18,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },

  imageWrapper: {
    width: '100%',
    height: 160,
    position: 'relative',
  },

  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.08)',
  },

  cardTitle: {
    padding: 16,
    fontSize: 19,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
});
