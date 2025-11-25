// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity, Image } from 'react-native';

// Telas
import Welcome from './src/screens/Welcome';
import Login from './src/screens/Login';
import Cadastro from './src/screens/Cadastro';
import HomeApp from './src/screens/HomeApp';
import Pedidos from './src/screens/Pedidos';
import Perfil from './src/screens/Perfil';
import DetalhesPedido from './src/screens/DetalhesPedido';
import Carrinho from './src/screens/Carrinho';

// Novas telas
import EditarPerfil from './src/screens/EditarPerfil';
import Seguranca from './src/screens/Seguranca';
import SobreApp from './src/screens/SobreApp';
import Favoritos from './src/screens/Favoritos';
import AjudaSuporte from './src/screens/AjudaSuporte';

// Drawer customizado
import DrawerCustom from './src/components/Drawer';

// Providers
import { AppProvider } from './src/context/AppContext';
import { CarrinhoProvider } from './src/context/CarrinhoContext';
import { UserProvider } from './src/context/UserContext';
import { FavoritosProvider } from './src/context/FavoritosContext'; // <-- ADICIONADO

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

/* ============================================================
   MAIN DRAWER
============================================================ */
function MainDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="HomeApp"
      screenOptions={{
        headerShown: false, // 👈 REMOVE O HEADER FEIO COMPLETO
        drawerStyle: { backgroundColor: '#3B2922' },
        drawerActiveTintColor: '#F5D7A1',
        drawerInactiveTintColor: '#D9C5A3',
      }}
      drawerContent={(props) => <DrawerCustom {...props} />}
    >
      <Drawer.Screen name="HomeApp" component={HomeApp} options={{ title: 'Início' }} />
      <Drawer.Screen name="Pedidos" component={Pedidos} />
      <Drawer.Screen name="Perfil" component={Perfil} />
      <Drawer.Screen name="Carrinho" component={Carrinho} />
    </Drawer.Navigator>
  );
}

/* ============================================================
   APP PRINCIPAL
============================================================ */
function AppContent() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">

        {/* SEM HEADER */}
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />

        {/* DRAWER */}
        <Stack.Screen name="MainApp" component={MainDrawer} options={{ headerShown: false }} />

        {/* COM HEADER */}
        <Stack.Screen 
          name="DetalhesPedido" 
          component={DetalhesPedido}
          options={{ title: "Detalhes do Pedido" }}
        />

        <Stack.Screen 
          name="EditarPerfil" 
          component={EditarPerfil} 
          options={{ title: 'Editar Perfil' }} 
        />

        <Stack.Screen 
          name="Seguranca" 
          component={Seguranca} 
          options={{ title: 'Segurança' }} 
        />

        <Stack.Screen 
          name="SobreApp" 
          component={SobreApp} 
          options={{ title: 'Sobre o App' }} 
        />

        <Stack.Screen 
          name="Favoritos" 
          component={Favoritos} 
          options={{ title: 'Favoritos' }} 
        />

        <Stack.Screen 
          name="AjudaSuporte" 
          component={AjudaSuporte} 
          options={{ title: 'Ajuda & Suporte' }} 
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

/* ============================================================
   PROVIDERS ENVOLVENDO TUDO
============================================================ */
export default function App() {
  return (
    <UserProvider>
      <AppProvider>
        <CarrinhoProvider>
          <FavoritosProvider>   {/* <-- AGORA FUNCIONA */}
            <AppContent />
          </FavoritosProvider>
        </CarrinhoProvider>
      </AppProvider>
    </UserProvider>
  );
}
