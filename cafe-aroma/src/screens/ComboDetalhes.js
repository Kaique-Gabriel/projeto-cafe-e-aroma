import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Animated,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { useCarrinho } from "../context/CarrinhoContext";

export default function ComboDetalhes() {
  const navigation = useNavigation();
  const route = useRoute();
  const { adicionarItem } = useCarrinho();

  const { combo } = route.params || {};

  // alert personalizado
  const [alertVisible, setAlertVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  function showAlert() {
    setAlertVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }

  function closeAlert() {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 180,
      useNativeDriver: true,
    }).start(() => setAlertVisible(false));
  }

  function handleAddToCart() {
    if (!combo) return;

    adicionarItem({
      id: combo.id,
      nome: combo.nome,
      preco: combo.preco,
      imagem: combo.imagem,
      descricao: combo.descricao,
      quantidade: 1,
      tipo: "combo",
    });

    showAlert();
  }

  if (!combo) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Erro ao carregar detalhes.</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={combo.imagem} style={styles.imagem} />

        <View style={styles.card}>
          <Text style={styles.nome}>{combo.nome}</Text>

          <Text style={styles.preco}>R$ {combo.preco.toFixed(2)}</Text>

          <Text style={styles.tituloSecao}>Descrição</Text>
          <Text style={styles.descricao}>{combo.descricao}</Text>

          <TouchableOpacity
            style={styles.botaoInfo}
            onPress={() => navigation.navigate("ComboInfo", { combo })}
          >
            <Text style={styles.botaoTexto}>Mais Informações</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaoCarrinho} onPress={handleAddToCart}>
            <Text style={styles.botaoTexto}>Adicionar ao Carrinho</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* alert personalizado */}
      <Modal transparent visible={alertVisible} animationType="fade">
        <View style={styles.alertBackground}>
          <Animated.View style={[styles.alertBox, { opacity: fadeAnim }]}>
            <Feather name="check-circle" size={40} color="#8C4A2F" />

            <Text style={styles.alertTitle}>Adicionado!</Text>

            <Text style={styles.alertText}>
              {combo.nome} foi adicionado ao carrinho com sucesso.
            </Text>

            <TouchableOpacity
              style={styles.alertButton}
              onPress={() => {
                closeAlert();
                navigation.navigate("MainApp", { screen: "Carrinho" });
              }}
            >
              <Text style={styles.alertButtonText}>Entendi</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
  },
  imagem: {
    width: "100%",
    height: 230,
    borderRadius: 12,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    elevation: 3,
  },
  nome: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#4E342E",
    marginBottom: 10,
  },
  preco: {
    fontSize: 22,
    color: "#6D4C41",
    fontWeight: "600",
    marginBottom: 20,
  },
  tituloSecao: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4E342E",
    marginBottom: 5,
  },
  descricao: {
    fontSize: 16,
    color: "#5A4A42",
    marginBottom: 25,
    lineHeight: 22,
  },
  botaoInfo: {
    backgroundColor: "#8D6E63",
    padding: 14,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: "center",
  },
  botaoCarrinho: {
    backgroundColor: "#4E342E",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  botaoTexto: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  /* --- parte do alert personalizado --- */
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

  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: "#4E342E",
  },
});
