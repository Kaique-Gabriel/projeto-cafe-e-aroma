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

// telas externas (coloque os arquivos em src/screens/)
import HomeApp from './src/screens/HomeApp';
import Perfil from './src/screens/Perfil';

export default function App() {
  // controle de telas principais
  const [screen, setScreen] = useState('home'); // 'home' (welcome) | 'login' | 'cadastro' | 'homeApp' | 'perfil' | 'detalhesPedido' | 'meusPedidos'
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // produto selecionado (para detalhes do pedido)
  const [selectedProduct, setSelectedProduct] = useState(null);

  // fades
  const fade = useRef(new Animated.Value(1)).current; // usado em transitionTo
  const fadeTela = useRef(new Animated.Value(1)).current; // fade global entre telas (mais lento)

  // quando a screen mudar, faz um fade-in (suaviza mudanças)
  useEffect(() => {
    fadeTela.setValue(0);
    Animated.timing(fadeTela, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [screen]);

  // transição padrão (usada por botões tipo "entrar", "voltar", etc)
  const transitionTo = (nextScreen) => {
    Animated.timing(fade, {
      toValue: 0,
      duration: 140,
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

  // componente de botão animado (micro-feedback)
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

  // ---- Render das telas ----
  const renderScreen = () => {
    switch (screen) {
      // === TELA INICIAL (welcome) ===
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

      // === LOGIN ===
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

      // === CADASTRO SIMULADO ===
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

      // === HOMEAPP (IMPORTADO) ===
      case 'homeApp':
        return (
          <HomeApp
            onNavigate={(target, data = null) => {
              // se for detalhe: guardamos produto e mudamos de tela
              if (target === 'detalhesPedido') {
                setSelectedProduct(data);
                transitionTo('detalhesPedido');
                return;
              }
              // caso comum: navega normalmente (perfil, meusPedidos, etc)
              transitionTo(target);
            }}
          />
        );

      // === PERFIL (IMPORTADO) ===
      case 'perfil':
        // Perfil.js deve receber onVoltar prop (ou você pode fazer setScreen direto)
        return <Perfil onVoltar={() => transitionTo('homeApp')} />;

      // === DETALHES DO PEDIDO ===
      case 'detalhesPedido':
        return (
          <Animated.View style={[styles.screenContainer, { opacity: fade, padding: 20, alignItems: 'center' }]}>
            <Text style={styles.title}>Detalhes do Pedido</Text>
            {selectedProduct ? (
              <>
                <Image source={{ uri: selectedProduct.image || selectedProduct.img || selectedProduct.uri }} style={{ width: 150, height: 150, borderRadius: 16, marginTop: 20 }} />
                <Text style={styles.subtitle}>{selectedProduct.title || selectedProduct.name}</Text>
                <Text style={styles.cardPrice}>{selectedProduct.price || '—'}</Text>

                <AnimatedButton style={{ marginTop: 20 }} onPress={() => alert('Pedido confirmado! (simulado)')}>
                  Confirmar Pedido
                </AnimatedButton>
              </>
            ) : (
              <Text style={styles.text}>Nenhum produto selecionado.</Text>
            )}

            <AnimatedButton outline style={{ marginTop: 16 }} onPress={() => transitionTo('homeApp')}>
              Voltar
            </AnimatedButton>
          </Animated.View>
        );

      // === MEUS PEDIDOS ===
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

      // === DEFAULT / Fallback ===
      default:
        return (
          <Animated.View style={[styles.screenContainer, { opacity: fade }]}>
            <Text style={styles.title}>Tela desconhecida</Text>
            <AnimatedButton onPress={() => transitionTo('home')}>Voltar ao início</AnimatedButton>
          </Animated.View>
        );
    }
  };

  // <-- Render final com fadeTela aplicado -->
  return (
    <Animated.View style={[styles.appMain, { opacity: fadeTela }]}>
      {renderScreen()}
    </Animated.View>
  );
}

/* ===========================
   Styles
   =========================== */
const styles = StyleSheet.create({
  appMain: { flex: 1, backgroundColor: '#1f130b' }, // base escura elegante
  screenContainer: { flex: 1, justifyContent: 'center' },

  // fake gradients
  gradientFakeTop: { position: 'absolute', top: 0, left: 0, right: 0, height: 120, backgroundColor: 'rgba(255,255,255,0.02)' },
  gradientFakeBottom: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 140, backgroundColor: 'rgba(255,255,255,0.01)' },

  contentCenter: { padding: 28, alignItems: 'center', justifyContent: 'center' },

  // brand
  brandMark: { fontSize: 42, marginBottom: 6, color: '#f5f5f5' },
  title: { fontSize: 30, fontWeight: '700', color: '#f5f5f5', textAlign: 'center' },
  lead: { fontSize: 16, color: '#d4c6be', marginTop: 8, marginBottom: 18, textAlign: 'center' },

  heroImage: { width: 160, height: 160, borderRadius: 16, marginVertical: 14 },

  // forms
  formWrap: { paddingHorizontal: 28, alignItems: 'center' },
  input: {
    width: 320,
    maxWidth: '92%',
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'web' ? 10 : 12,
    backgroundColor: '#2b1b12',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#3a2618',
    marginBottom: 12,
    color: '#f5f5f5',
  },

  text: { color: '#d4c6be', fontSize: 15, marginBottom: 10 },

  // buttons
  buttonBase: { minWidth: 160, paddingVertical: 12, paddingHorizontal: 18, borderRadius: 28, alignItems: 'center' },
  buttonPrimary: {
    backgroundColor: '#5d4037',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.22,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonOutline: { backgroundColor: 'transparent', borderWidth: 2, borderColor: '#5d4037' },
  buttonText: { color: '#fff', fontWeight: '700' },
  buttonTextOutline: { color: '#e6d7cf' },

  smallNoteWrap: { marginTop: 14 },
  smallNote: { color: '#b79d90', fontSize: 12 },

  // product card (fallback style used in detalhes)
  card: {
    backgroundColor: '#2b1b12',
    width: 340,
    maxWidth: '94%',
    marginVertical: 10,
    borderRadius: 14,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  cardImage: { width: 92, height: 92, borderRadius: 10, marginRight: 12 },
  cardBody: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#f5f5f5' },
  cardPrice: { color: '#d4c6be', marginTop: 4, fontSize: 14 },

  scrollContent: { alignItems: 'center', paddingVertical: 30, paddingHorizontal: 16 },
  footerButtons: { marginTop: 18, flexDirection: 'row', justifyContent: 'space-between', width: '86%' },
});
