// ---------------- DetalhesPedido.js ----------------

import React, { useContext, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Animated,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { CarrinhoContext } from '../context/CarrinhoContext';

export default function DetalhesPedido({ route, navigation }) {
  const { id, nome, preco, imagem } = route.params;
  const { adicionarItem } = useContext(CarrinhoContext);

  const scaleAnim = useRef(new Animated.Value(1)).current;

  // alerta personalizado aqui
  const [alertVisible, setAlertVisible] = useState(false);

  function animateButton() {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.92, duration: 80, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 80, useNativeDriver: true }),
    ]).start();
  }

  function handleAddToCart() {
    animateButton();

    adicionarItem({
      id,
      nome,
      preco,
      imagem,
    });

    // ➜ Ativa o alerta personalizado
    setAlertVisible(true);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF8F0' }}>
      
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 40 }}
      >

        <Image source={imagem} style={styles.image} />

        <Text style={styles.title}>{nome}</Text>

        <Text style={styles.price}>R$ {Number(preco).toFixed(2)}</Text>

        <Text style={styles.sectionTitle}>Descrição</Text>
        <Text style={styles.description}>
          Produto artesanal selecionado com carinho para garantir a melhor experiência.
          Ideal para acompanhar seu café da manhã ou café da tarde.
        </Text>

        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
            <Feather name="shopping-cart" size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.buttonText}>Adicionar ao Carrinho</Text>
          </TouchableOpacity>
        </Animated.View>

      </ScrollView>

      {/* ---------------- alerta personalizado ---------------- */}
      <Modal visible={alertVisible} transparent animationType="fade">
        <View style={styles.alertBackground}>
          <View style={styles.alertBox}>
            <Feather name="check-circle" size={40} color="#8C4A2F" />
            <Text style={styles.alertTitle}>Adicionado!</Text>
            <Text style={styles.alertText}>
              {nome} foi adicionado ao carrinho com sucesso.
            </Text>

            <TouchableOpacity
              style={styles.alertButton}
              onPress={() => setAlertVisible(false)}
            >
              <Text style={styles.alertButtonText}>Entendi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* ----------------------------------------------------------- */}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingTop: 10,
  },

  image: {
    width: '100%',
    height: 260,
    borderRadius: 18,
    marginTop: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    color: '#4A2C2A',
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 4,
    marginBottom: 14,
    color: '#C58B62',
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 6,
    fontWeight: '600',
    color: '#4A2C2A',
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#6E4E43',
    marginBottom: 22,
  },

  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C58B62',
    padding: 15,
    borderRadius: 14,
    marginBottom: 40,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },

  /* ALERTA ELEGANTE */
  alertBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },
  alertBox: {
    width: "80%",
    backgroundColor: "#FFF4EB",
    borderRadius: 18,
    padding: 24,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#D5B9A2",
  },
  alertTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#4C2E1E",
    marginTop: 10,
  },
  alertText: {
    fontSize: 16,
    color: "#6A4A3C",
    textAlign: "center",
    marginVertical: 10,
  },
  alertButton: {
    backgroundColor: "#6A4A3C",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  alertButtonText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "700",
  },
});
