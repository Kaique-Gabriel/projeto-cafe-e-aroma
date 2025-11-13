// src/components/Drawer.js
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function Drawer({ visible, onClose, setTelaAtual }) {
  const slideAnim = useRef(new Animated.Value(-width * 0.7)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // controla animação de abertura/fechamento
  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -width * 0.7,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const navigate = (screen) => {
    setTelaAtual(screen);
    onClose();
  };

  if (!visible && fadeAnim.__getValue() === 0) {
    // se estiver completamente fechado, não renderiza
    return null;
  }

  return (
    <View style={StyleSheet.absoluteFill}>
      {/* Overlay escuro com clique para fechar */}
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View
          style={[
            styles.overlay,
            {
              opacity: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.4],
              }),
            },
          ]}
        />
      </TouchableWithoutFeedback>

      {/* Painel lateral */}
      <Animated.View
        style={[
          styles.drawer,
          {
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        <View style={styles.header}>
          <Text style={styles.appTitle}>☕ Café & Aroma</Text>
        </View>

        <TouchableOpacity style={styles.item} onPress={() => navigate('homeApp')}>
          <Text style={styles.itemText}>Início</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => navigate('perfil')}>
          <Text style={styles.itemText}>Meu Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => navigate('detalhesPedido')}>
          <Text style={styles.itemText}>Pedidos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.item, { marginTop: 30 }]} onPress={onClose}>
          <Text style={[styles.itemText, { color: '#b5744a' }]}>Fechar</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  drawer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: width * 0.7,
    backgroundColor: 'rgba(255, 247, 237, 0.9)', // leve transparência
    borderTopRightRadius: 22,
    borderBottomRightRadius: 22,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 48 : 60,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 2, height: 4 },
    shadowRadius: 8,
    elevation: 6,
    backdropFilter: Platform.OS === 'web' ? 'blur(8px)' : undefined, // efeito blur (web)
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(92, 61, 46, 0.2)',
    marginBottom: 20,
    paddingBottom: 8,
  },
  appTitle: {
    fontSize: 22,
    color: '#5C3D2E',
    fontWeight: 'bold',
  },
  item: {
    paddingVertical: 14,
  },
  itemText: {
    fontSize: 16,
    color: '#3E2723',
    fontWeight: '600',
  },
});
