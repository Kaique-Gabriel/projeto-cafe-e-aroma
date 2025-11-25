// ---------------- DetalhesPedido.js (VERSÃO ATUALIZADA E MELHORADA) ----------------

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useContext, useRef } from 'react';
import { CarrinhoContext } from '../context/CarrinhoContext';

export default function DetalhesPedido({ route, navigation }) {
  const { id, nome, preco, imagem } = route.params;

  const { adicionarItem } = useContext(CarrinhoContext);

  const scaleAnim = useRef(new Animated.Value(1)).current;

  function animateButton() {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.92, duration: 80, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 80, useNativeDriver: true }),
    ]).start();
  }

  function handleAddToCart() {
    animateButton();

    adicionarItem({
      id,
      nome,
      preco,
      imagem,
    });

    alert("Produto adicionado ao carrinho!");
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF8F0' }}>
      
      {/* -------- HEADER -------- */}
 

      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>

        {/* -------- IMAGEM DO PRODUTO -------- */}
        <Image source={imagem} style={styles.image} />

        {/* -------- NOME -------- */}
        <Text style={styles.title}>{nome}</Text>

        {/* -------- PREÇO -------- */}
        <Text style={styles.price}>R$ {Number(preco).toFixed(2)}</Text>

        {/* -------- DESCRIÇÃO TEMPORÁRIA -------- */}
        <Text style={styles.sectionTitle}>Descrição</Text>
        <Text style={styles.description}>
          Produto artesanal selecionado com carinho para garantir a melhor experiência.
          Ideal para acompanhar seu café da manhã ou café da tarde.
        </Text>

        {/* -------- BOTÃO ADICIONAR AO CARRINHO -------- */}
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
            <Feather name="shopping-cart" size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.buttonText}>Adicionar ao Carrinho</Text>
          </TouchableOpacity>
        </Animated.View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingTop: 10,
  },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  backBtn: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#4A2C2A',
    marginLeft: 10,
  },

  image: {
    width: '100%',
    height: 260,
    borderRadius: 18,
    marginTop: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    color: '#4A2C2A',
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 4,
    marginBottom: 14,
    color: '#C58B62',
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 6,
    fontWeight: '600',
    color: '#4A2C2A',
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#6E4E43',
    marginBottom: 22,
  },

  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C58B62',
    padding: 15,
    borderRadius: 14,
    marginBottom: 40,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
});
