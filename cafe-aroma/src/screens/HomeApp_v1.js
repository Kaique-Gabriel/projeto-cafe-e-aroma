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
    { id: '1', name: 'Cappuccino Tradicional', price: 'R$ 8,90', img: 'https://i.imgur.com/k9oZB8Y.jpg' },
    { id: '2', name: 'Croissant de Chocolate', price: 'R$ 7,50', img: 'https://i.imgur.com/7yU1nSR.jpg' },
    { id: '3', name: 'Pão de Queijo Gourmet', price: 'R$ 5,90', img: 'https://i.imgur.com/sHdYFvL.jpg' },
    { id: '4', name: 'Café Gelado Vanilla', price: 'R$ 9,90', img: 'https://i.imgur.com/t1Bf87S.jpg' },
  ]);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const pressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const pressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      
      {/* Header */}
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
        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.carousel}>
          {promos.map((promo) => (
            <View key={promo.id} style={styles.promoCard}>
              <Image source={{ uri: promo.img }} style={styles.promoImage} />
              <View style={styles.promoOverlay}>
                <Text style={styles.promoText}>{promo.title}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* PRODUTOS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>☕ Nossos Produtos</Text>

          <View style={styles.productGrid}>
            {products.map((item) => (
              <Animated.View
                key={item.id}
                style={{ transform: [{ scale: scaleAnim }] }}
              >
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPressIn={pressIn}
                  onPressOut={pressOut}
                  onPress={() => onNavigate('detalhesPedido', item)}
                  style={styles.card}
                >
                  <Image source={{ uri: item.img }} style={styles.cardImage} />
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardTitle}>{item.name}</Text>
                    <Text style={styles.cardPrice}>{item.price}</Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </View>

        {/* BOTÃO MEUS PEDIDOS */}
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
    backgroundColor: '#FFF8F0', // creme claro agradável
    paddingTop: 50,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5A3E2B', // marrom premium moderno
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 2,
    borderColor: '#C49A6C',
  },

  // CARROSSEL
  carousel: {
    marginTop: 12,
  },

  promoCard: {
    width: width * 0.88,
    height: 170,
    borderRadius: 18,
    overflow: 'hidden',
    marginHorizontal: 12,
    backgroundColor: '#F3E4D2',
    elevation: 3,
  },

  promoImage: {
    width: '100%',
    height: '100%',
  },

  promoOverlay: {
    position: 'absolute',
    bottom: 0,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },

  promoText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },

  // PRODUTOS
  section: {
    marginTop: 25,
    paddingHorizontal: 18,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5A3E2B',
    marginBottom: 12,
  },

  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  card: {
    width: (width * 0.88) / 2 - 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginBottom: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E3D3C3',
    elevation: 3,
  },

  cardImage: {
    width: '100%',
    height: 120,
  },

  cardInfo: {
    padding: 10,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4B2E1E',
  },

  cardPrice: {
    marginTop: 4,
    color: '#A67C52',
  },

  // MEUS PEDIDOS BTN
  meusPedidosBtn: {
    backgroundColor: '#D9B88C',
    paddingVertical: 12,
    borderRadius: 25,
    marginHorizontal: 70,
    marginTop: 25,
    marginBottom: 35,
    elevation: 3,
  },

  meusPedidosText: {
    color: '#4B2E1E',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
