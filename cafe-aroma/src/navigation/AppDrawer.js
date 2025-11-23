// navigation/AppDrawer.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeApp from '../screens/HomeApp';
import Pedidos from '../screens/Pedidos';
import Perfil from '../screens/Perfil';
import Carrinho from '../screens/Carrinho';

// Drawer customizado
import DrawerCustom from '../components/Drawer';

const Drawer = createDrawerNavigator();

export default function AppDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerCustom {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'slide'
      }}
    >
      <Drawer.Screen name="HomeApp" component={HomeApp} />
      <Drawer.Screen name="Pedidos" component={Pedidos} />
      <Drawer.Screen name="Perfil" component={Perfil} />
      <Drawer.Screen name="Carrinho" component={Carrinho} />
    </Drawer.Navigator>
  );
}
