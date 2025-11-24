// src/components/Drawer.js
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../context/UserContext';
import { useApp } from '../context/AppContext';

export default function Drawer() {
  const navigation = useNavigation();
  const { user } = useUser();
  const { isDarkMode } = useApp();

  // 🎨 Sistema de cores
  const colors = isDarkMode
    ? {
        background: "#1C1C1C",
        card: "#2A2A2A",
        cardAccent: "#333",
        border: "#444",
        textPrimary: "#FFFFFF",
        textSecondary: "#CCCCCC",
      }
    : {
        background: "#F6EFE7",
        card: "#FFFFFF",
        cardAccent: "#F2E4D5",
        border: "#D9C5A3",
        textPrimary: "#3B2922",
        textSecondary: "#6E5646",
      };

  function goTo(screen) {
    navigation.navigate("MainApp", { screen });
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      
      {/* TOPO */}
      <View style={styles.header}>
        <Image
          source={
            user?.photo
              ? { uri: user.photo }
              : require('../../assets/images/profile/avatar-placeholder.png')
          }
          style={[styles.avatar, { borderColor: colors.border }]}
        />

        <Text style={[styles.username, { color: colors.textPrimary }]}>
          {user?.name || "Usuário"}
        </Text>
      </View>

      {/* MENU */}
      <ScrollView style={styles.menu} showsVerticalScrollIndicator={false}>
        
        <View style={styles.groupTitleBox}>
          <Text style={[styles.groupTitle, { color: colors.textSecondary }]}>
            MENU
          </Text>
        </View>

        <DrawerItem
          icon={require('../../assets/images/icons/home.png')}
          label="Início"
          onPress={() => goTo("HomeApp")}
          colors={colors}
        />

        <DrawerItem
          icon={require('../../assets/images/icons/pedidos.png')}
          label="Pedidos"
          onPress={() => goTo("Pedidos")}
          colors={colors}
        />

        <DrawerItem
          icon={require('../../assets/images/icons/cart.png')}
          label="Carrinho"
          onPress={() => goTo("Carrinho")}
          colors={colors}
        />

        <DrawerItem
          icon={require('../../assets/images/icons/user.png')}
          label="Perfil"
          onPress={() => goTo("Perfil")}
          colors={colors}
        />

      </ScrollView>

      {/* RODAPÉ */}
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => navigation.closeDrawer()}
          style={[styles.closeButton, { backgroundColor: colors.card }]}
        >
          <Image
            source={require('../../assets/images/icons/close.png')}
            style={[styles.closeIcon, { tintColor: colors.textPrimary }]}
          />
        </TouchableOpacity>
      </View>

    </View>
  );
}

/* ITEM */
function DrawerItem({ icon, label, onPress, colors }) {
  return (
    <TouchableOpacity
      style={[styles.item, { backgroundColor: colors.card }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconBox, { backgroundColor: colors.cardAccent }]}>
        <Image
          source={icon}
          style={[styles.icon, { tintColor: colors.textPrimary }]}
          resizeMode="contain"
        />
      </View>

      <Text style={[styles.itemText, { color: colors.textPrimary }]}>
        {label}
      </Text>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, paddingHorizontal: 12 },
  header: { alignItems: "center", marginBottom: 28, paddingBottom: 12 },
  avatar: { width: 95, height: 95, borderRadius: 50, marginBottom: 10, borderWidth: 2 },
  username: { fontSize: 18, fontWeight: "700" },
  menu: { flex: 1, paddingHorizontal: 6 },
  groupTitleBox: { paddingLeft: 12, marginBottom: 8 },
  groupTitle: { fontSize: 13, fontWeight: "700", opacity: 0.7 },
  item: { flexDirection: "row", alignItems: "center", paddingVertical: 14, paddingHorizontal: 12, borderRadius: 12, marginBottom: 8 },
  itemText: { fontSize: 16, marginLeft: 16, fontWeight: "600" },
  iconBox: { width: 36, height: 36, borderRadius: 10, justifyContent: "center", alignItems: "center" },
  icon: { width: 22, height: 22 },
  footer: { paddingVertical: 20, paddingLeft: 6 },
  closeButton: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
  closeIcon: { width: 26, height: 26 },
});
