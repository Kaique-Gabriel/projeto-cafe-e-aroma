// src/screens/EditarPerfil.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../context/UserContext";

export default function EditarPerfil() {
  const navigation = useNavigation();
  const { user, updateUser } = useUser();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [photo, setPhoto] = useState(user?.photo || null);

  const fadeAnim = useState(new Animated.Value(0))[0];

  // ESTADOS DO ALERTA PERSONALIZADO
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("error");
  const alertAnim = useState(new Animated.Value(0))[0];

  function showAlert(msg, type = "error") {
    setAlertMessage(msg);
    setAlertType(type);

    Animated.timing(alertAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(alertAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }, 1800);
    });
  }

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    setName(user?.name || "");
    setEmail(user?.email || "");
    setPhone(user?.phone || "");
    setPhoto(user?.photo || null);
  }, [user]);

  function formatPhone(value) {
    if (!value) {
      setPhone("");
      return;
    }

    let v = value.replace(/\D/g, "");
    if (v.length > 11) v = v.slice(0, 11);

    if (v.length <= 10) {
      v = v.replace(/(\d{2})(\d)/, "($1) $2");
      v = v.replace(/(\d{4})(\d)/, "$1-$2");
    } else {
      v = v.replace(/(\d{2})(\d)/, "($1) $2");
      v = v.replace(/(\d{5})(\d)/, "$1-$2");
    }
    setPhone(v);
  }

  async function pickImage() {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      showAlert("Permissão necessária para acessar a galeria.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled && result.assets && result.assets[0]) {
      setPhoto(result.assets[0].uri);
      showAlert("Foto selecionada!", "success");
    }
  }

  async function takePhoto() {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) {
      showAlert("Permissão necessária para usar a câmera.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled && result.assets && result.assets[0]) {
      setPhoto(result.assets[0].uri);
      showAlert("Foto atualizada!", "success");
    }
  }

  async function salvar() {
    if (!name.trim() || !email.trim()) {
      showAlert("Preencha nome e email.");
      return;
    }

    await updateUser({
      name: name.trim(),
      email: email.trim(),
      phone,
      photo,
    });

    showAlert("Perfil atualizado!", "success");

    setTimeout(() => navigation.goBack(), 900);
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>

          {/* ALERTA PERSONALIZADO */}
          <Animated.View
            style={[
              styles.alertBox,
              {
                opacity: alertAnim,
                transform: [
                  {
                    translateY: alertAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-20, 0],
                    }),
                  },
                ],
                backgroundColor:
                  alertType === "error" ? "#D9534F" : "#5CB85C",
              },
            ]}
          >
            <Text style={styles.alertText}>{alertMessage}</Text>
          </Animated.View>

          <Text style={styles.title}>Editar Perfil</Text>

          <TouchableOpacity onPress={pickImage} style={styles.imageWrapper}>
            <Image
              source={
                photo
                  ? { uri: photo }
                  : require("../../assets/images/profile/avatar-placeholder.png")
              }
              style={styles.image}
            />
            <Text style={styles.changePhoto}>Alterar foto</Text>
          </TouchableOpacity>

          <View style={styles.form}>
            <Text style={styles.label}>Nome completo</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Seu nome"
              style={styles.input}
            />

            <Text style={styles.label}>E-mail</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholder="email@exemplo.com"
              style={styles.input}
            />

            <Text style={styles.label}>Telefone</Text>
            <TextInput
              value={phone}
              onChangeText={formatPhone}
              keyboardType="numeric"
              placeholder="(11) 99999-9999"
              style={styles.input}
              maxLength={15}
            />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={salvar}>
            <Text style={styles.saveText}>Salvar alterações</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cameraBtn} onPress={takePhoto}>
            <Text style={styles.cameraText}>Tirar foto com a câmera</Text>
          </TouchableOpacity>

        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4EEE9",
    padding: 26,
  },

  /* ALERTA PERSONALIZADO */
  alertBox: {
    padding: 14,
    borderRadius: 12,
    marginBottom: 15,
    alignSelf: "center",
  },
  alertText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 15,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#4C2E1E",
    alignSelf: "center",
    marginBottom: 20,
  },

  imageWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },

  image: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 3,
    borderColor: "#C7B39A",
  },

  changePhoto: {
    marginTop: 10,
    color: "#6B4F3A",
    fontSize: 15,
    fontWeight: "600",
  },

  form: {
    marginTop: 10,
  },

  label: {
    fontSize: 15,
    color: "#4C2E1E",
    fontWeight: "600",
    marginBottom: 4,
  },

  input: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#D8C8B8",
  },

  saveButton: {
    backgroundColor: "#6A4A3C",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 12,
  },

  saveText: {
    color: "#FFF",
    fontSize: 17,
    fontWeight: "700",
  },

  cameraBtn: {
    marginTop: 12,
    alignItems: "center",
  },

  cameraText: {
    color: "#6B4F3A",
    textDecorationLine: "underline",
  },
});
