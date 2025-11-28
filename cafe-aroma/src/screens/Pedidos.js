// src/screens/Pedidos.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { PedidosContext } from '../context/PedidosContext';

const Tab = createMaterialTopTabNavigator();

function PedidosAtuais() {
  const { pedidos, marcarComoEntregue } = useContext(PedidosContext);

  return (
    <View style={styles.container}>
      {pedidos.length === 0 ? (
        <Text style={styles.subtitle}>Nenhum pedido em andamento.</Text>
      ) : (
        <FlatList
          data={pedidos}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <View style={styles.card}>
              
              {/* Cabeçalho */}
              <Text style={styles.title}>Pedido #{item.id}</Text>
              {item.data && (
                <Text style={styles.subtitle}>Realizado em: {item.data}</Text>
              )}
              <Text style={styles.subtitle}>Total: R$ {item.total.toFixed(2)}</Text>

              {/* Endereço */}
              {item.endereco && (
                <View style={styles.enderecoBox}>
                  <Text style={styles.enderecoTitulo}>Endereço de Entrega:</Text>
                  
                  <Text style={styles.enderecoTxt}>Rua: {item.endereco.rua}</Text>
                  <Text style={styles.enderecoTxt}>Número: {item.endereco.numero}</Text>
                  <Text style={styles.enderecoTxt}>Bairro: {item.endereco.bairro}</Text>

                  {item.endereco.cidade && (
                    <Text style={styles.enderecoTxt}>Cidade: {item.endereco.cidade}</Text>
                  )}

                  {item.endereco.cep && (
                    <Text style={styles.enderecoTxt}>CEP: {item.endereco.cep}</Text>
                  )}

                  {item.endereco.referencia && item.endereco.referencia !== "Nenhuma" && (
                    <Text style={styles.enderecoTxt}>Ref.: {item.endereco.referencia}</Text>
                  )}
                </View>
              )}

              {/* Itens */}
              <View style={styles.itensBox}>
                <Text style={styles.itensTitulo}>Itens do pedido:</Text>
                {item.itens?.map((produto, index) => (
                  <Text key={index} style={styles.itensTxt}>
                    • {produto.quantidade}x {produto.nome} – R$ {Number(produto.preco).toFixed(2)}
                  </Text>
                ))}
              </View>

              {/* Botão */}
              <TouchableOpacity
                style={styles.entregarBtn}
                onPress={() => marcarComoEntregue(item.id)}
              >
                <Text style={styles.entregarTxt}>Marcar como entregue</Text>
              </TouchableOpacity>

            </View>
          )}
        />
      )}
    </View>
  );
}

function HistoricoPedidos() {
  const { historico } = useContext(PedidosContext);

  return (
    <View style={styles.container}>
      {historico.length === 0 ? (
        <Text style={styles.subtitle}>Nenhum pedido no histórico.</Text>
      ) : (
        <FlatList
          data={historico}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <View style={styles.card}>

              {/* Cabeçalho */}
              <Text style={styles.title}>Pedido #{item.id}</Text>
              {item.data && (
                <Text style={styles.subtitle}>Realizado em: {item.data}</Text>
              )}
              <Text style={styles.subtitle}>Total: R$ {item.total.toFixed(2)}</Text>
              <Text style={styles.subtitle}>Status: Entregue ✔</Text>

              {/* Endereço */}
              {item.endereco && (
                <View style={styles.enderecoBox}>
                  <Text style={styles.enderecoTitulo}>Endereço de Entrega:</Text>

                  <Text style={styles.enderecoTxt}>Rua: {item.endereco.rua}</Text>
                  <Text style={styles.enderecoTxt}>Número: {item.endereco.numero}</Text>
                  <Text style={styles.enderecoTxt}>Bairro: {item.endereco.bairro}</Text>

                  {item.endereco.cidade && (
                    <Text style={styles.enderecoTxt}>Cidade: {item.endereco.cidade}</Text>
                  )}

                  {item.endereco.cep && (
                    <Text style={styles.enderecoTxt}>CEP: {item.endereco.cep}</Text>
                  )}

                  {item.endereco.referencia && item.endereco.referencia !== "Nenhuma" && (
                    <Text style={styles.enderecoTxt}>Ref.: {item.endereco.referencia}</Text>
                  )}
                </View>
              )}

              {/* Itens */}
              <View style={styles.itensBox}>
                <Text style={styles.itensTitulo}>Itens do pedido:</Text>
                {item.itens?.map((produto, index) => (
                  <Text key={index} style={styles.itensTxt}>
                    • {produto.quantidade}x {produto.nome} – R$ {Number(produto.preco).toFixed(2)}
                  </Text>
                ))}
              </View>

            </View>
          )}
        />
      )}
    </View>
  );
}

export default function Pedidos() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: '#4E342E' },
        tabBarActiveTintColor: '#F5D7A1',
        tabBarInactiveTintColor: '#DCC8AE',
        tabBarIndicatorStyle: { backgroundColor: '#F5D7A1', height: 3, borderRadius: 20 },
      }}
    >
      <Tab.Screen name="Atuais" component={PedidosAtuais} options={{ title: 'Pedidos' }} />
      <Tab.Screen name="Historico" component={HistoricoPedidos} options={{ title: 'Histórico' }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3E5D0',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3B2922',
  },
  subtitle: {
    fontSize: 14,
    color: '#5A4637',
    marginTop: 5,
  },
  enderecoBox: {
    backgroundColor: '#FFF4E1',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  enderecoTitulo: {
    fontSize: 15,
    fontWeight: '700',
    color: '#4E342E',
    marginBottom: 5,
  },
  enderecoTxt: {
    fontSize: 14,
    color: '#5A4637',
  },
  itensBox: {
    marginTop: 12,
    backgroundColor: '#FDF6ED',
    padding: 12,
    borderRadius: 10,
  },
  itensTitulo: {
    fontSize: 15,
    fontWeight: '700',
    color: '#4E342E',
    marginBottom: 5,
  },
  itensTxt: {
    fontSize: 14,
    color: '#5A4637',
  },
  entregarBtn: {
    marginTop: 12,
    backgroundColor: '#4E342E',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  entregarTxt: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
