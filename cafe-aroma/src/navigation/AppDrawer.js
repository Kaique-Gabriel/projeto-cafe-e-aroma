// src/navigation/AppDrawer.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeApp from '../screens/HomeApp';
import Pedido from '../screens/Pedido';
import MeusPedidos from '../screens/MeusPedidos';

const Drawer = createDrawerNavigator();

export default function AppDrawer() {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#7b4f33' },
          headerTintColor: '#fff',
          drawerActiveTintColor: '#7b4f33',
          drawerStyle: { width: '70%' },
        }}>
        <Drawer.Screen
          name="Início"
          component={HomeApp}
          options={{ title: '☕ Café & Aroma' }}
        />
        <Drawer.Screen
          name="Pedido"
          component={Pedido}
          options={{ title: 'Fazer Pedido' }}
        />
        <Drawer.Screen
          name="MeusPedidos"
          component={MeusPedidos}
          options={{ title: 'Meus Pedidos' }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
