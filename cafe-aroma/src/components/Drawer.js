// Drawer.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';

export default function Drawer({ navigation }) {

  const { isDarkMode, toggleTheme } = useApp();

  // 🎨 CORES DINÂMICAS
  const colors = {
    background: isDarkMode ? '#1F1A17' : '#FAF6F0',
    headerBg:   isDarkMode ? '#2A2320' : '#F1E4D8',
    headerText: isDarkMode ? '#F5D7A1' : '#4A2C2A',
    itemBorder: isDarkMode ? '#3B302C' : '#E2D7C9',
    itemText:   isDarkMode ? '#EED9B6' : '#4A2C2A',
    itemIcon:   isDarkMode ? '#EED9B6' : '#4A2C2A',
    logoutBg:   isDarkMode ? '#2A2320' : '#EDE2D3',
    logoutText: isDarkMode ? '#F5D7A1' : '#4A2C2A',
  };

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
    <View style={{ flex: 1, backgroundColor: colors.background, paddingTop: 40 }}>

      {/* HEADER */}
      <View
        style={{
          backgroundColor: colors.headerBg,
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
          color={colors.headerText}
          style={{ marginRight: 8 }}
        />
        <Text style={{ fontSize: 28, fontWeight: 'bold', color: colors.headerText }}>
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
              borderBottomColor: colors.itemBorder,
            }}
            onPress={() => navigation.navigate(item.screen)}
          >
            <MaterialCommunityIcons
              name={item.icon}
              size={26}
              color={colors.itemIcon}
              style={{ width: 34 }}
            />
            <Text style={{ fontSize: 18, marginLeft: 10, color: colors.itemText }}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 🔘 BOTÃO ALTERAR TEMA */}
      <TouchableOpacity
        onPress={toggleTheme}
        style={{
          marginTop: 30,
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 14,
          paddingHorizontal: 20,
          borderTopWidth: 0.6,
          borderBottomWidth: 0.6,
          borderColor: colors.itemBorder,
        }}
      >
        <MaterialCommunityIcons
          name={isDarkMode ? 'white-balance-sunny' : 'moon-waning-crescent'}
          size={26}
          color={colors.itemIcon}
        />

        <Text style={{ fontSize: 18, marginLeft: 12, color: colors.itemText }}>
          {isDarkMode ? 'Tema Claro' : 'Tema Escuro'}
        </Text>
      </TouchableOpacity>

      {/* BOTÃO SAIR */}
      <TouchableOpacity
        style={{
          marginTop: 'auto',
          flexDirection: 'row',
          alignItems: 'center',
          padding: 22,
          backgroundColor: colors.logoutBg,
          borderTopWidth: 0.4,
          borderTopColor: colors.itemBorder,
        }}
        onPress={() => navigation.replace('Login')}
      >
        <MaterialCommunityIcons name="logout" size={26} color={colors.logoutText} />
        <Text style={{ fontSize: 18, marginLeft: 12, color: colors.logoutText }}>
          Sair
        </Text>
      </TouchableOpacity>
    </View>
  );
}
