import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function HomeApp({ onNavigate }) {
  const [promos] = useState([
    { id: 'p1', title: 'Café da Manhã Especial', img: 'https://i.imgur.com/dcA8X3j.jpg' },
    { id: 'p2', title: 'Combo Croissant + Café', img: 'https://i.imgur.com/yQpO2Ax.png' },
    { id: 'p3', title: 'Descontos do Dia ☕', img: 'https://i.imgur.com/xH4M8bA.jpg' },
  ]);

  const [products] = useState([
    {
      id: '1',
      name: 'Cappuccino Tradicional',
      price: 'R$ 8,90',
      img: 'https://i.imgur.com/k9oZB8Y.jpg',
    },
    {
      id: '2',
      name: 'Croissant de Chocolate',
      price: 'R$ 7,50',
      img: 'https://i.imgur.com/7yU1nSR.jpg',
    },
    {
      id: '3',
      name: 'Pão de Queijo Gourmet',
      price: 'R$ 5,90',
      img: 'https://i.imgur.com/sHdYFvL.jpg',
    },
    {
      id: '4',
      name: 'Café Gelado Vanilla',
      price: 'R$ 9,90',
      img: 'https://i.imgur.com/t1Bf87S.jpg',
    },
  ]);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.logo}>Café & Aroma</Text>
        <TouchableOpacity onPress={() => onNavigate('perfil')}>
          <Image
            source={{ uri: 'https://i.imgur.com/Jf0X8gu.png' }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Carrossel */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          style={styles.carousel}
        >
          {promos.map((promo) => (
            <View key={promo.id} style={styles.promoCard}>
              <Image source={{ uri: promo.img }} style={styles.promoImage} />
              <View style={styles.promoOverlay}>
                <Text style={styles.promoText}>{promo.title}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Seção de Produtos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>☕ Nossos Produtos</Text>
          <View style={styles.productGrid}>
            {products.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.card}
                activeOpacity={0.8}
                onPress={() => onNavigate('detalhesPedido', item)}
              >
                <Image source={{ uri: item.img }} style={styles.cardImage} />
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <Text style={styles.cardPrice}>{item.price}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Botão "Meus Pedidos" */}
        <TouchableOpacity
          style={styles.meusPedidosBtn}
          onPress={() => onNavigate('meusPedidos')}
        >
          <Text style={styles.meusPedidosText}>Ver Meus Pedidos</Text>
        </TouchableOpacity>
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f130b',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  logo: {
    fontSize: 24,
    color: '#f5f5f5',
    fontWeight: 'bold',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 2,
    borderColor: '#a37b5a',
  },

  // Carrossel
  carousel: {
    marginTop: 10,
  },
  promoCard: {
    width: width * 0.88,
    height: 170,
    borderRadius: 16,
    overflow: 'hidden',
    marginHorizontal: 10,
    backgroundColor: '#2b1b12',
  },
  promoImage: {
    width: '100%',
    height: '100%',
  },
  promoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  promoText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  // Produtos
  section: {
    paddingHorizontal: 20,
    marginTop: 25,
  },
  sectionTitle: {
    color: '#f5f5f5',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#2b1b12',
    borderRadius: 14,
    width: '48%',
    marginBottom: 14,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 120,
  },
  cardInfo: {
    padding: 8,
  },
  cardTitle: {
    color: '#f5f5f5',
    fontSize: 15,
    fontWeight: '600',
  },
  cardPrice: {
    color: '#d4c6be',
    marginTop: 4,
  },

  // Meus Pedidos
  meusPedidosBtn: {
    backgroundColor: '#5d4037',
    borderRadius: 25,
    marginHorizontal: 60,
    marginVertical: 30,
    paddingVertical: 12,
    alignItems: 'center',
  },
  meusPedidosText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
