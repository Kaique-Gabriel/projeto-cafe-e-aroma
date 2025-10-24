import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/screens/Home';
import Cadastro from './src/screens/Cadastro';
import Pedidos from './src/screens/Pedidos';
import Perfil from './src/screens/Perfil';
import Login from './src/screens/Login';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Pedidos" component={Pedidos} />
        <Stack.Screen name="Perfil" component={Perfil} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
