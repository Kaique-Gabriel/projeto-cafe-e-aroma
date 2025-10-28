// App.js
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

/*
  Versão "embelezada segura" do App.js
  - Mantém todas as telas / fluxos que você já tem
  - Adiciona: fundo com camada tipo gradient (simulado), botões com efeito, sombras, cards estilizados
  - Usa apenas APIs nativas (Animated, TouchableOpacity, View, Text, Image)
*/

export default function App() {
  // controla qual tela aparece
  const [screen, setScreen] = useState('home');
  // campos de login
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // animações globais (fade entre telas)
  const fade = useRef(new Animated.Value(1)).current;

  // função utilitária: anima fade out -> troca tela -> fade in
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

  // Botão custom com micro-animacao (scale)
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
          <Text style={[styles.buttonText, outline ? styles.buttonTextOutline : null]}>
            {children}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  // Card visual para produtos
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

  // Renderiza as telas (mesmo fluxo funcional de antes)
  const renderScreen = () => {
    switch (screen) {
      // tela inicial (bonita)
      case 'home':
        return (
          <Animated.View style={[styles.screenContainer, { opacity: fade }]}>
            <View style={styles.gradientFakeTop} /> {/* camada para simular 'gradiente' */}
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

      // tela login
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

      // tela cadastro (simulada)
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

      // tela principal após login
      case 'homeApp':
        return (
          <Animated.View style={[styles.screenContainer, { opacity: fade }]}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
              <Text style={styles.title}>Bem-vindo!</Text>
              <Text style={styles.lead}>Escolha seu pedido abaixo</Text>

              <ProductCard
                title="Café Expresso"
                price="R$ 5,00"
                imageUri="https://i.imgur.com/jHcP6aO.png"
                onPress={() => alert('Pedir Café Expresso (simulado)')}
              />

              <ProductCard
                title="Cappuccino"
                price="R$ 7,00"
                imageUri="https://i.imgur.com/FDyUuc8.png"
                onPress={() => alert('Pedir Cappuccino (simulado)')}
              />

              <View style={styles.footerButtons}>
                <AnimatedButton outline onPress={() => transitionTo('home')}>
                  Sair
                </AnimatedButton>
                <AnimatedButton onPress={() => alert('Tela De Pedidos (simulada)')}>
                  Meus Pedidos
                </AnimatedButton>
              </View>
            </ScrollView>
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

/* ============================
   Styles (muitos comentários)
   Mantém tudo organizado e "aumenta" o arquivo, sem remover funcionalidades.
   ============================ */
const styles = StyleSheet.create({
  appMain: {
    flex: 1,
    backgroundColor: '#f7efe6', // base creme clara
  },

  // Screen container (padrão)
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  // ===== fake gradient (camadas simples para aparência de gradiente)
  gradientFakeTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: 'rgba(139,69,19,0.06)', // marrom leve
  },
  gradientFakeBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 140,
    backgroundColor: 'rgba(139,69,19,0.03)',
  },

  // Centro do conteúdo
  contentCenter: {
    padding: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Marca (logo)
  brandMark: {
    fontSize: 42,
    marginBottom: 6,
    color: '#4b2e1e',
  },

  // Título principal
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#4b2e1e',
    textAlign: 'center',
  },

  // subtítulo / lead
  lead: {
    fontSize: 16,
    color: '#6e4f36',
    marginTop: 8,
    marginBottom: 18,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#6e4f36',
    marginTop: 10,
    marginBottom: 18,
    textAlign: 'center',
  },

  // imagem hero
  heroImage: {
    width: 160,
    height: 160,
    borderRadius: 16,
    marginVertical: 14,
  },

  // ===== formulário (login / cadastro)
  formWrap: {
    paddingHorizontal: 28,
    alignItems: 'center',
  },

  // input simples
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

  // texto explicativo
  text: {
    color: '#4b2e1e',
    fontSize: 15,
    marginBottom: 10,
  },

  // ===== botões (base + variantes)
  buttonBase: {
    minWidth: 160,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 28,
    alignItems: 'center',
  },
  buttonPrimary: {
    backgroundColor: '#7b4f33',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#7b4f33',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
  buttonTextOutline: {
    color: '#7b4f33',
  },

  // nota pequena abaixo dos botões
  smallNoteWrap: {
    marginTop: 14,
  },
  smallNote: {
    color: '#8b6f51',
    fontSize: 12,
  },

  // ===== cards de produto
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
  cardImage: {
    width: 92,
    height: 92,
    borderRadius: 10,
    marginRight: 12,
  },
  cardBody: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#342217',
  },
  cardPrice: {
    color: '#8b6f51',
    marginTop: 4,
    fontSize: 14,
  },

  // layout do scroll na homeApp
  scrollContent: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 16,
  },

  // rodapé com 2 botões
  footerButtons: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '86%',
  },
});
