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
              <Text style={styles.title}>Pedido #{item.id}</Text>
              <Text style={styles.subtitle}>Total: R$ {item.total.toFixed(2)}</Text>

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
              <Text style={styles.title}>Pedido #{item.id}</Text>
              <Text style={styles.subtitle}>Total: R$ {item.total.toFixed(2)}</Text>
              <Text style={styles.subtitle}>Finalizado!</Text>
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
  entregarBtn: {
    marginTop: 10,
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
