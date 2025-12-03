import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useCarrinho } from "../context/CarrinhoContext";

export default function CestaDetalhes() {
  const navigation = useNavigation();
  const route = useRoute();
  const { adicionarItem } = useCarrinho();

  const { cesta } = route.params || {};

  function handleAddToCart() {
    if (!cesta) {
      Alert.alert("Erro", "Item inválido.");
      return;
    }

    adicionarItem({
      id: cesta.id,
      nome: cesta.nome,
      preco: cesta.preco,
      imagem: cesta.imagem,
      descricao: cesta.descricao,
      quantidade: 1,
      tipo: "cesta",
    });

    navigation.navigate("MainApp", { screen: "Carrinho" });
  }

  if (!cesta) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Erro ao carregar detalhes.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Image source={cesta.imagem} style={styles.imagem} />

      <View style={styles.card}>
        <Text style={styles.nome}>{cesta.nome}</Text>
        <Text style={styles.preco}>R$ {cesta.preco.toFixed(2)}</Text>

        <Text style={styles.tituloSecao}>Descrição</Text>
        <Text style={styles.descricao}>{cesta.descricao}</Text>

        {/* BOTÃO DE MAIS INFORMAÇÕES */}
        <TouchableOpacity
          style={styles.botaoInfo}
          onPress={() => navigation.navigate("CestaInfo", { cesta })}
        >
          <Text style={styles.botaoTexto}>Mais Informações</Text>
        </TouchableOpacity>

        {/* BOTÃO DE ADICIONAR AO CARRINHO */}
        <TouchableOpacity style={styles.botaoCarrinho} onPress={handleAddToCart}>
          <Text style={styles.botaoTexto}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    alignItems: "center",
    marginBottom: 15,
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
