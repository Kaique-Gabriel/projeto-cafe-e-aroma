// src/screens/MetodoPagamento.js
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import {
  MaterialCommunityIcons,
  FontAwesome6,
  Feather,
} from "@expo/vector-icons";

export default function MetodoPagamento({ navigation, route }) {

  // 🔥 RECEBENDO OS DADOS DO CARRINHO
  const itens = route?.params?.itens ?? [];
  const valorTotal = Number(route?.params?.valorTotal ?? 0);
  const quantidadeTotal = route?.params?.quantidadeTotal ?? 0;

  const [selecionado, setSelecionado] = useState(null);
  const animScale = useRef(new Animated.Value(1)).current;

  function animarSelecao() {
    Animated.sequence([
      Animated.timing(animScale, {
        toValue: 0.95,
        duration: 100,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(animScale, {
        toValue: 1,
        duration: 120,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }

  function selecionar(id) {
    setSelecionado(id);
    animarSelecao();
  }

  function continuar() {
    if (!selecionado) return;

    // ✅ AGORA O MÉTODO DE PAGAMENTO ESTÁ SENDO ENVIADO!
    const params = {
      itens,
      valorTotal,
      quantidadeTotal,
      pagamento: selecionado, // ← ESSENCIAL
    };

    if (selecionado === "pix")
      navigation.navigate("PagamentoPix", params);

    if (selecionado === "cartao")
      navigation.navigate("PagamentoCartao", params);

    if (selecionado === "dinheiro")
      navigation.navigate("PagamentoDinheiro", params);
  }

  const opcoes = [
    {
      id: "pix",
      nome: "PIX",
      Icone: MaterialCommunityIcons,
      iconName: "qrcode-scan",
    },
    {
      id: "cartao",
      nome: "Cartão de Crédito",
      Icone: FontAwesome6,
      iconName: "credit-card",
    },
    {
      id: "dinheiro",
      nome: "Dinheiro",
      Icone: Feather,
      iconName: "dollar-sign",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Selecione o Método de Pagamento</Text>

      {opcoes.map((item) => (
        <Animated.View
          key={item.id}
          style={{
            transform: [{ scale: selecionado === item.id ? animScale : 1 }],
          }}
        >
          <TouchableOpacity
            style={[
              styles.opcao,
              selecionado === item.id && styles.opcaoSelecionada,
            ]}
            onPress={() => selecionar(item.id)}
            activeOpacity={0.8}
          >
            <item.Icone
              name={item.iconName}
              size={30}
              color={selecionado === item.id ? "#FFF" : "#4E342E"}
            />

            <Text
              style={[
                styles.opcaoTexto,
                selecionado === item.id && { color: "#FFF" },
              ]}
            >
              {item.nome}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      ))}

      <TouchableOpacity
        style={[
          styles.botaoContinuar,
          !selecionado && { opacity: 0.4 },
        ]}
        disabled={!selecionado}
        onPress={continuar}
      >
        <Text style={styles.botaoContinuarTexto}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF5EE",
    padding: 20,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "700",
    color: "#4E342E",
    marginBottom: 25,
  },

  opcao: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 18,
    borderRadius: 16,
    marginVertical: 10,
    elevation: 4,

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  opcaoSelecionada: {
    backgroundColor: "#4E342E",
    elevation: 6,
  },

  opcaoTexto: {
    fontSize: 18,
    marginLeft: 18,
    color: "#4E342E",
    fontWeight: "600",
  },

  botaoContinuar: {
    backgroundColor: "#4E342E",
    padding: 16,
    borderRadius: 14,
    marginTop: 30,
    alignItems: "center",
    elevation: 5,
  },

  botaoContinuarTexto: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
  },
});
