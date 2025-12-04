// src/screens/HomeApp.js
import React, { useRef, useEffect, useContext, useState, useMemo } from 'react';
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
  TextInput,
  ImageBackground,
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
const CAROUSEL_HEIGHT = 140; // aumentado um pouco para ficar mais imponente
const LARGE_CARD_HEIGHT = 150;

export default function HomeApp() {
  const navigation = useNavigation();
  const { user } = useUser();
  const { favoritos, toggleFavorito, isFavorito } = useFavoritos();
  const { adicionarItem } = useContext(CarrinhoContext);

  const [activeSection, setActiveSection] = useState('unitarios'); // 'unitarios' | 'combos' | 'cestas'
  const [search, setSearch] = useState('');

  /* ---------------------------- Produtos ---------------------------- */
  const produtos = [
    {
      id: 1,
      nome: 'Cappuccino Tradicional',
      preco: 12.90,
      imagem: require('../../assets/cards/cafe.png'),
      info: {
        descricao: "Um cappuccino clássico, cremoso e equilibrado entre café, leite e espuma artesanal.",
        caracteristicas: [
          "Feito com café selecionado",
          "Espuma densa e cremosa",
          "Ideal para manhãs e tardes"
        ],
        origem: "Brasil — Serra da Mantiqueira",
        peso: "300ml"
      }
    },
    {
      id: 2,
      nome: 'Pão Caseiro',
      preco: 8.50,
      imagem: require('../../assets/cards/paes.png'),
      info: {
        descricao: "Pão artesanal feito com fermentação natural e ingredientes frescos.",
        caracteristicas: [
          "Massa leve e macia",
          "Casca crocante",
          "Fermentação natural de 24h"
        ],
        origem: "Produção local",
        peso: "450g"
      }
    },
    {
      id: 3,
      nome: 'Brownie de Chocolate',
      preco: 6.90,
      imagem: require('../../assets/cards/doces.png'),
      info: {
        descricao: "Brownie artesanal com chocolate meio amargo e textura densa.",
        caracteristicas: [
          "Chocolate 50%",
          "Produção diária",
          "Sem conservantes"
        ],
        origem: "Brasil",
        peso: "120g"
      }
    },
    {
      id: 4,
      nome: 'Cookie Artesanal',
      preco: 15.00,
      imagem: require('../../assets/cards/cookieartesanal.png'),
      info: {
        descricao: "Cookie crocante por fora e macio por dentro, com gotas de chocolate.",
        caracteristicas: [
          "Chocolate 40%",
          "Massa amanteigada",
          "Assado na hora"
        ],
        origem: "Brasil",
        peso: "90g"
      }
    },
    {
      id: 5,
      nome: 'Croissant Manteiga',
      preco: 7.90,
      imagem: require('../../assets/cards/croissant.png'),
      info: {
        descricao: "Croissant leve e folhado, feito com manteiga francesa.",
        caracteristicas: [
          "Camadas delicadas",
          "Sabor amanteigado",
          "Assado diariamente"
        ],
        origem: "França (receita tradicional)",
        peso: "65g"
      }
    },
    {
      id: 6,
      nome: 'Café Moído Especial',
      preco: 19.90,
      imagem: require('../../assets/cards/cafe2.png'),
      info: {
        descricao: "Café especial com notas aromáticas e torra média.",
        caracteristicas: [
          "Torra média",
          "100% arábica",
          "Moído na hora"
        ],
        origem: "Minas Gerais",
        peso: "250g"
      }
    },
    {
      id: 7,
      nome: 'Bolo Caseiro',
      preco: 9.50,
      imagem: require('../../assets/cards/bolo.png'),
      info: {
        descricao: "Bolo simples e macio, com sabor tradicional de casa de vó.",
        caracteristicas: [
          "Textura fofinha",
          "Levemente doce",
          "Ideal com café"
        ],
        origem: "Produção artesanal",
        peso: "100g por fatia"
      }
    },
    {
      id: 8,
      nome: 'Torta de limão',
      preco: 22.90,
      imagem: require('../../assets/cards/tortalimao.png'),
      info: {
        descricao: "Torta de limão cremosa com base crocante e cobertura merengada.",
        caracteristicas: [
          "Sabor cítrico equilibrado",
          "Merengue queimado",
          "Base de biscoito"
        ],
        origem: "Brasil",
        peso: "600g"
      }
    },
    {
      id: 9,
      nome: 'Expresso Rápido',
      preco: 7.50,
      imagem: require('../../assets/cards/expresso.png'),
      info: {
        descricao: "Café expresso forte e aromático, preparado na hora.",
        caracteristicas: [
          "Extração rápida",
          "Corpo intenso",
          "Sabor marcante"
        ],
        origem: "Brasil",
        peso: "50ml"
      }
    },
    {
      id: 10,
      nome: 'Sanduíche Natural',
      preco: 13.50,
      imagem: require('../../assets/cards/sanduiche.png'),
      info: {
        descricao: "Sanduíche leve com frango, cenoura, maionese e pão integral.",
        caracteristicas: [
          "Ingredientes frescos",
          "Pão integral",
          "Baixo teor calórico"
        ],
        origem: "Produção própria",
        peso: "180g"
      }
    },
    {
      id: 11,
      nome: 'Torrada Especial',
      preco: 5.90,
      imagem: require('../../assets/cards/torrada.png'),
      info: {
        descricao: "Torradas crocantes feitas com pão especial artesanal.",
        caracteristicas: [
          "Crocrância intensa",
          "Ideal para café",
          "Sem aditivos"
        ],
        origem: "Produção local",
        peso: "120g"
      }
    },
    {
      id: 12,
      nome: 'Suco Natural',
      preco: 6.90,
      imagem: require('../../assets/cards/suco.png'),
      info: {
        descricao: "Suco natural feito com frutas frescas da estação.",
        caracteristicas: [
          "Sem açúcar",
          "100% fruta",
          "Feito na hora"
        ],
        origem: "Brasil",
        peso: "300ml"
      }
    },
  ];

  /* ---------------------------- CARROSSEL (usando imagens já existentes) ---------------------------- */
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
      img: require('../../assets/cards/banner.png'),
      nav: {
        id: 2,
        nome: 'Pão Caseiro',
        preco: 8.50,
        imagem: require('../../assets/cards/banner.png'),
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

  // Dados para Combos e Cestas (você pode ajustar esses arrays depois)
  const combos = [
    {
      id: 'combo1',
      nome: 'Combo Café + Pão',
      preco: 18.90,
      imagem: require('../../assets/cards/combo1.png'),
      descricao: 'Cappuccino + Pão Caseiro',
    },
    {
      id: 'combo2',
      nome: 'Combo Doce',
      preco: 14.50,
      imagem: require('../../assets/cards/combo2.png'),
      descricao: 'Brownie + Suco Natural',
    },
  ];

  const cestas = [
    {
      id: 'cesta1',
      nome: 'Cesta Família',
      preco: 59.90,
      imagem: require('../../assets/cards/cesta2.png'),
      descricao: 'Cestas com pães, geleias e bebidas.',
    },
    {
      id: 'cesta2',
      nome: 'Cesta Especial',
      preco: 89.90,
      imagem: require('../../assets/cards/cesta4.png'),
      descricao: 'Seleção premium para presentear.',
    },
  ];

  /* ---------------------------- Animações e refs ---------------------------- */
  const animValues = useRef(produtos.map(() => new Animated.Value(0))).current;
  const scrollX = useRef(new Animated.Value(0)).current;
  const carouselRef = useRef(null);

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

  function handleAddToCart(item, index = 0) {
    adicionarItem({
      id: item.id ?? item.nome,
      nome: item.nome,
      preco: item.preco ?? item.preco,
      imagem: item.imagem ?? item.imagem,
    });
    // animate (only for produtos grid items we pass index)
    if (typeof index === 'number') {
      animateCart(index);
    }
  }

  /* ---------------------------- ABRIR DETALHES ---------------------------- */
  function openDetalhes(item) {
    navigation.navigate("DetalhesPedido", {
      id: item.id,
      nome: item.nome,
      preco: item.preco,
      imagem: item.imagem,
      descricao: item.descricao || item.info?.descricao || "Descrição detalhada deste produto ainda não foi informada.",
    });
  }

  /* ---------------------------- FILTRAGEM (SEARCH) ---------------------------- */
  const searchLower = search.trim().toLowerCase();

  const filteredUnitarios = useMemo(() => {
    if (!searchLower) return produtos;
    return produtos.filter(p => (p.nome || '').toLowerCase().includes(searchLower) ||
      (p.info?.descricao || '').toLowerCase().includes(searchLower));
  }, [produtos, searchLower]);

  const filteredCombos = useMemo(() => {
    if (!searchLower) return combos;
    return combos.filter(c => (c.nome || '').toLowerCase().includes(searchLower) ||
      (c.descricao || '').toLowerCase().includes(searchLower));
  }, [combos, searchLower]);

  const filteredCestas = useMemo(() => {
    if (!searchLower) return cestas;
    return cestas.filter(c => (c.nome || '').toLowerCase().includes(searchLower) ||
      (c.descricao || '').toLowerCase().includes(searchLower));
  }, [cestas, searchLower]);

  /* ---------------------------- RENDER PRODUTO (GRID) ---------------------------- */
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

  /* ---------------------------- RENDER LARGE CARD (Combos/Cestas) ---------------------------- */
  const renderLargeCard = ({ item }) => {
    const favorito = isFavorito(item.id);

    return (
      <View style={styles.largeCard}>
        <ImageBackground
          source={item.imagem}
          style={styles.largeCardImage}
          imageStyle={{ borderRadius: theme.radius.md }}
        >
          {/* Botão de favoritar */}
          <TouchableOpacity
            style={styles.favBtnLarge}
            onPress={() => toggleFavorito(item)}
          >
            <Ionicons
              name={favorito ? 'heart' : 'heart-outline'}
              size={26}
              color={favorito ? '#ff4271' : '#fff'}
            />
          </TouchableOpacity>

          {/* Área principal clicável */}
          <TouchableOpacity
            activeOpacity={0.95}
            style={styles.largeTouchableArea}
            onPress={() => {
              if (activeSection === 'combos') {
                navigation.navigate('ComboDetalhes', { combo: item });
              } else if (activeSection === 'cestas') {
                navigation.navigate('CestaDetalhes', { cesta: item });
              }
            }}
          >
            <View style={styles.largeOverlay}>
              <Text style={styles.largeTitle} numberOfLines={1}>
                {item.nome}
              </Text>

              <Text style={styles.largeDesc} numberOfLines={2}>
                {item.descricao}
              </Text>
            </View>
          </TouchableOpacity>

          {/* FOOTER — fora do Touchable principal! */}
          <View style={styles.largeFooter}>
            <TouchableOpacity
              onPress={() => {
                if (activeSection === 'combos') {
                  navigation.navigate('ComboInfo', { combo: item });
                } else {
                  navigation.navigate('CestaInfo', { cesta: item });
                }
              }}
              style={styles.iconBtn}
            >
              <Feather name="info" size={20} color="#fff" />
            </TouchableOpacity>

            <View style={styles.largeRight}>
              <Text style={styles.largePrice}>
                R$ {Number(item.preco).toFixed(2)}
              </Text>

              <TouchableOpacity
                onPress={() => handleAddToCart(item)}
                style={styles.largeAddBtn}
              >
                <MaterialCommunityIcons name="cart-plus" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  };

  /* ---------------------------- CARROSSEL BANNERS ---------------------------- */
  const banners = [
    { id: 'b1', img: require('../../assets/cards/unitario.png'), section: 'unitarios', title: 'Unitários' },
    { id: 'b2', img: require('../../assets/cards/combo3.png'), section: 'combos', title: 'Combos' },
    { id: 'b3', img: require('../../assets/cards/cesta1.png'), section: 'cestas', title: 'Cestas' },
  ];

  function onBannerPress(section, index) {
    setActiveSection(section);
    // snap carousel to index
    if (carouselRef.current) {
      carouselRef.current.scrollToIndex({ index, animated: true });
    }
  }

  function onCarouselMomentum(e) {
    const offsetX = e.nativeEvent.contentOffset.x;
    const idx = Math.round(offsetX / width);
    const safeIdx = Math.max(0, Math.min(banners.length - 1, idx));
    const section = banners[safeIdx].section;
    setActiveSection(section);
  }

  /* ---------------------------- NOVA FUNÇÃO: sincroniza tab -> carrossel -> conteúdo ---------------------------- */
  function goToSection(sectionName) {
    const index = banners.findIndex(b => b.section === sectionName);
    if (index === -1) {
      setActiveSection(sectionName); // fallback
      return;
    }

    setActiveSection(sectionName);

    if (carouselRef.current && typeof carouselRef.current.scrollToIndex === 'function') {
      carouselRef.current.scrollToIndex({ index, animated: true });
    }
  }

  /* ---------------------------- TOAST/ALERT ESTILIZADO (Café & Aroma) ---------------------------- */
  const toastAnim = useRef(new Animated.Value(0)).current;
  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  function showToast(message = '', duration = 1800) {
    setToastMsg(message);
    setToastVisible(true);
    Animated.timing(toastAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(toastAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setToastVisible(false));
    }, duration);
  }

  /* ---------------------------- MAIN ---------------------------- */
  return (
    <View style={[styles.container, { paddingBottom: 5 }]}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />

      {/* TOAST */}
      {toastVisible && (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.toast,
            {
              opacity: toastAnim,
              transform: [{ translateY: toastAnim.interpolate({ inputRange: [0, 1], outputRange: [-18, 0] }) }],
            },
          ]}
        >
          <Text style={styles.toastText}>{toastMsg}</Text>
        </Animated.View>
      )}

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
          ref={carouselRef}
          data={banners}
          keyExtractor={(b) => b.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: true })}
          onMomentumScrollEnd={onCarouselMomentum}
          snapToAlignment="center"
          decelerationRate="fast"
          renderItem={({ item, index }) => {
            const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [0.92, 1, 0.92],
              extrapolate: 'clamp',
            });

            return (
              <TouchableOpacity activeOpacity={0.9} onPress={() => onBannerPress(item.section, index)}>
                <Animated.View style={[styles.promoCard, { transform: [{ scale }] }]}>
                  <ImageBackground source={item.img} style={styles.promoImage} imageStyle={{ resizeMode: 'cover' }}>
                    <View style={styles.bannerOverlay}>
                      <Text style={styles.bannerTitle}>{item.title}</Text>
                    </View>
                  </ImageBackground>
                </Animated.View>
              </TouchableOpacity>
            );
          }}
        />

        {/* DOTS */}
        <View style={styles.dots}>
          {banners.map((_, i) => {
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

      {/* TAB BAR */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={[styles.tabItem, activeSection === 'unitarios' && styles.tabActive]} onPress={() => goToSection('unitarios')}>
          <Text style={[styles.tabText, activeSection === 'unitarios' && styles.tabTextActive]}>Unitários</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabItem, activeSection === 'combos' && styles.tabActive]} onPress={() => goToSection('combos')}>
          <Text style={[styles.tabText, activeSection === 'combos' && styles.tabTextActive]}>Combos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabItem, activeSection === 'cestas' && styles.tabActive]} onPress={() => goToSection('cestas')}>
          <Text style={[styles.tabText, activeSection === 'cestas' && styles.tabTextActive]}>Cestas</Text>
        </TouchableOpacity>
      </View>

      {/* SEARCH */}
      <View style={styles.searchWrap}>
        <Feather name="search" size={18} color={theme.colors.textSecondary} />
        <TextInput
          placeholder="Pesquisar itens..."
          placeholderTextColor={theme.colors.textSecondary}
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          returnKeyType="search"
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Feather name="x" size={18} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      {/* SECTION CONTENT */}
      <View style={styles.gridWrap}>
        {activeSection === 'unitarios' && (
          <FlatList
            data={filteredUnitarios}
            keyExtractor={(p) => String(p.id)}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            renderItem={renderProduto}
            showsVerticalScrollIndicator={false}
          />
        )}

        {activeSection === 'combos' && (
          <FlatList
            data={filteredCombos}
            keyExtractor={(c) => c.id}
            renderItem={renderLargeCard}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 50 }}
          />
        )}

        {activeSection === 'cestas' && (
          <FlatList
            data={filteredCestas}
            keyExtractor={(c) => c.id}
            renderItem={renderLargeCard}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 50 }}
          />
        )}
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

  /* TOAST */
  toast: {
    position: 'absolute',
    top: StatusBar.currentHeight ? StatusBar.currentHeight + 8 : 12,
    left: 20,
    right: 20,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: '#4E342E',
    borderRadius: 12,
    zIndex: 9999,
    elevation: 6,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  toastText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 14,
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
  promoImage: { width: '100%', height: '100%', justifyContent: 'center' },
  bannerOverlay: {
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignSelf: 'stretch',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    letterSpacing: 0.6,
  },

  dots: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 6,
    marginBottom: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
    marginHorizontal: 4,
  },

  /* TAB BAR */
  tabBar: {
    flexDirection: 'row',
    marginHorizontal: 18,
    marginTop: 6,
    borderRadius: 12,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tabItem: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 10,
  },
  tabActive: {
    backgroundColor: theme.colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.textSecondary,
  },
  tabTextActive: {
    color: '#fff',
  },

  /* SEARCH */
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginHorizontal: 18,
    marginTop: 10,
    backgroundColor: theme.colors.surface || '#F5F5F5',
    borderRadius: 12,
    height: 44,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: theme.colors.textPrimary,
    fontSize: 15,
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

  /* CARD (unitarios) */
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#FFF',
    borderRadius: theme.radius.md,
    elevation: 3,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 12,
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

  /* LARGE CARDS (combos / cestas) */
  largeCard: {
    marginBottom: 14,
    borderRadius: theme.radius.md,
    overflow: 'hidden',
    elevation: 3,
  },
  largeCardImage: {
    width: '100%',
    height: LARGE_CARD_HEIGHT,
    justifyContent: 'flex-end',
  },
  largeOverlay: {
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderBottomLeftRadius: theme.radius.md,
    borderBottomRightRadius: theme.radius.md,
    flex: 1,
    justifyContent: 'flex-end',
  },
  largeTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 4,
  },
  largeDesc: {
    fontSize: 13,
    color: '#fff',
    marginBottom: 8,
  },
  largeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  largeLeftIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    padding: 6,
    marginRight: 8,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 8,
  },
  largeRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  largePrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#fff',
    marginRight: 10,
  },
  largeAddBtn: {
    backgroundColor: theme.colors.primary,
    padding: 8,
    borderRadius: 8,
  },

  /* Favorito grande (combos/cestas) */
  favBtnLarge: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 20,
    backgroundColor: 'rgba(0,0,0,0.35)',
    padding: 8,
    borderRadius: 30,
  },
});
