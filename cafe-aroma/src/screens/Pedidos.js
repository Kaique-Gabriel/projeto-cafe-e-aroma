import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// telas internas
import PedidosEmAndamento from './pedidos/PedidosEmAndamento';
import MeusPedidosLista from './pedidos/MeusPedidosLista';
import HistoricoPedidos from './pedidos/HistoricoPedidos';
import Promocoes from './pedidos/Promocoes';

// imagens dos cards
const images = {
  andamento: require('../../assets/cards/cafe.png'),
  pedidos: require('../../assets/cards/paes.png'),
  historico: require('../../assets/cards/doces.png'),
  promo: require('../../assets/cards/promo.png'),
};

const Stack = createNativeStackNavigator();

function PedidosHome({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // animação de fade-in suave ao abrir
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const menu = [
    {
      id: 'andamento',
      title: 'Pedidos em andamento',
      screen: 'PedidosEmAndamento',
      image: images.andamento,
    },
    {
      id: 'meus',
      title: 'Meus pedidos',
      screen: 'MeusPedidosLista',
      image: images.pedidos,
    },
    {
      id: 'hist',
      title: 'Histórico',
      screen: 'HistoricoPedidos',
      image: images.historico,
    },
    {
      id: 'promo',
      title: 'Promoções',
      screen: 'Promocoes',
      image: images.promo,
    },
  ];

  return (
    <Animated.View style={[stylesHome.container, { opacity: fadeAnim }]}>
      <Text style={stylesHome.title}>Pedidos</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={stylesHome.cardsContainer}>
          {menu.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={stylesHome.card}
              activeOpacity={0.85}
              onPress={() => navigation.navigate(item.screen)}
            >
              <Image source={item.image} style={stylesHome.cardImage} />

              <View style={stylesHome.cardOverlay} />

              <Text style={stylesHome.cardText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </Animated.View>
  );
}

export default function Pedidos() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PedidosHome"
        component={PedidosHome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PedidosEmAndamento"
        component={PedidosEmAndamento}
        options={{ title: 'Pedidos em andamento' }}
      />
      <Stack.Screen
        name="MeusPedidosLista"
        component={MeusPedidosLista}
        options={{ title: 'Meus pedidos' }}
      />
      <Stack.Screen
        name="HistoricoPedidos"
        component={HistoricoPedidos}
        options={{ title: 'Histórico' }}
      />
      <Stack.Screen
        name="Promocoes"
        component={Promocoes}
        options={{ title: 'Promoções' }}
      />
    </Stack.Navigator>
  );
}

//
// --- ESTILOS ---
//

const stylesHome = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7F0',
    paddingHorizontal: 20,
    paddingTop: 35,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5A4632',
    marginBottom: 25,
  },

  cardsContainer: {
    flexDirection: 'column',
    gap: 22,
    paddingBottom: 70,
  },

  card: {
    width: '100%',
    height: 160,
    borderRadius: 18,
    overflow: 'hidden',
    position: 'relative',
    elevation: 4,

    backgroundColor: '#0002',
  },

  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
  },

  cardOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.22)',
  },

  cardText: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
});
