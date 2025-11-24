// src/screens/MeusPedidos.js
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import theme from '../theme/theme';

export default function MeusPedidos() {
  const navigation = useNavigation();

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

  // Cores dinâmicas do status
  const getStatusColor = (status) => {
    if (status === "Entregue") return "#4CAF50";
    if (status === "A caminho") return "#FFA726";
    if (status === "Preparando") return "#29B6F6";
    return theme.colors.textPrimary;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Pedidos</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {meusPedidos.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => navigation.navigate("DetalhesPedido", { pedido: item })}
          >
            <Image source={item.img} style={styles.img} />

            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.titulo}</Text>

              <Text style={styles.cardPrice}>{item.preco}</Text>

              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(item.status) + "22" },
                  { borderColor: getStatusColor(item.status) },
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    { color: getStatusColor(item.status) },
                  ]}
                >
                  {item.status}
                </Text>
              </View>
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
    paddingTop: 30,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: theme.colors.textPrimary,
    marginBottom: 20,
  },

  card: {
    flexDirection: "row",
    backgroundColor: theme.colors.cardBackground,
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    alignItems: "center",

    // sombra premium
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.14,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  img: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 14,

    shadowColor: "#000",
    shadowOpacity: 0.20,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },

  cardContent: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.textPrimary,
    marginBottom: 6,
  },

  cardPrice: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.colors.textSecondary,
    marginBottom: 8,
  },

  statusBadge: {
    alignSelf: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1.5,
  },

  statusText: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});
