// screens/PedidosInfo.js
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import theme from '../theme/theme';

export default function PedidosInfo({ route }) {
  const { item } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={item.imagem} style={styles.image} />

      <Text style={styles.title}>{item.nome}</Text>
      <Text style={styles.price}>R$ {item.preco.toFixed(2)}</Text>

      <Text style={styles.section}>Informações do Produto</Text>
      <Text style={styles.description}>{item.info.descricao}</Text>

      <Text style={styles.section}>Características</Text>
      {item.info.caracteristicas.map((c, index) => (
        <Text key={index} style={styles.listItem}>• {c}</Text>
      ))}

      {item.info.origem && (
        <>
          <Text style={styles.section}>Origem</Text>
          <Text style={styles.description}>{item.info.origem}</Text>
        </>
      )}

      {item.info.peso && (
        <>
          <Text style={styles.section}>Peso / Quantidade</Text>
          <Text style={styles.description}>{item.info.peso}</Text>
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
