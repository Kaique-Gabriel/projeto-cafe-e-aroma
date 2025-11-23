// src/screens/Carrinho.js
import React, { useEffect, useRef, useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  Animated,
  ActivityIndicator,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CarrinhoContext } from '../context/CarrinhoContext';
import { useNavigation } from '@react-navigation/native';

export default function Carrinho() {
  const { carrinho, removerItem, limparCarrinho, calcularTotal } = useContext(CarrinhoContext);
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [finalizando, setFinalizando] = useState(false);
  const animatedValues = useRef([]).current;

  // Inicializa Animated.Value para cada item para animar a lista
  useEffect(() => {
    animatedValues.length = 0;
    carrinho.forEach((_, i) => {
      animatedValues[i] = new Animated.Value(0);
    });

    Animated.stagger(
      80,
      animatedValues.map(av =>
        Animated.timing(av, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        })
      )
    ).start();
  }, [carrinho]);

  // Render item com animação
  function renderItem({ item, index }) {
    const av = animatedValues[index] || new Animated.Value(1);
    const translateY = av.interpolate({
      inputRange: [0, 1],
      outputRange: [12, 0],
    });
    const opacity = av;

    // suporta imagem como uri (string) ou require(...) (number)
    const imgSource = typeof item.imagem === 'string' ? { uri: item.imagem } : item.imagem;

    return (
      <Animated.View style={[styles.itemWrapper, { opacity, transform: [{ translateY }] }]}>
        <View style={styles.item}>
          <Image source={imgSource} style={styles.image} />

          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{item.nome}</Text>
            {item.descricao ? <Text style={styles.desc} numberOfLines={2}>{item.descricao}</Text> : null}
            <Text style={styles.price}>R$ {Number(item.preco || 0).toFixed(2)}</Text>
          </View>

          <TouchableOpacity
            style={styles.removeBtn}
            onPress={() => confirmRemover(index, item)}
          >
            <Text style={styles.removeText}>Remover</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }

  function confirmRemover(index, item) {
    Alert.alert(
      'Remover item',
      `Remover "${item.nome}" do carrinho?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: () => {
            removerItem(index);
          }
        }
      ]
    );
  }

  async function handleFinalizarPedido() {
    if (!carrinho || carrinho.length === 0) {
      Alert.alert('Carrinho vazio', 'Adicione produtos antes de finalizar o pedido.');
      return;
    }

    setFinalizando(true);

    try {
      const pedido = {
        id: Date.now(),
        itens: carrinho,
        total: Number(calcularTotal() || 0).toFixed(2),
        data: new Date().toISOString(),
      };

      const raw = await AsyncStorage.getItem('meusPedidos');
      const historico = raw ? JSON.parse(raw) : [];
      historico.push(pedido);
      await AsyncStorage.setItem('meusPedidos', JSON.stringify(historico));

      // limpa o carrinho global
      limparCarrinho();

      // feedback e navegação
      setTimeout(() => {
        setFinalizando(false);
        Alert.alert('Pedido enviado', 'Seu pedido foi finalizado com sucesso!');
        navigation.navigate('MeusPedidos');
      }, 600);
    } catch (err) {
      console.error('Erro ao salvar pedido:', err);
      Alert.alert('Erro', 'Não foi possível finalizar o pedido. Tente novamente.');
      setFinalizando(false);
    }
  }

  // Faz um refresh opcional para indicador bonito ao abrir
  useEffect(() => {
    if (carrinho.length === 0) return;
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(t);
  }, [carrinho]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu Carrinho</Text>

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 30 }} />
      ) : (
        <>
          <FlatList
            data={carrinho}
            keyExtractor={(_, idx) => String(idx)}
            renderItem={renderItem}
            contentContainerStyle={carrinho.length === 0 ? styles.emptyContainer : { paddingBottom: 20 }}
            ListEmptyComponent={
              <View style={styles.emptyBox}>
                <Text style={styles.emptyText}>Seu carrinho está vazio 😕</Text>
                <Text style={styles.emptySub}>Vá para a tela inicial e escolha algo gostoso!</Text>
                <TouchableOpacity
                  style={styles.voltarBtn}
                  onPress={() => navigation.navigate('HomeApp')}
                >
                  <Text style={styles.voltarText}>Ir para Início</Text>
                </TouchableOpacity>
              </View>
            }
          />

          {carrinho.length > 0 && (
            <View style={styles.footer}>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>R$ {Number(calcularTotal() || 0).toFixed(2)}</Text>
              </View>

              <TouchableOpacity
                style={[styles.checkoutBtn, finalizando ? { opacity: 0.7 } : null]}
                onPress={handleFinalizarPedido}
                disabled={finalizando}
              >
                {finalizando ? (
                  <Text style={styles.checkoutText}>Finalizando...</Text>
                ) : (
                  <Text style={styles.checkoutText}>Finalizar Pedido</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.clearBtn}
                onPress={() =>
                  Alert.alert(
                    'Limpar carrinho',
                    'Deseja remover todos os itens do carrinho?',
                    [
                      { text: 'Cancelar', style: 'cancel' },
                      { text: 'Limpar', style: 'destructive', onPress: () => limparCarrinho() },
                    ]
                  )
                }
              >
                <Text style={styles.clearText}>Limpar Carrinho</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f4ef',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 20 : 0,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#4e342e',
    marginTop: 12,
    marginBottom: 8,
    textAlign: 'center',
  },
  itemWrapper: {
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    elevation: 3,
  },
  image: {
    width: 78,
    height: 78,
    borderRadius: 10,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4e342e',
  },
  desc: {
    fontSize: 13,
    color: '#6d4c41',
    marginTop: 4,
  },
  price: {
    marginTop: 6,
    fontSize: 15,
    color: '#6d4c41',
    fontWeight: '600',
  },
  removeBtn: {
    padding: 8,
    marginLeft: 12,
  },
  removeText: {
    color: '#B71C1C',
    fontWeight: '700',
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptyBox: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    fontSize: 20,
    color: '#6d4c41',
    fontWeight: '700',
    marginBottom: 6,
  },
  emptySub: {
    color: '#6d4c41',
    marginBottom: 16,
  },
  voltarBtn: {
    backgroundColor: '#6d4c41',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
  },
  voltarText: {
    color: '#fff',
    fontWeight: '700',
  },
  footer: {
    paddingVertical: 12,
    paddingBottom: 24,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    marginBottom: 10,
  },
  totalLabel: {
    fontSize: 18,
    color: '#4e342e',
    fontWeight: '700',
  },
  totalValue: {
    fontSize: 18,
    color: '#4e342e',
    fontWeight: '700',
  },
  checkoutBtn: {
    backgroundColor: '#4e342e',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#F5D7A1',
    fontSize: 16,
    fontWeight: '700',
  },
  clearBtn: {
    marginTop: 10,
    alignItems: 'center',
  },
  clearText: {
    color: '#B71C1C',
    fontWeight: '700',
  },
});
