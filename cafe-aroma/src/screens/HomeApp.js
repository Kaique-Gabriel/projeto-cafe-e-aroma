import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function HomeApp({ onNavigate }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-width * 0.7)).current;

  const toggleMenu = () => {
    Animated.timing(slideAnim, {
      toValue: menuVisible ? -width * 0.7 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setMenuVisible(!menuVisible);
  };

  // Ao navegar, fechamos o menu (se aberto) e chamamos a função onNavigate recebida do App.js.
  const handleNavigate = (target, data = null) => {
    if (menuVisible) {
      Animated.timing(slideAnim, {
        toValue: -width * 0.7,
        duration: 220,
        useNativeDriver: true,
      }).start(() => setMenuVisible(false));
    }
    // small delay so closing animation feels natural
    setTimeout(() => onNavigate(target, data), 240);
  };

  const cards = [
    {
      name: 'Café Expresso',
      desc: 'Encorpado, forte e autêntico.',
      img: 'https://i.imgur.com/jHcP6aO.png',
      price: 'R$ 5,00',
    },
    {
      name: 'Cappuccino',
      desc: 'Café, leite e espuma cremosa.',
      img: 'https://i.imgur.com/FDyUuc8.png',
      price: 'R$ 7,00',
    },
    {
      name: 'Latte',
      desc: 'Suave, aveludado e levemente doce.',
      img: 'https://i.imgur.com/0N1eTgK.png',
      price: 'R$ 6,50',
    },
  ];

  return (
    <View style={styles.main}>
      {/* 🔹 Menu Lateral */}
      <Animated.View
        style={[
          styles.menuContainer,
          { transform: [{ translateX: slideAnim }] },
        ]}>
        <Text style={styles.menuTitle}>☕ Menu</Text>

        <TouchableOpacity onPress={() => handleNavigate('meusPedidos')}>
          <Text style={styles.menuItem}>📦 Meus pedidos</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleNavigate('perfil')}>
          <Text style={styles.menuItem}>👤 Meu perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleNavigate('home')}>
          <Text style={[styles.menuItem, { color: '#a33' }]}>🚪 Sair</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* 🔹 Conteúdo principal */}
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={toggleMenu}>
            <Text style={styles.menuButton}>☰</Text>
          </TouchableOpacity>

          <View>
            <Text style={styles.titleHome}>Bem-vindo, amante de café!</Text>
            <Text style={styles.subtitleHome}>Descubra seu sabor favorito ☕</Text>
          </View>
        </View>

        <View style={styles.cardsContainer}>
          {cards.map((item, index) => (
            <View key={index} style={styles.card}>
              <Image source={{ uri: item.img }} style={styles.cardImage} />
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardText}>{item.desc}</Text>

              <TouchableOpacity
                style={styles.smallButton}
                onPress={() => handleNavigate('detalhesPedido', {
                  title: item.name,
                  price: item.price,
                  image: item.img,
                })}
              >
                <Text style={styles.smallButtonText}>Pedir</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fdf5ee',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    justifyContent: 'flex-start',
  },
  menuButton: {
    fontSize: 28,
    color: '#4b2e1e',
    marginRight: 15,
  },
  titleHome: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4b2e1e',
  },
  subtitleHome: {
    fontSize: 14,
    color: '#7b4f33',
    marginTop: 3,
  },
  cardsContainer: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 14,
    marginVertical: 10,
    alignItems: 'center',
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },
  cardImage: {
    width: 140,
    height: 140,
    marginBottom: 10,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4b2e1e',
  },
  cardText: {
    fontSize: 14,
    color: '#7b4f33',
    marginBottom: 10,
    textAlign: 'center',
  },
  smallButton: {
    backgroundColor: '#7b4f33',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  smallButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  menuContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: width * 0.7,
    height: '100%',
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
    elevation: 10,
    zIndex: 10,
    borderRightWidth: 2,
    borderColor: '#f0e6da',
  },
  menuTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4b2e1e',
    marginBottom: 30,
  },
  menuItem: {
    fontSize: 18,
    color: '#4b2e1e',
    marginVertical: 10,
  },
});
