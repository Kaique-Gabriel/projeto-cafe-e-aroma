// src/components/Drawer.js
import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
} from 'react-native';
import { useUser } from '../context/UserContext';
import { useApp } from '../context/AppContext';

export default function Drawer(props) {
  const { navigation } = props;   // ← AGORA É O NAVEGADOR CERTO!
  const { user } = useUser();
  const { isDarkMode } = useApp();

  // -------------------------------
  // ANIMAÇÃO
  // -------------------------------
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // 🎨 Paleta de cores
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

  // Telas que pertencem ao DrawerNavigator
  const drawerScreens = [
    "HomeApp",
    "Pedidos",
    "MeusPedidos",
    "Perfil",
    "Carrinho",
  ];

  // -------------------------------
  // FUNÇÃO DE NAVEGAÇÃO CORRIGIDA
  // -------------------------------
  function goTo(screen) {
    navigation.navigate(screen);
    navigation.closeDrawer(); // fecha o menu automaticamente
  }

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: colors.background },
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
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

        {/* GRUPO MENU */}
        <View style={styles.groupTitleBox}>
          <Text style={[styles.groupTitle, { color: colors.textSecondary }]}>
            MENU
          </Text>
        </View>

        <DrawerItem icon={require('../../assets/images/icons/home.png')} label="Início" onPress={() => goTo("HomeApp")} colors={colors} />
        <DrawerItem icon={require('../../assets/images/icons/pedidos.png')} label="Pedidos" onPress={() => goTo("Pedidos")} colors={colors} />
        <DrawerItem icon={require('../../assets/images/icons/cart.png')} label="Carrinho" onPress={() => goTo("Carrinho")} colors={colors} />
        <DrawerItem icon={require('../../assets/images/icons/user.png')} label="Perfil" onPress={() => goTo("Perfil")} colors={colors} />

        {/* MAIS */}
        <View style={[styles.groupTitleBox, { marginTop: 18 }]}>
          <Text style={[styles.groupTitle, { color: colors.textSecondary }]}>
            MAIS
          </Text>
        </View>

        <DrawerItem icon={require('../../assets/images/icons/fav.png')} label="Favoritos" onPress={() => goTo("Favoritos")} colors={colors} />
        <DrawerItem icon={require('../../assets/images/icons/history.png')} label="Histórico" onPress={() => goTo("MeusPedidos")} colors={colors} />
        <DrawerItem icon={require('../../assets/images/icons/info.png')} label="Sobre o App" onPress={() => goTo("SobreApp")} colors={colors} />
        <DrawerItem icon={require('../../assets/images/icons/help.png')} label="Ajuda & Suporte" onPress={() => goTo("AjudaSuporte")} colors={colors} />

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

    </Animated.View>
  );
}

/* ITEM DO DRAWER */
function DrawerItem({ icon, label, onPress, colors }) {
  return (
    <TouchableOpacity
      style={[
        styles.item,
        { backgroundColor: colors.card, borderColor: colors.cardAccent, borderWidth: 1 },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.iconBox,
          { backgroundColor: colors.cardAccent },
        ]}
      >
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

  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginBottom: 10,
  },
  itemText: { fontSize: 16, marginLeft: 16, fontWeight: "600" },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: { width: 22, height: 22 },

  footer: { paddingVertical: 20, paddingLeft: 6 },
  closeButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: { width: 26, height: 26 },
});
