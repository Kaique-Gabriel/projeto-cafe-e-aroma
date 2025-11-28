// src/screens/Pagamento.js
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
  useColorScheme,
} from "react-native";

import {
  CreditCard,
  Banknote,
  Wallet,
  Armchair,
  QrCode,
} from "lucide-react-native";

import { useApp } from "../context/AppContext";

export default function Pagamento({ navigation, route }) {
  const { endereco, carrinho, total } = route.params;

  const { isDarkMode } = useApp(); // pega o tema
  const metodoSelecionado = useRef(null);
  const [metodo, setMetodo] = useState(null);

  const animScale = useRef(new Animated.Value(1)).current;

  const opcoes = [
    { nome: "PIX", icon: QrCode },
    { nome: "Dinheiro", icon: Banknote },
    { nome: "Cartão de Crédito", icon: CreditCard },
    { nome: "Cartão de Débito", icon: Wallet },
  ];

  function animarSelecao() {
    animScale.setValue(0.9);

    Animated.spring(animScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }

  function selecionar(item) {
    setMetodo(item);
    animarSelecao();
  }

  function avancarConfirmacao() {
    if (!metodo) return;

    navigation.navigate("ConfirmacaoPedido", {
      endereco,
      carrinho,
      total,
      pagamento: metodo,
    });
  }

  const tema = isDarkMode ? dark : light;

  return (
    <ScrollView style={[styles.container, { backgroundColor: tema.bg }]}>

      <Text style={[styles.titulo, { color: tema.text }]}>
        Forma de Pagamento
      </Text>

      {opcoes.map((opt, index) => {
        const Icon = opt.icon;

        return (
          <Animated.View
            key={index}
            style={{ transform: [{ scale: metodo === opt.nome ? animScale : 1 }] }}
          >
            <TouchableOpacity
              style={[
                styles.option,
                {
                  backgroundColor:
                    metodo === opt.nome ? tema.primary : tema.card,
                  borderColor: tema.border,
                },
              ]}
              onPress={() => selecionar(opt.nome)}
            >
              <Icon
                size={28}
                color={metodo === opt.nome ? "#FFF" : tema.text}
                strokeWidth={2.3}
              />

              <Text
                style={[
                  styles.optionTexto,
                  {
                    color:
                      metodo === opt.nome ? "#FFF" : tema.text,
                  },
                ]}
              >
                {opt.nome}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        );
      })}

      {/* BOTÃO AVANÇAR */}
      <TouchableOpacity
        style={[
          styles.botaoAvancar,
          {
            backgroundColor: tema.primary,
            opacity: !metodo ? 0.5 : 1,
          },
        ]}
        disabled={!metodo}
        onPress={avancarConfirmacao}
      >
        <Text style={styles.botaoTexto}>Avançar</Text>
      </TouchableOpacity>

      {/* VOLTAR */}
      <TouchableOpacity
        style={[styles.botaoVoltar, { borderColor: tema.text }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={[styles.botaoVoltarTexto, { color: tema.text }]}>
          Voltar
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

/* ============================
      TEMAS PARA A TELA
===============================*/
const light = {
  bg: "#FAF6EF",
  card: "#FFF",
  text: "#4E342E",
  border: "#D5C6B8",
  primary: "#8D6E63",
};

const dark = {
  bg: "#1E1E1E",
  card: "#2A2A2A",
  text: "#F1EDE8",
  border: "#3A3A3A",
  primary: "#A37C67",
};

/* ============================
        ESTILOS BASE
===============================*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },

  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 12,
    gap: 14,
  },

  optionTexto: {
    fontSize: 18,
    fontWeight: "600",
  },

  botaoAvancar: {
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
  },

  botaoTexto: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  botaoVoltar: {
    padding: 12,
    marginTop: 15,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
  },

  botaoVoltarTexto: {
    fontSize: 16,
    fontWeight: "600",
  },
});
