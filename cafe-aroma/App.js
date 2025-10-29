// App.js
import HomeApp from './src/screens/HomeApp';
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Animated,
  Platform,
} from 'react-native';

export default function App() {
  const [screen, setScreen] = useState('home');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // estado para armazenar produto selecionado
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fade = useRef(new Animated.Value(1)).current;

  const transitionTo = (nextScreen) => {
    Animated.timing(fade, {
      toValue: 0,
      duration: 160,
      useNativeDriver: true,
    }).start(() => {
      setScreen(nextScreen);
      Animated.timing(fade, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }).start();
    });
  };

  function AnimatedButton({ children, style, onPress, outline }) {
    const scale = useRef(new Animated.Value(1)).current;
    const onPressIn = () => {
      Animated.spring(scale, { toValue: 0.97, useNativeDriver: true, friction: 6 }).start();
    };
    const onPressOut = () => {
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 6 }).start();
    };
    return (
      <Animated.View style={{ transform: [{ scale }] }}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onPress}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          style={[styles.buttonBase, outline ? styles.buttonOutline : styles.buttonPrimary, style]}>
          <Text style={[styles.buttonText, outline ? styles.buttonTextOutline : null]}>{children}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  function ProductCard({ title, price, imageUri, onPress }) {
    return (
      <View style={styles.card}>
        <Image source={{ uri: imageUri }} style={styles.cardImage} />
        <View style={styles.cardBody}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardPrice}>{price}</Text>
          <AnimatedButton style={{ marginTop: 10 }} onPress={onPress}>
            Pedir
          </AnimatedButton>
        </View>
      </View>
    );
  }

  const renderScreen = () => {
    switch (screen) {
      case 'home':
        return (
          <Animated.View style={[styles.screenContainer, { opacity: fade }]}>
            <View style={styles.gradientFakeTop} />
            <View style={styles.contentCenter}>
              <Text style={styles.brandMark}>☕</Text>
              <Text style={styles.title}>Café & Aroma</Text>
              <Image source={{ uri: 'https://i.imgur.com/yQpO2Ax.png' }} style={styles.heroImage} />
              <Text style={styles.lead}>Seu café da manhã em um toque — quentinho e rápido.</Text>

              <AnimatedButton style={{ marginTop: 18 }} onPress={() => transitionTo('login')}>
                Entrar
              </AnimatedButton>

              <AnimatedButton outline style={{ marginTop: 12 }} onPress={() => transitionTo('cadastro')}>
                Criar conta
              </AnimatedButton>

              <View style={styles.smallNoteWrap}>
                <Text style={styles.smallNote}>Entregas rápidas • Pagamento na entrega</Text>
              </View>
            </View>
            <View style={styles.gradientFakeBottom} />
          </Animated.View>
        );

      case 'login':
        return (
          <Animated.View style={[styles.screenContainer, { opacity: fade }]}>
            <View style={styles.formWrap}>
              <Text style={styles.title}>Entrar</Text>

              <TextInput
                style={styles.input}
                placeholder="E-mail"
                placeholderTextColor="#9b7d62"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
              <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor="#9b7d62"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
              />

              <AnimatedButton onPress={() => transitionTo('homeApp')}>Entrar</AnimatedButton>
              <AnimatedButton outline style={{ marginTop: 10 }} onPress={() => transitionTo('home')}>
                Voltar
              </AnimatedButton>
            </View>
          </Animated.View>
        );

      case 'cadastro':
        return (
          <Animated.View style={[styles.screenContainer, { opacity: fade }]}>
            <View style={styles.formWrap}>
              <Text style={styles.title}>Criar conta</Text>
              <Text style={styles.text}>Ainda estamos finalizando o cadastro — por enquanto é simulado.</Text>
              <AnimatedButton onPress={() => transitionTo('home')}>Voltar</AnimatedButton>
            </View>
          </Animated.View>
        );

      case 'homeApp':
  return (
    <HomeApp
      onNavigate={(target, data = null) => {
        // se for detalhes do pedido, grava o produto selecionado e faz a transição (mantendo sua animação)
        if (target === 'detalhesPedido') {
          setSelectedProduct(data);
          transitionTo('detalhesPedido');
          return;
        }
        // caso normal: só transita para a tela desejada
        transitionTo(target);
      }}
    />
  );

      case 'detalhesPedido':
        return (
          <Animated.View style={[styles.screenContainer, { opacity: fade, padding: 20, alignItems: 'center' }]}>
            <Text style={styles.title}>Detalhes do Pedido</Text>
            {selectedProduct && (
              <>
                <Image source={{ uri: selectedProduct.image }} style={{ width: 150, height: 150, borderRadius: 16, marginTop: 20 }} />
                <Text style={styles.subtitle}>{selectedProduct.title}</Text>
                <Text style={styles.cardPrice}>{selectedProduct.price}</Text>

                <AnimatedButton style={{ marginTop: 20 }} onPress={() => alert('Pedido confirmado! (simulado)')}>
                  Confirmar Pedido
                </AnimatedButton>
              </>
            )}
            <AnimatedButton outline style={{ marginTop: 16 }} onPress={() => transitionTo('homeApp')}>
              Voltar
            </AnimatedButton>
          </Animated.View>
        );

      case 'meusPedidos':
        return (
          <Animated.View style={[styles.screenContainer, { opacity: fade, padding: 20 }]}>
            <Text style={styles.title}>Meus Pedidos</Text>
            <Text style={styles.subtitle}>Histórico de pedidos (simulado)</Text>
            <Text style={styles.text}>Você ainda não fez pedidos reais.</Text>
            <AnimatedButton style={{ marginTop: 20 }} onPress={() => transitionTo('homeApp')}>
              Voltar
            </AnimatedButton>
          </Animated.View>
        );

      default:
        return (
          <Animated.View style={[styles.screenContainer, { opacity: fade }]}>
            <Text style={styles.title}>Tela desconhecida</Text>
            <AnimatedButton onPress={() => transitionTo('home')}>Voltar ao início</AnimatedButton>
          </Animated.View>
        );
    }
  };

  return <View style={styles.appMain}>{renderScreen()}</View>;
}

const styles = StyleSheet.create({
  appMain: { flex: 1, backgroundColor: '#f7efe6' },
  screenContainer: { flex: 1, justifyContent: 'center' },
  gradientFakeTop: { position: 'absolute', top: 0, left: 0, right: 0, height: 120, backgroundColor: 'rgba(139,69,19,0.06)' },
  gradientFakeBottom: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 140, backgroundColor: 'rgba(139,69,19,0.03)' },
  contentCenter: { padding: 28, alignItems: 'center', justifyContent: 'center' },
  brandMark: { fontSize: 42, marginBottom: 6, color: '#4b2e1e' },
  title: { fontSize: 30, fontWeight: '700', color: '#4b2e1e', textAlign: 'center' },
  lead: { fontSize: 16, color: '#6e4f36', marginTop: 8, marginBottom: 18, textAlign: 'center' },
  subtitle: { fontSize: 18, color: '#6e4f36', marginTop: 10, marginBottom: 18, textAlign: 'center' },
  heroImage: { width: 160, height: 160, borderRadius: 16, marginVertical: 14 },
  formWrap: { paddingHorizontal: 28, alignItems: 'center' },
  input: {
    width: 320,
    maxWidth: '92%',
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'web' ? 10 : 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0cbb6',
    marginBottom: 12,
    color: '#33261a',
  },
  text: { color: '#4b2e1e', fontSize: 15, marginBottom: 10 },
  buttonBase: { minWidth: 160, paddingVertical: 12, paddingHorizontal: 18, borderRadius: 28, alignItems: 'center' },
  buttonPrimary: {
    backgroundColor: '#7b4f33',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonOutline: { backgroundColor: 'transparent', borderWidth: 2, borderColor: '#7b4f33' },
  buttonText: { color: '#fff', fontWeight: '700' },
  buttonTextOutline: { color: '#7b4f33' },
  smallNoteWrap: { marginTop: 14 },
  smallNote: { color: '#8b6f51', fontSize: 12 },
  card: {
    backgroundColor: '#fff',
    width: 340,
    maxWidth: '94%',
    marginVertical: 10,
    borderRadius: 14,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  cardImage: { width: 92, height: 92, borderRadius: 10, marginRight: 12 },
  cardBody: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#342217' },
  cardPrice: { color: '#8b6f51', marginTop: 4, fontSize: 14 },
  scrollContent: { alignItems: 'center', paddingVertical: 30, paddingHorizontal: 16 },
  footerButtons: { marginTop: 18, flexDirection: 'row', justifyContent: 'space-between', width: '86%' },
});
