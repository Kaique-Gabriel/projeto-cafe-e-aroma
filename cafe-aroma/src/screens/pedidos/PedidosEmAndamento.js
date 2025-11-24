// src/screens/PedidosEmAndamento.js
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import theme from '../../theme/theme';

export default function PedidosEmAndamento() {
  const pedidos = [
    {
      id: 1,
      titulo: "Croissant Recheado",
      status: "Preparando",
      img: require('../../../assets/cards/paes.png'),
    },
    {
      id: 2,
      titulo: "Café Expresso Duplo",
      status: "A caminho",
      img: require('../../../assets/cards/cafe.png'),
    },
  ];

  // Cores dinâmicas
  const getStatusColor = (status) => {
    if (status === "A caminho") return "#FFA726";
    if (status === "Preparando") return "#29B6F6";
    return theme.colors.textPrimary;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pedidos em Andamento</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {pedidos.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image source={item.img} style={styles.img} />

            <View style={styles.info}>
              <Text style={styles.cardTitle}>{item.titulo}</Text>

              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor: getStatusColor(item.status) + "22",
                    borderColor: getStatusColor(item.status),
                  },
                ]}
              >
                <Text
                  style={[
                    styles.badgeText,
                    { color: getStatusColor(item.status) },
                  ]}
                >
                  {item.status}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// ESTILOS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 20,
    paddingTop: 28,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: theme.colors.textPrimary,
    marginBottom: 20,
  },

  card: {
    backgroundColor: theme.colors.cardBackground,
    marginBottom: 16,
    padding: 12,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",

    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  img: {
    width: 75,
    height: 75,
    borderRadius: 12,
    marginRight: 12,
  },

  info: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.textPrimary,
    marginBottom: 8,
  },

  badge: {
    alignSelf: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1.5,
  },

  badgeText: {
    fontWeight: "700",
  },
});
