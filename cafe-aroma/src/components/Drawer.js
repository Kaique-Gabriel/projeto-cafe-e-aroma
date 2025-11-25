// Drawer.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Drawer({ navigation }) {
  const menuItems = [
    { label: 'Início', icon: 'home-variant', screen: 'HomeApp' },
    { label: 'Pedidos', icon: 'coffee-to-go', screen: 'Pedidos' },
    { label: 'Carrinho', icon: 'cart-outline', screen: 'Carrinho' },
    { label: 'Favoritos', icon: 'heart-outline', screen: 'Favoritos' },
    { label: 'Perfil', icon: 'account-outline', screen: 'Perfil' },
    { label: 'Ajuda', icon: 'help-circle-outline', screen: 'AjudaSuporte' },
    { label: 'Sobre', icon: 'information-outline', screen: 'SobreApp' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#FAF6F0', paddingTop: 40 }}>
      {/* HEADER PREMIUM */}
      <View
        style={{
          backgroundColor: '#F1E4D8',
          paddingVertical: 30,
          paddingHorizontal: 20,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          elevation: 4,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <MaterialCommunityIcons
          name="coffee"
          size={34}
          color="#4A2C2A"
          style={{ marginRight: 8 }}
        />
        <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#4A2C2A' }}>
          Café & Aroma
        </Text>
      </View>

      {/* MENU */}
      <View style={{ marginTop: 20 }}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 14,
              paddingHorizontal: 20,
              borderBottomWidth: 0.4,
              borderBottomColor: '#E2D7C9',
            }}
            onPress={() => navigation.navigate(item.screen)}
          >
            <MaterialCommunityIcons
              name={item.icon}
              size={26}
              color="#4A2C2A"
              style={{ width: 34 }}
            />
            <Text style={{ fontSize: 18, marginLeft: 10, color: '#4A2C2A' }}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* BOTÃO SAIR */}
      <TouchableOpacity
        style={{
          marginTop: 'auto',
          flexDirection: 'row',
          alignItems: 'center',
          padding: 22,
          backgroundColor: '#EDE2D3',
          borderTopWidth: 0.4,
          borderTopColor: '#D5C6B8',
        }}
        onPress={() => navigation.replace('Login')}
      >
        <MaterialCommunityIcons name="logout" size={26} color="#4A2C2A" />
        <Text style={{ fontSize: 18, marginLeft: 12, color: '#4A2C2A' }}>
          Sair
        </Text>
      </TouchableOpacity>
    </View>
  );
}
