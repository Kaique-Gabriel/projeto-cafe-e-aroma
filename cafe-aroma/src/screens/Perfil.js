import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../context/UserContext";
import { getUsuarioLogado } from "../utils/Auth"; // Use o getUsuarioLogado() para pegar o usuário atual

export default function Perfil() {
  const navigation = useNavigation();
  const { user, setUser } = useUser(); // Para sincronizar com o contexto
  const [localUser, setLocalUser] = useState(null);

  // Carrega usuário salvo no AsyncStorage ao iniciar a tela
  useEffect(() => {
    async function loadUser() {
      const u = await getUsuarioLogado(); // Usando getUsuarioLogado
      if (u) {
        setLocalUser(u);
        setUser(u); // Sincroniza com o contexto
      }
    }
    loadUser();
  }, []);

  const displayUser = localUser || user;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* TÍTULO */}
      <Text style={styles.title}>Meu Perfil</Text>

      {/* FOTO + DADOS */}
      <View style={styles.profileWrapper}>
        <Image
          source={
            displayUser?.photo
              ? { uri: displayUser.photo }
              : require("../../assets/images/profile/avatar-placeholder.png")
          }
          style={styles.profileImage}
        />

        <Text style={styles.profileName}>
          {displayUser?.nome || displayUser?.name || "Usuário"}
        </Text>

        <Text style={styles.profileEmail}>
          {displayUser?.email || "email@exemplo.com"}
        </Text>
      </View>

      {/* OPÇÕES */}
      <View style={styles.optionsContainer}>
        <OptionItem
          icon={require("../../assets/images/icons/user.png")}
          label="Editar Perfil"
          onPress={() => navigation.navigate("EditarPerfil")}
        />

        <OptionItem
          icon={require("../../assets/images/icons/close.png")}
          label="Segurança"
          onPress={() => navigation.navigate("Seguranca")}
        />
      </View>
    </ScrollView>
  );
}

/* COMPONENTE */
function OptionItem({ icon, label, onPress }) {
  return (
    <TouchableOpacity style={styles.option} onPress={onPress}>
      <View style={styles.iconBox}>
        <Image source={icon} style={styles.icon} resizeMode="contain" />
      </View>
      <Text style={styles.optionText}>{label}</Text>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4EEE9",
    padding: 26,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    color: "#4C2E1E",
    marginBottom: 25,
  },

  profileWrapper: {
    alignItems: "center",
    marginBottom: 30,
  },

  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#C7B39A",
  },

  profileName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#3D2B1F",
    marginTop: 10,
  },

  profileEmail: {
    fontSize: 15,
    color: "#7A6A58",
  },

  optionsContainer: {
    marginTop: 10,
  },

  option: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  optionText: {
    color: "#3D2B1F",
    fontSize: 17,
    fontWeight: "600",
    marginLeft: 14,
    flex: 1,
  },

  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "#EEE5DC",
    justifyContent: "center",
    alignItems: "center",
  },

  icon: {
    width: 22,
    height: 22,
  },

  arrow: {
    fontSize: 26,
    color: "#8C7B6A",
    fontWeight: "300",
    paddingHorizontal: 6,
  },
});
