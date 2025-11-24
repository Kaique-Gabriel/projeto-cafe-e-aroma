// src/screens/HomeApp.js
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
const CAROUSEL_HEIGHT = 180;

export default function HomeApp() {
  const navigation = useNavigation();
  const { user } = useUser();
  const { favoritos, toggleFavorito, isFavorito } = useFavoritos();
  const { adicionarItem } = useContext(CarrinhoContext);

  /* ---------------------------- Produtos ---------------------------- */
  const produtos = [
    { id: 1, nome: 'Cappuccino Tradicional', preco: 12.90, imagem: require('../../assets/cards/cafe.png') },
    { id: 2, nome: 'Pão Caseiro', preco: 8.50, imagem: require('../../assets/cards/paes.png') },
    { id: 3, nome: 'Doces Artesanais', preco: 6.90, imagem: require('../../assets/cards/doces.png') },
    { id: 4, nome: 'Promoção do Dia', preco: 15.00, imagem: require('../../assets/cards/promo.png') },
    { id: 5, nome: 'Croissant Manteiga', preco: 7.90, imagem: require('../../assets/cards/croissant.png') },
    { id: 6, nome: 'Café Moído Especial', preco: 19.90, imagem: require('../../assets/cards/cafe2.png') },
    { id: 7, nome: 'Bolo Caseiro', preco: 9.50, imagem: require('../../assets/cards/bolo.png') },
    { id: 8, nome: 'Combo Matinal', preco: 22.90, imagem: require('../../assets/cards/combo.png') },
    { id: 9, nome: 'Expresso Rápido', preco: 7.50, imagem: require('../../assets/cards/expresso.png') },
    { id: 10, nome: 'Sanduíche Natural', preco: 13.50, imagem: require('../../assets/cards/sanduiche.png') },
    { id: 11, nome: 'Torrada Especial', preco: 5.90, imagem: require('../../assets/cards/torrada.png') },
    { id: 12, nome: 'Suco Natural', preco: 6.90, imagem: require('../../assets/cards/suco.png') },
  ];

  const promos = [
    { id: 'p1', img: require('../../assets/cards/promo.png'), title: 'Promoção do Dia' },
    { id: 'p2', img: require('../../assets/cards/cafe.png'), title: 'Café Especial' },
    { id: 'p3', img: require('../../assets/cards/doces.png'), title: 'Doces & Delícias' },
  ];

  const animValues = useRef(produtos.map(() => new Animated.Value(0))).current;
  const scrollX = useRef(new Animated.Value(0)).current;

  /* ---------------------------- Animação dos Cards ---------------------------- */
  useEffect(() => {
    const animations = animValues.map((v, i) =>
      Animated.timing(v, {
        toValue: 1,
        duration: 320,
        delay: i * 70,
        useNativeDriver: true,
      })
    );
    Animated.stagger(60, animations).start();
  }, []);

  /* ---------------------------- Ações ---------------------------- */
  const openDetalhes = (item) => {
    navigation.navigate('DetalhesPedido', {
      nome: item.nome,
      preco: item.preco,
      imagem: Image.resolveAssetSource(item.imagem).uri,
      descricao: "Descrição completa de " + item.nome + ".",
    });
  };

  function handleAddToCart(item) {
    // cria objeto simples para carrinho — seu contexto aceita esse formato
    const payload = {
      id: item.id,
      nome: item.nome,
      preco: item.preco,
      imagem: item.imagem,
    };
    adicionarItem(payload);
  }

  /* ---------------------------- Render Produto (card) ---------------------------- */
  const renderProduto = ({ item, index }) => {
    const anim = animValues[index];
    const scale = anim.interpolate({ inputRange: [0, 1], outputRange: [0.96, 1] });
    const opacity = anim;

    const favorito = isFavorito ? isFavorito(item.id) : false;

    return (
      <Animated.View style={[styles.card, { transform: [{ scale }], opacity }]}>
        {/* Card Image & Info */}
        <TouchableOpacity activeOpacity={0.95} onPress={() => openDetalhes(item)} style={{ flex: 1 }}>
          <Image source={item.imagem} style={styles.cardImage} />
          <Text style={styles.cardTitle} numberOfLines={2}>{item.nome}</Text>
          <Text style={styles.cardPrice}>R$ {Number(item.preco).toFixed(2)}</Text>
        </TouchableOpacity>

        {/* Card Footer - ações */}
        <View style={styles.cardFooter}>
          {/* Favorito */}
          <TouchableOpacity style={styles.actionBtn} onPress={() => toggleFavorito(item)} activeOpacity={0.7}>
            <Ionicons
              name={favorito ? 'heart' : 'heart-outline'}
              size={20}
              color={favorito ? '#E91E63' : theme.colors.textSecondary}
            />
            <Text style={[styles.actionText, { color: theme.colors.textSecondary }]}>Favoritar</Text>
          </TouchableOpacity>

          {/* Adicionar ao carrinho */}
          <TouchableOpacity style={styles.actionBtn} onPress={() => handleAddToCart(item)} activeOpacity={0.7}>
            <MaterialCommunityIcons name="cart-plus" size={20} color={theme.colors.textPrimary} />
            <Text style={[styles.actionText, { color: theme.colors.textPrimary }]}>Comprar</Text>
          </TouchableOpacity>

          {/* Detalhes */}
          <TouchableOpacity style={styles.actionBtn} onPress={() => openDetalhes(item)} activeOpacity={0.7}>
            <Feather name="info" size={20} color={theme.colors.textSecondary} />
            <Text style={[styles.actionText, { color: theme.colors.textSecondary }]}>Detalhes</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />

      {/* ---------------------------- HEADER ---------------------------- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.menuBtn}>
          <MaterialCommunityIcons name="menu" size={26} color={theme.colors.textPrimary} />
        </TouchableOpacity>

        <Text style={styles.title}>Café & Aroma</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Perfil')} style={styles.userBtn}>
          {user?.photo ? (
            <Image source={{ uri: user.photo }} style={styles.userAvatar} />
          ) : (
            <MaterialCommunityIcons name="account-circle" size={42} color={theme.colors.textSecondary} />
          )}
        </TouchableOpacity>
      </View>

      {/* ---------------------------- CARROSSEL ---------------------------- */}
      <View style={styles.carouselWrapper}>
        <Animated.FlatList
          data={promos}
          keyExtractor={(p) => p.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          snapToAlignment="center"
          decelerationRate="fast"
          renderItem={({ item, index }) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width
            ];

            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [0.9, 1, 0.9],
              extrapolate: 'clamp',
            });

            return (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.navigate("Promocoes")}
              >
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
            const inputRange = [
              (i - 1) * width,
              i * width,
              (i + 1) * width
            ];
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
              <Animated.View
                key={`dot-${i}`}
                style={[styles.dot, { transform: [{ scale: dotScale }], opacity }]}
              />
            );
          })}
        </View>
      </View>

      {/* ---------------------------- GRID ---------------------------- */}
      <View style={styles.gridWrap}>
        <FlatList
          data={produtos}
          keyExtractor={(p) => String(p.id)}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          renderItem={renderProduto}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 25 }}
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
  menuBtn: {
    width: 44,
    alignItems: 'center',
  },
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
  promoCard: {
    width: width * 0.88,
    height: CAROUSEL_HEIGHT,
    borderRadius: theme.radius.md,
    marginHorizontal: width * 0.06,
    overflow: 'hidden',
    elevation: 4,
    backgroundColor: '#fff',
  },
  promoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  dots: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 6,
    marginBottom: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
    marginHorizontal: 4,
  },

  gridWrap: {
    paddingHorizontal: 18,
    paddingTop: 6,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  card: {
    width: CARD_WIDTH,
    backgroundColor: '#FFF',
    borderRadius: theme.radius.md,
    elevation: 3,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 8,
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
    paddingTop: 6,
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.primary,
  },

  /* Footer de ações do card (Opção D) */
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0E6DD',
    alignItems: 'center',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 6,
  },
  actionText: {
    fontSize: 12,
    marginLeft: 6,
  },
});
