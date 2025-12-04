import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useCarrinho } from "../context/CarrinhoContext";
import { Feather } from "@expo/vector-icons";

export default function CestaDetalhes() {
  const navigation = useNavigation();
  const route = useRoute();
  const { adicionarItem } = useCarrinho();

  const { cesta } = route.params || {};

  // ALERTA ELEGANTE — mesmo estilo do DetalhesPedido.js
  const [alertVisible, setAlertVisible] = useState(false);

  function handleAddToCart() {
    if (!cesta) return;

    adicionarItem({
      id: cesta.id,
      nome: cesta.nome,
      preco: cesta.preco,
      imagem: cesta.imagem,
      descricao: cesta.descricao,
      quantidade: 1,
      tipo: "cesta",
    });

    setAlertVisible(true);
  }

  if (!cesta) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Erro ao carregar detalhes.</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={cesta.imagem} style={styles.imagem} />

        <View style={styles.card}>
          <Text style={styles.nome}>{cesta.nome}</Text>
          <Text style={styles.preco}>R$ {cesta.preco.toFixed(2)}</Text>

          <Text style={styles.tituloSecao}>Descrição</Text>
          <Text style={styles.descricao}>{cesta.descricao}</Text>

          <TouchableOpacity
            style={styles.botaoInfo}
            onPress={() => navigation.navigate("CestaInfo", { cesta })}
          >
            <Text style={styles.botaoTexto}>Mais Informações</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaoCarrinho} onPress={handleAddToCart}>
            <Text style={styles.botaoTexto}>Adicionar ao Carrinho</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* ------------------ ALERTA ELEGANTE ------------------ */}
      <Modal visible={alertVisible} transparent animationType="fade">
        <View style={styles.alertBackground}>
          <View style={styles.alertBox}>
            <Feather name="check-circle" size={40} color="#8C4A2F" />

            <Text style={styles.alertTitle}>Adicionado!</Text>

            <Text style={styles.alertText}>
              {cesta.nome} foi adicionado ao carrinho com sucesso.
            </Text>

            <TouchableOpacity
              style={styles.alertButton}
              onPress={() => {
                setAlertVisible(false);
              }}
            >
              <Text style={styles.alertButtonText}>Entendi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* -------------------------------------------------------- */}
    </>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { padding: 20 },
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
    alignItems: "center",
    marginBottom: 15,
  },
  botaoCarrinho: {
    backgroundColor: "#4E342E",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  botaoTexto: { color: "#FFF", fontSize: 18, fontWeight: "bold" },

  /* ----- ALERTA ELEGANTE (igual ao DetalhesPedido.js) ----- */
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

  errorContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { fontSize: 18, color: "#4E342E" },
});
