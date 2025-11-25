// App.js
import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Telas
import Welcome from './src/screens/Welcome';
import Login from './src/screens/Login';
import Cadastro from './src/screens/Cadastro';
import HomeApp from './src/screens/HomeApp';
import Pedidos from './src/screens/Pedidos';
import Perfil from './src/screens/Perfil';
import DetalhesPedido from './src/screens/DetalhesPedido';
import Carrinho from './src/screens/Carrinho';

import EditarPerfil from './src/screens/EditarPerfil';
import Seguranca from './src/screens/Seguranca';
import SobreApp from './src/screens/SobreApp';
import Favoritos from './src/screens/Favoritos';
import AjudaSuporte from './src/screens/AjudaSuporte';

// Drawer customizado
import DrawerCustom from './src/components/Drawer';

// Providers
import { AppProvider, useApp } from './src/context/AppContext';
import { CarrinhoProvider } from './src/context/CarrinhoContext';
import { UserProvider } from './src/context/UserContext';
import { FavoritosProvider } from './src/context/FavoritosContext';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

/* ============================================================
   🔥 TEMA PERSONALIZADO — mistura do DefaultTheme + estilo Café
=============================================================== */
const LightCoffeeTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FAF6F0',
    card: '#F1E4D8',
    text: '#4A2C2A',
    border: '#D5C6B8',
    primary: '#C78C65', 
  },
};

const DarkCoffeeTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#1E1E1E',
    card: '#2A2A2A',
    text: '#F5F5F5',
    border: '#3A3A3A',
    primary: '#C78C65',
  },
};

/* ============================================================
   DRAWER PRINCIPAL
=============================================================== */
function MainDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="HomeApp"
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <DrawerCustom {...props} />}
    >
      <Drawer.Screen name="HomeApp" component={HomeApp} />
      <Drawer.Screen name="Pedidos" component={Pedidos} />
      <Drawer.Screen name="Perfil" component={Perfil} />
      <Drawer.Screen name="Carrinho" component={Carrinho} />
    </Drawer.Navigator>
  );
}

/* ============================================================
   NAVIGATION + THEME
=============================================================== */
function AppNavigation() {
  const { isDarkMode } = useApp();

  return (
    <NavigationContainer theme={isDarkMode ? DarkCoffeeTheme : LightCoffeeTheme}>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>

        {/* Sem Header */}
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />

        {/* Drawer */}
        <Stack.Screen name="MainApp" component={MainDrawer} />

        {/* Com Header */}
        <Stack.Screen
          name="DetalhesPedido"
          component={DetalhesPedido}
          options={{ title: 'Detalhes do Pedido', headerShown: true }}
        />

        <Stack.Screen
          name="EditarPerfil"
          component={EditarPerfil}
          options={{ title: 'Editar Perfil', headerShown: true }}
        />

        <Stack.Screen
          name="Seguranca"
          component={Seguranca}
          options={{ title: 'Segurança', headerShown: true }}
        />

        <Stack.Screen
          name="SobreApp"
          component={SobreApp}
          options={{ title: 'Sobre o App', headerShown: true }}
        />

        <Stack.Screen
          name="Favoritos"
          component={Favoritos}
          options={{ title: 'Favoritos', headerShown: true }}
        />

        <Stack.Screen
          name="AjudaSuporte"
          component={AjudaSuporte}
          options={{ title: 'Ajuda & Suporte', headerShown: true }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

/* ============================================================
   PROVIDERS ENVOLVENDO TUDO
=============================================================== */
export default function App() {
  return (
    <UserProvider>
      <AppProvider>
        <CarrinhoProvider>
          <FavoritosProvider>
            <AppNavigation />
          </FavoritosProvider>
        </CarrinhoProvider>
      </AppProvider>
    </UserProvider>
  );
}
