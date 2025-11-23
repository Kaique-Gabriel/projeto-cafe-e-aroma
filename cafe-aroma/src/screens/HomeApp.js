import React, { useRef, useEffect } from 'react';
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
import theme from '../theme/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;
const CAROUSEL_HEIGHT = 170;

export default function HomeApp() {
  const navigation = useNavigation();

  const produtos = [
    { id: 1, nome: 'Cappuccino Tradicional', preco: 'R$ 12,90', imagem: require('../../assets/cards/cafe.png') },
    { id: 2, nome: 'Pão Caseiro', preco: 'R$ 8,50', imagem: require('../../assets/cards/paes.png') },
    { id: 3, nome: 'Doces Artesanais', preco: 'R$ 6,90', imagem: require('../../assets/cards/doces.png') },
    { id: 4, nome: 'Promoção do Dia', preco: 'R$ 15,00', imagem: require('../../assets/cards/promo.png') },
  ];

  const promos = [
    { id: 'p1', img: require('../../assets/cards/promo.png'), title: 'Promoção do Dia' },
    { id: 'p2', img: require('../../assets/cards/cafe.png'), title: 'Café Especial' },
    { id: 'p3', img: require('../../assets/cards/doces.png'), title: 'Doces & Delícias' },
  ];

  const animValues = useRef(produtos.map(() => new Animated.Value(0))).current;
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animations = animValues.map((v, i) =>
      Animated.timing(v, {
        toValue: 1,
        duration: 350,
        delay: i * 120,
        useNativeDriver: true,
      })
    );
    Animated.stagger(80, animations).start();
  }, []);

  const openDetalhes = (item) => {
    navigation.navigate('DetalhesPedido', {
      nome: item.nome,
      preco: item.preco.replace('R$ ', ''),
      imagem: Image.resolveAssetSource(item.imagem).uri,
      descricao:
        "Um delicioso " +
        item.nome +
        " preparado com ingredientes selecionados e fresquinhos.",
    });
  };

  const renderProduto = (item, index) => {
    const anim = animValues[index];
    const scale = anim.interpolate({ inputRange: [0, 1], outputRange: [0.96, 1] });
    const opacity = anim;

    return (
      <Animated.View key={item.id} style={[styles.card, { transform: [{ scale }], opacity }]}>
        <TouchableOpacity activeOpacity={0.9} onPress={() => openDetalhes(item)} style={{ flex: 1 }}>
          <Image source={item.imagem} style={styles.cardImage} />
          <Text style={styles.cardTitle} numberOfLines={2}>{item.nome}</Text>
          <Text style={styles.cardPrice}>{item.preco}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />

      {/* HEADER */}
      <View style={styles.header}>
        <View style={{ width: 40 }} />
        <Text style={styles.title}>Café & Aroma</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Perfil')} style={styles.userBtn}>
          <Image
            source={require('../../assets/images/profile/avatar-placeholder.png')}
            style={styles.userAvatar}
          />
        </TouchableOpacity>
      </View>

      {/* CARROSSEL */}
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
        contentContainerStyle={styles.carouselContainer}
        renderItem={({ item, index }) => {
          const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.9, 1, 0.9],
            extrapolate: 'clamp',
          });

          return (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.navigate('Promocoes')}
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
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          const dotScale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1.2, 0.8],
            extrapolate: 'clamp',
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.4, 1, 0.4],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={`dot-${i}`}
              style={[styles.dot, { transform: [{ scale: dotScale }], opacity }]}
            />
          );
        })}
      </View>

      {/* GRID */}
      <View style={styles.gridWrap}>
        <FlatList
          data={produtos}
          keyExtractor={(p) => String(p.id)}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          renderItem={({ item, index }) => renderProduto(item, index)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      </View>
    </View>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 6,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },

  userBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    elevation: 2,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  carouselContainer: {
    paddingTop: 2,
    paddingBottom: -6,
  },
  promoCard: {
    width: width * 0.88,
    height: CAROUSEL_HEIGHT,
    borderRadius: theme.radius.md,
    marginHorizontal: width * 0.06,
    overflow: 'hidden',
  },
  promoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  dots: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 2,
    marginBottom: 6,
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
    paddingTop: 4,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#FFF',
    borderRadius: theme.radius.md,
    marginBottom: 14,
    overflow: 'hidden',
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
    paddingBottom: 10,
    paddingTop: 6,
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.primary,
  },
});
