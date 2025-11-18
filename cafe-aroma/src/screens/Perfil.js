// src/screens/Perfil.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';

let AsyncStorage = null;
try {
  AsyncStorage = require('@react-native-async-storage/async-storage').default;
} catch (e) {
  console.warn('[Perfil] AsyncStorage não encontrado. Usando memória temporária.');
  AsyncStorage = null;
}

const STORAGE_KEY = '@cafeAroma_profile';
const memoryStore = {};

async function storageGet(key) {
  if (AsyncStorage) {
    const raw = await AsyncStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  }
  return memoryStore[key] || null;
}

async function storageSet(key, value) {
  if (AsyncStorage) {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } else {
    memoryStore[key] = value;
  }
}

export default function Perfil({ onVoltar }) {
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: 'João Café',
    email: 'joaocafe@example.com',
    phone: '',
  });

  const [draft, setDraft] = useState(profile);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const saved = await storageGet(STORAGE_KEY);
        if (mounted && saved) {
          setProfile(saved);
          setDraft(saved);
        }
      } catch (err) {
        console.warn('[Perfil] erro ao carregar perfil:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, []);

  const getInitials = (fullName) => {
    if (!fullName) return '';
    const parts = fullName.trim().split(/\s+/);
    const a = parts[0]?.[0] || '';
    const b = parts.length > 1 ? parts[parts.length - 1][0] : '';
    return (a + b).toUpperCase();
  };

  const validateDraft = () => {
    if (!draft.name || draft.name.trim().length < 2) {
      Alert.alert('Nome inválido', 'Insira um nome com ao menos 2 caracteres.');
      return false;
    }
    if (draft.email && !draft.email.includes('@')) {
      Alert.alert('E-mail inválido', 'Insira um e-mail válido.');
      return false;
    }
    return true;
  };

  const onSave = async () => {
    if (!validateDraft()) return;
    await storageSet(STORAGE_KEY, draft);
    setProfile(draft);
    setEditing(false);
  };

  const onCancel = () => {
    setDraft(profile);
    setEditing(false);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Carregando perfil...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Meu Perfil</Text>

      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{getInitials(profile.name)}</Text>
        </View>
      </View>

      {!editing ? (
        <>
          <View style={styles.infoContainer}>
            <Text style={styles.nome}>{profile.name}</Text>
            <Text style={styles.email}>{profile.email || 'E-mail não definido'}</Text>
            <Text style={styles.phone}>{profile.phone || 'Telefone não definido'}</Text>
          </View>

          <TouchableOpacity style={styles.primaryButton} onPress={() => setEditing(true)}>
            <Text style={styles.primaryButtonText}>Editar Perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={onVoltar}>
            <Text style={styles.secondaryButtonText}>Voltar</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View style={styles.form}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              value={draft.name}
              onChangeText={(t) => setDraft((s) => ({ ...s, name: t }))}
              style={styles.input}
              placeholder="Seu nome"
              placeholderTextColor="#888"
            />

            <Text style={styles.label}>E-mail</Text>
            <TextInput
              value={draft.email}
              onChangeText={(t) => setDraft((s) => ({ ...s, email: t }))}
              style={styles.input}
              placeholder="email@exemplo.com"
              keyboardType="email-address"
              placeholderTextColor="#888"
            />

            <Text style={styles.label}>Telefone</Text>
            <TextInput
              value={draft.phone}
              onChangeText={(t) => setDraft((s) => ({ ...s, phone: t }))}
              style={styles.input}
              placeholder="(xx) xxxxx-xxxx"
              keyboardType="phone-pad"
              placeholderTextColor="#888"
            />
          </View>

          <View style={styles.rowButtons}>
            <TouchableOpacity style={[styles.primaryButton, { marginRight: 12 }]} onPress={onSave}>
              <Text style={styles.primaryButtonText}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.ghostButton} onPress={onCancel}>
              <Text style={styles.ghostButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    padding: 20,
    paddingTop: 48,
  },
  titulo: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 18,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: '#8A5A44', // marrom café
    borderWidth: 3,
    borderColor: '#C69C6D', // dourado café
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '800',
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 18,
  },
  nome: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '700',
    marginBottom: 6,
  },
  email: {
    fontSize: 15,
    color: '#B8B8B8',
  },
  phone: {
    fontSize: 15,
    color: '#B8B8B8',
  },
  primaryButton: {
    marginTop: 20,
    backgroundColor: '#8A5A44', // botão café
    paddingVertical: 12,
    paddingHorizontal: 44,
    borderRadius: 24,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#8A5A44',
    paddingVertical: 10,
    paddingHorizontal: 36,
    borderRadius: 22,
  },
  secondaryButtonText: {
    color: '#C69C6D',
    fontSize: 15,
    fontWeight: '700',
  },
  form: {
    width: '100%',
    marginTop: 6,
  },
  label: {
    color: '#B8B8B8',
    marginBottom: 6,
    marginTop: 12,
    fontSize: 13,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#1E1E1E',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    color: '#FFF',
  },
  rowButtons: {
    flexDirection: 'row',
    marginTop: 18,
  },
  ghostButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#444',
    paddingVertical: 12,
    paddingHorizontal: 26,
    borderRadius: 24,
  },
  ghostButtonText: {
    color: '#B8B8B8',
    fontWeight: '700',
  },
});
