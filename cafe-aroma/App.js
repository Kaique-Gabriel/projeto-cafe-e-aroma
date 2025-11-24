// App.js
import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity, Image } from 'react-native';

// Telas
import Login from './src/screens/Login';
import Cadastro from './src/screens/Cadastro';
import HomeApp from './src/screens/HomeApp';
import Pedidos from './src/screens/Pedidos';
import MeusPedidos from './src/screens/MeusPedidos';
import Perfil from './src/screens/Perfil';
import DetalhesPedido from './src/screens/DetalhesPedido';
import Carrinho from './src/screens/Carrinho';

// Novas telas
import EditarPerfil from './src/screens/EditarPerfil';
import Seguranca from './src/screens/Seguranca';

// Drawer customizado
import DrawerCustom from './src/components/Drawer';

// Contextos
import { AppProvider, useApp } from './src/context/AppContext';
import { CarrinhoProvider } from './src/context/CarrinhoContext';
import { UserProvider } from './src/context/UserContext';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

/* --------------------------------------
   🔥 MAIN DRAWER COM MENU HAMBÚRGUER
--------------------------------------- */
function MainDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="HomeApp"
      drawerContent={(props) => <DrawerCustom {...props} />}
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: '#4E342E' },
        headerTintColor: '#F3E5D0',
        drawerStyle: { backgroundColor: '#3B2922' },
        drawerActiveTintColor: '#F5D7A1',
        drawerInactiveTintColor: '#D9C5A3',

        // 👉 Botão de menu corrigido
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{ marginLeft: 12 }}>
            <Image
              source={require('./assets/images/icons/menu.png')}
              style={{
                width: 26,
                height: 26,
                tintColor: '#F3E5D0',
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ),
      })}
    >
      <Drawer.Screen name="HomeApp" component={HomeApp} options={{ title: 'Início' }} />
      <Drawer.Screen name="Pedidos" component={Pedidos} options={{ title: 'Pedidos' }} />
      <Drawer.Screen name="MeusPedidos" component={MeusPedidos} options={{ title: 'Meus Pedidos' }} />
      <Drawer.Screen name="Perfil" component={Perfil} options={{ title: 'Meu Perfil' }} />
      <Drawer.Screen name="Carrinho" component={Carrinho} options={{ title: 'Carrinho' }} />
    </Drawer.Navigator>
  );
}

/* --------------------------------------
            APP PRINCIPAL
--------------------------------------- */
function AppContent() {
  const { isDarkMode } = useApp();

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>

        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />

        {/* Drawer Principal */}
        <Stack.Screen name="MainApp" component={MainDrawer} />

        {/* Telas independentes */}
        <Stack.Screen name="DetalhesPedido" component={DetalhesPedido} />

        {/* Apenas se aberta por botão direto */}
        <Stack.Screen name="EditarPerfil" component={EditarPerfil} />
        <Stack.Screen name="Seguranca" component={Seguranca} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <UserProvider>
      <AppProvider>
        <CarrinhoProvider>
          <AppContent />
        </CarrinhoProvider>
      </AppProvider>
    </UserProvider>
  );
}
