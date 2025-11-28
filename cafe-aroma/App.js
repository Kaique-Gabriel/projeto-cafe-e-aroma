// App.js
import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Telas principais
import Welcome from './src/screens/Welcome';
import Login from './src/screens/Login';
import Cadastro from './src/screens/Cadastro';
import HomeApp from './src/screens/HomeApp';
import Pedidos from './src/screens/Pedidos';
import Perfil from './src/screens/Perfil';
import DetalhesPedido from './src/screens/DetalhesPedido';
import Carrinho from './src/screens/Carrinho';
import PedidosInfo from './src/screens/PedidosInfo';
import EditarPerfil from './src/screens/EditarPerfil';
import Seguranca from './src/screens/Seguranca';
import SobreApp from './src/screens/SobreApp';
import Favoritos from './src/screens/Favoritos';
import AjudaSuporte from './src/screens/AjudaSuporte';

// 2FA
import Codigo2FA from './src/screens/Codigo2FA';

// Drawer
import DrawerCustom from './src/components/Drawer';

// Contextos
import { AppProvider, useApp } from './src/context/AppContext';
import { CarrinhoProvider } from './src/context/CarrinhoContext';
import { UserProvider } from './src/context/UserContext';
import { FavoritosProvider } from './src/context/FavoritosContext';
import { PedidosProvider } from './src/context/PedidosContext';

// FLUXO DE PEDIDO
import EnderecoEntrega from './src/screens/EnderecoEntrega';
import Pagamento from './src/screens/Pagamento';        // ← ADICIONADO
import ConfirmacaoPedido from './src/screens/ConfirmacaoPedido';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

/* ============================================================
   Tema Claro
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

/* ============================================================
   Tema Escuro
=============================================================== */
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
   Drawer Principal
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
   Navegação Principal
=============================================================== */
function AppNavigation() {
  const { isDarkMode } = useApp();

  return (
    <NavigationContainer theme={isDarkMode ? DarkCoffeeTheme : LightCoffeeTheme}>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>

        {/* Sem header */}
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />

        {/* 2FA */}
        <Stack.Screen name="Codigo2FA" component={Codigo2FA} />

        {/* Drawer */}
        <Stack.Screen name="MainApp" component={MainDrawer} />

        {/* FLUXO DO PEDIDO */}
        <Stack.Screen
          name="EnderecoEntrega"
          component={EnderecoEntrega}
          options={{ headerShown: true, title: "Endereço de Entrega" }}
        />

        <Stack.Screen
          name="Pagamento"             // ← AQUI!!!!
          component={Pagamento}
          options={{ headerShown: true, title: "Pagamento" }}
        />

        <Stack.Screen
          name="ConfirmacaoPedido"
          component={ConfirmacaoPedido}
          options={{ headerShown: true, title: "Confirmar Pedido" }}
        />

        {/* Telas complementares */}
        <Stack.Screen name="DetalhesPedido" component={DetalhesPedido} options={{ title: 'Detalhes do Pedido', headerShown: true }} />
        <Stack.Screen name="PedidosInfo" component={PedidosInfo} options={{ title: 'Informações do Pedido', headerShown: true }} />
        <Stack.Screen name="EditarPerfil" component={EditarPerfil} options={{ title: 'Editar Perfil', headerShown: true }} />
        <Stack.Screen name="Seguranca" component={Seguranca} options={{ title: 'Segurança', headerShown: true }} />
        <Stack.Screen name="SobreApp" component={SobreApp} options={{ title: 'Sobre o App', headerShown: true }} />
        <Stack.Screen name="Favoritos" component={Favoritos} options={{ title: 'Favoritos', headerShown: true }} />
        <Stack.Screen name="AjudaSuporte" component={AjudaSuporte} options={{ title: 'Ajuda & Suporte', headerShown: true }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

/* ============================================================
   Providers
=============================================================== */
export default function App() {
  return (
    <UserProvider>
      <AppProvider>
        <CarrinhoProvider>
          <FavoritosProvider>
            <PedidosProvider>
              <AppNavigation />
            </PedidosProvider>
          </FavoritosProvider>
        </CarrinhoProvider>
      </AppProvider>
    </UserProvider>
  );
}
