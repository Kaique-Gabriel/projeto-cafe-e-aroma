import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useFavoritos } from '../context/FavoritosContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../theme/theme';

export default function Favoritos() {
  const { favoritos, toggleFavorito } = useFavoritos();

  if (favoritos.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <MaterialCommunityIcons name="heart-outline" size={70} color={theme.colors.textSecondary} />
        <Text style={styles.emptyText}>Nenhum favorito ainda</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favoritos}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={item.imagem} style={styles.image} />

          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{item.nome}</Text>
            <Text style={styles.price}>R$ {item.preco.toFixed(2)}</Text>
          </View>

          <TouchableOpacity onPress={() => toggleFavorito(item)}>
            <MaterialCommunityIcons name="delete" size={28} color="#E53935" />
          </TouchableOpacity>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 16 },
  card: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
    alignItems: 'center',
  },
  image: { width: 60, height: 60, borderRadius: 10, marginRight: 14 },
  title: { fontSize: 16, fontWeight: '700', color: theme.colors.textPrimary },
  price: { fontSize: 14, marginTop: 6, color: theme.colors.primary },
  emptyContainer: {
    flex: 1, justifyContent: 'center', alignItems: 'center'
  },
  emptyText: {
    marginTop: 12, fontSize: 18, color: theme.colors.textSecondary
  }
});
