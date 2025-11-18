import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';

const { width } = Dimensions.get('window');
const H_PADDING = 20;
const CARDS_CONTAINER_WIDTH = width - H_PADDING * 2;
const CARD_GAP = 12;
const CARD_WIDTH = Math.floor((CARDS_CONTAINER_WIDTH - CARD_GAP) / 2);

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

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, []);

  // small scale on press visual feedback
  const PressableCard = ({ item }) => {
    const scale = useRef(new Animated.Value(1)).current;

    const onPressIn = () => Animated.spring(scale, { toValue: 0.98, useNativeDriver: true }).start();
    const onPressOut = () => Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();

    return (
      <Animated.View style={{ transform: [{ scale }], marginBottom: 6 }}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          onPress={() => onNavigate('detalhesPedido', item)}
          style={styles.cardTouchable}
        >
          <Image source={{ uri: item.img }} style={styles.cardImage} />
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle} numberOfLines={2}>{item.name}</Text>
            <Text style={styles.cardPrice}>{item.price}</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.header}>
        <Text style={styles.logo}>Café & Aroma</Text>
        <TouchableOpacity onPress={() => onNavigate('perfil')}>
          <Image source={{ uri: 'https://i.imgur.com/Jf0X8gu.png' }} style={styles.avatar} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Carousel maior */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carousel}
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

        {/* Produtos em grid (FlatList com 2 colunas) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>☕ Nossos Produtos</Text>
          <FlatList
            data={products}
            keyExtractor={(i) => i.id}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            contentContainerStyle={{ paddingBottom: 12 }}
            scrollEnabled={false} // integrado ao ScrollView pai
            renderItem={({ item }) => <PressableCard item={item} />}
            style={{ marginTop: 6 }}
          />
        </View>

        <TouchableOpacity style={styles.meusPedidosBtn} onPress={() => onNavigate('meusPedidos')}>
          <Text style={styles.meusPedidosText}>Ver Meus Pedidos</Text>
        </TouchableOpacity>
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1C1209', paddingTop: Platform.OS === 'android' ? 36 : 50 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: H_PADDING, paddingBottom: 8 },
  logo: { fontSize: 26, color: '#F3E5D0', fontWeight: '700', letterSpacing: 0.4 },
  avatar: { width: 44, height: 44, borderRadius: 22, borderWidth: 2, borderColor: '#C7A27A' },

  // carousel
  carousel: { paddingHorizontal: H_PADDING, paddingTop: 12 },
  promoCard: { width: CARDS_CONTAINER_WIDTH * 0.98, height: 176, borderRadius: 14, overflow: 'hidden', marginRight: 12, backgroundColor: '#2A1A10' },
  promoImage: { width: '100%', height: '100%' },
  promoOverlay: { position: 'absolute', left: 0, right: 0, bottom: 0, padding: 12, backgroundColor: 'rgba(0,0,0,0.45)' },
  promoText: { color: '#FFF', fontSize: 16, fontWeight: '600' },

  // section
  section: { paddingHorizontal: H_PADDING, marginTop: 22 },
  sectionTitle: { color: '#F3E5D0', fontSize: 18, fontWeight: '700', marginBottom: 8 },

  // product card
  cardTouchable: {
    width: CARD_WIDTH,
    backgroundColor: '#2A1A10',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#3B2516',
    marginBottom: 8,
  },
  cardImage: { width: '100%', height: 110 },
  cardInfo: { padding: 8 },
  cardTitle: { color: '#F5EDE3', fontSize: 14, fontWeight: '600' },
  cardPrice: { color: '#D5C3A4', marginTop: 6 },

  // meus pedidos btn
  meusPedidosBtn: {
    backgroundColor: '#5A3E2B',
    borderRadius: 26,
    marginHorizontal: 56,
    marginVertical: 28,
    paddingVertical: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
  },
  meusPedidosText: { color: '#F3E5D0', fontWeight: '700', fontSize: 15 },
});
