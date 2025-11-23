import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Drawer() {
  const navigation = useNavigation();

  function goTo(screen) {
    navigation.navigate("MainApp", { screen });
  }

  return (
    <View style={styles.container}>
      
      {/* Topo - Avatar e Nome */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/profile/avatar-placeholder.png')}
          style={styles.avatar}
        />
        <Text style={styles.username}>Olá, Usuário</Text>
      </View>

      {/* Corpo do Drawer */}
      <ScrollView style={styles.menu}>

        <TouchableOpacity style={styles.item} onPress={() => goTo("HomeApp")}>
          <Image
            source={require('../../assets/images/icons/home.png')}
            style={styles.icon}
          />
          <Text style={styles.itemText}>Início</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => goTo("Pedidos")}>
          <Image
            source={require('../../assets/images/icons/pedidos.png')}
            style={styles.icon}
          />
          <Text style={styles.itemText}>Pedidos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => goTo("Carrinho")}>
          <Image
            source={require('../../assets/images/icons/cart.png')}
            style={styles.icon}
          />
          <Text style={styles.itemText}>Carrinho</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => goTo("Perfil")}>
          <Image
            source={require('../../assets/images/icons/user.png')}
            style={styles.icon}
          />
          <Text style={styles.itemText}>Perfil</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* Botão Fechar */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => goTo("HomeApp")} style={styles.closeButton}>
          <Image
            source={require('../../assets/images/icons/close.png')}
            style={styles.closeIcon}
          />
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, backgroundColor: '#FFF' },
  header: { alignItems: 'center', marginBottom: 25 },
  avatar: { width: 85, height: 85, borderRadius: 50, marginBottom: 10 },
  username: { fontSize: 18, fontWeight: '600' },
  menu: { flex: 1 },
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 20 },
  itemText: { fontSize: 16, marginLeft: 15, fontWeight: '500' },
  icon: { width: 26, height: 26, resizeMode: 'contain' },
  footer: { padding: 20, borderTopWidth: 1, borderColor: '#eee' },
  closeButton: { alignSelf: 'flex-start' },
  closeIcon: { width: 26, height: 26 },
});
