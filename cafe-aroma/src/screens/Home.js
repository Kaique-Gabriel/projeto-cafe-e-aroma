import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

export default function App() {
  const [screen, setScreen] = useState('home');

  const produtos = [
    { id: '1', nome: 'Café Expresso', preco: 'R$ 5,00' },
    { id: '2', nome: 'Cappuccino', preco: 'R$ 7,00' },
    { id: '3', nome: 'Pão de Queijo', preco: 'R$ 3,50' },
  ];

  const renderProduto = ({ item }) => (
    <View style={styles.produto}>
      <Text style={styles.produtoNome}>{item.nome}</Text>
      <Text style={styles.produtoPreco}>{item.preco}</Text>
      <TouchableOpacity style={styles.botaoAdd}>
        <Text style={styles.botaoAddText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );

  const renderScreen = () => {
    switch (screen) {
      case 'home':
        return (
          <View style={styles.container}>
            <Text style={styles.titulo}>☕ Café & Aroma</Text>
            <Text style={styles.subtitulo}>Escolha seu pedido:</Text>

            <FlatList
              data={produtos}
              keyExtractor={(item) => item.id}
              renderItem={renderProduto}
              style={{ width: '100%' }}
            />

            <View style={styles.rodape}>
              <TouchableOpacity
                style={[styles.botao, styles.botaoSecundario]}
                onPress={() => setScreen('perfil')}>
                <Text style={styles.botaoTexto}>Perfil</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.botao}
                onPress={() => setScreen('pedidos')}>
                <Text style={styles.botaoTexto}>Ver pedidos</Text>
              </TouchableOpacity>
            </View>
          </View>
        );

      case 'perfil':
        return (
          <View style={styles.container}>
            <Text style={styles.titulo}>👤 Meu Perfil</Text>
            <Text style={styles.texto}>Nome: Usuário Teste</Text>
            <Text style={styles.texto}>Email: usuario@teste.com</Text>

            <TouchableOpacity
              style={styles.botao}
              onPress={() => setScreen('home')}>
              <Text style={styles.botaoTexto}>Voltar</Text>
            </TouchableOpacity>
          </View>
        );

      case 'pedidos':
        return (
          <View style={styles.container}>
            <Text style={styles.titulo}>🛒 Meus Pedidos</Text>
            <Text style={styles.texto}>Nenhum pedido ainda.</Text>

            <TouchableOpacity
              style={styles.botao}
              onPress={() => setScreen('home')}>
              <Text style={styles.botaoTexto}>Voltar</Text>
            </TouchableOpacity>
          </View>
        );

      default:
        return <Text>Erro ao carregar</Text>;
    }
  };

  return <View style={styles.main}>{renderScreen()}</View>;
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fef7f2',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4b2e1e',
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 16,
    color: '#7b4f33',
    marginBottom: 20,
  },
  produto: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginHorizontal: 10,
  },
  produtoNome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4b2e1e',
  },
  produtoPreco: {
    fontSize: 16,
    color: '#7b4f33',
    marginVertical: 5,
  },
  botaoAdd: {
    backgroundColor: '#7b4f33',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoAddText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  rodape: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  botao: {
    backgroundColor: '#4b2e1e',
    padding: 12,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
  },
  botaoSecundario: {
    backgroundColor: '#b08968',
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  texto: {
    fontSize: 16,
    color: '#4b2e1e',
    marginBottom: 10,
  },
});
