// src/screens/EnderecoEntrega.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function EnderecoEntrega({ navigation, route }) {

  // --- AGORA LER OS PARAMS CERTOS ---
  const itens = route?.params?.itens ?? [];
  const valorTotal = route?.params?.valorTotal ?? 0;
  const quantidadeTotal = route?.params?.quantidadeTotal ?? 0;
  const metodoPagamento = route?.params?.metodoPagamento ?? null;

  // Campos do formulário
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [cep, setCep] = useState("");
  const [referencia, setReferencia] = useState("");

  const [loading, setLoading] = useState(false);

  function formatarCEP(text) {
    const somenteNumeros = text.replace(/\D/g, "");
    if (somenteNumeros.length <= 5) return somenteNumeros;
    return (
      somenteNumeros.slice(0, 5) + "-" + somenteNumeros.slice(5, 8)
    );
  }

  function validarCampos() {
    if (!rua.trim() || !numero.trim() || !bairro.trim() || !cidade.trim() || !cep.trim()) {
      alert("Preencha todos os campos obrigatórios.");
      return false;
    }

    if (cep.length < 9) {
      alert("CEP inválido. Use o formato 00000-000");
      return false;
    }

    return true;
  }

  function continuarParaConfirmacao() {
    if (loading) return;
    if (!validarCampos()) return;

    setLoading(true);

    const endereco = {
      rua,
      numero,
      bairro,
      cidade,
      cep,
      referencia: referencia.trim() === "" ? "Nenhuma" : referencia,
    };

    setTimeout(() => {
      setLoading(false);

navigation.navigate("ConfirmacaoPedido", {
  endereco,
  itens,
  valorTotal,
  quantidadeTotal,
  pagamento: metodoPagamento,
});

    }, 200);
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Endereço de Entrega</Text>

      {/* Rua */}
      <Text style={styles.label}>Rua *</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Rua das Flores"
        value={rua}
        onChangeText={setRua}
      />

      {/* Número */}
      <Text style={styles.label}>Número *</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 123"
        keyboardType="numeric"
        value={numero}
        onChangeText={setNumero}
      />

      {/* Bairro */}
      <Text style={styles.label}>Bairro *</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Centro"
        value={bairro}
        onChangeText={setBairro}
      />

      {/* Cidade */}
      <Text style={styles.label}>Cidade *</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: São Paulo"
        value={cidade}
        onChangeText={setCidade}
      />

      {/* CEP */}
      <Text style={styles.label}>CEP *</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 00000-000"
        keyboardType="numeric"
        value={cep}
        onChangeText={(txt) => setCep(formatarCEP(txt))}
        maxLength={9}
      />

      {/* Referência */}
      <Text style={styles.label}>Ponto de Referência (opcional)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Casa azul, perto do mercado"
        value={referencia}
        onChangeText={setReferencia}
      />

      {/* Resumo */}
      <View style={styles.resumoBox}>
        <Text style={styles.resumoTitulo}>Resumo do Pedido</Text>

        <Text style={styles.resumoTexto}>Itens: {quantidadeTotal}</Text>

        <Text style={styles.resumoTexto}>
          Total: R$ {valorTotal.toFixed(2)}
        </Text>
      </View>

      {/* Botão */}
      <TouchableOpacity
        style={[styles.botaoConfirmar, loading && { opacity: 0.5 }]}
        onPress={continuarParaConfirmacao}
        disabled={loading}
      >
        <Text style={styles.botaoTexto}>
          {loading ? "Carregando..." : "Continuar"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAF3E7", padding: 20 },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#4E342E",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#6D4C41",
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E0C3A0",
  },
  resumoBox: {
    backgroundColor: "#FFF3E0",
    padding: 16,
    borderRadius: 12,
    marginTop: 25,
    borderWidth: 1,
    borderColor: "#E0C3A0",
  },
  resumoTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4E342E",
    marginBottom: 10,
  },
  resumoTexto: {
    fontSize: 16,
    color: "#4E342E",
  },
  botaoConfirmar: {
    backgroundColor: "#4E342E",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
    marginBottom: 40,
  },
  botaoTexto: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
