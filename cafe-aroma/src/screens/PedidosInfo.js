// screens/PedidosInfo.js
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import theme from '../theme/theme';

export default function PedidosInfo({ route }) {
  const { item } = route.params;

  const info = item.info || {}; // ← GARANTE QUE SEMPRE EXISTE

  return (
    <ScrollView style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }} // EVITA NAVBAR COMER A UI
>
      {item.imagem && (
        <Image source={item.imagem} style={styles.image} />
      )}

      <Text style={styles.title}>{item.nome}</Text>

      {item.preco !== undefined && (
        <Text style={styles.price}>R$ {Number(item.preco).toFixed(2)}</Text>
      )}

      {/* DESCRIÇÃO */}
      {info.descricao && (
        <>
          <Text style={styles.section}>Informações do Produto</Text>
          <Text style={styles.description}>{info.descricao}</Text>
        </>
      )}

      {/* CARACTERÍSTICAS */}
      {Array.isArray(info.caracteristicas) && info.caracteristicas.length > 0 && (
        <>
          <Text style={styles.section}>Características</Text>
          {info.caracteristicas.map((c, index) => (
            <Text key={index} style={styles.listItem}>• {c}</Text>
          ))}
        </>
      )}

      {/* ORIGEM */}
      {info.origem && (
        <>
          <Text style={styles.section}>Origem</Text>
          <Text style={styles.description}>{info.origem}</Text>
        </>
      )}

      {/* PESO */}
      {info.peso && (
        <>
          <Text style={styles.section}>Peso / Quantidade</Text>
          <Text style={styles.description}>{info.peso}</Text>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 16,
  },
  image: {
    width: '100%',
    height: 260,
    borderRadius: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  price: {
    fontSize: 20,
    marginBottom: 16,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  section: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  description: {
    fontSize: 15,
    color: theme.colors.textSecondary,
    lineHeight: 20,
    marginTop: 6,
  },
  listItem: {
    fontSize: 15,
    marginLeft: 6,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
});
