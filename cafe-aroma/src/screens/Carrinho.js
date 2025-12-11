// src/screens/Carrinho.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { CarrinhoContext } from '../context/CarrinhoContext';

export default function Carrinho({ navigation }) {

  const {
    carrinho,
    adicionarItem,
    removerItem,
    removerItemCompleto,
    limparCarrinho,
    total
  } = useContext(CarrinhoContext);

  function irParaMetodoPagamento() {
    if (carrinho.length === 0) return;

    navigation.navigate("MetodoPagamento", {
      itens: carrinho,
      valorTotal: total,
      quantidadeTotal: carrinho.length,
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Carrinho</Text>

      {carrinho.length === 0 ? (
        <View style={styles.vazioContainer}>
          <Image
            source={require('../../assets/images/icons/cart.png')}
            style={{ width: 120, height: 120, opacity: 0.7 }}
          />
          <Text style={styles.vazioTexto}>Seu carrinho está vazio</Text>

          <TouchableOpacity
            style={styles.botaoVoltar}
            onPress={() => navigation.navigate('HomeApp')}
          >
            <Text style={styles.botaoVoltarTexto}>Voltar ao início</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={carrinho}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>

                <View style={{ flex: 1 }}>
                  <Text style={styles.nome}>{item.nome}</Text>
                  <Text style={styles.preco}>
                    R$ {(Number(item.preco) * item.quantidade).toFixed(2)}
                  </Text>
                </View>

                <View style={styles.quantidadeContainer}>
                  <TouchableOpacity onPress={() => removerItem(item.id)} style={styles.quantidadeBotao}>
                    <Text style={styles.quantidadeTexto}>-</Text>
                  </TouchableOpacity>

                  <Text style={styles.quantidadeNumero}>{item.quantidade}</Text>

                  <TouchableOpacity onPress={() => adicionarItem(item)} style={styles.quantidadeBotao}>
                    <Text style={styles.quantidadeTexto}>+</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => removerItemCompleto(item.id)}>
                  <Text style={styles.removerTexto}>Remover</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          <View style={styles.footer}>
            <Text style={styles.totalTexto}>Total: R$ {total.toFixed(2)}</Text>

            {/* 🔥 Botão agora leva para Método de Pagamento */}
            <TouchableOpacity
              style={styles.finalizarBotao}
              onPress={irParaMetodoPagamento}
            >
              <Text style={styles.finalizarTexto}>Escolher Método de Pagamento</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF3E7', paddingHorizontal: 16, paddingTop: 20 },
  titulo: { fontSize: 28, fontWeight: '700', color: '#4E342E', marginBottom: 10 },
  vazioContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  vazioTexto: { fontSize: 18, color: '#6D4C41', marginTop: 10 },
  botaoVoltar: { marginTop: 20, paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#4E342E', borderRadius: 10 },
  botaoVoltarTexto: { color: '#fff', fontSize: 16 },
  itemContainer: { backgroundColor: '#FFF', padding: 14, marginVertical: 6, borderRadius: 12, flexDirection: 'row', alignItems: 'center', elevation: 3 },
  nome: { fontSize: 18, fontWeight: 'bold', color: '#3E2723' },
  preco: { fontSize: 16, color: '#6D4C41', marginTop: 4 },
  quantidadeContainer: { flexDirection: 'row', alignItems: 'center', marginRight: 12 },
  quantidadeBotao: { width: 30, height: 30, borderRadius: 8, backgroundColor: '#EFEBE9', justifyContent: 'center', alignItems: 'center' },
  quantidadeTexto: { fontSize: 20, color: '#4E342E' },
  quantidadeNumero: { fontSize: 18, marginHorizontal: 10, color: '#4E342E' },
  removerTexto: { color: '#B71C1C', fontSize: 14, fontWeight: 'bold' },
  footer: { padding: 16, backgroundColor: '#FFF3E0', borderTopWidth: 1, borderColor: '#E0C3A0' },
  totalTexto: { fontSize: 20, color: '#4E342E', fontWeight: 'bold', marginBottom: 10 },
  finalizarBotao: { backgroundColor: '#4E342E', paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  finalizarTexto: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
