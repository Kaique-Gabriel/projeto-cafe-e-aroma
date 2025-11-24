// Drawer.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Drawer({ navigation }) {
  const menuItems = [
    {
      label: 'Início',
      icon: 'home-variant',
      screen: 'HomeApp',
    },
    {
      label: 'Pedidos',
      icon: 'coffee-to-go',
      screen: 'Pedidos',
    },
    {
      label: 'Carrinho',
      icon: 'cart-outline',
      screen: 'Carrinho',
    },
    {
      label: 'Favoritos',
      icon: 'heart-outline',
      screen: 'Favoritos',
    },
    {
      label: 'Perfil',
      icon: 'account-outline',
      screen: 'Perfil',
    },
    {
      label: 'Ajuda',
      icon: 'help-circle-outline',
      screen: 'Ajuda',
    },
    {
      label: 'Sobre',
      icon: 'information-outline',
      screen: 'Sobre',
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 60 }}>
      <Text
        style={{
          fontSize: 26,
          fontWeight: 'bold',
          alignSelf: 'center',
          marginBottom: 30,
          color: '#4A2C2A',
        }}
      >
        Café & Aroma
      </Text>

      {/* MENU */}
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 14,
            paddingHorizontal: 20,
            borderBottomWidth: 0.3,
            borderBottomColor: '#ddd',
          }}
          onPress={() => navigation.navigate(item.screen)}
        >
          <MaterialCommunityIcons
            name={item.icon}
            size={28}
            color="#4A2C2A"
            style={{ width: 34 }}
          />
          <Text style={{ fontSize: 18, marginLeft: 10, color: '#4A2C2A' }}>
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}

      {/* BOTÃO SAIR */}
      <TouchableOpacity
        style={{
          marginTop: 'auto',
          flexDirection: 'row',
          alignItems: 'center',
          padding: 20,
          backgroundColor: '#F5EDE3',
        }}
        onPress={() => navigation.replace('Login')}
      >
        <MaterialCommunityIcons name="logout" size={28} color="#4A2C2A" />
        <Text style={{ fontSize: 18, marginLeft: 10, color: '#4A2C2A' }}>
          Sair
        </Text>
      </TouchableOpacity>
    </View>
  );
}
