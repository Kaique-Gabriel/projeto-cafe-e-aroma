// src/screens/Pedidos.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

// ========== TELAS INTERNAS ==========

function PedidosAtuais() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pedidos em andamento</Text>
      <Text style={styles.subtitle}>Aqui aparecerão seus pedidos ativos.</Text>
    </View>
  );
}

function HistoricoPedidos() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de Pedidos</Text>
      <Text style={styles.subtitle}>Aqui aparecerá seu histórico completo.</Text>
    </View>
  );
}

// ========== TELA PRINCIPAL COM TABS ==========

export default function Pedidos() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#4E342E',
        },
        tabBarActiveTintColor: '#F5D7A1',
        tabBarInactiveTintColor: '#DCC8AE',
        tabBarIndicatorStyle: {
          backgroundColor: '#F5D7A1',
          height: 3,
          borderRadius: 20,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen 
        name="Atuais" 
        component={PedidosAtuais}
        options={{ title: 'Pedidos' }}
      />

      <Tab.Screen 
        name="Historico" 
        component={HistoricoPedidos}
        options={{ title: 'Histórico' }}
      />
    </Tab.Navigator>
  );
}

// ========== ESTILOS ==========

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3E5D0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    color: '#3B2922',
    fontWeight: 'bold',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: '#5A4637',
  }
});
