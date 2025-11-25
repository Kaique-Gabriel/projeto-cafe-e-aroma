// ---------------- HomeApp.js (VERSÃO ATUALIZADA E FUNCIONAL) ----------------

import React, { useRef, useEffect, useContext } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useUser } from '../context/UserContext';
import { useFavoritos } from '../context/FavoritosContext';
import { CarrinhoContext } from '../context/CarrinhoContext';

import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import theme from '../theme/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 50) / 2;
const CAROUSEL_HEIGHT = 110;

export default function HomeApp() {
  const navigation = useNavigation();
  const { user } = useUser();
  const { favoritos, toggleFavorito, isFavorito } = useFavoritos();
  const { adicionarItem } = useContext(CarrinhoContext);

  /* ---------------------------- Produtos ---------------------------- */
  const produtos = [
  { id: 1, nome: 'Cappuccino Tradicional', preco: 12.90, imagem: require('../../assets/cards/cafe.png') },
  { id: 2, nome: 'Pão Caseiro', preco: 8.50, imagem: require('../../assets/cards/paes.png') },
  { id: 3, nome: 'Brownie', preco: 6.90, imagem: require('../../assets/cards/doces.png') },
  { id: 4, nome: 'Café & Croissant Especial', preco: 15.00, imagem: require('../../assets/cards/promo.png') },
  { id: 5, nome: 'Croissant Manteiga', preco: 7.90, imagem: require('../../assets/cards/croissant.png') },
  { id: 6, nome: 'Café Moído Especial', preco: 19.90, imagem: require('../../assets/cards/cafe2.png') },
  { id: 7, nome: 'Bolo Caseiro', preco: 9.50, imagem: require('../../assets/cards/bolo.png') },
  { id: 8, nome: 'Torta de limão', preco: 22.90, imagem: require('../../assets/cards/tortalimao.png') },
  { id: 9, nome: 'Expresso Rápido', preco: 7.50, imagem: require('../../assets/cards/expresso.png') },
  { id: 10, nome: 'Sanduíche Natural', preco: 13.50, imagem: require('../../assets/cards/sanduiche.png') },
  { id: 11, nome: 'Torrada Especial', preco: 5.90, imagem: require('../../assets/cards/torrada.png') },
  { id: 12, nome: 'Suco Natural', preco: 6.90, imagem: require('../../assets/cards/suco.png') },
];

    /* ---------------------------- CARROSSEL ---------------------------- */

  const promos = [
    {
      id: 'promo1',
      title: 'Cappuccino Tradicional',
      price: 12.90,
      img: require('../../assets/cards/cafe.png'),
      nav: {
        id: 1,
        nome: 'Cappuccino Tradicional',
        preco: 12.90,
        imagem: require('../../assets/cards/cafe.png'),
        descricao: "Um cappuccino clássico com equilíbrio perfeito entre café, leite e espuma.",
      }
    },
    {
      id: 'promo2',
      title: 'Pão Caseiro',
      price: 8.50,
      img: require('../../assets/cards/paes.png'),
      nav: {
        id: 2,
        nome: 'Pão Caseiro',
        preco: 8.50,
        imagem: require('../../assets/cards/paes.png'),
        descricao: "Pão artesanal feito com ingredientes frescos e fermentação natural.",
      }
    },
    {
      id: 'promo3',
      title: 'Delícias Doceiras',
      price: 6.90,
      img: require('../../assets/cards/combo.png'),
      nav: {
        id: 3,
        nome: 'Delícias Doceiras',
        preco: 6.90,
        imagem: require('../../assets/cards/combo.png'),
        descricao: "Uma seleção deliciosa de doces fresquinhos, perfeitos para acompanhar seu café.",
      }
    },
  ];


  const animValues = useRef(produtos.map(() => new Animated.Value(0))).current;
  const scrollX = useRef(new Animated.Value(0)).current;

  /* ---------------------------- Animação de entrada ---------------------------- */
  useEffect(() => {
    const animations = animValues.map((v, i) =>
      Animated.timing(v, {
        toValue: 1,
        duration: 300,
        delay: i * 60,
        useNativeDriver: true,
      })
    );
    Animated.stagger(50, animations).start();
  }, []);

  /* ---------------------------- Animação: Carrinho ---------------------------- */
  const cartAnimations = useRef(produtos.map(() => new Animated.Value(1))).current;

  function animateCart(index) {
    Animated.sequence([
      Animated.timing(cartAnimations[index], {
        toValue: 1.3,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(cartAnimations[index], {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();
  }

  function handleAddToCart(item, index) {
    adicionarItem({
      id: item.id,
      nome: item.nome,
      preco: item.preco,
      imagem: item.imagem,
    });

    animateCart(index);
  }

  /* ---------------------------- ABRIR DETALHES ---------------------------- */
  function openDetalhes(item) {
  navigation.navigate("DetalhesPedido", {
    id: item.id,
    nome: item.nome,
    preco: item.preco,
    imagem: item.imagem,
    descricao: item.descricao || "Descrição detalhada deste produto ainda não foi informada.",
  });
}

  /* ---------------------------- RENDER PRODUTO ---------------------------- */
  const renderProduto = ({ item, index }) => {
    const anim = animValues[index];
    const scale = anim.interpolate({ inputRange: [0, 1], outputRange: [0.95, 1] });

    const favorito = isFavorito(item.id);

    return (
      <Animated.View style={[styles.card, { transform: [{ scale }], opacity: anim }]}>

        {/* ❤️ Favorito */}
        <TouchableOpacity style={styles.favBtn} onPress={() => toggleFavorito(item)}>
          <Ionicons
            name={favorito ? 'heart' : 'heart-outline'}
            size={26}
            color={favorito ? '#ff4271' : '#fff'}
          />
        </TouchableOpacity>

        {/* CONTEÚDO DO CARD */}
        <TouchableOpacity activeOpacity={0.95} onPress={() => openDetalhes(item)} style={{ flex: 1 }}>
          <Image source={item.imagem} style={styles.cardImage} />
          <Text style={styles.cardTitle} numberOfLines={2}>{item.nome}</Text>
          <Text style={styles.cardPrice}>R$ {Number(item.preco).toFixed(2)}</Text>
        </TouchableOpacity>

        {/* FOOTER */}
        <View style={styles.cardFooter}>

          {/* 🛒 Comprar */}
          <TouchableOpacity onPress={() => handleAddToCart(item, index)}>
            <Animated.View style={{ transform: [{ scale: cartAnimations[index] }] }}>
              <MaterialCommunityIcons
                name="cart-plus"
                size={22}
                color={theme.colors.textPrimary}
              />
            </Animated.View>
          </TouchableOpacity>

          {/* ℹ Info */}
          <TouchableOpacity onPress={() => navigation.navigate("PedidosInfo", { item })}>
  <Feather name="info" size={22} color={theme.colors.textSecondary} />
</TouchableOpacity>

        </View>

      </Animated.View>
    );
  };

  /* ---------------------------- MAIN ---------------------------- */
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.menuBtn}>
          <MaterialCommunityIcons name="menu" size={26} color={theme.colors.textPrimary} />
        </TouchableOpacity>

        <Text style={styles.title}>Início</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Perfil')} style={styles.userBtn}>
          {user?.photo ? (
            <Image source={{ uri: user.photo }} style={styles.userAvatar} />
          ) : (
            <MaterialCommunityIcons name="account-circle" size={42} color={theme.colors.textSecondary} />
          )}
        </TouchableOpacity>
      </View>

      {/* CARROSSEL */}
      <View style={styles.carouselWrapper}>
        <Animated.FlatList
          data={promos}
          keyExtractor={(p) => p.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: true })}
          snapToAlignment="center"
          decelerationRate="fast"
          renderItem={({ item, index }) => {
            const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [0.9, 1, 0.9],
              extrapolate: 'clamp',
            });

            return (
              <TouchableOpacity onPress={() => navigation.navigate("Promocoes")} activeOpacity={0.9}>
                <Animated.View style={[styles.promoCard, { transform: [{ scale }] }]}>
                  <Image source={item.img} style={styles.promoImage} />
                </Animated.View>
              </TouchableOpacity>
            );
          }}
        />

        {/* DOTS */}
        <View style={styles.dots}>
          {promos.map((_, i) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

            const dotScale = scrollX.interpolate({
              inputRange,
              outputRange: [0.8, 1.2, 0.8],
              extrapolate: "clamp",
            });

            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.4, 1, 0.4],
              extrapolate: "clamp",
            });

            return (
              <Animated.View key={`dot-${i}`} style={[styles.dot, { transform: [{ scale: dotScale }], opacity }]} />
            );
          })}
        </View>
      </View>

      {/* GRID */}
      <View style={styles.gridWrap}>
        <FlatList
          data={produtos}
          keyExtractor={(p) => String(p.id)}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          renderItem={renderProduto}
          showsVerticalScrollIndicator={false}
        />
      </View>

    </View>
  );
}

/* ---------------------------- STYLES ---------------------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 18,
    paddingBottom: 10,
  },
  menuBtn: { width: 44, alignItems: 'center' },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  userBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },

  /* Carrossel */
  carouselWrapper: { marginTop: 4 },
  promoCard: {
    width: width * 0.88,
    height: CAROUSEL_HEIGHT,
    borderRadius: theme.radius.md,
    marginHorizontal: width * 0.06,
    overflow: 'hidden',
    elevation: 4,
    backgroundColor: '#fff',
  },
  promoImage: { width: '100%', height: '100%', resizeMode: 'cover' },

  dots: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 4,
    marginBottom: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
    marginHorizontal: 4,
  },

  /* GRID */
  gridWrap: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 6,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  /* CARD */
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#FFF',
    borderRadius: theme.radius.md,
    elevation: 3,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 8,
  },
  favBtn: {
    position: 'absolute',
    top: 6,
    right: 6,
    zIndex: 20,
    backgroundColor: 'rgba(0,0,0,0.35)',
    padding: 6,
    borderRadius: 30,
  },
  cardImage: {
    width: '100%',
    height: 120,
  },
  cardTitle: {
    paddingHorizontal: 10,
    paddingTop: 10,
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  cardPrice: {
    paddingHorizontal: 10,
    paddingBottom: 8,
    paddingTop: 4,
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.primary,
  },

  /* Footer ícones */
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#EEE3D6',
    alignItems: 'center',
  },
});

