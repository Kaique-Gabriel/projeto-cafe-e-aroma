// screens/DetalhesPedido.js
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
} from 'react-native';
import { useContext } from 'react';
import { CarrinhoContext } from '../context/CarrinhoContext';

export default function DetalhesPedido({ route, navigation }) {
  const { nome, descricao, preco, imagem } = route.params;
  
  const { carrinho, adicionarItem } = useContext(CarrinhoContext);

  function adicionarAoCarrinho() {
    adicionarItem({ nome, descricao, preco, imagem });

    // feedback opcional (pode remover se quiser)
    alert("Item adicionado ao carrinho!");

    // opcional: navega para o carrinho depois
    // navigation.navigate("Carrinho");
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9f4ef' }}>
      <ScrollView style={styles.container}>

        <Image source={{ uri: imagem }} style={styles.image} />

        <Text style={styles.title}>{nome}</Text>
        <Text style={styles.price}>R$ {preco}</Text>

        <Text style={styles.sectionTitle}>Descrição</Text>
        <Text style={styles.description}>{descricao}</Text>

        <TouchableOpacity 
          style={styles.button}
          onPress={adicionarAoCarrinho}
        >
          <Text style={styles.buttonText}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f4ef',
    flex: 1,
    padding: 16,
  },
  image: {
    width: '100%',
    height: 260,
    borderRadius: 14,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4e342e',
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 8,
    color: '#6d4c41',
  },
  sectionTitle: {
    fontSize: 18,
    marginTop: 15,
    marginBottom: 5,
    fontWeight: '600',
    color: '#4e342e',
  },
  description: {
    fontSize: 15,
    color: '#6d4c41',
    lineHeight: 20,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#6d4c41',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',

    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});
