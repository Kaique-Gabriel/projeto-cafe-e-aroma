// src/screens/MeusPedidos.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import theme from '../theme/theme';

export default function MeusPedidos() {
  const navigation = useNavigation();

  // Exemplo de pedidos (depois podemos puxar da API)
  const meusPedidos = [
    {
      id: 1,
      titulo: "Cappuccino Cremoso",
      preco: "R$ 12,90",
      status: "Entregue",
      img: require('../../assets/cards/cafe.png'),
    },
    {
      id: 2,
      titulo: "Croissant de Chocolate",
      preco: "R$ 9,50",
      status: "A caminho",
      img: require('../../assets/cards/doces.png'),
    },
    {
      id: 3,
      titulo: "Combo Café + Pão",
      preco: "R$ 19,90",
      status: "Preparando",
      img: require('../../assets/cards/paes.png'),
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Pedidos</Text>

      <ScrollView style={{ width: "100%" }} contentContainerStyle={{ paddingBottom: 30 }}>

        {meusPedidos.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => navigation.navigate("DetalhesPedido", { pedido: item })}
          >
            <Image source={item.img} style={styles.img} />

            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{item.titulo}</Text>
              <Text style={styles.cardPrice}>{item.preco}</Text>
              <Text style={styles.cardStatus}>Status: {item.status}</Text>
            </View>
          </TouchableOpacity>
        ))}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 18,
    paddingTop: 50,
  },
  title: {
    ...theme.text.title,
    marginBottom: 20,
    textAlign: "left",
  },
  card: {
    flexDirection: "row",
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    marginBottom: 14,
    alignItems: "center",
    ...theme.shadows.card,
  },
  img: {
    width: 70,
    height: 70,
    borderRadius: theme.radius.sm,
    marginRight: 12,
  },
  cardTitle: {
    ...theme.text.subtitle,
    marginBottom: 4,
  },
  cardPrice: {
    ...theme.text.body,
    marginBottom: 4,
  },
  cardStatus: {
    ...theme.text.small,
    opacity: 0.7,
  },
});
