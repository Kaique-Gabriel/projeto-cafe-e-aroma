// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Telas
import Login from './src/screens/Login';
import Cadastro from './src/screens/Cadastro';
import HomeApp from './src/screens/HomeApp';
import Pedidos from './src/screens/Pedidos';
import MeusPedidos from './src/screens/MeusPedidos';
import Perfil from './src/screens/Perfil';
import DetalhesPedido from './src/screens/DetalhesPedido';
import Carrinho from './src/screens/Carrinho';

// Drawer customizado (🟨 ESTE AQUI É O QUE VOCÊ MANDOU)
import DrawerCustom from './src/components/Drawer';

// Contextos
import { AppProvider } from './src/context/AppContext';
import { CarrinhoProvider } from './src/context/CarrinhoContext';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function MainDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="HomeApp"
      drawerContent={(props) => <DrawerCustom {...props} />}   // 🟨 ATIVA SEU DRAWER PERSONALIZADO
      screenOptions={{
        headerStyle: { backgroundColor: '#4E342E' },
        headerTintColor: '#F3E5D0',
        drawerStyle: { backgroundColor: '#3B2922' },
        drawerActiveTintColor: '#F5D7A1',
        drawerInactiveTintColor: '#D9C5A3',
      }}
    >
      <Drawer.Screen name="HomeApp" component={HomeApp} options={{ title: 'Início' }} />
      <Drawer.Screen name="Pedidos" component={Pedidos} options={{ title: 'Pedidos' }} />
      <Drawer.Screen name="MeusPedidos" component={MeusPedidos} options={{ title: 'Meus Pedidos' }} />
      <Drawer.Screen name="Perfil" component={Perfil} options={{ title: 'Meu Perfil' }} />

      {/* 🟩 Agora o Carrinho aparece no menu */}
      <Drawer.Screen name="Carrinho" component={Carrinho} options={{ title: 'Carrinho' }} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <AppProvider>
      <CarrinhoProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>

            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Cadastro" component={Cadastro} />

            {/* Drawer principal */}
            <Stack.Screen name="MainApp" component={MainDrawer} />

            {/* Telas independentes */}
            <Stack.Screen name="DetalhesPedido" component={DetalhesPedido} />

            {/* Carrinho para navegações diretas */}
            <Stack.Screen name="Carrinho" component={Carrinho} />

          </Stack.Navigator>
        </NavigationContainer>
      </CarrinhoProvider>
    </AppProvider>
  );
}
